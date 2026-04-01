import { useEffect, useState } from 'react';
import Link from 'next/link';
import { topics } from '@/data/topics';
import { useProgress } from '@/hooks/useProgress';
import { 
  BookOpen, Target, TrendingUp, Clock, Award, ChevronRight,
  Heart, Droplets, Wind, Utensils, Baby, Brain, Bone,
  Activity, Microscope, Shield, Stethoscope
} from 'lucide-react';

const categoryIcons = {
  cellular: Activity,
  adaptation: TrendingUp,
  circulation: Heart,
  healing: Shield,
  inflammation: Activity,
  tumor: Microscope,
  deposits: Droplets,
  immune: Shield,
  cardio: Heart,
  hemato: Droplets,
  respiratory: Wind,
  git: Utensils,
  renal: Stethoscope,
  gyneco: Baby,
  cns: Brain,
  bone: Bone,
};

const categoryColors = {
  cellular: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 border-red-300',
  adaptation: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 border-orange-300',
  circulation: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 border-yellow-300',
  healing: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 border-green-300',
  inflammation: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border-blue-300',
  tumor: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 border-purple-300',
  deposits: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-200 border-amber-300',
  immune: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300',
  cardio: 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-200 border-pink-300',
  hemato: 'bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-200 border-rose-300',
  respiratory: 'bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-200 border-cyan-300',
  git: 'bg-lime-100 dark:bg-lime-900 text-lime-700 dark:text-lime-200 border-lime-300',
  renal: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 border-indigo-300',
  gyneco: 'bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-200 border-violet-300',
  cns: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 border-indigo-300',
  bone: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-200 border-amber-300',
};

export default function Home() {
  const { getProgressPercentage, getCompletedCount, getCategoryProgress } = useProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalProgress = mounted ? getProgressPercentage(topics.length) : 0;
  const completedCount = mounted ? getCompletedCount() : 0;

  const categories = [
    {
      name: 'Obecná patologie',
      href: '/obecna',
      description: 'Základní mechanismy onemocnění',
      topics: topics.filter(t => t.section === 'obecna'),
      color: 'bg-blue-500',
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Speciální patologie',
      href: '/specialni',
      description: 'Patologie orgánových systémů',
      topics: topics.filter(t => t.section === 'specialni'),
      color: 'bg-indigo-500',
      gradient: 'from-indigo-400 to-indigo-600'
    }
  ];

  const subsections = [
    { name: 'Buněčné mechanismy', category: 'cellular', count: 6, href: '/obecna/bunecne' },
    { name: 'Adaptace', category: 'adaptation', count: 4, href: '/obecna/adaptace' },
    { name: 'Poruchy oběhu', category: 'circulation', count: 10, href: '/obecna/obeh' },
    { name: 'Zánět', category: 'inflammation', count: 13, href: '/obecna/zanet' },
    { name: 'Hojení', category: 'healing', count: 3, href: '/obecna/hojeni' },
    { name: 'Nádory', category: 'tumor', count: 14, href: '/obecna/nadory' },
    { name: 'Kardiovaskulární', category: 'cardio', count: 14, href: '/specialni/kardio' },
    { name: 'Hematopatologie', category: 'hemato', count: 13, href: '/specialni/hemato' },
    { name: 'Respirační', category: 'respiratory', count: 22, href: '/specialni/respiracni' },
    { name: 'GIT a játra', category: 'git', count: 35, href: '/specialni/git' },
    { name: 'Ledviny', category: 'renal', count: 15, href: '/specialni/ledviny' },
    { name: 'CNS', category: 'cns', count: 10, href: '/specialni/cns' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Patologie - Studijní portál
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Interaktivní příprava na rigorózní zkoušku z patologie
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Celkový postup</h2>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-blue-600">{completedCount}/216</span>
            <Award className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${totalProgress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {totalProgress.toFixed(1)}% dokončeno
        </p>
      </div>

      {/* Main Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {categories.map((category) => {
          const progress = mounted ? getCategoryProgress(category.topics.map(t => t.id)) : { completed: 0, total: category.topics.length, percentage: 0 };
          
          return (
            <Link
              key={category.href}
              href={category.href}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{category.description}</p>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-transform" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Otázky</span>
                  <span className="font-medium">{progress.completed}/{progress.total}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${category.gradient} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Subsections Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Rychlý přístup k tématům
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {subsections.map((sub) => {
            const Icon = categoryIcons[sub.category as keyof typeof categoryIcons];
            const colorClass = categoryColors[sub.category as keyof typeof categoryColors];
            
            return (
              <Link
                key={sub.href}
                href={sub.href}
                className={`p-4 rounded-lg border-2 ${colorClass} hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <div>
                    <p className="font-medium">{sub.name}</p>
                    <p className="text-xs opacity-75">{sub.count} témat</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">216</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Celkem otázek</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedCount}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Dokončeno</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-purple-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{(216 - completedCount)}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Zbývá</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-orange-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {completedCount > 0 ? Math.ceil((216 - completedCount) / 5) : 43}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Dní (5/den)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}