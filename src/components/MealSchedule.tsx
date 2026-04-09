import { Check, UtensilsCrossed } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect, useRef } from 'react';

const MEALS = [
  { time: '06:30', label: 'Breakfast', sub: 'Pudełko 1' },
  { time: '10:00', label: '2nd Breakfast', sub: 'Pudełko 2' },
  { time: '13:30', label: 'Lunch / Biggest meal', sub: 'Pudełko 3' },
  { time: '16:30', label: 'Snack', sub: 'Pudełko 4' },
  { time: '19:30', label: 'Dinner', sub: 'Pudełko 5' },
];

interface Props {
  meals: boolean[];
  onToggle: (i: number) => void;
}

export default function MealSchedule({ meals, onToggle }: Props) {
  const prevAllDone = useRef(false);
  const allDone = meals.every(Boolean);

  useEffect(() => {
    if (allDone && !prevAllDone.current) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
    prevAllDone.current = allDone;
  }, [allDone]);

  const doneCount = meals.filter(Boolean).length;

  return (
    <div className="ios-card overflow-hidden">
      <div className="p-5 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-lg text-card-foreground">Box Diet Schedule</h2>
        </div>
        <span className="text-xs font-medium text-muted-foreground">{doneCount}/5</span>
      </div>
      <div className="px-5 pb-5 space-y-2">
        {MEALS.map((meal, i) => (
          <button
            key={i}
            onClick={() => onToggle(i)}
            className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all active:scale-[0.98] ${
              meals[i] ? 'bg-emerald-light' : 'bg-secondary'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
              meals[i] ? 'bg-primary' : 'bg-muted'
            }`}>
              {meals[i] && <Check className="w-4 h-4 text-primary-foreground" />}
            </div>
            <div className="flex-1 text-left">
              <p className={`font-semibold text-sm ${meals[i] ? 'line-through text-muted-foreground' : 'text-card-foreground'}`}>
                {meal.label}
              </p>
              <p className="text-xs text-muted-foreground">{meal.sub}</p>
            </div>
            <span className={`text-xs font-mono font-medium ${meals[i] ? 'text-muted-foreground' : 'text-primary'}`}>
              {meal.time}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
