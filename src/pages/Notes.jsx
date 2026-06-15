import React, { useState } from 'react';
import { Plus, Search, Share2, Edit2, Trash2, LayoutGrid, List } from 'lucide-react';

const tagColors = {
  Books: '#3b82f6', Design: '#10b981', Work: '#f59e0b', Ideas: '#8b5cf6', Personal: '#ec4899'
};
const allTags = ['All', 'Books', 'Design', 'Work', 'Ideas', 'Personal'];

export default function Notes({ notes, onOpenNote, onNewNote, onDelete }) {
  const [activeTag, setActiveTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = notes.filter(note => {
    const matchesTag = activeTag === 'All' || note.tag === activeTag;
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-800">Notes</h1>
          <div className="relative">
            <input type="text" placeholder="Search notes..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="pl-8 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-600 w-52 focus:outline-none focus:ring-2 focus:ring-blue-100" />
            <Search className="absolute left-2.5 top-2 text-gray-400" size={13} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50"><LayoutGrid size={14} /></button>
          <button className="p-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50"><List size={14} /></button>
          <button onClick={onNewNote} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white bg-blue-500 hover:bg-blue-600">
            <Plus size={13} /> New note
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2 flex-wrap">
          {allTags.map(tag => (
            <button key={tag} onClick={() => setActiveTag(tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${activeTag === tag ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              {tag}
            </button>
          ))}
        </div>
        <div className="text-xs text-gray-500">Sort by: <span className="font-medium text-gray-700">Newest</span> ▾</div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {filtered.map(note => (
          <div key={note.id} onClick={() => onOpenNote(note.id)}
            className="bg-white rounded-xl border border-gray-100 p-4 cursor-pointer hover:shadow-md transition-shadow group">
            <div className="mb-2">
              <span className="text-xs px-2 py-0.5 rounded font-medium text-white" style={{ backgroundColor: tagColors[note.tag] || '#6b7280' }}>{note.tag}</span>
            </div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1 leading-tight">{note.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{note.content}</p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-400">{note.createdAt}</span>
              <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                <button className="text-gray-400 hover:text-blue-500"><Share2 size={12} /></button>
                <button className="text-gray-400 hover:text-gray-600"><Edit2 size={12} /></button>
                <button onClick={() => onDelete(note.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={12} /></button>
              </div>
            </div>
          </div>
        ))}
        <div onClick={onNewNote} className="bg-white rounded-xl border border-dashed border-gray-200 p-4 cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-colors flex flex-col items-center justify-center min-h-36">
          <Plus size={22} className="text-gray-300 mb-1" />
          <span className="text-sm text-gray-400">New note</span>
        </div>
      </div>
    </div>
  );
}
