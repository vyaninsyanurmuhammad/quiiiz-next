import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import dynamic from 'next/dynamic';
import { Separator } from '@/components/ui/separator';
import WordCloudCustom from "@/components/word-cloud";

// const WordCloudCustom = dynamic(() => import('@/components/word-cloud'), {
//   ssr: false,
// });

const words = [
  { text: 'React', value: 50 },
  { text: 'Next.js', value: 45 },
  { text: 'JavaScript', value: 70 },
  { text: 'TypeScript', value: 60 },
  { text: 'Web Development', value: 55 },
  { text: 'Node.js', value: 40 },
  { text: 'Frontend', value: 35 },
  { text: 'Backend', value: 30 },
  { text: 'API', value: 25 },
  { text: 'GraphQL', value: 20 },
  { text: 'CSS', value: 50 },
  { text: 'HTML', value: 45 },
  { text: 'Tailwind CSS', value: 30 },
  { text: 'Bootstrap', value: 25 },
  { text: 'Django', value: 15 },
  { text: 'Flask', value: 20 },
  { text: 'Ruby on Rails', value: 10 },
  { text: 'SQL', value: 40 },
  { text: 'NoSQL', value: 35 },
  { text: 'MongoDB', value: 30 },
  { text: 'PostgreSQL', value: 25 },
  { text: 'Firebase', value: 20 },
  { text: 'AWS', value: 15 },
  { text: 'Docker', value: 30 },
  { text: 'Kubernetes', value: 25 },
  { text: 'CI/CD', value: 20 },
  { text: 'DevOps', value: 30 },
  { text: 'Agile', value: 25 },
  { text: 'Scrum', value: 20 },
  { text: 'Testing', value: 15 },
  { text: 'TDD', value: 10 },
  { text: 'BFF', value: 15 },
  { text: 'Design Patterns', value: 25 },
  { text: 'REST', value: 20 },
  { text: 'OAuth', value: 15 },
  { text: 'JWT', value: 10 },
  { text: 'GraphQL', value: 25 },
  { text: 'WebSocket', value: 20 },
  { text: 'Progressive Web Apps', value: 15 },
  { text: 'Service Workers', value: 10 },
  { text: 'LocalStorage', value: 20 },
  { text: 'IndexedDB', value: 15 },
  { text: 'Session Storage', value: 10 },
  { text: 'WebAssembly', value: 20 },
  { text: 'Microservices', value: 25 },
  { text: 'Serverless', value: 30 },
  { text: 'Monolithic', value: 15 },
  { text: 'Server-Side Rendering', value: 20 },
  { text: 'Static Site Generation', value: 25 },
  { text: 'Progressive Enhancement', value: 20 },
  { text: 'Responsive Design', value: 25 },
  { text: 'Accessibility', value: 30 },
];

const TopTopicSection = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <p className="text-2xl font-bold">Top Topic 🧩</p>
        </CardTitle>
        <CardDescription></CardDescription>
        <Separator orientation="horizontal" />
      </CardHeader>

      <CardContent>
        <div className="flex flex-col items-start gap-2">
          <WordCloudCustom words={words} />
        </div>
      </CardContent>
    </Card>
  );
};

export default TopTopicSection;
