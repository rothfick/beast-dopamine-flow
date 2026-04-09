import { useState } from 'react';
import { useAppState } from '@/hooks/useAppState';
import DopamineDashboard from '@/components/DopamineDashboard';
import MealSchedule from '@/components/MealSchedule';
import WorkoutTracker from '@/components/WorkoutTracker';
import HabitTracker from '@/components/HabitTracker';
import RewardsModal from '@/components/RewardsModal';
import { Flame } from 'lucide-react';

export default function Index() {
  const {
    state,
    toggleMeal,
    toggleExercise,
    addCustomTask,
    toggleCustomTask,
    removeCustomTask,
    addReward,
    redeemReward,
    removeReward,
    resetDay,
  } = useAppState();

  const [rewardsOpen, setRewardsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-md mx-auto px-5 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <Flame className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-extrabold text-base text-foreground tracking-tight">The Beast Routine</h1>
            <p className="text-[11px] text-muted-foreground font-medium">Posture · Nutrition · Mind Control</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-5 space-y-4 mt-4">
        <DopamineDashboard
          points={state.points}
          onOpenRewards={() => setRewardsOpen(true)}
          onResetDay={resetDay}
        />

        <MealSchedule meals={state.meals} onToggle={toggleMeal} />

        <WorkoutTracker
          morningExercises={state.morningExercises}
          noonExercises={state.noonExercises}
          eveningExercises={state.eveningExercises}
          onToggle={toggleExercise}
        />

        <HabitTracker
          tasks={state.customTasks}
          onAdd={addCustomTask}
          onToggle={toggleCustomTask}
          onRemove={removeCustomTask}
        />
      </div>

      <RewardsModal
        open={rewardsOpen}
        onClose={() => setRewardsOpen(false)}
        points={state.points}
        rewards={state.rewards}
        onRedeem={redeemReward}
        onAdd={addReward}
        onRemove={removeReward}
      />
    </div>
  );
}
