import { useState, useEffect, useCallback } from 'react';

export interface Reward {
  id: string;
  name: string;
  cost: number;
}

export interface CustomTask {
  id: string;
  text: string;
  done: boolean;
}

export interface AppState {
  points: number;
  meals: boolean[];
  morningExercises: boolean[];
  noonExercises: boolean[];
  eveningExercises: boolean[];
  customTasks: CustomTask[];
  rewards: Reward[];
  redeemedRewards: string[];
}

const DEFAULT_REWARDS: Reward[] = [
  { id: '1', name: '30 mins of Gaming', cost: 50 },
  { id: '2', name: 'Guilt-free TikTok', cost: 30 },
  { id: '3', name: 'Piece of dark chocolate', cost: 40 },
  { id: '4', name: 'Episode of a show', cost: 60 },
];

const getToday = () => new Date().toISOString().split('T')[0];

const getDefaultState = (): AppState => ({
  points: 0,
  meals: [false, false, false, false, false],
  morningExercises: [false, false, false],
  noonExercises: [false, false],
  eveningExercises: [false, false, false],
  customTasks: [],
  rewards: DEFAULT_REWARDS,
  redeemedRewards: [],
});

export function useAppState() {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('beast-routine');
    const savedDate = localStorage.getItem('beast-routine-date');
    const today = getToday();

    if (saved && savedDate === today) {
      try {
        const parsed = JSON.parse(saved);
        return { ...getDefaultState(), ...parsed };
      } catch { return getDefaultState(); }
    }

    // New day: keep points and rewards, reset checkboxes
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const fresh = getDefaultState();
        fresh.points = parsed.points || 0;
        fresh.rewards = parsed.rewards || DEFAULT_REWARDS;
        return fresh;
      } catch { return getDefaultState(); }
    }

    return getDefaultState();
  });

  useEffect(() => {
    localStorage.setItem('beast-routine', JSON.stringify(state));
    localStorage.setItem('beast-routine-date', getToday());
  }, [state]);

  const addPoints = useCallback((pts: number) => {
    setState(s => ({ ...s, points: s.points + pts }));
  }, []);

  const toggleMeal = useCallback((index: number) => {
    setState(s => {
      const meals = [...s.meals];
      const wasDone = meals[index];
      meals[index] = !wasDone;
      return { ...s, meals, points: s.points + (wasDone ? -10 : 10) };
    });
  }, []);

  const toggleExercise = useCallback((group: 'morningExercises' | 'noonExercises' | 'eveningExercises', index: number) => {
    setState(s => {
      const arr = [...s[group]];
      const wasDone = arr[index];
      arr[index] = !wasDone;
      return { ...s, [group]: arr, points: s.points + (wasDone ? -10 : 10) };
    });
  }, []);

  const addCustomTask = useCallback((text: string) => {
    setState(s => ({
      ...s,
      customTasks: [...s.customTasks, { id: Date.now().toString(), text, done: false }],
    }));
  }, []);

  const toggleCustomTask = useCallback((id: string) => {
    setState(s => {
      const customTasks = s.customTasks.map(t => {
        if (t.id === id) return { ...t, done: !t.done };
        return t;
      });
      const task = s.customTasks.find(t => t.id === id);
      const delta = task?.done ? -10 : 10;
      return { ...s, customTasks, points: s.points + delta };
    });
  }, []);

  const removeCustomTask = useCallback((id: string) => {
    setState(s => {
      const task = s.customTasks.find(t => t.id === id);
      const delta = task?.done ? -10 : 0;
      return { ...s, customTasks: s.customTasks.filter(t => t.id !== id), points: s.points + delta };
    });
  }, []);

  const addReward = useCallback((name: string, cost: number) => {
    setState(s => ({
      ...s,
      rewards: [...s.rewards, { id: Date.now().toString(), name, cost }],
    }));
  }, []);

  const redeemReward = useCallback((reward: Reward) => {
    setState(s => {
      if (s.points < reward.cost) return s;
      return { ...s, points: s.points - reward.cost, redeemedRewards: [...s.redeemedRewards, reward.id] };
    });
  }, []);

  const removeReward = useCallback((id: string) => {
    setState(s => ({ ...s, rewards: s.rewards.filter(r => r.id !== id) }));
  }, []);

  const resetDay = useCallback(() => {
    setState(s => ({
      ...getDefaultState(),
      points: s.points,
      rewards: s.rewards,
    }));
  }, []);

  return {
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
    addPoints,
  };
}
