import { db } from '@/services/firebase';
import { type MetaTypeCreator, getFirelord, type DocumentReference, type ServerTimestamp } from 'firelordjs';
import type ExtractedTable from '@/shared/ExtractedTable';
import { type User } from './user';

export type Form = MetaTypeCreator<
  {
    name: string;
    summary: string | null;
    mimeType: string;
    userDocRef: DocumentReference<User>;
    createdAt: ServerTimestamp;
    extracted: {
      tables: ExtractedTable[];
    } | null;
    deleted: boolean;
  },
  'forms',
  string
>;

export const form = getFirelord<Form>(db, 'forms');
