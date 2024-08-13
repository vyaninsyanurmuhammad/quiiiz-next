import React from 'react';
import { GithubLogo, Globe } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HeroSection = () => {
  const technologies = [
    {
      image: 'nextjs.png',
      title: 'Next.js',
    },

    {
      image: 'shadcn.png',
      title: 'Shadcn/ui',
    },
    {
      image: 'openai.png',
      title: 'Open AI',
    },
    {
      image: 'prisma.png',
      title: 'Prisma',
    },
    {
      image: 'tailwind.png',
      title: 'Tailwind css',
    },
    {
      image: 'nestjs.png',
      title: 'Nest.js',
    },
    {
      image: 'supabase.png',
      title: 'Supabase',
    },
    {
      image: 'typescript.png',
      title: 'TypeScript',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <p className="text-2xl font-bold">Welcome to Quiiiz 🐱‍👤!</p>
        </CardTitle>
        <div className="flex gap-2">
          <Button variant={'ghost'} className="flex items-center gap-2">
            <GithubLogo /> Github
          </Button>
          <Button variant={'ghost'} className="flex items-center gap-2">
            <Globe /> Portfolio
          </Button>
        </div>
        <Separator orientation="horizontal" />
      </CardHeader>

      <CardContent>
        <div className="flex flex-col items-start gap-2">
          <div className="flex flex-col gap-4">
            <p>
              Selamat datang di Quiiiz - platform terbaik untuk menantang
              pengetahuan Anda sambil bersenang-senang! Jelajahi berbagai kuis
              menarik di berbagai topik, bersaing dengan teman-teman, dan pantau
              perkembangan Anda. Baik Anda ingin menguji kemampuan atau
              menemukan hal baru, Quiiiz memiliki sesuatu untuk semua orang.
              Mulai perjalanan kuis Anda hari ini!
            </p>

            <p className="font-semibold">Built with</p>

            <div className="grid max-w-[840px] grid-cols-2 grid-rows-2 gap-x-4 gap-y-6 md:grid-cols-4 md:gap-y-3">
              {technologies.map(({ image, title }, index) => (
                <div
                  key={`${title}-${index}`}
                  className="flex items-center gap-2"
                >
                  <Image
                    className="rounded-md"
                    src={`/${image}`}
                    height={36}
                    width={36}
                    alt={`tech-${index}`}
                  />
                  <p>{title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroSection;
