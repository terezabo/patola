export type QuestionType = 
  | 'multiple-choice'
  | 'clinical-case'
  | 'image-identification'
  | 'true-false'
  | 'fill-blank'
  | 'matching'
  | 'sequence'
  | 'differential-diagnosis';

export interface BaseQuestion {
  id: string;
  topicId: number;
  type: QuestionType;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  tags: string[];
  explanation?: string;
  clinicalRelevance?: string;
  mnemonicHint?: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  question: string;
  options: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
  allowMultiple?: boolean;
}

export interface ClinicalCaseQuestion extends BaseQuestion {
  type: 'clinical-case';
  patientPresentation: {
    age: number;
    gender: 'M' | 'F';
    chiefComplaint: string;
    history: string;
    physicalExam?: string;
    labResults?: Array<{
      test: string;
      value: string;
      normal: string;
      isAbnormal: boolean;
    }>;
    imaging?: string;
  };
  question: string;
  options: Array<{
    id: string;
    diagnosis: string;
    isCorrect: boolean;
    reasoning?: string;
  }>;
}

export interface ImageIdentificationQuestion extends BaseQuestion {
  type: 'image-identification';
  imageUrl: string;
  imageType: 'histology' | 'radiology' | 'gross-pathology' | 'microscopy';
  question: string;
  hotspots?: Array<{
    x: number;
    y: number;
    radius: number;
    label: string;
    description: string;
  }>;
  options: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
}

export interface FillBlankQuestion extends BaseQuestion {
  type: 'fill-blank';
  text: string; // Text with {{blanks}} to fill
  blanks: Array<{
    id: string;
    correctAnswers: string[];
    acceptableAnswers?: string[];
    hint?: string;
  }>;
}

export interface MatchingQuestion extends BaseQuestion {
  type: 'matching';
  instruction: string;
  leftColumn: Array<{
    id: string;
    text: string;
  }>;
  rightColumn: Array<{
    id: string;
    text: string;
    matchesId: string;
  }>;
}

export interface SequenceQuestion extends BaseQuestion {
  type: 'sequence';
  instruction: string;
  items: Array<{
    id: string;
    text: string;
    correctOrder: number;
  }>;
}

export interface DifferentialDiagnosisQuestion extends BaseQuestion {
  type: 'differential-diagnosis';
  symptoms: string[];
  labFindings?: string[];
  imagingFindings?: string[];
  correctDiagnosis: string;
  differentials: Array<{
    diagnosis: string;
    supportingFeatures: string[];
    againstFeatures: string[];
    isCorrect: boolean;
  }>;
}

export type Question = 
  | MultipleChoiceQuestion
  | ClinicalCaseQuestion
  | ImageIdentificationQuestion
  | FillBlankQuestion
  | MatchingQuestion
  | SequenceQuestion
  | DifferentialDiagnosisQuestion;

export interface QuizSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Map<string, any>;
  scores: Map<string, number>;
  confidenceLevels: Map<string, number>; // 1-5
  timeSpent: Map<string, number>; // seconds per question
  hintsUsed: Map<string, number>;
}

export class AdaptiveQuizEngine {
  private userPerformance: Map<number, { correct: number; total: number }> = new Map();
  private difficultyLevel: 'easy' | 'medium' | 'hard' = 'medium';
  
  constructor(private questions: Question[]) {}

  getNextQuestion(
    topicId?: number,
    excludeIds: string[] = []
  ): Question | null {
    let availableQuestions = this.questions.filter(
      q => !excludeIds.includes(q.id)
    );

    if (topicId !== undefined) {
      availableQuestions = availableQuestions.filter(q => q.topicId === topicId);
    }

    // Filter by adaptive difficulty
    availableQuestions = availableQuestions.filter(
      q => q.difficulty === this.difficultyLevel
    );

    if (availableQuestions.length === 0) {
      // Fallback to any difficulty
      availableQuestions = this.questions.filter(
        q => !excludeIds.includes(q.id) && (topicId === undefined || q.topicId === topicId)
      );
    }

    if (availableQuestions.length === 0) return null;

    // Weighted random selection based on tags and previous performance
    const weights = availableQuestions.map(q => {
      const performance = this.userPerformance.get(q.topicId);
      if (!performance) return 1;
      
      const successRate = performance.correct / performance.total;
      // Prioritize topics with lower success rate
      return 1 - successRate + 0.1;
    });

    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;
    
    for (let i = 0; i < availableQuestions.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        return availableQuestions[i];
      }
    }

    return availableQuestions[0];
  }

  updatePerformance(topicId: number, isCorrect: boolean, confidence: number) {
    const current = this.userPerformance.get(topicId) || { correct: 0, total: 0 };
    current.total++;
    if (isCorrect) current.correct++;
    this.userPerformance.set(topicId, current);

    // Adjust difficulty based on performance
    const successRate = current.correct / current.total;
    
    if (confidence >= 4 && successRate > 0.8) {
      // High confidence and success - increase difficulty
      if (this.difficultyLevel === 'easy') this.difficultyLevel = 'medium';
      else if (this.difficultyLevel === 'medium') this.difficultyLevel = 'hard';
    } else if (confidence <= 2 || successRate < 0.5) {
      // Low confidence or success - decrease difficulty
      if (this.difficultyLevel === 'hard') this.difficultyLevel = 'medium';
      else if (this.difficultyLevel === 'medium') this.difficultyLevel = 'easy';
    }
  }

  generateAdaptiveQuiz(
    topicIds: number[],
    questionCount: number = 10,
    questionTypes?: QuestionType[]
  ): Question[] {
    const selectedQuestions: Question[] = [];
    const usedIds: string[] = [];

    for (let i = 0; i < questionCount; i++) {
      const topicId = topicIds[i % topicIds.length];
      let question = this.getNextQuestion(topicId, usedIds);
      
      if (question) {
        if (questionTypes && !questionTypes.includes(question.type)) {
          // Try to find a question of the requested type
          const typeFiltered = this.questions.filter(
            q => questionTypes.includes(q.type) && 
                 q.topicId === topicId && 
                 !usedIds.includes(q.id)
          );
          if (typeFiltered.length > 0) {
            question = typeFiltered[Math.floor(Math.random() * typeFiltered.length)];
          }
        }
        
        selectedQuestions.push(question);
        usedIds.push(question.id);
      }
    }

    return selectedQuestions;
  }

  calculateScore(question: Question, answer: any, timeSpent: number): number {
    const baseScore = question.points;
    let score = 0;

    // Check if answer is correct based on question type
    switch (question.type) {
      case 'multiple-choice':
        const mcq = question as MultipleChoiceQuestion;
        if (mcq.allowMultiple) {
          const correctIds = mcq.options.filter(o => o.isCorrect).map(o => o.id);
          const selectedIds = answer as string[];
          if (JSON.stringify(correctIds.sort()) === JSON.stringify(selectedIds.sort())) {
            score = baseScore;
          }
        } else {
          const correct = mcq.options.find(o => o.isCorrect);
          if (correct?.id === answer) {
            score = baseScore;
          }
        }
        break;
      
      case 'true-false':
        score = answer === question.correctAnswer ? baseScore : 0;
        break;
      
      case 'fill-blank':
        const fbq = question as FillBlankQuestion;
        const answers = answer as Map<string, string>;
        let correctBlanks = 0;
        fbq.blanks.forEach(blank => {
          const userAnswer = answers.get(blank.id)?.toLowerCase().trim();
          const isCorrect = blank.correctAnswers.some(
            ca => ca.toLowerCase() === userAnswer
          ) || blank.acceptableAnswers?.some(
            aa => aa.toLowerCase() === userAnswer
          );
          if (isCorrect) correctBlanks++;
        });
        score = (correctBlanks / fbq.blanks.length) * baseScore;
        break;
      
      // Add other question type scoring logic...
    }

    // Time bonus (faster correct answers get bonus points)
    if (score > 0 && timeSpent < 30) {
      score *= 1.1; // 10% bonus for quick correct answer
    }

    return Math.round(score);
  }
}