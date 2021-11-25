import { WEBSITE } from './constants';
import { Website } from './types';

export const website = (): Website => ({
  href: WEBSITE,
  text: WEBSITE.replace('http://', 'www.'),
});
