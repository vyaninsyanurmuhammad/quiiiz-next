import { Summary } from '@/app/(base)/quiz/[id]/summary/_components/ui/table-column-summary';
import { Quiz as Quizes } from '@/app/(base)/quiz/_components/ui/table-column-quiz';

export interface QuizInitialState {
  quizState: QuizState;
  playState: PlayState;
  homeState: HomeState;
  summaryState: SummaryState;
}

export interface PlayState {
  quiz?: Quiz;
  answer?: Answer;
  result?: Result;
  isLoading: boolean;
}

export interface QuizState {
  quizes: Quizes[];
  isLoading: boolean;
}

export interface HomeState {
  topics: Topic[];
  isLoading: boolean;
}

export interface SummaryState {
  topic?: string;
  topScore?: Summary;
  latestScore?: Summary;
  summaries: Summary[];
  isLoading: boolean;
}

export interface Topic {
  text: string;
  value: number;
}

export interface Result {
  gameId: string;
  quizId: string;
  topic: string;
  amount: number;
  score: number;
  timeStarted: string;
  timeEnded: string;
}

interface Answer {
  gameId: string;
  answerId: string;
  answer: string;
  isCorrect: string;
  correctAnswer: string;
}

export interface Quiz {
  gameId: string;
  quizId: string;
  topic: string;
  number: number;
  timeStarted: string;
  amount: number;
  question?: Question;
}
export interface Question {
  questionId: string;
  question: string;
  options: string;
}
