import React, { useState } from 'react';
import { Copy, RefreshCw, MessageCircle, Mail, Twitter, Eye, Plus, FileText, Share2 } from 'lucide-react';

const permOptions = [
  { label: 'View only', icon: Eye, desc: 'See your feed' },
  { label: 'Can add', icon: Plus, desc: 'Add to feed' },
  { label: 'Can edit', icon: FileText, desc: 'Edit items' },
];

export default function MyFeedLink({ feedItems, permission, onPermissionChange }) {
  const [copied, setCopied] = useState(false);
  const feedLink = 'mindvault.app/feed/ladyluck·xk7p2q';

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-lg font-semibold text-gray-800">My Feed Link</h1>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border border-gray-200 text-gray-600 hover:bg-gray-50">
          <RefreshCw size={12} /> Regenerate link
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-4 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Share2 size={15} className="text-blue-500" />
          <h2 className="text-sm font-semibold text-gray-800">Your public feed link</h2>
        </div>
        <p className="text-xs text-gray-400 mb-3">Share this link so others can view or contribute to your vault feed</p>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500 font-mono">{feedLink}</div>
          <button onClick={handleCopy} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white bg-blue-500 whitespace-nowrap">
            <Copy size={12} /> {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Who can do what</p>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {permOptions.map(({ label, icon: Icon, desc }) => (
            <button
              key={label}
              onClick={() => onPermissionChange?.(label)}
              className={`border rounded-xl p-3 text-left transition-colors ${
                permission === label ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Icon size={14} className="text-blue-500 mb-2" />
              <p className="text-sm font-medium text-gray-800">{label}</p>
              <p className="text-xs text-gray-400 mt-1">{desc}</p>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-400">Anyone with the link can</span>
          <span className="text-xs font-medium text-gray-700">{permission}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-gray-800">Pinned Items</p>
          <span className="text-xs text-gray-400">{feedItems.length} items</span>
        </div>
        <div className="space-y-2">
          {feedItems.map(item => (
            <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-50">
                <FileText size={16} className="text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">Pinned note</p>
              </div>
              {item.tag && (
                <span className="text-xs px-2 py-0.5 rounded font-medium flex-shrink-0 bg-gray-100 text-gray-600">
                  {item.tag}
                </span>
              )}
            </div>
          ))}
          {feedItems.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <p className="text-sm">No items pinned to feed yet.</p>
            </div>
          )}
        </div>
        <button className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-colors">
          <Plus size={14} /> Suggest an item to add
        </button>
      </div>
    </div>
  );
}
