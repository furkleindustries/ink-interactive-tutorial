import {
  ReactNode,
} from 'react';

export interface PixelArgs {
  onLoad: () => void;
}

export function Pixel(args: PixelArgs): ReactNode;
