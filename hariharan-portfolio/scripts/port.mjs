// Ports the standalone prototype (../prototype/index.html) into the Next.js app:
//   <style>  -> src/app/globals.css   (after the Tailwind import)
//   <body>   -> src/components/Portfolio.tsx  (markup via dangerouslySetInnerHTML)
//   <script> -> the same component's useEffect (runs the prototype JS on mount)
// This keeps the design/animations 1:1; content + API wiring happen in later passes.
import fs from 'fs';
import path from 'path';

const SRC = 'c:/Users/Hariharan/Desktop/Portfolio/prototype/index.html';
const html = fs.readFileSync(SRC, 'utf8');

const css = (html.match(/<style>([\s\S]*?)<\/style>/) || [, ''])[1];
const body = (html.match(/<body>([\s\S]*?)<\/body>/) || [, ''])[1];
const js = (body.match(/<script>([\s\S]*?)<\/script>/) || [, ''])[1];

let markup = body.replace(/<script>[\s\S]*?<\/script>/g, '');
// drop the prototype-only note banner
markup = markup.replace(/<div class="protonote"[\s\S]*?<\/div>\s*/g, '');
markup = markup.trim();

// --- globals.css ---
fs.mkdirSync('src/app', { recursive: true });
fs.writeFileSync('src/app/globals.css', '@import "tailwindcss";\n\n' + css);

// --- Portfolio component ---
const escMarkup = markup
  .replace(/\\/g, '\\\\')
  .replace(/`/g, '\\`')
  .replace(/\$\{/g, '\\${');

const comp = `// @ts-nocheck
/* eslint-disable */
'use client';
import { useEffect, useRef } from 'react';

const MARKUP = \`${escMarkup}\`;

export default function Portfolio() {
  const ran = useRef(false);
  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
${js}
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: MARKUP }} />;
}
`;
fs.mkdirSync('src/components', { recursive: true });
fs.writeFileSync('src/components/Portfolio.tsx', comp);

console.log('ported OK · css:', css.length, 'chars · markup:', markup.length, 'chars · js:', js.length, 'chars');
