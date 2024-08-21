'use client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import dynamic from 'next/dynamic';
import { Separator } from '@/components/ui/separator';
import WordCloudCustom from '@/components/word-cloud';
import Button3d from '@/components/button-3d';
import Link from 'next/link';
import { ListVideo } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { QuizFindAllTopicsThunk } from '@/lib/redux/features/quiz/quiz.thunk';
import { Detective } from '@phosphor-icons/react/dist/ssr';

// const WordCloudCustom = dynamic(() => import('@/components/word-cloud'), {
//   ssr: false,
// });

const TopTopicSection = () => {
  const dispatch = useAppDispatch();

  const { homeState } = useAppSelector((state) => state.quizSlice);

  const [isLoading, setIsloading] = useState<boolean>(true);

  useEffect(() => {
    if (isLoading) {
      dispatch(QuizFindAllTopicsThunk()).then((data) => {
        console.log(data.payload.data);
        if (data.payload.data) {
          setIsloading(false);
        }
      });
    }
  }, [isLoading]);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col justify-between gap-6 sm:flex-row">
          <CardTitle>
            <p className="text-3xl font-extrabold text-[#58a700]">
              Topik Teratas 🧩
            </p>
          </CardTitle>
          <Link href={`/quiz`} className="w-full sm:w-fit">
            <Button3d
              className="flex w-full justify-center items-center gap-2 bg-[#58cc02] sm:w-fit"
              classNameShadow="bg-[#58a700]"
            >
              Lihat Daftar
              <ListVideo />
            </Button3d>
          </Link>
        </div>

        <CardDescription></CardDescription>
        <Separator orientation="horizontal" />
      </CardHeader>

      <CardContent>
        <div className="flex flex-col items-start gap-2">
          {isLoading ? (
            <div className="flex h-[400px] w-full items-center justify-center">
              <div className="relative flex h-fit w-fit items-center justify-center">
                <Detective className="absolute z-10 h-16 w-16 animate-bounce [animation-duration:1000ms]" />
              </div>
            </div>
          ) : (
            <WordCloudCustom words={homeState.topics} />
          )}{' '}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopTopicSection;
