'use client';

import Baselayout from './(base)/layout';
import HeroSection from './_components/ui/hero-section';
import TopTopicSection from './_components/ui/top-topic-section';

export default function Home() {
  return (
    <Baselayout>
      <main className="container relative flex gap-6 h-full min-h-svh flex-col items-center justify-start pt-24 pb-8">
        <HeroSection />
        <TopTopicSection />
      </main>
    </Baselayout>
  );
}
