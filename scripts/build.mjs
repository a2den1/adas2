// src/ → dist/ : 일반 스크립트(IIFE), ES 모듈, 각각 압축본, CSS 와 압축본.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { transform } from 'esbuild';

const root = new URL('..', import.meta.url);
const read = p => readFileSync(new URL(p, root), 'utf8');
const write = (p, s) => { writeFileSync(new URL(p, root), s); console.log(`  ${p.padEnd(24)} ${(Buffer.byteLength(s) / 1024).toFixed(1)} KB`); };

const pkg = JSON.parse(read('package.json'));
const banner = `/*! adas2 v${pkg.version} | (c) 2026 a2den1 | adas2 License: 사용 자유, 수정·2차 배포 금지 | https://github.com/a2den1/adas2 */\n`;

mkdirSync(new URL('dist', root), { recursive: true });

const js = read('src/adas2.js').replace('__VERSION__', pkg.version);
const esm = `${js}\nconst adas2 = window.adas2;\nexport const Motion = adas2.Motion;\nexport const springs = adas2.springs;\nexport const version = adas2.version;\nexport default adas2;\n`;
const css = read('src/adas2.css');

const min = (code, loader, format) => transform(code, { loader, minify: true, target: 'es2020', legalComments: 'none', ...(format ? { format } : {}) }).then(r => r.code);

console.log(`adas2 v${pkg.version}`);
write('dist/adas2.js', banner + js);
write('dist/adas2.min.js', banner + await min(js, 'js'));
write('dist/adas2.esm.js', banner + esm);
write('dist/adas2.esm.min.js', banner + await min(esm, 'js', 'esm'));
write('dist/adas2.css', banner + css);
write('dist/adas2.min.css', banner + await min(css, 'css'));
