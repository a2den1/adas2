// src/index.js 를 묶어 dist/ 에 일반 스크립트(전역 adas2)·ES 모듈과 각 압축본을 만든다.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { build, transform } from 'esbuild';

const root = new URL('..', import.meta.url);
const read = p => readFileSync(new URL(p, root), 'utf8');
const write = (p, s) => { writeFileSync(new URL(p, root), s); console.log(`  ${p.padEnd(24)} ${(Buffer.byteLength(s) / 1024).toFixed(1)} KB`); };

const pkg = JSON.parse(read('package.json'));
const banner = `/*! adas2 v${pkg.version} | (c) 2026 a2den1 | adas2 License: 사용 자유, 수정·2차 배포 금지 | https://github.com/a2den1/adas2 */\n`;
mkdirSync(new URL('dist', root), { recursive: true });

const common = {
  entryPoints: [new URL('src/index.js', root).pathname.replace(/^\/([A-Za-z]:)/, '$1')],
  bundle: true, write: false, target: 'es2020', legalComments: 'none', charset: 'utf8',
  define: { __VERSION__: JSON.stringify(pkg.version) },
  loader: { '.css': 'text' },
};
const out = async (format, minify) => (await build({ ...common, format, minify, ...(format === 'iife' ? { globalName: 'adas2', footer: { js: 'adas2=adas2.default||adas2;' } } : {}) })).outputFiles[0].text;

console.log(`adas2 v${pkg.version}`);
write('dist/adas2.js', banner + await out('iife', false));
write('dist/adas2.min.js', banner + await out('iife', true));
write('dist/adas2.esm.js', banner + await out('esm', false));
write('dist/adas2.esm.min.js', banner + await out('esm', true));

// 요소 스타일은 각 요소의 Shadow DOM 안에 들어 있다. 이 CSS 는 글꼴과 색 토큰뿐이라
// 스크립트보다 먼저 넣어 두면 첫 화면이 깜빡이지 않는다(넣지 않아도 스크립트가 알아서 넣는다).
const css = read('src/styles/global.css');
write('dist/adas2.css', banner + css);
write('dist/adas2.min.css', banner + (await transform(css, { loader: 'css', minify: true, legalComments: 'none' })).code);
