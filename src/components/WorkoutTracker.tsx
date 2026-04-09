import { Check, ChevronDown, AlertTriangle, Dumbbell } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface ExerciseGroup {
  title: string;
  time: string;
  emoji: string;
  exercises: string[];
  checked: boolean[];
  groupKey: 'morningExercises' | 'noonExercises' | 'eveningExercises';
}

interface Props {
  morningExercises: boolean[];
  noonExercises: boolean[];
  eveningExercises: boolean[];
  onToggle: (group: 'morningExercises' | 'noonExercises' | 'eveningExercises', index: number) => void;
}

export default function WorkoutTracker({ morningExercises, noonExercises, eveningExercises, onToggle }: Props) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const groups: ExerciseGroup[] = [
    {
      title: 'Morning',
      time: '06:15',
      emoji: '🌅',
      exercises: ['Cat-Cow (15x)', 'Glute Bridges (3×15 — save the lordosis!)', 'Bird-Dog (2×10/side)'],
      checked: morningExercises,
      groupKey: 'morningExercises',
    },
    {
      title: 'Noon (Office)',
      time: '12:00',
      emoji: '🏢',
      exercises: ['Wall Angels (2×12)', 'Incline Push-ups on desk (3×Max)'],
      checked: noonExercises,
      groupKey: 'noonExercises',
    },
    {
      title: 'Evening',
      time: '18:00',
      emoji: '🌙',
      exercises: ['Dead Bug (3×10/side — keep lower back on floor!)', 'Plank (3×45s)', 'Doorway Chest Stretch (2 mins)'],
      checked: eveningExercises,
      groupKey: 'eveningExercises',
    },
  ];

  const allDone = [...morningExercises, ...noonExercises, ...eveningExercises].every(Boolean);
  const prevAllDone = useRef(false);

  useEffect(() => {
    if (allDone && !prevAllDone.current) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    }
    prevAllDone.current = allDone;
  }, [allDone]);

  const totalDone = [...morningExercises, ...noonExercises, ...eveningExercises].filter(Boolean).length;
  const total = morningExercises.length + noonExercises.length + eveningExercises.length;

  return (
    <div className="ios-card overflow-hidden">
      <div className="p-5 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Dumbbell className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-lg text-card-foreground">Posture & Calisthenics</h2>
        </div>
        <span className="text-xs font-medium text-muted-foreground">{totalDone}/{total}</span>
      </div>

      {/* Warning Banner */}
      <div className="mx-5 mb-3 flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20">
        <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
        <p className="text-xs font-semibold text-destructive">NO CRUNCHES! Protect your spine! 🦴</p>
      </div>

      <div className="px-5 pb-5 space-y-2">
        {groups.map((group) => {
          const isOpen = openGroup === group.groupKey;
          const groupDone = group.checked.filter(Boolean).length;
          return (
            <div key={group.groupKey} className="rounded-xl bg-secondary overflow-hidden">
              <button
                onClick={() => setOpenGroup(isOpen ? null : group.groupKey)}
                className="w-full flex items-center justify-between p-4 active:scale-[0.98] transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{group.emoji}</span>
                  <div className="text-left">
                    <p className="font-semibold text-sm text-card-foreground">{group.title}</p>
                    <p className="text-xs text-muted-foreground">{group.time} · {groupDone}/{group.exercises.length}</p>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 space-y-2">
                  {group.exercises.map((ex, i) => (
                    <button
                      key={i}
                      onClick={() => onToggle(group.groupKey, i)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all active:scale-[0.98] ${
                        group.checked[i] ? 'bg-emerald-light' : 'bg-card'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                        group.checked[i] ? 'bg-primary' : 'bg-muted'
                      }`}>
                        {group.checked[i] && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                      <span className={`text-sm text-left ${group.checked[i] ? 'line-through text-muted-foreground' : 'text-card-foreground'}`}>
                        {ex}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
