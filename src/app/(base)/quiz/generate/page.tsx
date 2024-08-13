'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { QuizCreateThunk } from '@/lib/redux/features/quiz/quiz.thunk';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const QuizGeneratePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { playState } = useAppSelector((state) => state.quizSlice);

  const formSchema = yup.object({
    topic: yup
      .string()
      .min(2, 'Username must be at least 2 characters.')
      .required('Username is required'),
    totalQuestion: yup
      .number()
      .min(1, 'Total questions must be at least 1.')
      .required('Total questions is required'),
  });

  const form = useForm<yup.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      topic: '',
      totalQuestion: 5,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: yup.InferType<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    const { topic, totalQuestion: amount } = values;
    dispatch(QuizCreateThunk({ topic, amount })).then((data) => {
      console.log(data.payload.data);
      if (data.payload.data) {
        router.push(`/quiz/${data.payload.data.quizId}/start`);
      }
    });
  }

  return (
    <main className="container flex min-h-svh w-full items-center justify-center pb-8 pt-24">
      <Card className="min-w-full max-w-[640px] lg:min-w-[640px]">
        <CardHeader>
          <CardTitle>
            <p className="text-2xl font-bold">Quiz Generator 🎮</p>
          </CardTitle>
          <CardDescription>
            Submit a topic to generate new challenge 🛵
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is topic what you want generated.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="totalQuestion"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Total Questions</FormLabel>
                      <FormControl>
                        <Input placeholder="0" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                className="flex w-full gap-2"
                type="submit"
                disabled={playState.isLoading}
              >
                {playState.isLoading && (
                  <Loader2 className="h-5 w-5 animate-spin" />
                )}{' '}
                Generate
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default QuizGeneratePage;
