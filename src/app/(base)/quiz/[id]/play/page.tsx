'use client';

import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Timer } from 'lucide-react';
import {
  QuizAnswerThunk,
  QuizFindThunk,
  QuizFinishThunk,
  QuizStartThunk,
} from '@/lib/redux/features/quiz/quiz.thunk';
import { Detective } from '@phosphor-icons/react/dist/ssr';
import { useRouter } from 'next/navigation';
import { cn, formatTimeDelta } from '@/lib/utils';
import { differenceInSeconds } from 'date-fns';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { resetAnswer, resetQuiz } from '@/lib/redux/features/quiz/quiz.slice';

const QuizPlayPage = ({ params }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { playState } = useAppSelector((state) => state.quizSlice);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  const options: string[] = JSON.parse(
    playState.quiz?.question?.options || '[]',
  );

  const onSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const onCheckAnswer = () => {
    setIsLoading(true);

    playState.quiz?.question &&
      selectedAnswer &&
      dispatch(
        QuizAnswerThunk({
          gameId: playState.quiz.gameId,
          quizId: params.id,
          questionId: playState.quiz.question.questionId,
          answer: selectedAnswer,
        }),
      ).then((data) => {
        console.log(data.payload);
        if (!data.payload.data) {
          // router.push(`/`);
        } else {
          setOpenSheet(true);
          setIsLoading(false);
        }
      });
  };

  const onLanjutkan = () => {
    setIsLoading(true);
    playState.quiz?.amount === playState.quiz?.number && playState.quiz
      ? dispatch(
          QuizFinishThunk({ gameId: playState.quiz.gameId, quizId: params.id }),
        ).then((data) => {
          console.log(data.payload);
          if (!data.payload.data) {
            // router.push(`/`);
          } else {
            setOpenSheet(false);
            setIsLoading(false);
            router.push(`/quiz`);
            dispatch(resetAnswer());
            dispatch(resetQuiz());
          }
        })
      : dispatch(QuizStartThunk({ quizId: params.id })).then((data) => {
          console.log(data.payload);
          if (!data.payload.data) {
            // router.push(`/`);
          } else {
            setOpenSheet(false);
            setIsLoading(false);
            dispatch(resetAnswer());
          }
        });
  };

  useEffect(() => {
    if (!playState.quiz?.question) {
      dispatch(QuizStartThunk({ quizId: params.id })).then((data) => {
        console.log(data.payload);
        if (!data.payload.data) {
          // router.push(`/`);
        } else {
          setIsLoading(false);
        }
      });
    } else {
      setIsLoading(false);
    }
  }, [playState.quiz]);

  // Update waktu yang sudah berjalan setiap detik
  useEffect(() => {
    if (playState.quiz) {
      const timer = setInterval(() => {
        const secondsPassed = differenceInSeconds(
          new Date(),
          new Date(playState.quiz!.timeStarted),
        );
        setElapsedSeconds(secondsPassed);
      }, 1000);

      return () => clearInterval(timer); // Bersihkan interval saat komponen unmount
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
      {playState.quiz ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <p className="text-sm">Topic</p>
              <Badge>{playState.quiz.topic}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4" />
              <p className="text-sm">{formatTimeDelta(elapsedSeconds)}</p>
            </div>
          </div>
          <Card className="min-w-full max-w-[640px] lg:min-w-[640px]">
            <CardContent className="flex flex-row items-center gap-5 pt-6">
              <div className="flex flex-col">
                <p>{playState.quiz.number}</p>
                <Separator orientation="horizontal" />
                <p>{playState.quiz.amount}</p>
              </div>{' '}
              <p>{playState.quiz.question?.question}</p>
            </CardContent>
          </Card>
          <Card className="min-w-full max-w-[640px] lg:min-w-[640px]">
            <CardContent className="flex flex-col items-center gap-5 pt-6">
              {playState.quiz.question ? (
                options.map((option, index) => (
                  <Button
                    key={`${option}-${index}`}
                    className="flex w-full justify-start gap-4 overflow-hidden p-0"
                    variant={option === selectedAnswer ? 'default' : 'outline'}
                    onClick={() => onSelectAnswer(option)}
                  >
                    <div className="flex h-full w-8 items-center justify-center bg-black text-white">
                      {index + 1}
                    </div>
                    <div>{option}</div>
                  </Button>
                ))
              ) : (
                <p>not found</p>
              )}
            </CardContent>
          </Card>
          <Button disabled={!selectedAnswer} onClick={onCheckAnswer}>
            Periksa
          </Button>
        </div>
      ) : (
        <p>not found</p>
      )}

      <Sheet open={openSheet}>
        <SheetContent
          side={'bottom'}
          disableCloseButton
          isTransparent
          className={cn(
            'flex w-full flex-col items-center gap-0 bg-[#d7ffb8]',
            playState.answer?.isCorrect ? 'bg-[#d7ffb8]' : 'bg-[#fec1c2]',
          )}
        >
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="-ml-4 flex min-w-full max-w-[640px] flex-col gap-4 pb-12 pt-6 lg:min-w-[640px]">
            <p
              className={cn(
                'text-2xl font-bold',
                playState.answer?.isCorrect
                  ? 'text-[#56a600]'
                  : 'text-[#e73035]',
              )}
            >
              {playState.answer?.isCorrect ? 'Bagus!' : 'Kurang Beruntung!'}
            </p>

            <Button className="w-full" onClick={onLanjutkan}>
              {playState.quiz?.amount === playState.quiz?.number
                ? 'Finish'
                : 'Lanjutkan'}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </main>
  );
};

export default QuizPlayPage;
