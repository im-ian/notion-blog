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

const configs = [[withVanillaExtract]];

const useSentry =
  process.env.SENTRY_ORG &&
  process.env.SENTRY_PROJECT &&
  process.env.SENTRY_AUTH_TOKEN &&
  process.env.SENTRY_DSN;

if (useSentry) {
  // sentry config
  configs.push([
    withSentryConfig,
    {
      silent: true,
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
    },
    {
      widenClientFileUpload: true,
      transpileClientSDK: true,
      tunnelRoute: "/monitoring",
      hideSourceMaps: true,
      disableLogger: true,
      automaticVercelMonitors: true,
    },
  ]);
}

module.exports = configs.reduce(
  (acc, [fn, ...args]) => fn(acc, ...args),
  nextConfig
);
