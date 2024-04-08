export type DeviceWithStyle<T> = T | { mobile?: T; tablet?: T; desktop?: T };

export type ThemeWithStyle<T> = T | { darkMode: T; lightMode: T };
