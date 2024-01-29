/** @type {import('next').NextConfig} */
const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig = {
  images: {
    domains: [
      "www.notion.so",
      "s3-us-west-2.amazonaws.com",
      "prod-files-secure.s3.us-west-2.amazonaws.com",
    ],
  },
};

module.exports = withVanillaExtract(nextConfig);
