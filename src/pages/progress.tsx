import { useState, useEffect } from 'react';
import { topics } from '@/data/topics';
import { useProgress } from '@/hooks/useProgress';
import { CheckCircle, Circle, RefreshCw, Download, Filter, X } from 'lucide-react';
import clsx from 'clsx';

const categoryColors = {
  cellular: 'border-red-500 bg-red-50 dark:bg-red-950',
  adaptation: 'border-orange-500 bg-orange-50 dark:bg-orange-950',
  circulation: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950',
  healing: 'border-green-500 bg-green-50 dark:bg-green-950',
  inflammation: 'border-blue-500 bg-blue-50 dark:bg-blue-950',
  tumor: 'border-purple-500 bg-purple-50 dark:bg-purple-950',
  deposits: 'border-amber-700 bg-amber-50 dark:bg-amber-950',
  immune: 'border-gray-500 bg-gray-50 dark:bg-gray-800',
  cardio: 'border-pink-500 bg-pink-50 dark:bg-pink-950',
  hemato: 'border-rose-800 bg-rose-50 dark:bg-rose-950',
  respiratory: 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950',
  git: 'border-lime-500 bg-lime-50 dark:bg-lime-950',
  renal: 'border-indigo-700 bg-indigo-50 dark:bg-indigo-950',
  gyneco: 'border-violet-400 bg-violet-50 dark:bg-violet-950',
  cns: 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950',
  bone: 'border-amber-600 bg-amber-50 dark:bg-amber-950',
};

export default function Progress() {
  const { progress, toggleTopic, resetProgress, getCompletedCount, getProgressPercentage, isLoading } = useProgress();
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Načítání...</div>
      </div>
    );
  }

  const filteredTopics = topics.filter(topic => {
    const isCompleted = progress[topic.id] || false;
    
    if (filter === 'completed' && !isCompleted) return false;
    if (filter === 'pending' && isCompleted) return false;
    if (categoryFilter !== 'all' && topic.category !== categoryFilter) return false;
    
    return true;
  });

  const completedCount = getCompletedCount();
  const totalProgress = getProgressPercentage(topics.length);

  const exportProgress = () => {
    const completedTopics = topics.filter(t => progress[t.id]);
    const data = {
      exportDate: new Date().toISOString(),
      totalTopics: topics.length,
      completedCount: completedTopics.length,
      percentage: totalProgress,
      completedTopics: completedTopics.map(t => ({
        id: t.id,
        title: t.title,
        category: t.category,
        section: t.section
      }))
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patologie-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const uniqueCategories = Array.from(new Set(topics.map(t => t.category)));

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Studijní postup
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Sledujte svůj pokrok při studiu všech 216 rigorózních otázek
        </p>
      </div>

      {/* Progress Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {completedCount} / {topics.length}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">otázek dokončeno</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{totalProgress.toFixed(1)}%</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">celkový postup</p>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${totalProgress}%` }}
          />
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={exportProgress}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Exportovat postup
          </button>
          <button
            onClick={() => {
              if (confirm('Opravdu chcete resetovat celý postup? Tato akce je nevratná.')) {
                resetProgress();
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Resetovat vše
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Zobrazit:</span>
            <div className="flex gap-1">
              <button
                onClick={() => setFilter('all')}
                className={clsx(
                  'px-3 py-1 rounded-lg text-sm transition-colors',
                  filter === 'all'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                )}
              >
                Vše ({topics.length})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={clsx(
                  'px-3 py-1 rounded-lg text-sm transition-colors',
                  filter === 'completed'
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                )}
              >
                Dokončené ({completedCount})
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={clsx(
                  'px-3 py-1 rounded-lg text-sm transition-colors',
                  filter === 'pending'
                    ? 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                )}
              >
                Zbývající ({topics.length - completedCount})
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Kategorie:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1 rounded-lg text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
            >
              <option value="all">Všechny kategorie</option>
              {uniqueCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-2">
        {filteredTopics.map((topic) => {
          const isCompleted = progress[topic.id] || false;
          const colorClass = categoryColors[topic.category as keyof typeof categoryColors];
          
          return (
            <div
              key={topic.id}
              className={clsx(
                'flex items-center gap-4 p-4 rounded-lg border-l-4 transition-all',
                colorClass,
                isCompleted && 'opacity-60'
              )}
            >
              <button
                onClick={() => toggleTopic(topic.id)}
                className="flex-shrink-0"
              >
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                )}
              </button>
              
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-sm font-bold text-gray-500 dark:text-gray-400">
                    {topic.id}.
                  </span>
                  <div className="flex-1">
                    <p className={clsx(
                      'font-medium text-gray-900 dark:text-white',
                      isCompleted && 'line-through text-gray-500 dark:text-gray-400'
                    )}>
                      {topic.title}
                    </p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                        {topic.section === 'obecna' ? 'Obecná' : 'Speciální'}
                      </span>
                      {topic.subsection && (
                        <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                          {topic.subsection}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Žádné otázky neodpovídají zvoleným filtrům.
          </p>
        </div>
      )}
    </div>
  );
}