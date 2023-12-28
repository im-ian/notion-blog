export const classNames = (classes: (string | undefined | null)[]) =>
  classes
    .filter((cls) => Boolean(cls))
    .join(" ")
    .trim();
