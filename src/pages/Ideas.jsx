import React, { useState } from 'react';
import { Plus, Search, Share2, Edit2, Trash2 } from 'lucide-react';

const stageColors = {
  Seedling: { bg: '#f0fdf4', text: '#16a34a', border: '#86efac' },
  Growing:  { bg: '#fff7ed', text: '#ea580c', border: '#fdba74' },
  Ripe:     { bg: '#faf5ff', text: '#7c3aed', border: '#c4b5fd' },
  Archived: { bg: '#f9fafb', text: '#6b7280', border: '#d1d5db' },
};
const stages = ['All', 'Seedling', 'Growing', 'Ripe', 'Archived'];

export default function Ideas({ ideas, onDelete, onAdd }) {
  const [activeStage, setActiveStage] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [newIdea, setNewIdea] = useState({ title: '', description: '', stage: 'Seedling' });

  const filtered = ideas.filter(i => activeStage === 'All' || i.stage === activeStage);

  const handleAdd = () => {
    if (!newIdea.title.trim()) return;
    onAdd(newIdea);
    setNewIdea({ title: '', description: '', stage: 'Seedling' });
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-800">Ideas</h1>
          <div className="relative">
            <input type="text" placeholder="Search ideas..." className="pl-8 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-600 w-48 focus:outline-none focus:ring-2 focus:ring-blue-100" />
            <Search className="absolute left-2.5 top-2 text-gray-400" size={13} />
          </div>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white bg-blue-500 hover:bg-blue-600">
          <Plus size={13} /> New idea
        </button>
      </div>

      <div className="flex gap-2 mb-5 flex-wrap">
        {stages.map(s => (
          <button key={s} onClick={() => setActiveStage(s)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${activeStage === s ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filtered.map(idea => {
          const stage = stageColors[idea.stage] || stageColors.Seedling;
          return (
            <div key={idea.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: stage.bg, color: stage.text }}>{idea.stage}</span>
                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-gray-400 hover:text-blue-500"><Share2 size={12} /></button>
                  <button className="text-gray-400 hover:text-gray-600"><Edit2 size={12} /></button>
                  <button onClick={() => onDelete(idea.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={12} /></button>
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">{idea.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{idea.description}</p>
              <p className="text-xs text-gray-400 mt-3">{idea.createdAt}</p>
            </div>
          );
        })}
        <div onClick={() => setShowForm(true)} className="bg-white rounded-xl border border-dashed border-gray-200 p-4 cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-colors flex flex-col items-center justify-center min-h-32">
          <Plus size={22} className="text-gray-300 mb-1" />
          <span className="text-sm text-gray-400">New idea</span>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-96 shadow-xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-base font-semibold text-gray-800 mb-4">New idea</h2>
            <input type="text" placeholder="Idea title..." value={newIdea.title} onChange={e => setNewIdea(p => ({ ...p, title: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-200" />
            <textarea placeholder="Describe your idea..." value={newIdea.description} onChange={e => setNewIdea(p => ({ ...p, description: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 mb-3 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-200" />
            <select value={newIdea.stage} onChange={e => setNewIdea(p => ({ ...p, stage: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 mb-4 focus:outline-none">
              {['Seedling', 'Growing', 'Ripe', 'Archived'].map(s => <option key={s}>{s}</option>)}
            </select>
            <div className="flex gap-2">
              <button onClick={() => setShowForm(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={handleAdd} className="flex-1 px-4 py-2 bg-blue-500 rounded-lg text-sm text-white font-medium hover:bg-blue-600">Save idea</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
