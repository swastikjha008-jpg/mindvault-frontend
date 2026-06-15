import React, { useState } from 'react';
import { ArrowLeft, Share2, Star, Bold, Italic, Underline, AlignLeft, List, Quote, Link, Image, Plus, Copy, Trash2 } from 'lucide-react';

const tagColors = {
  Books: '#3b82f6', Design: '#10b981', Work: '#f59e0b', Ideas: '#8b5cf6', Personal: '#ec4899'
};

export default function NoteDetail({ note, onBack, onToggleFeed, onDelete }) {
  const [content, setContent] = useState(note?.content || '');
  const [saved, setSaved] = useState(false);

  if (!note) return null;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft size={14} /> Back to Notes
        </button>
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-gray-400 hover:text-gray-600"><Share2 size={15} /></button>
          <button className="p-1.5 text-gray-400 hover:text-yellow-500"><Star size={15} /></button>
          <button onClick={handleSave} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white bg-blue-500 hover:bg-blue-600">
            {saved ? '✓ Saved' : 'Save'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-5">
            <h1 className="text-xl font-bold text-gray-900 mb-3">{note.title}</h1>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-xs px-2 py-0.5 rounded font-medium text-white" style={{ backgroundColor: tagColors[note.tag] || '#6b7280' }}>{note.tag}</span>
              <button className="text-xs border border-dashed border-gray-300 px-2 py-0.5 rounded text-gray-400 hover:border-blue-300 hover:text-blue-400">
                <Plus size={10} className="inline mr-0.5" /> Tag
              </button>
              <span className="text-xs text-gray-400 ml-auto">Last edited {note.createdAt}</span>
            </div>
            <div className="flex items-center gap-1 border border-gray-100 rounded-lg p-1.5 mb-4 bg-gray-50 flex-wrap">
              {[Bold, Italic, Underline, AlignLeft, List, Quote, Link, Image].map((Icon, i) => (
                <button key={i} className="p-1 text-gray-500 hover:text-gray-800 hover:bg-white rounded"><Icon size={13} /></button>
              ))}
            </div>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full text-sm text-gray-700 leading-relaxed resize-none border-none outline-none min-h-64 bg-transparent"
              placeholder="Continue writing here..."
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Properties</h3>
            <div className="space-y-2.5">
              {[
                { label: 'Created', value: 'Jun 14' },
                { label: 'Tag', value: note.tag, colored: true },
                { label: 'In feed', value: note.inFeed ? 'Yes' : 'No' },
                { label: 'Words', value: note.words || content.split(/\s+/).filter(Boolean).length },
              ].map(({ label, value, colored }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{label}</span>
                  {colored
                    ? <span className="text-xs font-medium" style={{ color: tagColors[value] || '#6b7280' }}>{value}</span>
                    : <span className="text-xs font-medium text-gray-700">{value}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Actions</h3>
            <div className="space-y-2">
              <button onClick={() => onToggleFeed(note.id)} className="w-full flex items-center gap-2 text-xs text-gray-600 hover:text-blue-600 py-1.5">
                <Share2 size={13} className="text-blue-400" /> {note.inFeed ? 'Remove from feed' : 'Add to feed'}
              </button>
              <button className="w-full flex items-center gap-2 text-xs text-gray-600 hover:text-gray-800 py-1.5">
                <Copy size={13} className="text-gray-400" /> Duplicate
              </button>
              <button onClick={() => { onDelete(note.id); onBack(); }} className="w-full flex items-center gap-2 text-xs text-red-400 hover:text-red-600 py-1.5">
                <Trash2 size={13} /> Delete note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
