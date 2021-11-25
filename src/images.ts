import path from 'path';

import imageSize from 'image-size';

import { ASSETS, ASSETS_PREFIX } from './constants';
import { Image, Images } from './types';

const calculateSize = (size?: number): number => (size ?? 0) / 2;

const mapImage =
  (date: Date) =>
  (name: Image['name']): Image => {
    const file = `${name}.png`;
    const { width, height } = imageSize(
      path.resolve(__dirname, 'assets', file),
    );
    return {
      name,
      src: `${ASSETS_PREFIX}${ASSETS}/${file}?v=${date.getTime()}`,
      width: calculateSize(width),
      height: calculateSize(height),
    };
  };

const reduceImage = (images: Images, image: Image): Images => ({
  ...images,
  [image.name]: image,
});

export const images = () =>
  ['globe', 'logo', 'map', 'phone', 'send']
    .map(mapImage(new Date()))
    .reduce(reduceImage, {});
