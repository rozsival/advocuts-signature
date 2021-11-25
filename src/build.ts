import path from 'path';
import { mkdir, writeFile } from 'fs/promises';

import consola from 'consola';
import cpr from 'cpr';
import inlineCss from 'inline-css';
import { minify } from 'html-minifier';
import { renderSync } from 'sass';

import {
  ASSETS,
  ASSETS_DIR,
  ASSETS_PREFIX,
  BUILD_DIR,
  STYLES_DIR,
} from './constants';
import { compileTemplate, templateContext } from './utils';

export const build = async (): Promise<void> => {
  consola.info('Copying assets');
  cpr(ASSETS_DIR, path.join(BUILD_DIR, ASSETS), { overwrite: true });
  const styleSource = path.join(STYLES_DIR, 'main.scss');
  consola.info('Compiling styles');
  const style = renderSync({ file: styleSource });
  consola.info('Compiling template');
  const template = await compileTemplate();
  const html = template(templateContext(style.css));
  consola.info('Inlining CSS');
  const htmlWithCss = await inlineCss(html.toString(), {
    removeHtmlSelectors: true,
    removeStyleTags: true,
    url: ASSETS_PREFIX || '/',
  });
  consola.info('Minifying output');
  const output = minify(htmlWithCss, {
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    html5: true,
    minifyCSS: true,
    minifyJS: true,
    preserveLineBreaks: false,
  });
  await mkdir(BUILD_DIR, { recursive: true });
  await writeFile(path.join(BUILD_DIR, 'index.html'), output);
  consola.success('Signature built successfully');
};
