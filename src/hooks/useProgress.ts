import { useState, useEffect } from 'react';

export interface ProgressData {
  [topicId: number]: boolean;
}

export const useProgress = () => {
  const [progress, setProgress] = useState<ProgressData>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('pathology-progress');
    if (stored) {
      setProgress(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const toggleTopic = (topicId: number) => {
    const newProgress = {
      ...progress,
      [topicId]: !progress[topicId]
    };
    setProgress(newProgress);
    localStorage.setItem('pathology-progress', JSON.stringify(newProgress));
  };

  const markComplete = (topicId: number) => {
    const newProgress = {
      ...progress,
      [topicId]: true
    };
    setProgress(newProgress);
    localStorage.setItem('pathology-progress', JSON.stringify(newProgress));
  };

  const markIncomplete = (topicId: number) => {
    const newProgress = {
      ...progress,
      [topicId]: false
    };
    setProgress(newProgress);
    localStorage.setItem('pathology-progress', JSON.stringify(newProgress));
  };

  const resetProgress = () => {
    setProgress({});
    localStorage.removeItem('pathology-progress');
  };

  const getCompletedCount = () => {
    return Object.values(progress).filter(Boolean).length;
  };

  const getProgressPercentage = (totalTopics: number) => {
    const completed = getCompletedCount();
    return totalTopics > 0 ? (completed / totalTopics) * 100 : 0;
  };

  const getCategoryProgress = (topicIds: number[]) => {
    const completed = topicIds.filter(id => progress[id]).length;
    return {
      completed,
      total: topicIds.length,
      percentage: topicIds.length > 0 ? (completed / topicIds.length) * 100 : 0
    };
  };

  return {
    progress,
    isLoading,
    toggleTopic,
    markComplete,
    markIncomplete,
    resetProgress,
    getCompletedCount,
    getProgressPercentage,
    getCategoryProgress
  };
};