import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

const TAGS = ['Books', 'Design', 'Work', 'Ideas', 'Personal'];

export default function NewNoteModal({ onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTag, setSelectedTag] = useState('Books');

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ title: title.trim(), content: content.trim(), tag: selectedTag });
  };

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(100,116,139,0.35)' }}
      onClick={handleBackdrop}
    >
      <div className="bg-white rounded-2xl shadow-xl w-[420px] mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <h2 className="text-base font-semibold text-gray-800">New note</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="px-5 pb-5 space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
            <input
              type="text"
              placeholder="Note title..."
              value={title}
              onChange={e => setTitle(e.target.value)}
              autoFocus
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Content</label>
            <textarea
              placeholder="Start writing your note..."
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={5}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent resize-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">Tag</label>
            <div className="flex flex-wrap gap-2">
              {TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                    selectedTag === tag
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {tag}
                </button>
              ))}
              <button className="flex items-center gap-1 px-3 py-1 rounded-full text-xs border border-dashed border-gray-300 text-gray-400 hover:border-blue-300 hover:text-blue-400 transition-colors">
                <Plus size={10} /> New tag
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 font-medium hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!title.trim()}
              className="flex-1 px-4 py-2 bg-blue-500 rounded-lg text-sm text-white font-medium hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Save note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
