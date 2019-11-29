import { DateTime } from 'luxon';

export const isNewerThan = (a, b) =>
  DateTime.fromISO(b.date_published) - DateTime.fromISO(a.date_published);

export default isNewerThan;
