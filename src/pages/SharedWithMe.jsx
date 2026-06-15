import React from 'react';
import { Search, Eye, Trash2 } from 'lucide-react';

const permissionColors = {
  'View only': { bg: '#eff6ff', text: '#2563eb' },
  'Can add': { bg: '#ecfdf5', text: '#059669' },
  'Can edit': { bg: '#fef3c7', text: '#d97706' },
};

export default function SharedWithMe({ feeds }) {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-800">Shared With Me</h1>
          <div className="relative">
            <input type="text" placeholder="Search shared feeds..." className="pl-8 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-600 w-52 focus:outline-none focus:ring-2 focus:ring-blue-100" />
            <Search className="absolute left-2.5 top-2 text-gray-400" size={13} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {feeds.map(feed => {
          const perm = permissionColors[feed.permission] || permissionColors['View only'];
          const initials = feed.name.split(' ').map(w => w[0]).join('').toUpperCase();
          return (
            <div key={feed.id} className="flex items-center gap-4 px-5 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 group">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ backgroundColor: feed.color }}>
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">{feed.name}</p>
                <p className="text-xs text-gray-400 truncate">mindvault.app/feed/{feed.handle} · {feed.items} items</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full font-semibold flex-shrink-0" style={{ backgroundColor: perm.bg, color: perm.text }}>
                {feed.permission}
              </span>
              <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-50"><Eye size={13} /></button>
                <button className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"><Trash2 size={13} /></button>
              </div>
            </div>
          );
        })}
        {feeds.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="font-medium text-sm">No shared feeds yet</p>
            <p className="text-xs mt-1">When someone shares their vault feed with you, it'll appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
