import path from 'path';
import { readFile } from 'fs/promises';

import hbs from 'handlebars';

import {
  ADDRESS,
  CONTAINER,
  ICON,
  MAP_URL,
  TEMPLATES_DIR,
  TITLE,
} from './constants';
import { images } from './images';
import { website } from './website';

const readTemplate = (name: string) =>
  readFile(path.join(TEMPLATES_DIR, `${name}.hbs`));

export const compileTemplate = async () => {
  const source = await readTemplate('index');
  const contact = await readTemplate('contact');
  const img = await readTemplate('img');
  hbs.registerPartial('contact', hbs.compile(contact.toString()));
  hbs.registerPartial('img', hbs.compile(img.toString()));
  return hbs.compile(source.toString());
};

export const templateContext = (css: Buffer) => ({
  address: ADDRESS,
  container: CONTAINER,
  icon: ICON,
  images: images(),
  mapUrl: MAP_URL,
  style: css.toString(),
  title: TITLE,
  website: website(),
});
