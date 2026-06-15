import React from 'react';
import { LayoutDashboard, FileText, Lightbulb, CheckSquare, Globe, BookOpen, Tag, Link, Users, Eye } from 'lucide-react';

const navItems = [
  { section: 'WORKSPACE', items: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'notes', label: 'Notes', icon: FileText, badge: true },
    { id: 'ideas', label: 'Ideas', icon: Lightbulb },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  ]},
  { section: 'CAPTURE', items: [
    { id: 'clips', label: 'Web Clips', icon: Globe },
    { id: 'reading', label: 'Reading List', icon: BookOpen },
    { id: 'tags', label: 'Tags', icon: Tag },
  ]},
  { section: 'SHARE', items: [
    { id: 'feed', label: 'My Feed Link', icon: Link },
    { id: 'shared', label: 'Shared With Me', icon: Users },
    { id: 'public', label: 'Public Preview', icon: Eye },
  ]},
];

export default function Sidebar({ activePage, onNavigate, noteCount }) {
  return (
    <aside className="w-44 flex-shrink-0 text-white flex flex-col" style={{ backgroundColor: '#1a2744' }}>
      <div className="px-4 pt-5 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#4f7ef8' }}>
            <span className="text-white font-bold text-xs">M</span>
          </div>
          <div className="text-white font-bold text-sm leading-tight">MindVault</div>
        </div>
        <div className="text-xs ml-9" style={{ color: '#7a9cc8' }}>Your Second Brain</div>
      </div>

      <nav className="flex-1 px-2 space-y-4 overflow-y-auto">
        {navItems.map(({ section, items }) => (
          <div key={section}>
            <p className="text-xs font-semibold px-2 mb-1" style={{ color: '#5a7aaa', letterSpacing: '0.08em' }}>{section}</p>
            {items.map(({ id, label, icon: Icon, badge }) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-sm font-medium transition-colors mb-0.5 ${
                  activePage === id || (activePage === 'note-detail' && id === 'notes')
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-200 hover:bg-blue-900/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon size={14} />
                  <span>{label}</span>
                </div>
                {badge && (
                  <span className="text-xs rounded-full px-1.5 py-0.5 font-bold" style={{ backgroundColor: '#4f7ef8', fontSize: '10px' }}>
                    {noteCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="px-3 py-3 border-t border-blue-900/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: '#4f7ef8' }}>
            LL
          </div>
          <div>
            <p className="text-xs font-medium text-white">Lady Luck</p>
            <p className="text-xs" style={{ color: '#5a7aaa' }}>Pro Plan</p>
          </div>
        </div>
        <button className="text-blue-400 hover:text-white">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        </button>
      </div>
    </aside>
  );
}
