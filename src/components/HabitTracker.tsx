import { Check, Plus, X, ListChecks } from 'lucide-react';
import { useState } from 'react';
import type { CustomTask } from '@/hooks/useAppState';

interface Props {
  tasks: CustomTask[];
  onAdd: (text: string) => void;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function HabitTracker({ tasks, onAdd, onToggle, onRemove }: Props) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (!input.trim()) return;
    onAdd(input.trim());
    setInput('');
  };

  return (
    <div className="ios-card overflow-hidden">
      <div className="p-5 pb-3 flex items-center gap-2">
        <ListChecks className="w-5 h-5 text-primary" />
        <h2 className="font-bold text-lg text-card-foreground">Mind Control Tasks</h2>
      </div>
      <div className="px-5 pb-3">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="Add a task..."
            className="flex-1 px-4 py-3 rounded-xl bg-secondary text-sm text-card-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
          <button
            onClick={handleAdd}
            className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="px-5 pb-5 space-y-2">
        {tasks.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No tasks yet. Add one above!</p>
        )}
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
              task.done ? 'bg-emerald-light' : 'bg-secondary'
            }`}
          >
            <button
              onClick={() => onToggle(task.id)}
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors active:scale-95 ${
                task.done ? 'bg-primary' : 'bg-muted'
              }`}
            >
              {task.done && <Check className="w-4 h-4 text-primary-foreground" />}
            </button>
            <span className={`flex-1 text-sm ${task.done ? 'line-through text-muted-foreground' : 'text-card-foreground'}`}>
              {task.text}
            </span>
            <button
              onClick={() => onRemove(task.id)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
