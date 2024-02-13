/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs");
const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");

const nextConfig = {
  images: {
    domains: [
      "www.notion.so",
      "s3-us-west-2.amazonaws.com",
      "prod-files-secure.s3.us-west-2.amazonaws.com",
    ],
  },
};

const withVanillaExtract = createVanillaExtractPlugin();

const configs = [
  // ve config
  [withVanillaExtract],
  // sentry config
  [
    withSentryConfig,
    {
      silent: true,
    },
    {
      widenClientFileUpload: true,
      transpileClientSDK: true,
      tunnelRoute: "/monitoring",
      hideSourceMaps: true,
      disableLogger: true,
      automaticVercelMonitors: true,
    },
  ],
];

module.exports = configs.reduce(
  (acc, [fn, ...args]) => fn(acc, ...args),
  nextConfig,
);
