'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, Loader2, Play, Swords } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { QuizFindThunk } from '@/lib/redux/features/quiz/quiz.thunk';
import { useRouter } from 'next/navigation';
import { Detective } from '@phosphor-icons/react/dist/ssr';

const QuizStartPage = ({ params }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const [isLoading, setIsloading] = useState<boolean>(true);

  const { playState } = useAppSelector((state) => state.quizSlice);

  const onPlayNowClickHandler = () => {
    router.push(`/quiz/${params.id}/play`);
  };

  useEffect(() => {
    if (!playState.quiz) {
      dispatch(QuizFindThunk({ quizId: params.id })).then((data) => {
        console.log(data.payload.data);
        if (!data.payload.data) {
          router.push(`/`);
        } else {
          setIsloading(false);
        }
      });
    }
  }, [playState.quiz]);

  if (isLoading) {
    return (
      <main className="flex h-svh w-full items-center justify-center">
        <div className="relative flex h-fit w-fit items-center justify-center">
          <Detective className="absolute z-10 h-16 w-16 animate-bounce [animation-duration:1000ms]" />
        </div>
      </main>
    );
  }

  return (
    <main className="container flex min-h-svh w-full items-center justify-center pb-8 pt-24">
      <Card className="min-w-full max-w-[640px] lg:min-w-[640px]">
        <CardHeader>
          <CardTitle>
            <p className="text-center text-lg font-bold">
              {playState.quiz?.topic}
            </p>
          </CardTitle>
          <CardDescription className="text-center">
            {playState.quiz?.amount} questions
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-5">
          <Swords className="h-48 w-48" />
          <Button
            className="flex w-full gap-2"
            disabled={playState.isLoading}
            onClick={onPlayNowClickHandler}
          >
            {playState.isLoading && (
              <Loader2 className="h-5 w-5 animate-spin" />
            )}{' '}
            Play Now <Play className="h-4 w-4 text-white" />
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default QuizStartPage;
