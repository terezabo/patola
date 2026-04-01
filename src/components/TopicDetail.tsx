import React from 'react';
import { CheckCircle, Circle, BookOpen, AlertCircle, Lightbulb } from 'lucide-react';
import clsx from 'clsx';

interface TopicDetailProps {
  id: number;
  title: string;
  category: string;
  isCompleted: boolean;
  onToggleComplete: () => void;
  content: {
    definition?: string;
    pathogenesis?: string[];
    clinical?: string[];
    diagnosis?: string[];
    examples?: string[];
    keyPoints?: string[];
  };
}

const categoryColors: { [key: string]: string } = {
  cellular: 'border-red-500 bg-red-50 dark:bg-red-950',
  adaptation: 'border-orange-500 bg-orange-50 dark:bg-orange-950',
  circulation: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950',
  healing: 'border-green-500 bg-green-50 dark:bg-green-950',
  inflammation: 'border-blue-500 bg-blue-50 dark:bg-blue-950',
  tumor: 'border-purple-500 bg-purple-50 dark:bg-purple-950',
  deposits: 'border-amber-700 bg-amber-50 dark:bg-amber-950',
  immune: 'border-gray-500 bg-gray-50 dark:bg-gray-800',
};

export const TopicDetail: React.FC<TopicDetailProps> = ({
  id,
  title,
  category,
  isCompleted,
  onToggleComplete,
  content
}) => {
  const colorClass = categoryColors[category] || 'border-gray-500 bg-gray-50 dark:bg-gray-800';

  return (
    <div className={clsx('rounded-xl border-l-4 p-6', colorClass, isCompleted && 'opacity-75')}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl font-bold text-gray-500 dark:text-gray-400">
              {id}.
            </span>
            <h2 className={clsx(
              'text-2xl font-bold text-gray-900 dark:text-white',
              isCompleted && 'line-through'
            )}>
              {title}
            </h2>
          </div>
        </div>
        <button
          onClick={onToggleComplete}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-shadow"
        >
          {isCompleted ? (
            <>
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">Dokončeno</span>
            </>
          ) : (
            <>
              <Circle className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Označit jako dokončené</span>
            </>
          )}
        </button>
      </div>

      {/* Content sections */}
      <div className="space-y-6">
        {content.definition && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
              <BookOpen className="w-5 h-5 text-blue-500" />
              Definice
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {content.definition}
            </p>
          </div>
        )}

        {content.pathogenesis && content.pathogenesis.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              Patogeneze
            </h3>
            <ul className="space-y-2">
              {content.pathogenesis.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {content.clinical && content.clinical.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              Klinické projevy
            </h3>
            <ul className="space-y-2">
              {content.clinical.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {content.diagnosis && content.diagnosis.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
              <AlertCircle className="w-5 h-5 text-purple-500" />
              Diagnostika
            </h3>
            <ul className="space-y-2">
              {content.diagnosis.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {content.examples && content.examples.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
              <BookOpen className="w-5 h-5 text-green-500" />
              Příklady
            </h3>
            <ul className="space-y-2">
              {content.examples.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {content.keyPoints && content.keyPoints.length > 0 && (
          <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              Klíčové body
            </h3>
            <ul className="space-y-2">
              {content.keyPoints.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">✓</span>
                  <span className="text-yellow-800 dark:text-yellow-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};