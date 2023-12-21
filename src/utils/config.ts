import SITE_CONFIG from "../../site.config";

type ConfigType = keyof typeof SITE_CONFIG;

export const getSiteConfig = <T extends ConfigType>(type: T) =>
  SITE_CONFIG[type];
