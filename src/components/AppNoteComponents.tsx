import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface Note {
  id: number;
  title: string;
  content: string;
  course: string;
  date: string;
  time: string;
  color?: string;
}

export const NoteCard = ({ note, onClick }: { note: Note, onClick: (note: Note) => void }) => (
  <div 
    className={`${note.color} rounded-lg p-4 m-2 cursor-pointer`}
    onClick={() => onClick(note)}
  >
    <h3 className="text-lg font-bold">{note.title}</h3>
    <p className="text-sm">{note.content.substring(0, 100)}...</p>
    <div className="flex justify-between mt-4">
      <span>{note.time}</span>
      <span>{note.date}</span>
    </div>
  </div>
);

export const NoteEditingPage: React.FC<{ note?: Note; isNewNote?: boolean; onSave: (note: Note) => void; onCancel: () => void }> = ({ note, isNewNote = false, onSave, onCancel }) => {
  const [editedNote, setEditedNote] = useState<Note>(note || { id: Date.now(), title: '', content: '', course: '', date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString() });

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <button onClick={onCancel} className="mr-4">
          <ArrowLeft />
        </button>
        <h2 className="text-2xl font-bold">{isNewNote ? 'New Note' : 'Edit Note'}</h2>
      </div>
      <input
        className="w-full p-2 mb-4 bg-gray-700 rounded"
        value={editedNote.title}
        onChange={(e) => setEditedNote({...editedNote, title: e.target.value})}
        placeholder="Note Title"
      />
      <textarea
        className="w-full h-64 p-2 mb-4 bg-gray-700 rounded"
        value={editedNote.content}
        onChange={(e) => setEditedNote({...editedNote, content: e.target.value})}
        placeholder="Note Content"
      />
       <button 
        className="bg-teal-500 text-white px-4 py-2 rounded"
        onClick={() => onSave(editedNote)}
      >
        Save
      </button>
    </div>
  );
};

export const UploadNotePage: React.FC<{ 
  onUpload: (file: File) => void; 
  onCancel: () => void 
}> = ({ onUpload, onCancel }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <button onClick={onCancel} className="mr-4">
          <ArrowLeft />
        </button>
        <h2 className="text-2xl font-bold">Upload PDF Notes</h2>
      </div>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button 
        className="bg-teal-500 text-white px-4 py-2 rounded"
        onClick={() => file && onUpload(file)}
        disabled={!file}
      >
        Upload
      </button>
    </div>
  );
};

export const UploadRecordingPage: React.FC<{ 
  onUpload: (file: File) => void; 
  onCancel: () => void 
}> = ({ onUpload, onCancel }) => {
  const [audio, setAudio] = useState<File | null>(null);

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAudio(e.target.files[0]);
    }
  };
  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <button onClick={onCancel} className="mr-4">
          <ArrowLeft />
        </button>
        <h2 className="text-2xl font-bold">Upload Recording</h2>
      </div>
      <input
        type="file"
        accept="audio/*"
        onChange={handleAudioChange}
        className="mb-4"
      />
      <button 
        className="bg-teal-500 text-white px-4 py-2 rounded"
        onClick={() => audio && onUpload(audio)}
        disabled={!audio}
      >
        Upload
      </button>
    </div>
  );
};