interface QuizInitialState {
  playState: PlayState;
}

interface PlayState {
  quiz?: Quiz;
  isLoading: boolean;
}

interface Quiz {
  topic: string;
  amount: number;
  questions: Question[];
}
interface Question {
  questions: Question[];
}
