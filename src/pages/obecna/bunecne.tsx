import { useState } from 'react';
import Link from 'next/link';
import { topics } from '@/data/topics';
import { useProgress } from '@/hooks/useProgress';
import { TopicDetail } from '@/components/TopicDetail';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

const topicContents = {
  1: {
    definition: "Buněčné poškození je reverzibilní nebo ireverzibilní změna buněčné struktury a funkce způsobená různými noxami. Mechanismy zahrnují depleci ATP, poškození membrán, zvýšení intracelulárního kalcia a oxidační stres.",
    pathogenesis: [
      "Deplece ATP - narušení Na/K pumpy, edém buňky",
      "Poškození mitochondrií - ztráta energetické produkce",
      "Příliv kalcia - aktivace enzymů (fosfolipázy, proteázy, endonukleázy)",
      "Oxidační stres - volné radikály poškozují lipidy, proteiny, DNA",
      "Poškození membrán - ztráta integrity, únik enzymů",
      "Poškození DNA a proteinů - denaturace, fragmentace"
    ],
    clinical: [
      "Reverzibilní: buněčný edém, tuková změna",
      "Ireverzibilní: nekróza, apoptóza",
      "Laboratorně: zvýšení buněčných enzymů (ALT, AST, CK, LDH)",
      "Morfologicky: eosinofilie cytoplazmy, kondenzace chromatinu"
    ],
    examples: [
      "Ischemie myokardu - deplece ATP, acidóza",
      "Toxické poškození jater - alkohol, léky",
      "Hypoxické poškození mozku",
      "Reperfuzní poškození - volné radikály"
    ],
    keyPoints: [
      "Reverzibilní vs. ireverzibilní změny",
      "Hlavní mechanismy: ATP deplece, Ca2+ přetížení, oxidační stres",
      "Point of no return - poškození membrán a mitochondrií"
    ]
  },
  2: {
    definition: "Buněčná smrt je konečný výsledek ireverzibilního buněčného poškození. Existují dva hlavní typy: nekróza (patologická, nekontrolovaná) a apoptóza (fyziologická, programovaná).",
    pathogenesis: [
      "NEKRÓZA: ruptura membrán, únik obsahu, zánět",
      "APOPTÓZA: aktivace kaspáz, fragmentace DNA, fagocytóza",
      "NEKROPTÓZA: programovaná nekróza, RIPK1/RIPK3 signalizace",
      "PYROPTÓZA: zánětlivá buněčná smrt, aktivace inflammazomu",
      "AUTOFAGIE: degradace vlastních komponent, může vést ke smrti",
      "FERROPTÓZA: železo-dependentní, lipidová peroxidace"
    ],
    clinical: [
      "Koagulační nekróza - infarkt (kromě mozku)",
      "Likvefikační nekróza - mozek, hnisavé záněty",
      "Kaseózní nekróza - tuberkulóza",
      "Tuková nekróza - pankreas, prsa",
      "Fibrinoidní nekróza - imunitní vaskulitidy",
      "Gangréna - suchá (mumifikace), vlhká (bakteriální infekce)"
    ],
    diagnosis: [
      "Histologie: eosinofilie, karyolýza, karyorexe, karyopyknóza",
      "Biochemicky: uvolnění DAMPs (HMGB1, ATP, DNA)",
      "Apoptóza: TUNEL test, kaspáza-3 aktivita",
      "Elektronová mikroskopie: apoptotická tělíska"
    ],
    keyPoints: [
      "Nekróza = zánět, apoptóza = bez zánětu",
      "Typy nekrózy podle tkáně a příčiny",
      "Apoptóza - fyziologická i patologická role",
      "Nové formy: nekroptóza, pyroptóza, ferroptóza"
    ]
  }
};

export default function BunecneMechanismy() {
  const sectionTopics = topics.filter(t => t.id >= 1 && t.id <= 2);
  const { progress, toggleTopic } = useProgress();
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  
  const currentTopic = sectionTopics[currentTopicIndex];
  const isCompleted = progress[currentTopic.id] || false;

  const handleNext = () => {
    if (currentTopicIndex < sectionTopics.length - 1) {
      setCurrentTopicIndex(currentTopicIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentTopicIndex > 0) {
      setCurrentTopicIndex(currentTopicIndex - 1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link 
          href="/obecna"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Zpět na Obecnou patologii
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Buněčné mechanismy
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Základní mechanismy buněčného poškození a smrti
        </p>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-6">
        {sectionTopics.map((topic, index) => (
          <button
            key={topic.id}
            onClick={() => setCurrentTopicIndex(index)}
            className={clsx(
              'flex-1 h-2 rounded-full transition-colors',
              index === currentTopicIndex
                ? 'bg-blue-600'
                : progress[topic.id]
                ? 'bg-green-500'
                : 'bg-gray-300 dark:bg-gray-600'
            )}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevious}
          disabled={currentTopicIndex === 0}
          className={clsx(
            'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
            currentTopicIndex === 0
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          Předchozí
        </button>
        
        <span className="text-gray-600 dark:text-gray-400">
          {currentTopicIndex + 1} / {sectionTopics.length}
        </span>
        
        <button
          onClick={handleNext}
          disabled={currentTopicIndex === sectionTopics.length - 1}
          className={clsx(
            'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
            currentTopicIndex === sectionTopics.length - 1
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
          )}
        >
          Další
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Topic content */}
      <TopicDetail
        id={currentTopic.id}
        title={currentTopic.title}
        category={currentTopic.category}
        isCompleted={isCompleted}
        onToggleComplete={() => toggleTopic(currentTopic.id)}
        content={topicContents[currentTopic.id as keyof typeof topicContents] || {}}
      />

      {/* Quick navigation */}
      <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Témata v této sekci:
        </h3>
        <div className="flex flex-wrap gap-2">
          {sectionTopics.map((topic, index) => (
            <button
              key={topic.id}
              onClick={() => setCurrentTopicIndex(index)}
              className={clsx(
                'px-3 py-1 rounded-lg text-sm transition-colors',
                index === currentTopicIndex
                  ? 'bg-blue-600 text-white'
                  : progress[topic.id]
                  ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
              )}
            >
              {topic.id}. {topic.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}