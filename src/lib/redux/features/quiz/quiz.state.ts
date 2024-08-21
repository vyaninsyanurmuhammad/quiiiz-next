import {
  HomeState,
  PlayState,
  QuizInitialState,
  QuizState,
  SummaryState,
} from './quiz.feature.dto';

const quizState: QuizState = {
  quizes: [],
  isLoading: false,
};

const playState: PlayState = {
  isLoading: false,
};

const homeState: HomeState = {
  isLoading: false,
  topics: [],
};

const summaryState: SummaryState = {
  isLoading: false,
  summaries: [],
};

export const quizInitialState: QuizInitialState = {
  playState,
  homeState,
  summaryState,
  quizState,
};

export default quizInitialState;
