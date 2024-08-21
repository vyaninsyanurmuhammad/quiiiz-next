import {
  HomeState,
  PlayState,
  QuizInitialState,
  SummaryState,
} from './quiz.feature.dto';

const playState: PlayState = {
  isLoading: false,
  quizes: [],
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
};

export default quizInitialState;
