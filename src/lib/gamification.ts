export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'study' | 'quiz' | 'streak' | 'mastery' | 'special';
  points: number;
  requirement: {
    type: 'streak' | 'score' | 'questions' | 'accuracy' | 'topics' | 'time' | 'custom';
    value: number;
    condition?: string;
  };
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
}

export interface UserStats {
  level: number;
  experience: number;
  totalScore: number;
  questionsAnswered: number;
  correctAnswers: number;
  currentStreak: number;
  longestStreak: number;
  studyDays: number;
  topicsCompleted: number;
  achievements: string[]; // Achievement IDs
  lastActive: Date;
}

export interface DailyChallenge {
  id: string;
  date: Date;
  title: string;
  description: string;
  goals: Array<{
    type: 'questions' | 'accuracy' | 'topics' | 'time';
    target: number;
    current: number;
    reward: number;
  }>;
  completed: boolean;
  expiresAt: Date;
}

export class GamificationSystem {
  private static readonly ACHIEVEMENTS: Achievement[] = [
    // Streak Achievements
    {
      id: 'first-blood',
      name: 'První krev',
      description: 'Odpověz správně na první otázku',
      icon: '🩸',
      category: 'quiz',
      points: 10,
      requirement: { type: 'questions', value: 1 },
      rarity: 'common'
    },
    {
      id: 'streak-5',
      name: 'Na vlně',
      description: 'Dosáhni série 5 správných odpovědí',
      icon: '🔥',
      category: 'streak',
      points: 25,
      requirement: { type: 'streak', value: 5 },
      rarity: 'common'
    },
    {
      id: 'streak-10',
      name: 'Nezastavitelný',
      description: 'Dosáhni série 10 správných odpovědí',
      icon: '💥',
      category: 'streak',
      points: 50,
      requirement: { type: 'streak', value: 10 },
      rarity: 'rare'
    },
    {
      id: 'streak-25',
      name: 'Patologický génius',
      description: 'Dosáhni série 25 správných odpovědí',
      icon: '🧠',
      category: 'streak',
      points: 150,
      requirement: { type: 'streak', value: 25 },
      rarity: 'epic'
    },
    {
      id: 'streak-50',
      name: 'Legenda',
      description: 'Dosáhni série 50 správných odpovědí',
      icon: '👑',
      category: 'streak',
      points: 500,
      requirement: { type: 'streak', value: 50 },
      rarity: 'legendary'
    },

    // Study Achievements
    {
      id: 'study-week',
      name: 'Týdenní rutina',
      description: 'Studuj 7 dní v řadě',
      icon: '📚',
      category: 'study',
      points: 50,
      requirement: { type: 'custom', value: 7, condition: 'consecutive_days' },
      rarity: 'common'
    },
    {
      id: 'study-month',
      name: 'Měsíční maraton',
      description: 'Studuj 30 dní v řadě',
      icon: '🏃',
      category: 'study',
      points: 200,
      requirement: { type: 'custom', value: 30, condition: 'consecutive_days' },
      rarity: 'rare'
    },
    {
      id: 'night-owl',
      name: 'Noční sova',
      description: 'Studuj po půlnoci',
      icon: '🦉',
      category: 'study',
      points: 25,
      requirement: { type: 'custom', value: 1, condition: 'study_after_midnight' },
      rarity: 'common'
    },
    {
      id: 'early-bird',
      name: 'Ranní ptáče',
      description: 'Začni studovat před 6:00',
      icon: '🐦',
      category: 'study',
      points: 25,
      requirement: { type: 'custom', value: 1, condition: 'study_before_6am' },
      rarity: 'common'
    },

    // Quiz Achievements
    {
      id: 'quiz-100',
      name: 'Stokilometrový milník',
      description: 'Odpověz na 100 otázek',
      icon: '💯',
      category: 'quiz',
      points: 75,
      requirement: { type: 'questions', value: 100 },
      rarity: 'rare'
    },
    {
      id: 'quiz-500',
      name: 'Půl tisícovka',
      description: 'Odpověz na 500 otázek',
      icon: '🎯',
      category: 'quiz',
      points: 200,
      requirement: { type: 'questions', value: 500 },
      rarity: 'epic'
    },
    {
      id: 'quiz-1000',
      name: 'Tisíc a jedna otázka',
      description: 'Odpověz na 1000 otázek',
      icon: '🏆',
      category: 'quiz',
      points: 500,
      requirement: { type: 'questions', value: 1000 },
      rarity: 'legendary'
    },
    {
      id: 'perfect-10',
      name: 'Perfekcionista',
      description: 'Dosáhni 100% úspěšnosti v 10 otázkách za sebou',
      icon: '⭐',
      category: 'quiz',
      points: 100,
      requirement: { type: 'accuracy', value: 100 },
      rarity: 'rare'
    },
    {
      id: 'speed-demon',
      name: 'Rychlost blesku',
      description: 'Odpověz správně na otázku do 5 sekund',
      icon: '⚡',
      category: 'quiz',
      points: 30,
      requirement: { type: 'time', value: 5 },
      rarity: 'common'
    },

    // Mastery Achievements
    {
      id: 'topic-master',
      name: 'Mistr tématu',
      description: 'Dokonči všechny otázky v jednom tématu',
      icon: '🎓',
      category: 'mastery',
      points: 100,
      requirement: { type: 'topics', value: 1 },
      rarity: 'rare'
    },
    {
      id: 'section-master',
      name: 'Mistr sekce',
      description: 'Dokonči celou sekci (obecná nebo speciální)',
      icon: '🏅',
      category: 'mastery',
      points: 300,
      requirement: { type: 'custom', value: 1, condition: 'complete_section' },
      rarity: 'epic'
    },
    {
      id: 'pathology-master',
      name: 'Mistr patologie',
      description: 'Dokonči všech 216 otázek',
      icon: '🏆',
      category: 'mastery',
      points: 1000,
      requirement: { type: 'topics', value: 216 },
      rarity: 'legendary'
    },

    // Special Achievements
    {
      id: 'comeback-kid',
      name: 'Návrat do hry',
      description: 'Odpověz správně po 3 špatných odpovědích',
      icon: '💪',
      category: 'special',
      points: 30,
      requirement: { type: 'custom', value: 1, condition: 'comeback_after_3_wrong' },
      rarity: 'common'
    },
    {
      id: 'confident',
      name: 'Sebevědomý',
      description: 'Odpověz správně s maximální jistotou 10x',
      icon: '😎',
      category: 'special',
      points: 50,
      requirement: { type: 'custom', value: 10, condition: 'max_confidence_correct' },
      rarity: 'rare'
    },
    {
      id: 'no-hints',
      name: 'Bez pomoci',
      description: 'Dosáhni série 20 bez použití nápověd',
      icon: '🚫',
      category: 'special',
      points: 75,
      requirement: { type: 'custom', value: 20, condition: 'streak_no_hints' },
      rarity: 'rare'
    }
  ];

  static calculateLevel(experience: number): number {
    // Level = floor(sqrt(experience / 100))
    return Math.floor(Math.sqrt(experience / 100));
  }

  static calculateExperienceForLevel(level: number): number {
    return level * level * 100;
  }

  static getExperienceProgress(experience: number): { current: number; needed: number; percentage: number } {
    const currentLevel = this.calculateLevel(experience);
    const currentLevelExp = this.calculateExperienceForLevel(currentLevel);
    const nextLevelExp = this.calculateExperienceForLevel(currentLevel + 1);
    const needed = nextLevelExp - currentLevelExp;
    const current = experience - currentLevelExp;
    const percentage = (current / needed) * 100;

    return { current, needed, percentage };
  }

  static checkAchievements(stats: UserStats): Achievement[] {
    const newAchievements: Achievement[] = [];

    for (const achievement of this.ACHIEVEMENTS) {
      if (stats.achievements.includes(achievement.id)) continue;

      let unlocked = false;

      switch (achievement.requirement.type) {
        case 'streak':
          unlocked = stats.currentStreak >= achievement.requirement.value;
          break;
        case 'questions':
          unlocked = stats.questionsAnswered >= achievement.requirement.value;
          break;
        case 'accuracy':
          const accuracy = (stats.correctAnswers / stats.questionsAnswered) * 100;
          unlocked = accuracy >= achievement.requirement.value;
          break;
        case 'topics':
          unlocked = stats.topicsCompleted >= achievement.requirement.value;
          break;
        // Custom conditions handled elsewhere
      }

      if (unlocked) {
        achievement.unlockedAt = new Date();
        newAchievements.push(achievement);
      }
    }

    return newAchievements;
  }

  static generateDailyChallenge(date: Date = new Date()): DailyChallenge {
    const challenges = [
      {
        title: 'Rychlý start',
        description: 'Dokončete ranní studijní rutinu',
        goals: [
          { type: 'questions' as const, target: 10, current: 0, reward: 50 },
          { type: 'accuracy' as const, target: 80, current: 0, reward: 30 }
        ]
      },
      {
        title: 'Mistr tématu',
        description: 'Zaměřte se na jedno téma',
        goals: [
          { type: 'topics' as const, target: 1, current: 0, reward: 75 },
          { type: 'questions' as const, target: 15, current: 0, reward: 25 }
        ]
      },
      {
        title: 'Perfektní den',
        description: 'Dosáhněte vysoké úspěšnosti',
        goals: [
          { type: 'accuracy' as const, target: 90, current: 0, reward: 100 },
          { type: 'questions' as const, target: 20, current: 0, reward: 50 }
        ]
      },
      {
        title: 'Časová výzva',
        description: 'Rychlé odpovědi pod tlakem',
        goals: [
          { type: 'time' as const, target: 30, current: 0, reward: 60 },
          { type: 'questions' as const, target: 5, current: 0, reward: 20 }
        ]
      }
    ];

    const dayIndex = date.getDate() % challenges.length;
    const challenge = challenges[dayIndex];

    const expiresAt = new Date(date);
    expiresAt.setHours(23, 59, 59, 999);

    return {
      id: `daily-${date.toISOString().split('T')[0]}`,
      date,
      title: challenge.title,
      description: challenge.description,
      goals: challenge.goals,
      completed: false,
      expiresAt
    };
  }

  static getLeaderboardPosition(userScore: number, allScores: number[]): number {
    const sortedScores = allScores.sort((a, b) => b - a);
    return sortedScores.indexOf(userScore) + 1;
  }

  static getLevelTitle(level: number): string {
    const titles = [
      'Nováček', // 0-4
      'Student', // 5-9
      'Praktikant', // 10-14
      'Asistent', // 15-19
      'Rezident', // 20-24
      'Specialista', // 25-29
      'Expert', // 30-34
      'Mistr', // 35-39
      'Profesor', // 40-44
      'Legenda' // 45+
    ];
    
    const index = Math.min(Math.floor(level / 5), titles.length - 1);
    return titles[index];
  }

  static getRankBadge(level: number): string {
    if (level < 5) return '🥉';
    if (level < 10) return '🥈';
    if (level < 20) return '🥇';
    if (level < 30) return '💎';
    if (level < 40) return '⭐';
    return '👑';
  }
}