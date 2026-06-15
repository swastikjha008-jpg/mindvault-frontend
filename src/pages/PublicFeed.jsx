import React from 'react';
import { FileText, Lightbulb, BookOpen, Plus } from 'lucide-react';

const typeConfig = {
  note: { icon: FileText, label: 'Note', iconBg: '#eff6ff', iconColor: '#3b82f6', tagBg: '#dbeafe', tagText: '#2563eb' },
  idea: { icon: Lightbulb, label: 'Idea', iconBg: '#faf5ff', iconColor: '#8b5cf6', tagBg: '#ede9fe', tagText: '#7c3aed' },
  book: { icon: BookOpen, label: 'Book', iconBg: '#f0fdf4', iconColor: '#16a34a', tagBg: '#dcfce7', tagText: '#15803d' },
};

function getItemType(item) {
  if (item.tag === 'Books') return 'book';
  if (item.tag === 'Ideas') return 'idea';
  return 'note';
}

export default function PublicFeed({ feedItems }) {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-slate-800 rounded-2xl p-5 text-white shadow-sm mb-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/70 mb-2">Public Preview</p>
            <h1 className="text-2xl font-bold">Lady Luck’s Feed</h1>
            <p className="text-sm text-white/70 mt-2 max-w-xl">A public snapshot of selected notes from MindVault.</p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full font-medium text-white border border-white/20 bg-white/10">View only</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Pinned Items</p>
        <div className="space-y-2">
          {feedItems.map(item => {
            const type = getItemType(item);
            const cfg = typeConfig[type];
            const Icon = cfg.icon;
            return (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: cfg.iconBg }}>
                  <Icon size={16} style={{ color: cfg.iconColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{cfg.label}</p>
                </div>
                {item.tag && (
                  <span className="text-xs px-2 py-0.5 rounded font-medium flex-shrink-0" style={{ backgroundColor: cfg.tagBg, color: cfg.tagText }}>
                    {item.tag}
                  </span>
                )}
              </div>
            );
          })}
          {feedItems.length === 0 && (
            <div className="text-center py-8 text-gray-400"><p className="text-sm">No items pinned to feed yet.</p></div>
          )}
        </div>
        <button className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-colors">
          <Plus size={14} /> Suggest an item to add
        </button>
      </div>
    </div>
  );
}
