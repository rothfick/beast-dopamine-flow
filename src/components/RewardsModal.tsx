import { X, Plus, Gift, Trash2, Zap } from 'lucide-react';
import { useState } from 'react';
import type { Reward } from '@/hooks/useAppState';

interface Props {
  open: boolean;
  onClose: () => void;
  points: number;
  rewards: Reward[];
  onRedeem: (reward: Reward) => void;
  onAdd: (name: string, cost: number) => void;
  onRemove: (id: string) => void;
}

export default function RewardsModal({ open, onClose, points, rewards, onRedeem, onAdd, onRemove }: Props) {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');

  if (!open) return null;

  const handleAdd = () => {
    if (!name.trim() || !cost) return;
    onAdd(name.trim(), Number(cost));
    setName('');
    setCost('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md mx-4 mb-4 sm:mb-0 ios-card max-h-[80vh] flex flex-col animate-[scale-in_0.2s_ease-out]">
        <div className="p-5 pb-3 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 gold-text" />
            <h2 className="font-bold text-lg text-card-foreground">Rewards Store</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 gold-text" fill="currentColor" />
              <span className="text-sm font-bold gold-text">{points}</span>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center active:scale-95">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-2">
          {rewards.map((reward) => {
            const canAfford = points >= reward.cost;
            return (
              <div key={reward.id} className="flex items-center gap-3 p-4 rounded-xl bg-secondary">
                <div className="flex-1">
                  <p className="font-semibold text-sm text-card-foreground">{reward.name}</p>
                  <p className="text-xs gold-text font-medium">{reward.cost} pts</p>
                </div>
                <button
                  onClick={() => onRedeem(reward)}
                  disabled={!canAfford}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95 ${
                    canAfford
                      ? 'gold-bg'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  Redeem
                </button>
                <button
                  onClick={() => onRemove(reward.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors active:scale-95"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="p-5 pt-3 border-t border-border">
          <p className="text-xs font-medium text-muted-foreground mb-2">Add custom reward</p>
          <div className="flex gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Reward name"
              className="flex-1 px-3 py-2.5 rounded-xl bg-secondary text-sm text-card-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
            />
            <input
              value={cost}
              onChange={(e) => setCost(e.target.value.replace(/\D/g, ''))}
              placeholder="Pts"
              className="w-16 px-3 py-2.5 rounded-xl bg-secondary text-sm text-card-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 text-center"
            />
            <button
              onClick={handleAdd}
              className="w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center active:scale-95 transition-all"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
