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
import Button3d from '@/components/button-3d';

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
    // setIsLoading(true);

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
          // setIsLoading(false);
        }
      });
  };

  const onLanjutkan = () => {
    if (playState.quiz?.amount === playState.quiz?.number && playState.quiz) {
      setIsLoading(true);
      dispatch(
        QuizFinishThunk({ gameId: playState.quiz.gameId, quizId: params.id }),
      ).then((data) => {
        console.log(data.payload);
        if (!data.payload.data) {
          // router.push(`/`);
        } else {
          setOpenSheet(false);
          router.push(`/quiz/${params.id}/summary`);
          // dispatch(resetAnswer());
          // dispatch(resetQuiz());
        }
      });
    } else {
      dispatch(QuizStartThunk({ quizId: params.id })).then((data) => {
        console.log(data.payload);
        if (!data.payload.data) {
          // router.push(`/`);
        } else {
          setOpenSheet(false);
          // setIsLoading(false);

          setTimeout(() => {
            dispatch(resetAnswer());
          }, 800);
        }
      });
    }

    setSelectedAnswer(undefined);
  };

  useEffect(() => {
    if (!playState.quiz?.question || isLoading) {
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

  return (
    <main className="container flex min-h-svh w-full items-center justify-center pb-8 pt-24">
      {playState.quiz ? (
        <div className="flex w-full min-w-full max-w-[640px] flex-col gap-6 md:min-w-[640px]">
          <div className="flex flex-col gap-4">
            <div className="flex items-end justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-semibold">
                    {playState.quiz.topic}
                  </p>
                  <p className="text-sm">
                    {playState.quiz.number} dari {playState.quiz.amount}{' '}
                    pertanyaan
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4" />
                <p className="text-sm">{formatTimeDelta(elapsedSeconds)}</p>
              </div>
            </div>
            <Card className="w-full">
              <CardContent className="flex flex-row items-center gap-5 pt-6">
                <p>{playState.quiz.question?.question}</p>
              </CardContent>
            </Card>
            <Card className="min-w-full max-w-[640px] lg:min-w-[640px]">
              <CardContent className="grid grid-cols-1 grid-rows-4 gap-5 pt-6">
                {playState.quiz.question ? (
                  options.map((option, index) => (
                    <Button3d
                      key={`${option}-${index}`}
                      className={cn(
                        'flex h-full min-h-10 w-full items-center justify-start gap-2 border-[1px] !bg-white py-2 text-start',
                        option === selectedAnswer
                          ? 'border-[#1cb0f6] text-[#1cb0f6]'
                          : 'border-slate-300 text-slate-900',
                      )}
                      classNameShadow={cn(
                        option === selectedAnswer
                          ? 'bg-[#1cb0f6]'
                          : 'bg-slate-300',
                      )}
                      classNameFrame="w-full"
                      onClick={() => onSelectAnswer(option)}
                    >
                      {option}
                    </Button3d>
                  ))
                ) : (
                  <p>not found</p>
                )}
              </CardContent>
            </Card>
            {/* <Button disabled={!selectedAnswer} onClick={onCheckAnswer}>
            Periksa
          </Button> */}
          </div>

          <Button3d
            className={cn(
              'flex w-full items-center justify-center gap-2',
              selectedAnswer && '!bg-[#58cc02]',
            )}
            classNameShadow={cn(selectedAnswer && '!bg-[#58a700]')}
            classNameFrame="w-full"
            disabled={!selectedAnswer}
            onClick={onCheckAnswer}
          >
            Periksa
          </Button3d>
        </div>
      ) : (
        <p>not found</p>
      )}

      <Sheet open={openSheet} modal>
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
          <div className="container flex justify-center py-8">
            <div className="flex min-w-full max-w-[640px] flex-col gap-4 md:min-w-[640px]">
              <p
                className={cn(
                  'text-2xl font-bold',
                  playState.answer?.isCorrect
                    ? 'text-[#56a600]'
                    : 'text-[#e73035]',
                )}
              >
                {playState.answer?.isCorrect ? 'Bagus!' : 'Jangan Menyerah!'}
              </p>
              <p
                className={cn(
                  playState.answer?.isCorrect
                    ? 'text-[#56a600]'
                    : 'text-[#e73035]',
                )}
              >
                Answer: {playState.answer?.correctAnswer}
              </p>

              <Button3d
                className={cn(
                  'flex w-full items-center justify-center gap-2',
                  playState.answer?.isCorrect ? 'bg-[#58cc02]' : 'bg-[#ff4b4b]',
                )}
                classNameShadow={cn(
                  playState.answer?.isCorrect ? 'bg-[#58a700]' : 'bg-[#ea2c2b]',
                )}
                classNameFrame="w-full"
                onClick={onLanjutkan}
              >
                {playState.quiz?.amount === playState.quiz?.number
                  ? 'Selesai'
                  : 'Lanjutkan'}
              </Button3d>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </main>
  );
};

export default QuizPlayPage;
