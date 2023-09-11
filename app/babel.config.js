module.exports = function (api) {
  api.cache(true);
  const nodeEnv = process.env.NODE_ENV || "development";
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      require.resolve("expo-router/babel"),
      [
        "module-resolver",
        {
          root: ["."],
          alias: { "@": "./src" },
          extensions: [".ts", ".tsx", ".js", ".ios.js", ".android.js"],
        },
      ],
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: `.env.${nodeEnv}`,
        },
      ],
    ],
  };
};
