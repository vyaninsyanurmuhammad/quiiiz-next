import * as d3 from 'd3';
import cloud from 'd3-cloud';
import { useEffect, useRef, useState } from 'react';

interface CloudProps {
  words: { text: string; value: number }[];
}

const WordCloudCustom: React.FC<CloudProps> = ({ words }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);

  const handleResize = () => {
    if (ref.current) {
      setWidth(ref.current.clientWidth);
      console.log('Current width:', ref.current.clientWidth);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Clear previous SVG before rendering new one
    d3.select(ref.current).selectAll('svg').remove();

    if (width > 0) {
      const layout = cloud()
        .size([width, 400]) // Use the current width
        .words(words.map((word) => ({ text: word.text, size: word.value })))
        .padding(5)
        .rotate(() => Math.random() * 2 * Math.PI)
        .font('Impact')
        .fontSize((d) => d.size || 10)
        .on('end', (words) => {
          const svg = d3
            .select(ref.current)
            .append('svg')
            .attr('width', width) // Set width to current width
            .attr('height', 400) // Set height to 400px
            .attr('key', width) // Force re-render by key change
            .append('g')
            .attr('transform', `translate(${width / 2}, 200)`);

          svg
            .selectAll('text')
            .data(words)
            .enter()
            .append('text')
            .style('font-size', (d) => `${d.size}px`)
            .style('font-family', 'Impact')
            .style('fill', (d, i) => d3.schemeCategory10[i % 10])
            .attr('text-anchor', 'middle')
            .attr(
              'transform',
              (d) => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`,
            )
            .text((d) => d.text ?? '');
        });

      layout.start();
    }
  }, [words, width]);

  return <div ref={ref} id="cloud" style={{ width: '100%', height: 400 }} />;
};

export default WordCloudCustom;
