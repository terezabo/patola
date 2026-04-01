import Link from 'next/link';
import { topics } from '@/data/topics';
import { useProgress } from '@/hooks/useProgress';
import { 
  Activity, TrendingUp, Heart, Shield, Microscope, 
  Droplets, ChevronRight, CheckCircle
} from 'lucide-react';

const sections = [
  {
    title: 'Buněčné mechanismy',
    href: '/obecna/bunecne',
    icon: Activity,
    color: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 border-red-300',
    topics: topics.filter(t => t.id >= 1 && t.id <= 6),
    description: 'Buněčné poškození a smrt'
  },
  {
    title: 'Adaptace tkání',
    href: '/obecna/adaptace',
    icon: TrendingUp,
    color: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 border-orange-300',
    topics: topics.filter(t => t.id >= 3 && t.id <= 6),
    description: 'Hyperplázie, hypertrofie, atrofie, metaplazie'
  },
  {
    title: 'Poruchy oběhu',
    href: '/obecna/obeh',
    icon: Heart,
    color: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 border-yellow-300',
    topics: topics.filter(t => t.id >= 7 && t.id <= 16),
    description: 'Trombóza, embolie, infarkt, šok'
  },
  {
    title: 'Metabolické poruchy',
    href: '/obecna/metabolismus',
    icon: Droplets,
    color: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-200 border-amber-300',
    topics: topics.filter(t => t.id >= 17 && t.id <= 25),
    description: 'Akumulace, pigmenty, mineralizace'
  },
  {
    title: 'Zánět',
    href: '/obecna/zanet',
    icon: Activity,
    color: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border-blue-300',
    topics: topics.filter(t => t.id >= 26 && t.id <= 38),
    description: 'Akutní, chronický, granulomatózní'
  },
  {
    title: 'Hojení a regenerace',
    href: '/obecna/hojeni',
    icon: Shield,
    color: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 border-green-300',
    topics: topics.filter(t => t.id >= 39 && t.id <= 41),
    description: 'Regenerace, reparace, hojení ran'
  },
  {
    title: 'Imunita a infekce',
    href: '/obecna/imunita',
    icon: Shield,
    color: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300',
    topics: topics.filter(t => t.id >= 42 && t.id <= 48),
    description: 'Autoimunita, imunodeficience, infekce'
  },
  {
    title: 'Nádory',
    href: '/obecna/nadory',
    icon: Microscope,
    color: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 border-purple-300',
    topics: topics.filter(t => t.id >= 49 && t.id <= 62),
    description: 'Klasifikace, růst, molekulární podstata'
  }
];

export default function ObecnaPatologie() {
  const { getCategoryProgress } = useProgress();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Obecná patologie
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Základní mechanismy lidských onemocnění - otázky 1-62
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => {
          const progress = getCategoryProgress(section.topics.map(t => t.id));
          
          return (
            <Link
              key={section.href}
              href={section.href}
              className={`group p-6 rounded-xl border-2 ${section.color} hover:shadow-lg transition-all`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <section.icon className="w-8 h-8" />
                  <div>
                    <h3 className="text-xl font-semibold group-hover:underline">
                      {section.title}
                    </h3>
                    <p className="text-sm opacity-75 mt-1">
                      {section.description}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Postup</span>
                  <span className="text-sm font-bold">
                    {progress.completed}/{progress.total}
                  </span>
                </div>
                <div className="w-full bg-white/50 dark:bg-black/20 rounded-full h-2">
                  <div 
                    className="bg-current h-2 rounded-full transition-all duration-500 opacity-60"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
                {progress.percentage === 100 && (
                  <div className="flex items-center gap-1 text-sm font-medium mt-2">
                    <CheckCircle className="w-4 h-4" />
                    Dokončeno!
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
        <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Studijní tip
        </h2>
        <p className="text-blue-800 dark:text-blue-200">
          Doporučujeme postupovat systematicky od buněčných mechanismů přes zánět až k nádorům. 
          Každé téma buduje na předchozích znalostech.
        </p>
      </div>
    </div>
  );
}