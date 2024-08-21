import React from 'react';
import { GithubLogo, Globe } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  SiGooglegemini,
  SiNestjs,
  SiNextdotjs,
  SiPrisma,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';

const IconComponent = ({ icon }: { icon: any }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    role="img"
    fill="currentColor"
    dangerouslySetInnerHTML={{ __html: icon.path }}
    width={24}
    height={24}
  />
);

const HeroSection = () => {
  const technologies = [
    {
      image: 'nextjs.png',
      title: 'Next.js',
      icon: <SiNextdotjs className=" h-5 w-5" />,
    },
    {
      image: 'shadcn.png',
      title: 'Shadcn/ui',
      icon: <SiShadcnui className=" h-5 w-5" />,
    },
    {
      image: 'openai.png',
      title: 'Gemini',
      icon: <SiGooglegemini className="text-[#8E75B2] h-5 w-5" />,
    },
    {
      image: 'prisma.png',
      title: 'Prisma',
      icon: <SiPrisma className=" h-5 w-5" />,
    },
    {
      image: 'tailwind.png',
      title: 'Tailwind css',
      icon: <SiTailwindcss className="text-[#06B6D4] h-5 w-5" />,
    },
    {
      image: 'nestjs.png',
      title: 'Nest.js',
      icon: <SiNestjs className="text-[#E0234E] h-5 w-5" />,
    },
    {
      image: 'supabase.png',
      title: 'Supabase',
      icon: <SiSupabase className="text-[#3FCF8E] h-5 w-5" />,
    },
    {
      image: 'typescript.png',
      title: 'TypeScript',
      icon: <SiTypescript className="text-[#3178C6] h-5 w-5" />,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <p className="text-5xl font-extrabold text-[#58a700]">Welcome to Quiiiz 🐱‍👤!</p>
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
              {technologies.map(({ image, title, icon }, index) => (
                <div
                  key={`${title}-${index}`}
                  className="flex items-center gap-3"
                >
                  {icon}
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
