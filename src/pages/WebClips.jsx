import React, { useState } from 'react';
import { Plus, Search, ExternalLink, Share2, Trash2 } from 'lucide-react';

const tagColors = { Design: '#10b981', UX: '#3b82f6', Dev: '#8b5cf6', CSS: '#f59e0b', Business: '#ec4899' };
const allTagFilters = ['All', 'Design', 'Dev', 'Business', 'Personal'];

export default function WebClips({ clips, onDelete }) {
  const [activeTag, setActiveTag] = useState('All');

  const filtered = clips.filter(c => activeTag === 'All' || c.tags.includes(activeTag));

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-800">Web Clips</h1>
          <div className="relative">
            <input type="text" placeholder="Search clips..." className="pl-8 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-600 w-48 focus:outline-none focus:ring-2 focus:ring-blue-100" />
            <Search className="absolute left-2.5 top-2 text-gray-400" size={13} />
          </div>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white bg-blue-500 hover:bg-blue-600">
          <Plus size={13} /> Add clip
        </button>
      </div>

      <div className="flex gap-2 mb-5 flex-wrap">
        {allTagFilters.map(tag => (
          <button key={tag} onClick={() => setActiveTag(tag)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${activeTag === tag ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filtered.map(clip => (
          <div key={clip.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-3.5 h-3.5 rounded bg-gray-200"></div>
              <span className="text-xs text-gray-400">{clip.domain}</span>
            </div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1.5 leading-snug">{clip.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">{clip.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5 flex-wrap">
                {clip.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: (tagColors[tag] || '#6b7280') + '20', color: tagColors[tag] || '#6b7280' }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-gray-400 hover:text-blue-500"><ExternalLink size={12} /></button>
                <button className="text-gray-400 hover:text-gray-600"><Share2 size={12} /></button>
                <button onClick={() => onDelete(clip.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={12} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
