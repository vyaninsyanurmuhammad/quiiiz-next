'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Medal, MedalMilitary } from '@phosphor-icons/react/dist/ssr';
import { CalendarPlus2, Hourglass, Target } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { TableDataSummary } from './_components/ui/table-data-summary';
import { columnsSummary } from './_components/ui/table-column-summary';
import Link from 'next/link';
import Button3d from '@/components/button-3d';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { QuizSummaryThunk } from '@/lib/redux/features/quiz/quiz.thunk';
import { Skeleton } from '@/components/ui/skeleton';
import { setLoading } from '@/lib/redux/features/quiz/quiz.slice';

const QuizSummaryPage = ({ params }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsloading] = useState<boolean>(true);

  const { summaryState } = useAppSelector((state) => state.quizSlice);

  useEffect(() => {
    if (isLoading) {
      dispatch(QuizSummaryThunk({ quizId: params.id })).then((data) => {
        if (data.payload.data) {
          setIsloading(false);
        }
      });
    }
  }, [isLoading]);

  return (
    <main className="container flex min-h-svh w-full flex-col pb-8 pt-24">
      <div className="flex flex-col gap-3">
        <p className="text-lg font-bold">My {summaryState.topic} Summary</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 md:grid-cols-5">
          <div className="grid grid-cols-1 gap-3 sm:col-span-3 md:col-span-4 md:grid-cols-2">
            <Card className="w-full">
              <CardContent className="flex h-full flex-col items-center justify-center">
                <CardHeader className="flex w-full flex-row items-start justify-between px-0">
                  <CardTitle className="w-fit text-base font-bold">
                    Skor Teratas
                  </CardTitle>
                  <MedalMilitary className="!mt-0 h-5 w-5" />
                </CardHeader>
                <div className="flex h-full min-h-[92px] w-fit flex-col items-center justify-center gap-2">
                  {isLoading ? (
                    <Skeleton className="h-[60px] w-[100px]" />
                  ) : summaryState.topScore ? (
                    <p className="text-6xl font-extrabold">
                      {summaryState.topScore.score.toFixed(2)}
                      <span className="text-base">%</span>
                    </p>
                  ) : (
                    <p className="text-sm">No results.</p>
                  )}
                  {isLoading ? (
                    <Skeleton className="h-[24px] w-[100px]" />
                  ) : (
                    summaryState.topScore?.duration && (
                      <div className="flex items-center gap-2">
                        <Hourglass className="h-5 w-5" />
                        <p className="text-base font-semibold">
                          {summaryState.topScore?.duration}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardContent className="flex flex-col items-center justify-center">
                <CardHeader className="flex w-full flex-row items-start justify-between px-0">
                  <CardTitle className="w-fit text-base font-bold">
                    Skor Terbaru
                  </CardTitle>
                  <Target className="!mt-0 h-5 w-5" />
                </CardHeader>
                <div className="flex h-full min-h-[92px] w-fit flex-col items-center justify-center gap-2">
                  {isLoading ? (
                    <Skeleton className="h-[60px] w-[100px]" />
                  ) : summaryState.topScore ? (
                    <p className="text-6xl font-extrabold">
                      {summaryState.latestScore?.score.toFixed(2)}
                      <span className="text-base">%</span>
                    </p>
                  ) : (
                    <p className="text-sm">No results.</p>
                  )}
                  {isLoading ? (
                    <Skeleton className="h-[24px] w-[100px]" />
                  ) : (
                    summaryState.latestScore && (
                      <div className="flex items-center gap-2">
                        <Hourglass className="h-5 w-5" />
                        <p className="text-base font-semibold">
                          {summaryState.latestScore?.duration}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col gap-3 pt-2">
            <Link href={`/quiz/${params.id}/start`}>
              <Button3d
                className="w-full bg-[#58cc02]"
                classNameShadow="bg-[#58a700]"
              >
                {summaryState.latestScore ? 'Mulai Lagi' : 'Mulai'}
              </Button3d>
            </Link>
            <Link href={`/quiz`} onClick={() => setLoading(true)}>
              <Button3d
                className="w-full bg-stone-500"
                classNameShadow="bg-stone-600"
              >
                Keluar
              </Button3d>
            </Link>
          </div>
        </div>
        <TableDataSummary
          data={summaryState.summaries}
          columns={columnsSummary}
          isloading={isLoading}
        />
      </div>
    </main>
  );
};

export default QuizSummaryPage;
