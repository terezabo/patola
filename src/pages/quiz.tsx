import { useState, useEffect } from 'react';
import { 
  Brain, Clock, Target, CheckCircle, XCircle, 
  ChevronRight, RotateCcw, Trophy, Zap, AlertCircle,
  Lightbulb, Star, TrendingUp, Award
} from 'lucide-react';
import clsx from 'clsx';
import { pathologyQuestions } from '@/data/quizQuestions';
import { AdaptiveQuizEngine, Question, MultipleChoiceQuestion, ClinicalCaseQuestion } from '@/lib/quizEngine';
import { SpacedRepetitionSystem, ReviewData } from '@/lib/spacedRepetition';

export default function QuizPage() {
  const [quizEngine] = useState(() => new AdaptiveQuizEngine(pathologyQuestions));
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [confidence, setConfidence] = useState(3);
  const [showHint, setShowHint] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  useEffect(() => {
    loadNextQuestion();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && currentQuestion && !showExplanation) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, currentQuestion, showExplanation]);

  const loadNextQuestion = () => {
    const question = quizEngine.getNextQuestion();
    setCurrentQuestion(question);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowHint(false);
    setTimeLeft(60);
    setConfidence(3);
  };

  const handleSubmitAnswer = () => {
    if (!currentQuestion || selectedAnswer === null) return;

    const isCorrect = checkAnswer();
    setShowExplanation(true);
    setQuestionsAnswered(questionsAnswered + 1);

    if (isCorrect) {
      const points = currentQuestion.points * (confidence / 3);
      setScore(score + Math.round(points));
      setCorrectAnswers(correctAnswers + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }

    // Update quiz engine with performance
    quizEngine.updatePerformance(currentQuestion.topicId, isCorrect, confidence);

    // Update spaced repetition
    const reviewData = SpacedRepetitionSystem.calculateNextReview(
      isCorrect ? confidence : 1,
      undefined
    );
    localStorage.setItem(`review-${currentQuestion.topicId}`, JSON.stringify(reviewData));
  };

  const checkAnswer = (): boolean => {
    if (!currentQuestion) return false;

    switch (currentQuestion.type) {
      case 'multiple-choice':
        const mcq = currentQuestion as MultipleChoiceQuestion;
        const correctOption = mcq.options.find(o => o.isCorrect);
        return correctOption?.id === selectedAnswer;
      
      case 'clinical-case':
        const ccq = currentQuestion as ClinicalCaseQuestion;
        const correctDiagnosis = ccq.options.find(o => o.isCorrect);
        return correctDiagnosis?.id === selectedAnswer;
      
      default:
        return false;
    }
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'multiple-choice':
        const mcq = currentQuestion as MultipleChoiceQuestion;
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {mcq.question}
            </h3>
            <div className="space-y-2">
              {mcq.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => !showExplanation && setSelectedAnswer(option.id)}
                  disabled={showExplanation}
                  className={clsx(
                    'w-full text-left p-4 rounded-lg border-2 transition-all',
                    selectedAnswer === option.id
                      ? showExplanation
                        ? option.isCorrect
                          ? 'border-green-500 bg-green-50 dark:bg-green-950'
                          : 'border-red-500 bg-red-50 dark:bg-red-950'
                        : 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                      : showExplanation && option.isCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-950'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-semibold text-gray-500">
                      {option.id.toUpperCase()}.
                    </span>
                    <span className="flex-1 text-gray-900 dark:text-white">
                      {option.text}
                    </span>
                    {showExplanation && (
                      <span>
                        {option.isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : selectedAnswer === option.id ? (
                          <XCircle className="w-5 h-5 text-red-600" />
                        ) : null}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'clinical-case':
        const ccq = currentQuestion as ClinicalCaseQuestion;
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Klinický případ
              </h4>
              <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <p>
                  <strong>Pacient:</strong> {ccq.patientPresentation.age} let, {ccq.patientPresentation.gender}
                </p>
                <p>
                  <strong>Hlavní obtíže:</strong> {ccq.patientPresentation.chiefComplaint}
                </p>
                <p>
                  <strong>Anamnéza:</strong> {ccq.patientPresentation.history}
                </p>
                {ccq.patientPresentation.physicalExam && (
                  <p>
                    <strong>Fyzikální vyšetření:</strong> {ccq.patientPresentation.physicalExam}
                  </p>
                )}
                {ccq.patientPresentation.labResults && (
                  <div>
                    <strong>Laboratorní výsledky:</strong>
                    <ul className="ml-4 mt-1">
                      {ccq.patientPresentation.labResults.map((lab, idx) => (
                        <li key={idx} className={lab.isAbnormal ? 'text-red-700 dark:text-red-300 font-semibold' : ''}>
                          {lab.test}: {lab.value} (norma: {lab.normal})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {ccq.patientPresentation.imaging && (
                  <p>
                    <strong>Zobrazovací vyšetření:</strong> {ccq.patientPresentation.imaging}
                  </p>
                )}
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {ccq.question}
            </h3>

            <div className="space-y-2">
              {ccq.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => !showExplanation && setSelectedAnswer(option.id)}
                  disabled={showExplanation}
                  className={clsx(
                    'w-full text-left p-4 rounded-lg border-2 transition-all',
                    selectedAnswer === option.id
                      ? showExplanation
                        ? option.isCorrect
                          ? 'border-green-500 bg-green-50 dark:bg-green-950'
                          : 'border-red-500 bg-red-50 dark:bg-red-950'
                        : 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                      : showExplanation && option.isCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-950'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  )}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-gray-900 dark:text-white">
                      {option.diagnosis}
                    </span>
                    {showExplanation && (
                      <span>
                        {option.isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : selectedAnswer === option.id ? (
                          <XCircle className="w-5 h-5 text-red-600" />
                        ) : null}
                      </span>
                    )}
                  </div>
                  {showExplanation && option.reasoning && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {option.reasoning}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return <p>Tento typ otázky ještě není implementován.</p>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Adaptivní kvíz
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Inteligentní systém otázek přizpůsobený vašemu tempu učení
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{score}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Body</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{streak}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Série</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {questionsAnswered > 0 ? Math.round((correctAnswers / questionsAnswered) * 100) : 0}%
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Úspěšnost</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{timeLeft}s</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Čas</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{questionsAnswered}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Otázek</p>
            </div>
          </div>
        </div>
      </div>

      {/* Question Area */}
      {currentQuestion && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className={clsx(
              'px-3 py-1 rounded-full text-xs font-semibold',
              currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
              currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
              'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
            )}>
              {currentQuestion.difficulty === 'easy' ? 'Snadné' :
               currentQuestion.difficulty === 'medium' ? 'Střední' : 'Těžké'}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {currentQuestion.points} bodů
            </span>
          </div>

          {renderQuestion()}

          {/* Hint Section */}
          {currentQuestion.mnemonicHint && !showExplanation && (
            <div className="mt-4">
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
              >
                <Lightbulb className="w-4 h-4" />
                {showHint ? 'Skrýt nápovědu' : 'Zobrazit nápovědu'}
              </button>
              {showHint && (
                <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    {currentQuestion.mnemonicHint}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Confidence Selector */}
          {!showExplanation && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Jak jste si jistý/á odpovědí?
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => setConfidence(level)}
                    className={clsx(
                      'flex-1 py-2 rounded-lg transition-all',
                      confidence === level
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    )}
                  >
                    {level === 1 ? '😟' : level === 2 ? '🤔' : level === 3 ? '😐' : level === 4 ? '🙂' : '😎'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Explanation */}
          {showExplanation && currentQuestion.explanation && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                    Vysvětlení
                  </h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    {currentQuestion.explanation}
                  </p>
                  {currentQuestion.clinicalRelevance && (
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
                      <strong>Klinická relevance:</strong> {currentQuestion.clinicalRelevance}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            {!showExplanation ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className={clsx(
                  'flex-1 py-3 rounded-lg font-semibold transition-all',
                  selectedAnswer !== null
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Potvrdit odpověď
              </button>
            ) : (
              <button
                onClick={loadNextQuestion}
                className="flex-1 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                Další otázka
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Achievement Popup */}
      {streak > 0 && streak % 5 === 0 && showExplanation && (
        <div className="fixed bottom-4 right-4 bg-yellow-500 text-white p-4 rounded-lg shadow-lg animate-bounce">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8" />
            <div>
              <p className="font-bold">Série {streak} správných!</p>
              <p className="text-sm">Bonus +50 bodů!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}