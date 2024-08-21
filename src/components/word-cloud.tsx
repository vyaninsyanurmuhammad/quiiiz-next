import { cn } from '@/lib/utils';
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface CloudProps {
  words: { text: string; value: number; className?: string }[]; // Menambahkan optional className
}

const WordCloudCustom: React.FC<CloudProps> = ({ words }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);

  const handleResize = () => {
    if (ref.current) {
      setWidth(ref.current.clientWidth);
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
      // Menentukan rentang ukuran font
      const minFontSize = 20; // Ukuran minimal font
      const maxFontSize = 80; // Ukuran maksimal font

      // Mencari nilai minimum dan maksimum dari `value` untuk menyesuaikan rentang ukuran font
      const valueExtent = d3.extent(words, (word) => word.value) as [
        number,
        number,
      ];

      // Skala linear untuk mengatur ukuran font secara proporsional
      const fontSizeScale = d3
        .scaleLinear()
        .domain(valueExtent) // domain dari nilai minimal hingga maksimal
        .range([minFontSize, maxFontSize]); // range dari ukuran minimal hingga maksimal

      const layout = cloud()
        .size([width, 400]) // Menggunakan lebar saat ini
        .words(
          words.map((word) => ({
            text: word.text,
            size: fontSizeScale(word.value),
            className: word.className || '', // Menambahkan className jika tersedia
          })),
        ) // Mengatur ukuran berdasarkan skala
        .padding(5)
        .rotate(() => Math.random() * 2 * Math.PI)
        .font('Impact')
        .fontSize((d) => d.size || 10)
        .on('end', (words) => {
          const svg = d3
            .select(ref.current)
            .append('svg')
            .attr('width', width) // Mengatur lebar
            .attr('height', 400) // Mengatur tinggi
            .attr('key', width) // Paksa re-render dengan perubahan key
            .append('g')
            .attr('transform', `translate(${width / 2}, 200)`);

          const textSelection = svg
            .selectAll('text')
            .data(words)
            .enter()
            .append('a') // Tambahkan elemen anchor
            .attr(
              'href',
              (d) => `/quiz?topic=${encodeURIComponent(d.text ?? '')}`,
            ) // Menambahkan link href
            .append('text')
            .attr('class', (d) => cn('hover:opacity-50 transition-all')) // Menambahkan className dari data
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
