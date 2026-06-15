import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Notes from './pages/Notes';
import NoteDetail from './pages/NoteDetail';
import Ideas from './pages/Ideas';
import Tasks from './pages/Tasks';
import WebClips from './pages/WebClips';
import ReadingList from './pages/ReadingList';
import Tags from './pages/Tags';
import MyFeedLink from './pages/MyFeedLink';
import SharedWithMe from './pages/SharedWithMe';
import PublicFeed from './pages/PublicFeed';
import NewNoteModal from './components/NewNoteModal';

const initialNotes = [
  { id: 1, title: 'Deep work framework — Cal Newport', tag: 'Books', content: 'Key insight: deep work is the ability to focus without distraction on a cognitively demanding task. It produces value and is increasingly rare.\n\nThe two core habits: schedule deep work blocks in advance, and ruthlessly protect them from interruptions.', createdAt: '2 hours ago', inFeed: true, words: 248 },
  { id: 2, title: 'Mobile-first design principles', tag: 'Design', content: 'Start with the smallest screen and scale up. Touch targets must be at least 44px. Reduce cognitive load by showing only what matters.', createdAt: 'Yesterday', inFeed: false, words: 142 },
  { id: 3, title: 'Q3 planning & roadmap recap', tag: 'Work', content: 'Three main priorities: shipping the onboarding revamp, improving retention week 2, and the analytics dashboard...', createdAt: '2 days ago', inFeed: false, words: 310 },
  { id: 4, title: 'Second brain app feature list', tag: 'Ideas', content: 'Share feed with link, add/remove items, no AI, tag system, reading list, web clip capture...', createdAt: '3 days ago', inFeed: false, words: 195 },
  { id: 5, title: 'Atomic Habits — key chapters', tag: 'Books', content: 'The 1% rule: small improvements compound. Identity-based habits stick longer than outcome-based ones...', createdAt: '4 days ago', inFeed: false, words: 220 },
];

const initialIdeas = [
  { id: 1, title: 'Second brain share feed', stage: 'Ripe', description: 'A public link where anyone can view (or contribute to) your curated knowledge feed. Toggle permissions between view, add, and edit.', createdAt: 'Today' },
  { id: 2, title: 'Mobile-first note capture', stage: 'Growing', description: 'Quick capture via phone: voice-to-text, photo capture that auto-transcribes, and a floating button always visible.', createdAt: 'Yesterday' },
  { id: 3, title: 'Smart tag suggestions', stage: 'Seedling', description: 'As you type a note title, suggest relevant tags from your existing library to reduce friction in organisation.', createdAt: '3 days ago' },
];

const initialTasks = [
  { id: 1, title: 'Review product brief', priority: 'high', tag: 'Work', dueLabel: 'Done', done: true },
  { id: 2, title: 'Write weekly reflection note', priority: 'high', tag: 'Work', dueLabel: 'Today', done: false },
  { id: 3, title: 'Summarise 3 articles from reading list', priority: 'mid', tag: 'Reading', dueLabel: 'Today', done: false },
  { id: 4, title: 'Organise tags & archive old notes', priority: 'low', tag: 'Personal', dueLabel: 'Tomorrow', done: false },
  { id: 5, title: 'Share MindVault invite with team', priority: 'mid', tag: 'Work', dueLabel: 'Fri, Jun 19', done: false },
];

const initialClips = [
  { id: 1, domain: 'nngroup.com', title: '10 usability heuristics for user interface design', description: "Nielsen's classic principles remain the gold standard for evaluating interface usability across all platforms...", tags: ['Design', 'UX'] },
  { id: 2, domain: 'css-tricks.com', title: 'A complete guide to CSS Grid', description: 'Grid is a two-dimensional layout system designed to solve layout problems that have plagued developers...', tags: ['Dev', 'CSS'] },
  { id: 3, domain: 'paulgraham.com', title: 'How to do great work', description: "The key to doing great work is to find work you love and then get so good they can't ignore you...", tags: ['Business'] },
];

const initialReadingList = [
  { id: 1, title: 'How to do great work — Paul Graham', source: 'paulgraham.com', readTime: '12 min read', status: 'Finished' },
  { id: 2, title: '10 usability heuristics — Nielsen Norman Group', source: 'nngroup.com', readTime: '8 min read', status: 'Reading' },
  { id: 3, title: 'The making of a manager — Julie Zhuo', source: 'juliezhuo.com', readTime: '15 min read', status: 'Unread' },
  { id: 4, title: 'A complete guide to CSS Grid — CSS-Tricks', source: 'css-tricks.com', readTime: '20 min read', status: 'Unread' },
];

const initialSharedFeeds = [
  { id: 1, name: 'Rahul Khanna', handle: 'rahul-a3o2c', items: 12, permission: 'View only', color: '#e74c3c' },
  { id: 2, name: 'Priya Desai', handle: 'priya-z1m1x', items: 8, permission: 'Can add', color: '#8e44ad' },
  { id: 3, name: 'Arjun Mehta', handle: 'arjun-d4f8b', items: 31, permission: 'Can edit', color: '#f39c12' },
];

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [notes, setNotes] = useState(initialNotes);
  const [ideas, setIdeas] = useState(initialIdeas);
  const [tasks, setTasks] = useState(initialTasks);
  const [clips, setClips] = useState(initialClips);
  const [readingList, setReadingList] = useState(initialReadingList);
  const [sharedFeeds] = useState(initialSharedFeeds);
  const [showNewNoteModal, setShowNewNoteModal] = useState(false);
  const [feedPermission, setFeedPermission] = useState('View only');

  const feedItems = notes.filter(n => n.inFeed);

  const navigate = (page, noteId = null) => {
    setActivePage(page);
    setActiveNoteId(noteId);
  };

  const addNote = (note) => {
    const newNote = { ...note, id: Date.now(), createdAt: 'Just now', inFeed: false, words: note.content.split(/\s+/).filter(Boolean).length };
    setNotes(prev => [newNote, ...prev]);
    setShowNewNoteModal(false);
  };

  const deleteNote = (id) => setNotes(prev => prev.filter(n => n.id !== id));
  const toggleTaskDone = (id) => setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const deleteTask = (id) => setTasks(prev => prev.filter(t => t.id !== id));
  const addTask = (task) => setTasks(prev => [...prev, { ...task, id: Date.now(), done: false }]);
  const deleteClip = (id) => setClips(prev => prev.filter(c => c.id !== id));
  const deleteIdea = (id) => setIdeas(prev => prev.filter(i => i.id !== id));
  const toggleNoteInFeed = (id) => setNotes(prev => prev.map(n => n.id === id ? { ...n, inFeed: !n.inFeed } : n));

  const tags = [
    { name: 'Books', color: '#3b82f6', count: notes.filter(n => n.tag === 'Books').length + 13, items: ['Deep Work', 'Atomic Habits'] },
    { name: 'Design', color: '#10b981', count: notes.filter(n => n.tag === 'Design').length + 10, items: ['Mobile-first', '10 heuristics'] },
    { name: 'Work', color: '#f59e0b', count: notes.filter(n => n.tag === 'Work').length + 22, items: ['Q3 roadmap', 'Product brief'] },
    { name: 'Ideas', color: '#8b5cf6', count: notes.filter(n => n.tag === 'Ideas').length + 8, items: ['Share feed', 'Smart tags'] },
    { name: 'Personal', color: '#ec4899', count: 6, items: ['Journaling', 'Habits'] },
  ];

  const renderPage = () => {
    if (activePage === 'note-detail' && activeNoteId) {
      const note = notes.find(n => n.id === activeNoteId);
      return <NoteDetail note={note} onBack={() => navigate('notes')} onToggleFeed={toggleNoteInFeed} onDelete={deleteNote} />;
    }

    switch (activePage) {
      case 'dashboard': return <Dashboard notes={notes} tasks={tasks} feedItems={feedItems} onNavigate={navigate} onToggleTask={toggleTaskDone} />;
      case 'notes': return <Notes notes={notes} onOpenNote={(id) => navigate('note-detail', id)} onNewNote={() => setShowNewNoteModal(true)} onDelete={deleteNote} />;
      case 'ideas': return <Ideas ideas={ideas} onDelete={deleteIdea} onAdd={(idea) => setIdeas(prev => [{ ...idea, id: Date.now(), createdAt: 'Just now' }, ...prev])} />;
      case 'tasks': return <Tasks tasks={tasks} onToggle={toggleTaskDone} onDelete={deleteTask} onAdd={addTask} />;
      case 'clips': return <WebClips clips={clips} onDelete={deleteClip} />;
      case 'reading': return <ReadingList items={readingList} onDelete={(id) => setReadingList(prev => prev.filter(r => r.id !== id))} />;
      case 'tags': return <Tags tags={tags} />;
      case 'feed': return <MyFeedLink feedItems={feedItems} permission={feedPermission} onPermissionChange={setFeedPermission} onToggleFeed={toggleNoteInFeed} />;
      case 'shared': return <SharedWithMe feeds={sharedFeeds} />;
      case 'public': return <PublicFeed feedItems={feedItems} />;
      default: return <Dashboard notes={notes} tasks={tasks} feedItems={feedItems} onNavigate={navigate} onToggleTask={toggleTaskDone} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      <Sidebar activePage={activePage} onNavigate={navigate} noteCount={notes.length} />
      <main className="flex-1 overflow-y-auto bg-gray-50">
        {renderPage()}
      </main>
      {showNewNoteModal && <NewNoteModal onClose={() => setShowNewNoteModal(false)} onSave={addNote} />}
    </div>
  );
}
