import { DateTime } from 'luxon';
import { ExternalPost } from '../types';

export const isNewerThan = (a: ExternalPost, b: ExternalPost) => {
  const dateA = a.jsonFeed.date_published || null;
  const dateB = b.jsonFeed.date_published || null;
  if (!dateA && !dateB) return 0;
  if (!dateA) return 1;
  if (!dateB) return -1;
  return (
    DateTime.fromISO(dateB).toSeconds() - DateTime.fromISO(dateA).toSeconds()
  );
};

export default isNewerThan;
