import { Zap, Gift, RotateCcw } from 'lucide-react';

interface Props {
  points: number;
  onOpenRewards: () => void;
  onResetDay: () => void;
}

export default function DopamineDashboard({ points, onOpenRewards, onResetDay }: Props) {
  return (
    <div className="ios-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Dopamine Points</p>
          <div className="flex items-center gap-2 mt-1">
            <Zap className="w-6 h-6 gold-text" fill="currentColor" />
            <span className="text-4xl font-extrabold gold-text">{points}</span>
          </div>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-emerald-light flex items-center justify-center">
          <span className="text-2xl">🧠</span>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onOpenRewards}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl gold-bg font-semibold text-sm transition-all active:scale-95"
        >
          <Gift className="w-4 h-4" />
          Rewards Store
        </button>
        <button
          onClick={onResetDay}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-secondary text-secondary-foreground font-semibold text-sm transition-all active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
}
