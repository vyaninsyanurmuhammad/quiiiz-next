'use client';

import Button3d from '@/components/button-3d';
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
import { setLoading } from '@/lib/redux/features/quiz/quiz.slice';
import { QuizCreateThunk } from '@/lib/redux/features/quiz/quiz.thunk';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { yupResolver } from '@hookform/resolvers/yup';
import { Detective } from '@phosphor-icons/react/dist/ssr';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SiGooglegemini } from 'react-icons/si';
import * as yup from 'yup';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

const QuizGeneratePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const { playState } = useAppSelector((state) => state.quizSlice);

  const [isLoading, setIsLoading] = useState<boolean>(false);

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

    onCreateQuiz(topic, amount);
  }

  const onCreateQuiz = (topic: string, amount: number) =>
    dispatch(QuizCreateThunk({ topic, amount })).then((data) => {
      console.log(data.payload);

      if (data.payload.error) {
        toast({
          title: 'Wah, ada yang salah!',
          description:
            'Terjadi masalah dengan permintaan Anda. Atau mungkin coba topik lain.',
          action: (
            <ToastAction
              altText="Coba lagi"
              onClick={() => onCreateQuiz(topic, amount)}
            >
              Coba lagi
            </ToastAction>
          ),
        });
      }

      if (data.payload.data) {
        setIsLoading(true);
        router.push(`/quiz/${data.payload.data.quizId}/start`);
      }
    });

  useEffect(() => {
    dispatch(setLoading(false));
  }, []);

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
              <Button3d
                className="flex w-full items-center justify-center gap-2 bg-[#84d8ff]"
                classNameShadow="bg-[#69accc] w-full"
                classNameFrame="w-full"
                disabled={playState.isLoading}
                type="submit"
              >
                {playState.isLoading && (
                  <Loader2 className="h-5 w-5 animate-spin" />
                )}{' '}
                Generate <SiGooglegemini className="text-white" />
              </Button3d>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default QuizGeneratePage;
