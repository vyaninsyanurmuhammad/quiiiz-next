'use client';

import Button3d from '@/components/button-3d';
import { Button } from '@/components/ui/button';
import { setLoading } from '@/lib/redux/features/quiz/quiz.slice';
import { useAppDispatch } from '@/lib/redux/hook';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { format, formatDistance, subDays } from 'date-fns';
import { ArrowUpDown, Trophy } from 'lucide-react';
import Link from 'next/link';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Summary = {
  gameId: string;
  quizId: string;
  score: number;
  duration: string;
  timeStarted: string;
  timeEnded: string;
  medal: number;
};

export const columnsSummary: ColumnDef<Summary>[] = [
  {
    accessorKey: 'medal',
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell({ row }) {
      const payment = row.original;

      return (
        <div className="flex justify-center">
          {payment.medal >= 1 && payment.medal <= 3 ? (
            <Trophy
              className={cn(
                {
                  1: 'text-yellow-300',
                  2: 'text-gray-300',
                  3: 'text-yellow-800',
                }[payment.medal],
              )}
            />
          ) : (
            payment.medal
          )}
        </div>
      );
    },
  },

  {
    accessorKey: 'score',
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <p className="hidden sm:block">Jawaban Benar</p>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell({ row }) {
      const payment = row.original;

      return <div className="flex justify-center">{payment.score}%</div>;
    },
  },
  {
    accessorKey: 'duration',
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <p className="hidden sm:block">Durasi</p>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell({ row }) {
      const payment = row.original;

      return <div className="flex justify-center">{payment.duration}</div>;
    },
  },
  {
    accessorKey: 'timeStarted',
    header: ({ column }) => {
      return (
        <div className="flex justify-center sm:justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <p className="hidden sm:block">Waktu Mulai</p>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell({ row }) {
      const payment = row.original;

      const time = format(new Date(payment.timeStarted), 'dd/MM/yyyy p');

      return <div className="flex justify-center">{time}</div>;
    },
  },
];
