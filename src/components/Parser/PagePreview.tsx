import { storage } from '@/services/firebase';
import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import ProgressiveImage from '../ProgressiveImage';

interface Props {
  formId: string;
  imgSrc: string | undefined;
  previewImgSrc: string;
}

export default function PagePreview({ formId, imgSrc, previewImgSrc }: Props) {
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    if (imgSrc) setSrc(imgSrc);
    else {
      const fileRef = ref(storage, formId);
      getDownloadURL(fileRef).then(setSrc);
    }
  }, [formId]);

  return (
    <ProgressiveImage
      src={src}
      placeholderSrc={previewImgSrc}
      style={{
        width: '100%',
        height: 'inherit',
        borderRadius: '20px',
        border: '2px solid darkgrey',
      }}
    />
  );
}
