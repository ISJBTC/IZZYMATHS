// lib/quiz-service.ts

import { QuizQuestion } from '@/types/quiz-types';

/**
 * Dynamically imports question files based on topic and chapter
 */
export async function fetchQuestions(topic: string, chapter: number): Promise<QuizQuestion[]> {
  try {
    // Convert topic string to match file naming convention (e.g., linearAlgebra -> linear-algebra)
    const formattedTopic = topic.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    
    // Dynamic import of the question file
    const module = await import(`@/data/questions/${formattedTopic}/chapter-${chapter}.ts`);
    
    // Return the questions from the module
    return module.default;
  } catch (error) {
    console.error(`Error loading questions for ${topic} chapter ${chapter}:`, error);
    throw new Error(`Failed to load questions for ${topic} chapter ${chapter}`);
  }
}