// Spaced Repetition Algorithm based on SM-2
export interface ReviewData {
  topicId: number;
  lastReview: Date;
  nextReview: Date;
  interval: number; // days
  repetitions: number;
  easeFactor: number; // 1.3 to 2.5
  confidence: number; // 1-5
}

export class SpacedRepetitionSystem {
  private static readonly MIN_EASE_FACTOR = 1.3;
  private static readonly INITIAL_EASE_FACTOR = 2.5;

  static calculateNextReview(
    quality: number, // 0-5 (0=complete fail, 5=perfect recall)
    currentData?: ReviewData
  ): ReviewData {
    const now = new Date();
    
    if (!currentData) {
      // First review
      return {
        topicId: 0,
        lastReview: now,
        nextReview: new Date(now.getTime() + 24 * 60 * 60 * 1000), // 1 day
        interval: 1,
        repetitions: 1,
        easeFactor: this.INITIAL_EASE_FACTOR,
        confidence: quality
      };
    }

    let { interval, repetitions, easeFactor } = currentData;

    // Calculate new ease factor
    easeFactor = Math.max(
      this.MIN_EASE_FACTOR,
      easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    );

    if (quality < 3) {
      // Failed - reset interval
      interval = 1;
      repetitions = 0;
    } else {
      // Successful recall
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      repetitions++;
    }

    const nextReview = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);

    return {
      ...currentData,
      lastReview: now,
      nextReview,
      interval,
      repetitions,
      easeFactor,
      confidence: quality
    };
  }

  static getReviewPriority(reviewData: ReviewData): number {
    const now = new Date();
    const dueDate = new Date(reviewData.nextReview);
    const overdueDays = (now.getTime() - dueDate.getTime()) / (24 * 60 * 60 * 1000);
    
    if (overdueDays > 0) {
      // Overdue items have highest priority
      return 1000 + overdueDays;
    }
    
    // Items due soon have higher priority
    const daysUntilDue = -overdueDays;
    return Math.max(0, 100 - daysUntilDue);
  }

  static getTopicsForReview(
    allReviewData: ReviewData[],
    limit: number = 20
  ): ReviewData[] {
    const now = new Date();
    
    return allReviewData
      .filter(data => new Date(data.nextReview) <= now)
      .sort((a, b) => this.getReviewPriority(b) - this.getReviewPriority(a))
      .slice(0, limit);
  }

  static getStudyStreak(reviewHistory: ReviewData[]): number {
    if (reviewHistory.length === 0) return 0;
    
    const sortedHistory = reviewHistory
      .sort((a, b) => new Date(b.lastReview).getTime() - new Date(a.lastReview).getTime());
    
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    for (const review of sortedHistory) {
      const reviewDate = new Date(review.lastReview);
      reviewDate.setHours(0, 0, 0, 0);
      
      const daysDiff = Math.floor(
        (currentDate.getTime() - reviewDate.getTime()) / (24 * 60 * 60 * 1000)
      );
      
      if (daysDiff === streak) {
        streak++;
        currentDate = new Date(reviewDate);
      } else {
        break;
      }
    }
    
    return streak;
  }
}