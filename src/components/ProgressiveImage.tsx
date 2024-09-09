import { type DetailedHTMLProps, type ImgHTMLAttributes, useEffect, useState } from 'react';

interface Props extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  placeholderSrc: string;
}

export default function ProgressiveImage({ placeholderSrc, src, ...props }: Props) {
  const [imgSrc, setImgSrc] = useState<string>();

  useEffect(() => setImgSrc(placeholderSrc), [placeholderSrc]);

  useEffect(() => {
    const img = new Image();
    img.src = src ?? '';
    img.onload = () => setImgSrc(src);

    return () => {
      img.src = '';
      img.onload = null;
    };
  }, [src]);

  return <img {...{ src: imgSrc, ...props }} />;
}
