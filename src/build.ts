import path from 'path';
import { mkdir, readFile, writeFile } from 'fs/promises';

import consola from 'consola';
import cpr from 'cpr';
import hbs from 'handlebars';
import inlineCss from 'inline-css';
import { minify } from 'html-minifier';
import { renderSync } from 'sass';

import {
  ADDRESS,
  ASSETS,
  ASSETS_DIR,
  ASSETS_PREFIX,
  BUILD_DIR,
  CONTAINER,
  MAP_URL,
  STYLES_DIR,
  TEMPLATES_DIR,
  TITLE,
} from './constants';
import { images } from './images';
import { website } from './website';

const getTemplateSource = (name: string) =>
  readFile(path.join(TEMPLATES_DIR, `${name}.hbs`));

const compileTemplate = async () => {
  const source = await getTemplateSource('index');
  const img = await getTemplateSource('img');
  const link = await getTemplateSource('link');
  hbs.registerPartial('img', hbs.compile(img.toString()));
  hbs.registerPartial('link', hbs.compile(link.toString()));
  return hbs.compile(source.toString());
};

export const build = async (): Promise<void> => {
  consola.info('Copying assets');
  cpr(ASSETS_DIR, path.join(BUILD_DIR, ASSETS), { overwrite: true });
  const styleSource = path.join(STYLES_DIR, 'main.scss');
  consola.info('Compiling styles');
  const style = renderSync({ file: styleSource });
  consola.info('Compiling template');
  const template = await compileTemplate();
  const html = template({
    address: ADDRESS,
    container: CONTAINER,
    images: images(),
    mapUrl: MAP_URL,
    style: style.css.toString(),
    title: TITLE,
    website: website(),
  });
  consola.info('Inlining CSS');
  const htmlWithCss = await inlineCss(html.toString(), {
    removeHtmlSelectors: true,
    removeStyleTags: true,
    url: `${ASSETS_PREFIX}/`,
  });
  consola.info('Minifying output');
  const output = minify(htmlWithCss, {
    html5: true,
    minifyCSS: true,
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    preserveLineBreaks: false,
  });
  await mkdir(BUILD_DIR, { recursive: true });
  await writeFile(path.join(BUILD_DIR, 'index.html'), output);
  consola.success('Signature built successfully');
};
