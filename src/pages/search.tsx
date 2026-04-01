import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { topics } from '@/data/topics';
import { useProgress } from '@/hooks/useProgress';
import { Search, X, CheckCircle, Circle, Filter } from 'lucide-react';
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

const searchKeywords: { [key: number]: string[] } = {
  1: ['buněčné poškození', 'ATP', 'kalcium', 'oxidační stres', 'mitochondrie'],
  2: ['buněčná smrt', 'nekróza', 'apoptóza', 'kaspázy', 'nekroptóza'],
  3: ['adaptace', 'tkáně', 'orgány'],
  4: ['hyperplázie', 'hypertrofie', 'zvětšení'],
  5: ['atrofie', 'zmenšení'],
  6: ['metaplazie', 'přeměna'],
  7: ['trombóza', 'krevní sraženina', 'Virchowova triáda'],
  8: ['embolie', 'embolus', 'plicní embolie'],
  9: ['hyperémie', 'hemoragie', 'krvácení'],
  10: ['ischémie', 'nedokrevnost'],
  11: ['infarkt', 'nekróza', 'ischemie'],
  12: ['edém', 'dehydratace', 'tekutiny'],
  16: ['šok', 'hypoperfuze', 'selhání oběhu'],
  26: ['zánět', 'inflammation', 'akutní', 'chronický'],
  33: ['tuberkulóza', 'TBC', 'mycobacterium'],
  49: ['nádory', 'tumor', 'klasifikace'],
  50: ['benigní', 'maligní', 'zhoubný', 'nezhoubný'],
  73: ['ischemická choroba srdce', 'ICHS', 'infarkt myokardu'],
  77: ['anémie', 'chudokrevnost', 'erytrocyty'],
  200: ['diabetes mellitus', 'cukrovka', 'inzulin', 'glukóza'],
};

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<'all' | 'obecna' | 'specialni'>('all');
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);
  const { progress, toggleTopic } = useProgress();

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    
    return topics.filter(topic => {
      // Filter by section
      if (selectedSection !== 'all' && topic.section !== selectedSection) {
        return false;
      }

      // Filter by completion status
      if (showCompletedOnly && !progress[topic.id]) {
        return false;
      }

      // Search in title
      if (topic.title.toLowerCase().includes(query)) {
        return true;
      }

      // Search in subsection
      if (topic.subsection && topic.subsection.toLowerCase().includes(query)) {
        return true;
      }

      // Search in keywords
      const keywords = searchKeywords[topic.id];
      if (keywords && keywords.some(keyword => keyword.toLowerCase().includes(query))) {
        return true;
      }

      // Search by topic number
      if (topic.id.toString() === query) {
        return true;
      }

      return false;
    });
  }, [searchQuery, selectedSection, showCompletedOnly, progress]);

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <mark key={index} className="bg-yellow-300 dark:bg-yellow-700 px-1 rounded">{part}</mark>
        : part
    );
  };

  const getTopicUrl = (topic: typeof topics[0]) => {
    if (topic.section === 'obecna') {
      if (topic.id <= 2) return '/obecna/bunecne';
      if (topic.id <= 6) return '/obecna/adaptace';
      if (topic.id <= 16) return '/obecna/obeh';
      if (topic.id <= 25) return '/obecna/metabolismus';
      if (topic.id <= 38) return '/obecna/zanet';
      if (topic.id <= 41) return '/obecna/hojeni';
      if (topic.id <= 48) return '/obecna/imunita';
      if (topic.id <= 62) return '/obecna/nadory';
    } else {
      if (topic.id <= 76) return '/specialni/kardio';
      if (topic.id <= 89) return '/specialni/hemato';
      if (topic.id <= 111) return '/specialni/respiracni';
      if (topic.id <= 146) return '/specialni/git';
      if (topic.id <= 161) return '/specialni/ledviny';
      if (topic.id <= 176) return '/specialni/gynekologie';
      if (topic.id <= 186) return '/specialni/cns';
      if (topic.id <= 193) return '/specialni/kosti';
      if (topic.id <= 200) return '/specialni/endokrinni';
      if (topic.id <= 205) return '/specialni/kuze';
      if (topic.id <= 208) return '/specialni/pediatrie';
      if (topic.id <= 216) return '/specialni/infekce';
    }
    return '/';
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Vyhledávání
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Najděte témata podle názvu, čísla nebo klíčových slov
        </p>
      </div>

      {/* Search Input */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Hledat podle názvu, čísla nebo klíčových slov..."
            className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sekce:</span>
            <div className="flex gap-1">
              <button
                onClick={() => setSelectedSection('all')}
                className={clsx(
                  'px-3 py-1 rounded-lg text-sm transition-colors',
                  selectedSection === 'all'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                )}
              >
                Vše
              </button>
              <button
                onClick={() => setSelectedSection('obecna')}
                className={clsx(
                  'px-3 py-1 rounded-lg text-sm transition-colors',
                  selectedSection === 'obecna'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                )}
              >
                Obecná
              </button>
              <button
                onClick={() => setSelectedSection('specialni')}
                className={clsx(
                  'px-3 py-1 rounded-lg text-sm transition-colors',
                  selectedSection === 'specialni'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                )}
              >
                Speciální
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showCompletedOnly}
              onChange={(e) => setShowCompletedOnly(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Pouze dokončené
            </span>
          </label>
        </div>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Nalezeno {searchResults.length} výsledků pro "{searchQuery}"
          </p>
        </div>
      )}

      <div className="space-y-3">
        {searchResults.map((topic) => {
          const isCompleted = progress[topic.id] || false;
          const colorClass = categoryColors[topic.category as keyof typeof categoryColors];
          const topicUrl = getTopicUrl(topic);
          
          return (
            <div
              key={topic.id}
              className={clsx(
                'flex items-center gap-4 p-4 rounded-lg border-l-4 transition-all',
                colorClass,
                isCompleted && 'opacity-75'
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
                <Link href={topicUrl} className="group">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 text-sm font-bold text-gray-500 dark:text-gray-400">
                      {topic.id}.
                    </span>
                    <div className="flex-1">
                      <p className={clsx(
                        'font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400',
                        isCompleted && 'line-through'
                      )}>
                        {highlightText(topic.title, searchQuery)}
                      </p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                          {topic.section === 'obecna' ? 'Obecná' : 'Speciální'}
                        </span>
                        {topic.subsection && (
                          <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                            {highlightText(topic.subsection, searchQuery)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {searchQuery && searchResults.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Žádné výsledky pro "{searchQuery}"
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            Zkuste hledat podle jiných klíčových slov nebo čísla otázky
          </p>
        </div>
      )}

      {!searchQuery && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Začněte psát pro vyhledávání
          </p>
          <div className="mt-6 text-left max-w-md mx-auto">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Tipy pro vyhledávání:
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Číslo otázky (např. "73")</li>
              <li>• Název tématu (např. "nekróza")</li>
              <li>• Klíčová slova (např. "diabetes", "infarkt")</li>
              <li>• Zkratky (např. "TBC", "ICHS")</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}