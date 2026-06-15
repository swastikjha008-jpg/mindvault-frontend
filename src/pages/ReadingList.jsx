import React, { useState } from 'react';
import { Plus, Search, ExternalLink, Trash2 } from 'lucide-react';

const statusColors = {
  Finished: { bg: '#ecfdf5', text: '#059669' },
  Reading: { bg: '#eff6ff', text: '#2563eb' },
  Unread: { bg: '#f9fafb', text: '#6b7280' },
};
const statusFilters = ['All', 'Reading', 'Finished', 'Unread'];

export default function ReadingList({ items, onDelete }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = items.filter(item => activeFilter === 'All' || item.status === activeFilter);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-800">Reading List</h1>
          <div className="relative">
            <input type="text" placeholder="Search articles..." className="pl-8 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-600 w-56 focus:outline-none focus:ring-2 focus:ring-blue-100" />
            <Search className="absolute left-2.5 top-2 text-gray-400" size={13} />
          </div>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white bg-blue-500 hover:bg-blue-600">
          <Plus size={13} /> Add article
        </button>
      </div>

      <div className="flex gap-2 mb-5 flex-wrap">
        {statusFilters.map(f => (
          <button key={f} onClick={() => setActiveFilter(f)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${activeFilter === f ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {filtered.map((item, idx) => {
          const s = statusColors[item.status] || statusColors.Unread;
          return (
            <div key={item.id} className="flex items-center gap-4 px-4 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 group">
              <span className="text-sm font-medium text-gray-400 w-5 text-right flex-shrink-0">{idx + 1}</span>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-800 truncate">{item.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{item.source} · {item.readTime}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ backgroundColor: s.bg, color: s.text }}>{item.status}</span>
                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-gray-400 hover:text-blue-500"><ExternalLink size={12} /></button>
                  <button onClick={() => onDelete(item.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={12} /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
