'use client';

import Button3d from '@/components/button-3d';
import { Button } from '@/components/ui/button';
import { setLoading } from '@/lib/redux/features/quiz/quiz.slice';
import { useAppDispatch } from '@/lib/redux/hook';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Quiz = {
  quizId: string;
  topic: string;
  amount: number;
};

export const columnsQuiz: ColumnDef<Quiz>[] = [
  {
    accessorKey: 'topic',
    header: ({ column }) => {
      return (
        <div className="flex justify-center sm:justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <p className="hidden sm:block">Topic</p>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <p className="hidden sm:block">Amount</p>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell({ row }) {
      const payment = row.original;

      return <div className="flex justify-center">{payment.amount}</div>;
    },
  },
  {
    accessorKey: 'action',
    header: '',
    cell: ({ row }) => {
      const payment = row.original;

      const dispatch = useAppDispatch();

      const onPlay = () => {
        dispatch(setLoading(true));
      };

      return (
        <div className="flex gap-4">
          <Link href={`/quiz/${payment.quizId}/start`}>
            <Button3d
              className="bg-[#58cc02]"
              classNameShadow="bg-[#58a700]"
              onClick={onPlay}
            >
              Mulai
            </Button3d>
          </Link>
        </div>
      );
    },
  },
];
