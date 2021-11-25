import path from 'path';

export const ADDRESS = 'Vodičkova 791/39, Praha 1, 110 00';
export const ASSETS = 'assets';
export const ASSETS_PREFIX = process.env.ASSETS_PREFIX ?? '';
export const CONTAINER = 'container';
export const MAP_URL = 'https://goo.gl/maps/9bu9NQn56kv9n9dY6';
export const TITLE = 'Advocuts Signature';
export const WEBSITE = 'http://advocuts.cz';

export const ASSETS_DIR = path.resolve(__dirname, ASSETS);
export const BUILD_DIR = path.resolve(__dirname, '..', 'build');
export const STYLES_DIR = path.resolve(__dirname, 'styles');
export const TEMPLATES_DIR = path.resolve(__dirname, 'templates');
