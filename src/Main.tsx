import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { ChevronDown, Edit, Upload, Mic, Plus } from 'lucide-react';
import { NoteCard, NoteEditingPage, UploadNotePage, UploadRecordingPage } from './components/AppNoteComponents';
import { initialCourses, initialNotes, getRandomColor } from './utils/Utils';

// Define interfaces for Note and Course
interface Note {
  id: number;
  title: string;
  content: string;
  course: string;
  date: string;
  time: string;
  color?: string;
}

interface Course {
  id: string;
  name: string;
  color: string;
}

const StudentNotesApp: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [greeting, setGreeting] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteType, setNewNoteType] = useState<'write' | 'upload' | 'record' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    fetch('https://source.unsplash.com/random/1600x900/?nature')
      .then(response => setBackgroundImage(response.url));

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const HomePage = () => (
    <div className="h-full flex items-center justify-center" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover'}}>
      <div className="text-4xl font-bold text-white bg-black bg-opacity-50 p-8 rounded">
        {greeting}, Steve Dean
      </div>
    </div>
  );

  const NotesPage = () => (
    <div className="grid grid-cols-2 gap-4 p-4">
      {notes.filter(note => note.course === selectedCourse).map(note => (
        <NoteCard key={note.id} note={note} onClick={setSelectedNote} />
      ))}
    </div>
  );

  const AddNoteDropdown = () => (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="bg-teal-500 text-white px-4 py-2 rounded flex items-center"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        Add New Note
        <ChevronDown className="ml-2" />
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button onClick={() => { setNewNoteType('write'); setIsAddingNote(true); setIsDropdownOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
              <Edit className="inline mr-2" size={18} />
              Write
            </button>
            <button onClick={() => { setNewNoteType('upload'); setIsAddingNote(true); setIsDropdownOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
              <Upload className="inline mr-2" size={18} />
              Upload notes
            </button>
            <button onClick={() => { setNewNoteType('record'); setIsAddingNote(true); setIsDropdownOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
              <Mic className="inline mr-2" size={18} />
              Upload Recording
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const addNewCourse = () => {
    if (newCourseName.trim() !== '') {
      const newCourse = {
        id: newCourseName.replace(/\s+/g, '').toUpperCase(),
        name: newCourseName,
        color: getRandomColor()
      };
      setCourses([...courses, newCourse]);
      setNewCourseName('');
      setIsAddingCourse(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="w-64 bg-gray-800 p-4">
        <div className="flex items-center mb-8">
          <img src="/api/placeholder/40/40" alt="Profile" className="rounded-full mr-2" />
          <span>Steve Dean</span>
        </div>
        <h2 className="text-xl font-bold mb-4">Courses</h2>
        {courses.map(course => (
          <button
            key={course.id}
            className={`block w-full text-left p-2 rounded ${selectedCourse === course.id ? 'bg-gray-700' : ''}`}
            onClick={() => {
              setSelectedCourse(course.id);
              setSelectedNote(null);
            }}
          >
            {course.name}
          </button>
        ))}
        {isAddingCourse ? (
          <div className="mt-4">
            <input
              type="text"
              value={newCourseName}
              onChange={(e) => setNewCourseName(e.target.value)}
              className="w-full p-2 mb-2 bg-gray-700 rounded"
              placeholder="Enter course name"
            />
            <button onClick={addNewCourse} className="bg-teal-500 text-white px-4 py-2 rounded mr-2">
              Add
            </button>
            <button onClick={() => setIsAddingCourse(false)} className="bg-gray-600 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingCourse(true)}
            className="mt-4 flex items-center justify-center w-full p-2 bg-gray-700 rounded"
          >
            <Plus size={18} className="mr-2" />
            Add New Course
          </button>
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">
            {selectedNote ? selectedNote.title : selectedCourse ? `${selectedCourse} Notes` : 'All Notes'}
          </h1>
          {selectedCourse && !selectedNote && !isAddingNote && <AddNoteDropdown />}
        </div>
        {selectedNote ? (
          <NoteEditingPage 
            note={selectedNote} 
            onSave={(editedNote) => {
              setNotes(prevNotes => prevNotes.map(n => n.id === editedNote.id ? editedNote : n));
              setSelectedNote(null);
            }}
            onCancel={() => setSelectedNote(null)}
          />
        ) : isAddingNote ? (
          newNoteType === 'write' ? (
            <NoteEditingPage 
              isNewNote={true}
              onSave={(newNote) => {
                const completeNewNote: Note = {
                  ...newNote,
                  id: Date.now(),
                  course: selectedCourse!,
                  date: new Date().toLocaleDateString(),
                  time: new Date().toLocaleTimeString(),
                  color: getRandomColor()
                };
                setNotes(prevNotes => [...prevNotes, completeNewNote]);
                setIsAddingNote(false);
              }}
              onCancel={() => setIsAddingNote(false)}
            />
          ) : newNoteType === 'upload' ? (
            <UploadNotePage 
              onUpload={(file) => {
                const newNote: Note = {
                  id: Date.now(),
                  title: file.name,
                  content: `Uploaded PDF: ${file.name}`,
                  course: selectedCourse!,
                  date: new Date().toLocaleDateString(),
                  time: new Date().toLocaleTimeString(),
                  color: getRandomColor()
                };
                setNotes(prevNotes => [...prevNotes, newNote]);
                setIsAddingNote(false);
              }}
              onCancel={() => setIsAddingNote(false)}
            />
          ) : (
            <UploadRecordingPage 
              onUpload={(audio) => {
                const newNote: Note = {
                  id: Date.now(),
                  title: audio.name,
                  content: `Uploaded Recording: ${audio.name}`,
                  course: selectedCourse!,
                  date: new Date().toLocaleDateString(),
                  time: new Date().toLocaleTimeString(),
                  color: getRandomColor()
                };
                setNotes(prevNotes => [...prevNotes, newNote]);
                setIsAddingNote(false);
              }}
              onCancel={() => setIsAddingNote(false)}
            />
          )
        ) : selectedCourse ? (
          <NotesPage />
        ) : (
          <HomePage />
        )}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <StudentNotesApp />
  </React.StrictMode>
);

export default StudentNotesApp;