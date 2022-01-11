import path from 'path';

export const ADDRESS = 'City Element, Na Strži 2102/61a, 140 00 Praha 4';
export const ASSETS = 'assets';
export const ASSETS_PREFIX = process.env.ASSETS_PREFIX ?? '';
export const CONTAINER = 'container';
export const ICON = '✍️';
export const MAP_URL = 'https://goo.gl/maps/Uom253HsEe4pysyS7';
export const TITLE = 'Advocuts Signature';
export const WEBSITE = 'http://advocuts.cz';

export const ASSETS_DIR = path.resolve(__dirname, ASSETS);
export const BUILD_DIR = path.resolve(__dirname, '..', 'build');
export const STYLES_DIR = path.resolve(__dirname, 'styles');
export const TEMPLATES_DIR = path.resolve(__dirname, 'templates');
