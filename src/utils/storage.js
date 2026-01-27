const TASKS_KEY = 'taskTracker_tasks';

// Get today's date in YYYY-MM-DD format
export const getToday = () => {
  return new Date().toISOString().split('T')[0];
};

export const getTasks = () => {
  const tasks = localStorage.getItem(TASKS_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

export const saveTasks = (tasks) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

// Get only regular (non-recurring) tasks
export const getRegularTasks = () => {
  return getTasks().filter(task => !task.isRecurring);
};

// Get only recurring tasks
export const getRecurringTasks = () => {
  return getTasks().filter(task => task.isRecurring);
};

// Check if a recurring task is completed today
export const isCompletedToday = (task) => {
  return task.lastCompletedDate === getToday();
};

// Get recurring tasks with computed status
export const getRecurringTasksWithStatus = () => {
  const today = getToday();
  return getRecurringTasks().map(task => ({
    ...task,
    status: task.lastCompletedDate === today ? 'Completed' : 'Pending'
  }));
};

export const addTask = (task) => {
  const tasks = getTasks();
  const newTask = {
    id: Date.now(),
    ...task,
    createdAt: new Date().toISOString(),
    // For recurring tasks, initialize history
    ...(task.isRecurring && {
      lastCompletedDate: null,
      completionHistory: []
    })
  };
  tasks.push(newTask);
  saveTasks(tasks);
  return newTask;
};

export const updateTask = (id, updatedTask) => {
  const tasks = getTasks();
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
    saveTasks(tasks);
    return tasks[index];
  }
  return null;
};

// Toggle recurring task completion for today
export const toggleRecurringTask = (id) => {
  const tasks = getTasks();
  const index = tasks.findIndex(task => task.id === id);
  const today = getToday();
  
  if (index !== -1 && tasks[index].isRecurring) {
    const task = tasks[index];
    const isCurrentlyCompleted = task.lastCompletedDate === today;
    
    if (isCurrentlyCompleted) {
      // Uncomplete: remove today from history
      task.lastCompletedDate = null;
      task.completionHistory = (task.completionHistory || []).filter(date => date !== today);
    } else {
      // Complete: add today to history
      task.lastCompletedDate = today;
      if (!task.completionHistory) task.completionHistory = [];
      if (!task.completionHistory.includes(today)) {
        task.completionHistory.push(today);
      }
    }
    
    saveTasks(tasks);
    return task;
  }
  return null;
};

export const deleteTask = (id) => {
  const tasks = getTasks();
  const filteredTasks = tasks.filter(task => task.id !== id);
  saveTasks(filteredTasks);
  return true;
};

// Get completion stats for dashboard
export const getCompletionStats = (range = 'week') => {
  const recurringTasks = getRecurringTasks();
  const today = new Date();
  
  // Map range to number of days
  const rangeDays = {
    'week': 7,
    'month': 30,
    '3months': 90,
    '6months': 180,
    'year': 365
  };
  const days = rangeDays[range] || 7;
  
  // Generate date range
  const dates = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  // Count completions per day
  const dailyStats = dates.map(date => {
    const completedCount = recurringTasks.filter(task => 
      (task.completionHistory || []).includes(date)
    ).length;
    
    return {
      date,
      completed: completedCount,
      total: recurringTasks.length,
      dayLabel: new Date(date).toLocaleDateString('en-US', { weekday: 'short' })
    };
  });
  
  // Calculate summary stats
  const totalCompletions = dailyStats.reduce((sum, day) => sum + day.completed, 0);
  const possibleCompletions = dailyStats.reduce((sum, day) => sum + day.total, 0);
  
  // Calculate streak (consecutive days with all tasks completed)
  let streak = 0;
  for (let i = dailyStats.length - 1; i >= 0; i--) {
    if (dailyStats[i].completed === dailyStats[i].total && dailyStats[i].total > 0) {
      streak++;
    } else if (dailyStats[i].date === today.toISOString().split('T')[0]) {
      // If today is not completed yet, don't break the streak from yesterday
      continue;
    } else {
      break;
    }
  }
  
  // Find longest streak
  const calculateLongestStreak = () => {
    const allTasks = getRecurringTasks();
    if (allTasks.length === 0) return 0;

    // Get all unique completion dates across all tasks
    const allDates = new Set();
    allTasks.forEach(task => {
      (task.completionHistory || []).forEach(date => allDates.add(date));
    });

    const sortedDates = Array.from(allDates).sort();
    let maxStreak = 0;
    let currentStreak = 0;
    let prevDate = null;

    sortedDates.forEach(dateStr => {
      const date = new Date(dateStr);
      // Check if all tasks were completed on this date
      const allCompleted = allTasks.every(task => (task.completionHistory || []).includes(dateStr));
      
      if (allCompleted) {
        if (prevDate) {
          const diffTime = Math.abs(date - prevDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
            currentStreak++;
          } else {
            currentStreak = 1;
          }
        } else {
          currentStreak = 1;
        }
        prevDate = date;
      } else {
        currentStreak = 0;
        prevDate = null;
      }
      maxStreak = Math.max(maxStreak, currentStreak);
    });

    return maxStreak;
  };
  
  // Find best day
  const bestDay = dailyStats.reduce((best, day) => 
    day.completed > best.completed ? day : best, dailyStats[0]);
  
  return {
    dailyStats,
    totalCompletions,
    possibleCompletions,
    completionRate: possibleCompletions > 0 ? Math.round((totalCompletions / possibleCompletions) * 100) : 0,
    streak,
    longestStreak: calculateLongestStreak(),
    bestDay
  };
};

export const getComparisonStats = (range = 'week') => {
  const currentStats = getCompletionStats(range);
  
  // Calculate previous period
  const today = new Date();
  const rangeDays = { 'week': 7, 'month': 30, '3months': 90, '6months': 180, 'year': 365 };
  const days = rangeDays[range] || 7;
  
  const prevPeriodEnd = new Date(today);
  prevPeriodEnd.setDate(prevPeriodEnd.getDate() - days);
  
  const recurringTasks = getRecurringTasks();
  const prevDates = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(prevPeriodEnd);
    date.setDate(date.getDate() - i);
    prevDates.push(date.toISOString().split('T')[0]);
  }
  
  const prevDailyStats = prevDates.map(date => {
    const completedCount = recurringTasks.filter(task => (task.completionHistory || []).includes(date)).length;
    return { date, completed: completedCount, total: recurringTasks.length };
  });
  
  const prevTotal = prevDailyStats.reduce((sum, d) => sum + d.completed, 0);
  const prevPossible = prevDailyStats.reduce((sum, d) => sum + d.total, 0);
  const prevRate = prevPossible > 0 ? Math.round((prevTotal / prevPossible) * 100) : 0;
  
  return {
    current: {
      total: currentStats.totalCompletions,
      rate: currentStats.completionRate
    },
    previous: {
      total: prevTotal,
      rate: prevRate
    },
    diff: {
      total: currentStats.totalCompletions - prevTotal,
      rate: currentStats.completionRate - prevRate
    }
  };
};

export const getHeatmapData = () => {
  const recurringTasks = getRecurringTasks();
  const history = {};
  
  recurringTasks.forEach(task => {
    (task.completionHistory || []).forEach(date => {
      history[date] = (history[date] || 0) + 1;
    });
  });
  
  const today = new Date();
  const data = [];
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const count = history[dateStr] || 0;
    const total = recurringTasks.length;
    let intensity = 0;
    if (total > 0) {
      const rate = count / total;
      if (rate === 0) intensity = 0;
      else if (rate <= 0.33) intensity = 1;
      else if (rate <= 0.66) intensity = 2;
      else if (rate < 1) intensity = 3;
      else intensity = 4;
    }
    data.push({ date: dateStr, count, intensity });
  }
  return data;
};
