export const cx = (classes: (string | undefined | null)[]) =>
  classes
    .filter((cls) => Boolean(cls))
    .join(" ")
    .trim();

export const padZero = (num: number) => {
  return num < 10 ? `0${num}` : `${num}`;
};

export const toDateFormat = (dateString: string) => {
  const date = new Date(dateString);

  const y = date.getFullYear();
  const m = padZero(date.getMonth() + 1);
  const d = padZero(date.getDate());

  return `${y}년 ${m}월 ${d}일`;
};

export const toRelativeDateFormat = (dateString: string) => {
  const stdDate = new Date(dateString);
  const currentDate = new Date();
  const milliSeconds = currentDate.getTime() - stdDate.getTime();

  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `${Math.floor(seconds)}초 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
};
