interface QuizInitialState {
  playState: PlayState;
}

interface PlayState {
  quiz?: Quiz;
  answer?: Answer;
  result?: Result;
  isLoading: boolean;
}

interface Result {
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
}

interface Quiz {
  gameId: string;
  quizId: string;
  topic: string;
  number: number;
  timeStarted: string;
  amount: number;
  question?: Question;
}
interface Question {
  questionId: string;
  question: string;
  options: string;
}
