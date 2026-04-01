import Link from 'next/link';
import { topics } from '@/data/topics';
import { useProgress } from '@/hooks/useProgress';
import { 
  Heart, Droplets, Wind, Utensils, Baby, Brain, Bone,
  Shield, Activity, ChevronRight, CheckCircle, Stethoscope
} from 'lucide-react';

const sections = [
  {
    title: 'Kardiovaskulární systém',
    href: '/specialni/kardio',
    icon: Heart,
    color: 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-200 border-pink-300',
    topics: topics.filter(t => t.id >= 63 && t.id <= 76),
    description: 'Srdce, cévy, hypertenze, ICHS'
  },
  {
    title: 'Hematopatologie',
    href: '/specialni/hemato',
    icon: Droplets,
    color: 'bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-200 border-rose-300',
    topics: topics.filter(t => t.id >= 77 && t.id <= 89),
    description: 'Anémie, leukémie, lymfomy'
  },
  {
    title: 'Respirační systém',
    href: '/specialni/respiracni',
    icon: Wind,
    color: 'bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-200 border-cyan-300',
    topics: topics.filter(t => t.id >= 90 && t.id <= 111),
    description: 'Plíce, pleura, pneumonie, CHOPN'
  },
  {
    title: 'GIT a játra',
    href: '/specialni/git',
    icon: Utensils,
    color: 'bg-lime-100 dark:bg-lime-900 text-lime-700 dark:text-lime-200 border-lime-300',
    topics: topics.filter(t => t.id >= 112 && t.id <= 146),
    description: 'Žaludek, střeva, játra, pankreas'
  },
  {
    title: 'Ledviny a urologie',
    href: '/specialni/ledviny',
    icon: Stethoscope,
    color: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 border-indigo-300',
    topics: topics.filter(t => t.id >= 147 && t.id <= 161),
    description: 'Glomerulopatie, nefropatie, urologie'
  },
  {
    title: 'Gynekologie a prsa',
    href: '/specialni/gynekologie',
    icon: Baby,
    color: 'bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-200 border-violet-300',
    topics: topics.filter(t => t.id >= 162 && t.id <= 176),
    description: 'Děloha, ovaria, prsa, těhotenství'
  },
  {
    title: 'CNS a oko',
    href: '/specialni/cns',
    icon: Brain,
    color: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 border-indigo-300',
    topics: topics.filter(t => t.id >= 177 && t.id <= 186),
    description: 'Mozek, mícha, nervy, oko'
  },
  {
    title: 'Kosti a endokrinní',
    href: '/specialni/kosti',
    icon: Bone,
    color: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-200 border-amber-300',
    topics: topics.filter(t => t.id >= 187 && t.id <= 200),
    description: 'Kosti, klouby, štítná žláza, diabetes'
  },
  {
    title: 'Kůže',
    href: '/specialni/kuze',
    icon: Shield,
    color: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-200 border-amber-300',
    topics: topics.filter(t => t.id >= 201 && t.id <= 205),
    description: 'Dermatitidy, kožní nádory, melanom'
  },
  {
    title: 'Pediatrie',
    href: '/specialni/pediatrie',
    icon: Baby,
    color: 'bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-200 border-violet-300',
    topics: topics.filter(t => t.id >= 206 && t.id <= 208),
    description: 'Novorozenecká patologie, dětské nádory'
  },
  {
    title: 'Infekce',
    href: '/specialni/infekce',
    icon: Activity,
    color: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300',
    topics: topics.filter(t => t.id >= 209 && t.id <= 216),
    description: 'Virové, bakteriální, mykotické infekce'
  }
];

export default function SpecialniPatologie() {
  const { getCategoryProgress } = useProgress();

  const totalTopics = topics.filter(t => t.section === 'specialni').length;
  const completedTopics = topics.filter(t => t.section === 'specialni')
    .filter(t => getCategoryProgress([t.id]).completed > 0).length;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Speciální patologie
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Patologie orgánových systémů - otázky 63-216
        </p>
      </div>

      {/* Overall Progress */}
      <div className="bg-indigo-50 dark:bg-indigo-950 rounded-xl p-6 mb-8 border border-indigo-200 dark:border-indigo-800">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">
            Celkový postup speciální patologie
          </h2>
          <span className="text-2xl font-bold text-indigo-600">
            {completedTopics}/{totalTopics}
          </span>
        </div>
        <div className="w-full bg-indigo-200 dark:bg-indigo-800 rounded-full h-3">
          <div 
            className="bg-indigo-600 dark:bg-indigo-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(completedTopics / totalTopics) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => {
          const progress = getCategoryProgress(section.topics.map(t => t.id));
          
          return (
            <Link
              key={section.href}
              href={section.href}
              className={`group p-6 rounded-xl border-2 ${section.color} hover:shadow-lg transition-all`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <section.icon className="w-8 h-8 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold group-hover:underline">
                      {section.title}
                    </h3>
                    <p className="text-xs opacity-75 mt-1">
                      {section.description}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
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

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
          <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Studijní tip
          </h2>
          <p className="text-blue-800 dark:text-blue-200">
            Speciální patologie buduje na znalostech z obecné patologie. 
            Doporučujeme nejprve dokončit alespoň základy obecné patologie.
          </p>
        </div>

        <div className="p-6 bg-green-50 dark:bg-green-950 rounded-xl border border-green-200 dark:border-green-800">
          <h2 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
            Nejdůležitější systémy
          </h2>
          <p className="text-green-800 dark:text-green-200">
            Prioritně se zaměřte na kardiovaskulární systém, respirační systém 
            a GIT s játry - tvoří základ klinické medicíny.
          </p>
        </div>
      </div>
    </div>
  );
}