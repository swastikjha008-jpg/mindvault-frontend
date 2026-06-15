import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';

const priorityColors = { high: '#ef4444', mid: '#f59e0b', low: '#10b981' };
const tagColors = { Work: '#f59e0b', Personal: '#ec4899', Reading: '#3b82f6', Books: '#3b82f6' };
const filters = ['All', 'Today', 'Upcoming', 'Done'];

export default function Tasks({ tasks, onToggle, onDelete, onAdd }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', priority: 'mid', tag: 'Work', dueLabel: 'Today' });

  const todayTasks = tasks.filter(t => (t.dueLabel === 'Today' || t.done) && t.dueLabel !== 'Tomorrow' && !t.dueLabel?.includes('Jun'));
  const upcomingTasks = tasks.filter(t => t.dueLabel === 'Tomorrow' || t.dueLabel?.includes('Jun'));

  const getFiltered = () => {
    if (activeFilter === 'Today') return tasks.filter(t => t.dueLabel === 'Today' && !t.done);
    if (activeFilter === 'Upcoming') return upcomingTasks;
    if (activeFilter === 'Done') return tasks.filter(t => t.done);
    return tasks;
  };

  const handleAdd = () => {
    if (!newTask.title.trim()) return;
    onAdd(newTask);
    setNewTask({ title: '', priority: 'mid', tag: 'Work', dueLabel: 'Today' });
    setShowForm(false);
  };

  const TaskRow = ({ task }) => (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 group">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: priorityColors[task.priority] || '#6b7280' }}></div>
        <button onClick={() => onToggle(task.id)}
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${task.done ? 'bg-blue-500 border-blue-500' : 'border-gray-300 hover:border-blue-400'}`}>
          {task.done && <svg width="9" height="9" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>}
        </button>
        <span className={`text-sm flex-1 truncate ${task.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>{task.title}</span>
        <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ backgroundColor: (tagColors[task.tag] || '#6b7280') + '20', color: tagColors[task.tag] || '#6b7280' }}>
          {task.tag}
        </span>
      </div>
      <div className="flex items-center gap-2 ml-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="text-gray-400 hover:text-gray-600"><Edit2 size={12} /></button>
        <button onClick={() => onDelete(task.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={12} /></button>
      </div>
    </div>
  );

  const showSections = activeFilter === 'All';

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-800">Tasks</h1>
          <div className="relative">
            <input type="text" placeholder="Search tasks..." className="pl-8 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-600 w-48 focus:outline-none focus:ring-2 focus:ring-blue-100" />
            <Search className="absolute left-2.5 top-2 text-gray-400" size={13} />
          </div>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white bg-blue-500 hover:bg-blue-600">
          <Plus size={13} /> New task
        </button>
      </div>

      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${activeFilter === f ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          {Object.entries(priorityColors).map(([key, color]) => (
            <span key={key} className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></span>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {showSections ? (
          <>
            {todayTasks.length > 0 && (
              <div className="p-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Today</h3>
                {todayTasks.map(t => <TaskRow key={t.id} task={t} />)}
              </div>
            )}
            {upcomingTasks.length > 0 && (
              <div className="p-4 border-t border-gray-50">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Upcoming</h3>
                {upcomingTasks.map(t => <TaskRow key={t.id} task={t} />)}
              </div>
            )}
          </>
        ) : (
          <div className="p-4">
            {getFiltered().map(t => <TaskRow key={t.id} task={t} />)}
            {getFiltered().length === 0 && <p className="text-sm text-gray-400 text-center py-8">No tasks found</p>}
          </div>
        )}
        <div className="px-4 py-3 border-t border-gray-50">
          <button onClick={() => setShowForm(true)} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600">
            <Plus size={11} /> Add new task
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-96 shadow-xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-base font-semibold text-gray-800 mb-4">New task</h2>
            <input type="text" placeholder="Task title..." value={newTask.title} onChange={e => setNewTask(p => ({ ...p, title: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-200" />
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Priority</label>
                <select value={newTask.priority} onChange={e => setNewTask(p => ({ ...p, priority: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none">
                  <option value="high">High</option><option value="mid">Mid</option><option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Tag</label>
                <select value={newTask.tag} onChange={e => setNewTask(p => ({ ...p, tag: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none">
                  {['Work', 'Personal', 'Reading', 'Books'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="text-xs text-gray-500 mb-1 block">Due</label>
              <select value={newTask.dueLabel} onChange={e => setNewTask(p => ({ ...p, dueLabel: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none">
                <option>Today</option><option>Tomorrow</option><option>This week</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowForm(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={handleAdd} className="flex-1 px-4 py-2 bg-blue-500 rounded-lg text-sm text-white font-medium hover:bg-blue-600">Save task</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
