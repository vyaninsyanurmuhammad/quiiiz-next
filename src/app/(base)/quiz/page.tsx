'use client';

import React, { useEffect, useState } from 'react';
import { TableDataQuiz } from './_components/ui/table-data-quiz';
import { columnsQuiz, Quiz } from './_components/ui/table-column-quiz';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { QuizFindAllThunk } from '@/lib/redux/features/quiz/quiz.thunk';
import { Detective } from '@phosphor-icons/react/dist/ssr';
import { useParams, useSearchParams } from 'next/navigation';

const QuizPage = () => {
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();

  const [isLoading, setIsloading] = useState<boolean>(true);
  const { playState, quizState } = useAppSelector((state) => state.quizSlice);

  const topic = searchParams.get('topic');

  useEffect(() => {
    if (isLoading || quizState.isLoading) {
      dispatch(QuizFindAllThunk()).then((data) => {
        if (data.payload.data) {
          setIsloading(false);
        }
      });
    }
  }, [isLoading]);

  // loading set in table-data-quiz, table-column-quiz
  if (playState.isLoading) {
    return (
      <main className="flex h-svh w-full items-center justify-center">
        <div className="relative flex h-fit w-fit items-center justify-center">
          <Detective className="absolute z-10 h-16 w-16 animate-bounce [animation-duration:1000ms]" />
        </div>
      </main>
    );
  }

  return (
    <main className="container flex min-h-svh w-full flex-col pb-8 pt-24">
      <TableDataQuiz
        topic={topic}
        columns={columnsQuiz}
        data={quizState.quizes}
        isloading={isLoading}
      />
    </main>
  );
};

export default QuizPage;
