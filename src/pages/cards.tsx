import { useState, useEffect } from 'react';
import { topics } from '@/data/topics';
import { useProgress } from '@/hooks/useProgress';
import { 
  RotateCw, ChevronLeft, ChevronRight, Shuffle, 
  CheckCircle, Circle, Settings, X, Filter
} from 'lucide-react';
import clsx from 'clsx';

interface StudyCard {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const studyCards: StudyCard[] = [
  { id: 1, question: "Co je buněčné poškození?", answer: "Reverzibilní nebo ireverzibilní změna buněčné struktury a funkce způsobená noxami. Hlavní mechanismy: deplece ATP, poškození membrán, ↑Ca2+, oxidační stres.", category: "cellular" },
  { id: 2, question: "Jaké jsou typy buněčné smrti?", answer: "Nekróza (patologická, nekontrolovaná), Apoptóza (programovaná), Nekroptóza, Pyroptóza, Autofagie, Ferroptóza", category: "cellular" },
  { id: 3, question: "Co je hyperplázie?", answer: "Zvětšení orgánu/tkáně zvýšením POČTU buněk. Pouze u buněk schopných dělení. Fyziologická (hormony) nebo patologická.", category: "adaptation" },
  { id: 4, question: "Co je hypertrofie?", answer: "Zvětšení orgánu/tkáně zvětšením VELIKOSTI buněk bez zvýšení počtu. Typicky u svalových buněk (srdce, děloha).", category: "adaptation" },
  { id: 5, question: "Co je atrofie?", answer: "Zmenšení velikosti buňky/orgánu ztrátou buněčné substance. Příčiny: denervace, ischemie, malnutrice, tlak, stárnutí.", category: "adaptation" },
  { id: 6, question: "Co je metaplazie?", answer: "Reverzibilní náhrada jednoho diferencovaného typu buňky jiným. Adaptivní odpověď na chronické dráždění. Např. dlaždicová metaplazie bronchů u kuřáků.", category: "adaptation" },
  { id: 7, question: "Virchowova triáda trombózy?", answer: "1. Poškození endotelu, 2. Alterace krevního proudu (stáza, turbulence), 3. Hyperkoagulace", category: "circulation" },
  { id: 8, question: "Typy embolie?", answer: "Tromboembolie (95%), Tuková, Vzduchová, Plodová voda, Nádorová, Septická, Cizí těleso", category: "circulation" },
  { id: 9, question: "Co je infarkt?", answer: "Oblast ischemické nekrózy způsobená okluzí arteriálního přívodu nebo žilní drenáže. Typy: anemický (bílý) vs. hemoragický (červený).", category: "circulation" },
  { id: 10, question: "Typy šoku?", answer: "Kardiogenní, Hypovolemický, Distributivní (septický, anafylaktický, neurogenní), Obstrukční", category: "circulation" },
  { id: 11, question: "5 klasických znaků zánětu?", answer: "Rubor (zarudnutí), Tumor (otok), Calor (teplo), Dolor (bolest), Functio laesa (porucha funkce)", category: "inflammation" },
  { id: 12, question: "Fáze akutního zánětu?", answer: "1. Vazodilatace, 2. Zvýšená permeabilita cév, 3. Migrace leukocytů (marginace, rolling, adheze, transmigrace), 4. Fagocytóza", category: "inflammation" },
  { id: 13, question: "Typy exsudátu?", answer: "Serózní, Fibrinózní, Hnisavý (purulentní), Hemoragický, Pseudomembranózní", category: "inflammation" },
  { id: 14, question: "Co je granulom?", answer: "Kolekce aktivovaných makrofágů (epiteloidní buňky), často s obrovskými mnohojadernými buňkami. Typický pro TBC, sarkoidózu, Crohnovu chorobu.", category: "inflammation" },
  { id: 15, question: "Fáze hojení rány?", answer: "1. Hemostáza, 2. Zánět, 3. Proliferace (granulační tkáň), 4. Remodelace (zrání jizvy)", category: "healing" },
  { id: 16, question: "Rozdíl benigní vs. maligní nádor?", answer: "Benigní: dobře ohraničený, pouzdro, pomalý růst, nemetastazuje. Maligní: infiltrativní růst, rychlý růst, metastázy, anaplasie.", category: "tumor" },
  { id: 17, question: "Co je TNM klasifikace?", answer: "T = Tumor (velikost primárního nádoru), N = Nodes (postižení lymfatických uzlin), M = Metastázy (vzdálené metastázy)", category: "tumor" },
  { id: 18, question: "Onkogeny vs. tumor supresorové geny?", answer: "Onkogeny: podporují růst (RAS, MYC, HER2). Tumor supresory: brzdí růst (p53, RB, APC). Nádor = aktivace onkogenů + inaktivace supresorů.", category: "tumor" },
  { id: 19, question: "Typy hypersenzitivních reakcí?", answer: "I - IgE mediovaná (alergie), II - cytotoxická (AB proti buňkám), III - imunitní komplexy, IV - T-buněčná (oddálená)", category: "immune" },
  { id: 20, question: "Příčiny anémie?", answer: "Ztráta krve, Snížená produkce (Fe deficit, B12/folát, aplastická), Zvýšená destrukce (hemolytická)", category: "hemato" }
];

export default function StudyCards() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [onlyIncomplete, setOnlyIncomplete] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [filteredCards, setFilteredCards] = useState(studyCards);
  const { progress, markComplete } = useProgress();

  const categories = Array.from(new Set(studyCards.map(c => c.category)));

  useEffect(() => {
    let filtered = studyCards;
    
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(card => selectedCategories.includes(card.category));
    }
    
    if (onlyIncomplete) {
      filtered = filtered.filter(card => !progress[card.id]);
    }
    
    if (shuffled) {
      filtered = [...filtered].sort(() => Math.random() - 0.5);
    }
    
    setFilteredCards(filtered);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  }, [selectedCategories, onlyIncomplete, shuffled, progress]);

  const currentCard = filteredCards[currentCardIndex];
  const isCompleted = currentCard ? (progress[currentCard.id] || false) : false;

  const handleNext = () => {
    if (currentCardIndex < filteredCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMarkComplete = () => {
    if (currentCard) {
      markComplete(currentCard.id);
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const categoryColors: { [key: string]: string } = {
    cellular: 'bg-red-100 dark:bg-red-900 border-red-500',
    adaptation: 'bg-orange-100 dark:bg-orange-900 border-orange-500',
    circulation: 'bg-yellow-100 dark:bg-yellow-900 border-yellow-500',
    healing: 'bg-green-100 dark:bg-green-900 border-green-500',
    inflammation: 'bg-blue-100 dark:bg-blue-900 border-blue-500',
    tumor: 'bg-purple-100 dark:bg-purple-900 border-purple-500',
    immune: 'bg-gray-100 dark:bg-gray-800 border-gray-500',
    hemato: 'bg-rose-100 dark:bg-rose-900 border-rose-500',
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Studijní kartičky
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Procvičujte klíčové pojmy a definice
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <Settings className="w-4 h-4" />
            <span>Nastavení</span>
          </button>
          
          <button
            onClick={() => setShuffled(!shuffled)}
            className={clsx(
              'flex items-center gap-2 px-4 py-2 rounded-lg shadow hover:shadow-md transition-all',
              shuffled 
                ? 'bg-blue-600 text-white' 
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            )}
          >
            <Shuffle className="w-4 h-4" />
            <span>Zamíchat</span>
          </button>
        </div>

        <div className="text-gray-600 dark:text-gray-400">
          Kartička {currentCardIndex + 1} / {filteredCards.length}
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filtrovat kategorie
            </h3>
            <button
              onClick={() => setShowSettings(false)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={clsx(
                  'px-3 py-1 rounded-lg text-sm transition-colors',
                  selectedCategories.includes(category)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                )}
              >
                {category}
              </button>
            ))}
          </div>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyIncomplete}
              onChange={(e) => setOnlyIncomplete(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Pouze nedokončené kartičky
            </span>
          </label>
        </div>
      )}

      {/* Card Display */}
      {currentCard ? (
        <div className="mb-6">
          <div 
            onClick={handleFlip}
            className={clsx(
              'relative h-96 cursor-pointer preserve-3d transition-transform duration-500',
              isFlipped && 'rotate-y-180'
            )}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front of card */}
            <div 
              className={clsx(
                'absolute inset-0 backface-hidden rounded-xl shadow-lg p-8 flex flex-col justify-center items-center text-center border-l-4',
                categoryColors[currentCard.category] || 'bg-white dark:bg-gray-800 border-gray-500'
              )}
              style={{ backfaceVisibility: 'hidden' }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentCard.question}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Klikněte pro zobrazení odpovědi
              </p>
            </div>
            
            {/* Back of card */}
            <div 
              className={clsx(
                'absolute inset-0 backface-hidden rounded-xl shadow-lg p-8 flex flex-col justify-center items-center text-center border-l-4 rotate-y-180',
                categoryColors[currentCard.category] || 'bg-white dark:bg-gray-800 border-gray-500'
              )}
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <p className="text-lg text-gray-900 dark:text-white leading-relaxed">
                {currentCard.answer}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Klikněte pro otočení zpět
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Žádné kartičky neodpovídají zvoleným filtrům
          </p>
        </div>
      )}

      {/* Navigation */}
      {currentCard && (
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentCardIndex === 0}
            className={clsx(
              'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
              currentCardIndex === 0
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            )}
          >
            <ChevronLeft className="w-4 h-4" />
            Předchozí
          </button>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleFlip}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RotateCw className="w-4 h-4" />
              Otočit
            </button>
            
            <button
              onClick={handleMarkComplete}
              className={clsx(
                'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
                isCompleted
                  ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
              )}
            >
              {isCompleted ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Zvládnuto
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4" />
                  Označit jako zvládnuté
                </>
              )}
            </button>
          </div>
          
          <button
            onClick={handleNext}
            disabled={currentCardIndex === filteredCards.length - 1}
            className={clsx(
              'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
              currentCardIndex === filteredCards.length - 1
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            )}
          >
            Další
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Progress indicator */}
      {filteredCards.length > 0 && (
        <div className="flex items-center gap-1 mt-6">
          {filteredCards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentCardIndex(index);
                setIsFlipped(false);
              }}
              className={clsx(
                'flex-1 h-1 rounded-full transition-colors',
                index === currentCardIndex
                  ? 'bg-blue-600'
                  : progress[filteredCards[index]?.id]
                  ? 'bg-green-500'
                  : 'bg-gray-300 dark:bg-gray-600'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}