export type Image = {
  name: string;
  src: string;
  width: number;
  height: number;
};

export type Images = Record<Image['name'], Image>;

export type Website = {
  href: string;
  text: string;
};
