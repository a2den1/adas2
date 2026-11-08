// src/index.js 를 묶어 dist/ 에 일반 스크립트(전역 adas2)·ES 모듈과 각 압축본을 만든다.
// CSS 는 src/styles/*.css 를 이름 순으로 이어 붙인다.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
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
};
const out = async (format, minify) => (await build({ ...common, format, minify, ...(format === 'iife' ? { globalName: 'adas2', footer: { js: 'adas2=adas2.default||adas2;' } } : {}) })).outputFiles[0].text;

console.log(`adas2 v${pkg.version}`);
write('dist/adas2.js', banner + await out('iife', false));
write('dist/adas2.min.js', banner + await out('iife', true));
write('dist/adas2.esm.js', banner + await out('esm', false));
write('dist/adas2.esm.min.js', banner + await out('esm', true));

const cssDir = new URL('src/styles/', root);
const css = readdirSync(cssDir).filter(f => f.endsWith('.css')).sort().map(f => read(`src/styles/${f}`)).join('\n');
write('dist/adas2.css', banner + css);
write('dist/adas2.min.css', banner + (await transform(css, { loader: 'css', minify: true, legalComments: 'none' })).code);
