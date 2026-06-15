import React, { useState } from 'react';
import { Bell, Plus, Share2, Copy, MessageCircle, Mail, Twitter, Eye, X, FileText } from 'lucide-react';

const tagColors = {
  Books: '#3b82f6', Design: '#10b981', Work: '#f59e0b', Ideas: '#8b5cf6', Personal: '#ec4899', Reading: '#f59e0b'
};

export default function Dashboard({ notes, tasks, feedItems, onNavigate, onToggleTask }) {
  const [copied, setCopied] = useState(false);
  const feedLink = 'mindvault.app/feed/ladyluck·xk7p2q';

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const todayTasks = tasks.filter(t => t.dueLabel === 'Today' || t.done);
  const dueToday = tasks.filter(t => t.dueLabel === 'Today' && !t.done);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
          <div className="relative">
            <input type="text" placeholder="Search your vault..." className="pl-8 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-600 w-56 focus:outline-none focus:ring-2 focus:ring-blue-100" />
            <svg className="absolute left-2.5 top-2 text-gray-400" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-gray-500 hover:text-gray-700"><Bell size={16} /></button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: '#1a2744' }}>
            <Share2 size={13} /> Share Feed
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white bg-blue-500">
            <Plus size={13} /> Add
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Welcome back, <span className="text-blue-500">Lady Luck</span></h2>
        <p className="text-sm text-gray-500">{dueToday.length} tasks due today · Your feed link is active</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Share2 size={14} className="text-blue-500" /> Your shared feed link
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full text-green-600 bg-green-50 font-medium">Active</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-500">{feedLink}</div>
          <button onClick={handleCopy} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white bg-blue-500 whitespace-nowrap">
            <Copy size={12} /> {copied ? 'Copied!' : 'Copy link'}
          </button>
        </div>
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {[{ icon: MessageCircle, label: 'WhatsApp' }, { icon: Mail, label: 'Email' }, { icon: Twitter, label: 'Twitter' }, { icon: Eye, label: 'Open preview' }].map(({ icon: Icon, label }) => (
            <button key={label} className="flex items-center gap-1 px-2.5 py-1 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
              <Icon size={11} /> {label}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">Anyone with the link can</span>
          <div className="flex gap-1.5">
            {['View only', 'Can add', 'Can edit'].map((opt, i) => (
              <button key={opt} className={`text-xs px-2.5 py-1 rounded-lg font-medium ${i === 0 ? 'bg-blue-500 text-white' : 'border border-gray-200 text-gray-500 hover:bg-gray-50'}`}>{opt}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { count: notes.length + 117, label: 'Total Notes' },
          { count: 38, label: 'Ideas' },
          { count: 61, label: 'Web Clips' },
        ].map(({ count, label }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-gray-800">{count}</div>
            <div className="text-xs text-gray-400 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <span className="text-blue-500">⊞</span> My feed items
          </div>
          <button className="flex items-center gap-1 text-xs text-blue-500 border border-blue-200 px-2.5 py-1 rounded-lg hover:bg-blue-50">
            <Plus size={11} /> Add to feed
          </button>
        </div>
        <div className="flex gap-3 flex-wrap">
          {feedItems.slice(0, 3).map(item => (
            <div key={item.id} className="relative border border-gray-100 rounded-xl p-3 w-36">
              <button className="absolute top-2 right-2 text-gray-300 hover:text-gray-500"><X size={11} /></button>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: '#eff6ff' }}>
                <FileText size={13} className="text-blue-400" />
              </div>
              <p className="text-xs font-medium text-gray-700 leading-tight pr-2">{item.title.length > 22 ? item.title.slice(0, 22) + '...' : item.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">Pinned note</p>
            </div>
          ))}
          {feedItems.length === 0 && (
            <div className="border border-dashed border-gray-200 rounded-xl p-3 w-36 flex flex-col items-center justify-center text-gray-300 cursor-pointer hover:border-blue-300 hover:text-blue-300">
              <Plus size={18} />
              <span className="text-xs mt-1">Add item</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
              <FileText size={13} className="text-blue-400" /> Recent notes
            </div>
            <button onClick={() => onNavigate('notes')} className="text-xs text-blue-500 hover:underline">See all</button>
          </div>
          <div className="space-y-3">
            {notes.slice(0, 3).map(note => (
              <div key={note.id} className="flex items-start justify-between group">
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-700 font-medium truncate">{note.title}</p>
                    <p className="text-xs text-gray-400">{note.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
                  <span className="text-xs px-1.5 py-0.5 rounded text-white font-medium" style={{ backgroundColor: tagColors[note.tag] || '#6b7280', fontSize: '10px' }}>{note.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
              <span className="text-green-500">✓</span> Today's tasks
            </div>
            <button onClick={() => onNavigate('tasks')} className="text-xs text-blue-500 hover:underline">See all</button>
          </div>
          <div className="space-y-2.5">
            {todayTasks.map(task => (
              <div key={task.id} className="flex items-center justify-between group">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <button
                    onClick={() => onToggleTask(task.id)}
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${task.done ? 'bg-blue-500 border-blue-500' : 'border-gray-300 hover:border-blue-400'}`}
                  >
                    {task.done && <svg width="8" height="8" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>}
                  </button>
                  <span className={`text-sm truncate ${task.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>{task.title}</span>
                </div>
                <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
                  <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${task.done ? 'bg-gray-100 text-gray-400' : 'bg-orange-50 text-orange-500'}`}>{task.done ? 'Done' : task.dueLabel}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-3 flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600">
            <Plus size={11} /> Add new task
          </button>
        </div>
      </div>
    </div>
  );
}
