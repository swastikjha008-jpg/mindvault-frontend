import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';

export default function Tags({ tags }) {
  const [active, setActive] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [newTag, setNewTag] = useState('');

  const filtered = active === 'All' ? tags : tags.filter(t => t.name === active);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-800">Tags</h1>
          <div className="relative">
            <input type="text" placeholder="Search tags..." className="pl-8 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-600 w-48 focus:outline-none focus:ring-2 focus:ring-blue-100" />
            <Search className="absolute left-2.5 top-2 text-gray-400" size={13} />
          </div>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white bg-blue-500 hover:bg-blue-600">
          <Plus size={13} /> New tag
        </button>
      </div>

      <div className="flex gap-2 mb-5 flex-wrap">
        {['All', ...tags.map(t => t.name)].map(name => (
          <button key={name} onClick={() => setActive(name)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${active === name ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {name}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {filtered.map(tag => (
          <div key={tag.name} className="flex items-center gap-4 px-5 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
            <div className="w-28 flex-shrink-0">
              <span className="text-sm font-semibold px-2.5 py-0.5 rounded" style={{ backgroundColor: tag.color + '20', color: tag.color }}>{tag.name}</span>
            </div>
            <div className="w-20 flex-shrink-0">
              <span className="text-sm text-gray-500">{tag.count} items</span>
            </div>
            <div className="flex-1 flex gap-3 flex-wrap">
              {tag.items.map(item => (
                <span key={item} className="text-xs text-gray-500 hover:text-gray-700 cursor-pointer">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-80 shadow-xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-base font-semibold text-gray-800 mb-4">New tag</h2>
            <input value={newTag} onChange={e => setNewTag(e.target.value)} placeholder="Tag name..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-200" />
            <div className="flex gap-2">
              <button onClick={() => setShowForm(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button className="flex-1 px-4 py-2 bg-blue-500 rounded-lg text-sm text-white font-medium hover:bg-blue-600">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
