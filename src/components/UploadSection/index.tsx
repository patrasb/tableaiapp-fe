import { type PropsWithChildren, useCallback, useState, useContext, lazy } from 'react';
import { useDropzone } from 'react-dropzone';
import { addDoc, serverTimestamp } from 'firelordjs';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { user } from '@/models/user';
import { form } from '@/models/form';
import { signInAnonymously } from 'firebase/auth';
import { auth, storage } from '@/services/firebase';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@/App';
import { postUserSignIn } from '@/utils/authOperations';
import { ROUTES } from '@/router';

const CardUpload = lazy(() => import('./CardUpload'));
const ContainerUpload = lazy(() => import('./ContainerUpload'));
const SoloUpload = lazy(() => import('./SoloUpload'));
const ButtonUpload = lazy(() => import('./ButtonUpload'));
const ConvertAnonymousModal = lazy(() => import('@/components/ConvertAnonymousModal'));
const PricingModal = lazy(() => import('@/components/PricingModal'));

interface Props extends PropsWithChildren {
  variant: 'solo' | 'card' | 'container' | 'button';
}

export default function UploadSection({ variant, children }: Props) {
  const { currentUser, localAvailableCredits, setLocalAvailableCredits } = useContext(UserContext);

  const [progress, setProgress] = useState<number | null>(null);
  const [convertAnonymousModalOpen, setConvertAnonymousModalOpen] = useState<boolean>(false);
  const [pricingModalOpen, setPricingModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  async function uploadAndProcess(file: File) {
    setProgress(10);

    let uid: string;
    if (currentUser) uid = currentUser.uid;
    else {
      const userCredential = await signInAnonymously(auth);
      const anonymousCurrentUser = await postUserSignIn(userCredential, localAvailableCredits);
      uid = anonymousCurrentUser.uid;
    }

    const { name, type } = file;

    setProgress(25);

    const formDoc = await addDoc(form.collection(), {
      name,
      mimeType: type,
      summary: null,
      userDocRef: user.doc(uid),
      createdAt: serverTimestamp(),
      extracted: null,
      deleted: false,
    });

    setProgress(40);

    const fileRef = ref(storage, formDoc.id);

    const uploadTask = uploadBytesResumable(fileRef, file, {
      cacheControl: 'max-age=86400',
      customMetadata: { userUid: uid },
    });

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(50 + percentage / 2);
      },
      console.error,
      () => {
        const imgSrc = URL.createObjectURL(file);
        const state: LocationState = {
          parser: { imgSrc, previewImgSrc: imgSrc, formId: formDoc.id },
        };

        setProgress(null);
        setLocalAvailableCredits(localAvailableCredits! - 1);
        navigate(ROUTES.app, { state });
      },
    );
  }

  const handleDrop = useCallback(
    async (file: any) => {
      await handleOnChange(file[0]);
    },
    [localAvailableCredits],
  );

  async function handleOnChange(file: File): Promise<void> {
    if (!file) throw new Error('error');
    uploadAndProcess(file);
  }

  function handleNoCredit() {
    if (anonymousNoCredits) setConvertAnonymousModalOpen(true);
    else if (userNoCredits) setPricingModalOpen(true);
  }

  const userNoCredits = !localAvailableCredits || localAvailableCredits <= 0;
  const anonymousNoCredits = currentUser?.isAnonymous && localAvailableCredits && localAvailableCredits <= 2;

  const uploadAllowed = !userNoCredits && !anonymousNoCredits;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: uploadAllowed ? handleDrop : handleNoCredit,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
    },
  });

  const dropzoneRootProps = getRootProps({
    onClick: (e) => {
      if (!uploadAllowed) {
        e.stopPropagation();
        handleNoCredit();
      }
    },
  });

  return (
    <>
      <input {...getInputProps()} />
      {variant === 'button' && <ButtonUpload dropzoneRootProps={dropzoneRootProps} progress={progress} />}
      {variant === 'solo' && <SoloUpload dropzoneRootProps={dropzoneRootProps} progress={progress} />}
      {variant === 'card' && <CardUpload dropzoneRootProps={dropzoneRootProps} progress={progress} />}
      {variant === 'container' && (
        <ContainerUpload dropzoneRootProps={dropzoneRootProps} isDragActive={isDragActive}>
          {children}
        </ContainerUpload>
      )}
      <ConvertAnonymousModal open={convertAnonymousModalOpen} setOpen={setConvertAnonymousModalOpen} />
      <PricingModal open={pricingModalOpen} setOpen={setPricingModalOpen} />
    </>
  );
}
