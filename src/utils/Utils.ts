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

export const initialCourses: Course[] = [
  { id: 'CS321', name: 'CS 321', color: 'bg-pink-500' },
  { id: 'MM233', name: 'MM 233', color: 'bg-orange-500' },
  { id: 'EE762', name: 'EE 762', color: 'bg-purple-500' },
  { id: 'MM721', name: 'MM 721', color: 'bg-teal-500' },
  { id: 'CE747', name: 'CE 747', color: 'bg-yellow-500' },
];

export const getRandomColor = () => {
  const colors = ['bg-pink-500', 'bg-orange-500', 'bg-purple-500', 'bg-teal-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500', 'bg-red-500'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const initialNotes: Note[] = [
  { id: 1, title: 'Client Meeting Review', course: 'CS321', date: '07 JANUARY 2021', time: '05:38PM', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod tempor viverra...', color: getRandomColor() },
  { id: 2, title: 'Water Supply Chain Power', course: 'MM233', date: '22 DECEMBER 2020', time: '02:45AM', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod tempor viverra...', color: getRandomColor() },
  { id: 3, title: 'Social Media Chat', course: 'EE762', date: '01 JANUARY 2021', time: '12:23PM', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod tempor viverra...', color: getRandomColor() },
  { id: 4, title: 'Client Meeting Review', course: 'MM721', date: '10 SEPTEMBER 2020', time: '03:50AM', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod tempor viverra...', color: getRandomColor() },
  { id: 5, title: 'Musical Instruments', course: 'CE747', date: '15 SEPTEMBER 2020', time: '11:39PM', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod tempor viverra...', color: getRandomColor() },
];

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase();
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();
};

export const createNewNote = (title: string, content: string, courseId: string): Note => {
  const now = new Date();
  return {
    id: Date.now(),
    title,
    content,
    course: courseId,
    date: formatDate(now),
    time: formatTime(now),
    color: getRandomColor()
  };
};
