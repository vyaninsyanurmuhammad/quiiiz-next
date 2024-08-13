'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, Play, Swords } from 'lucide-react';

const QuizStartPage = ({ params }: { params: { id: string } }) => {
  const onPlayNowClickHandler = () => {

  }
  
  return (
    <main className="container flex min-h-svh w-full items-center justify-center pb-8 pt-24">
      <Card className="min-w-full max-w-[640px] lg:min-w-[640px]">
        <CardHeader>
          <CardTitle>
            <p className="text-center text-lg font-bold">
              Makanan Khas Yogyakarta
            </p>
          </CardTitle>
          <CardDescription className="text-center">5 questions</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-5">
          <Swords className="h-48 w-48" />
          <Button className="w-full gap-2">
            Play Now <Play className="h-4 w-4 text-white" />
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default QuizStartPage;
