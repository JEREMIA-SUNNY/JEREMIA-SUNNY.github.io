import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: ["implementation/**"],
  },
];

export default eslintConfig;
