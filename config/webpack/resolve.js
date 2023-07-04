const path = require("path");

const absolutePath = basePath =>
  path.resolve(__dirname, "..", "..", `app/javascript/${basePath}`);

module.exports = {
  alias: {
    apis: absolutePath("src/apis"),
    common: absolutePath("src/common"),
    components: absolutePath("src/components"),
    constants: absolutePath("src/constants"),
    contexts: absolutePath("src/contexts"),
    reducers: absolutePath("src/reducers"),
    helpers: absolutePath("src/helpers"),
    neetoui: "@bigbinary/neetoui",
    neetoicons: "@bigbinary/neeto-icons",
    utils: absolutePath("src/utils"),
    hooks: absolutePath("src/hooks"),
    images: absolutePath("src/assets/images"),
    Dashboard: absolutePath("src/components/Dashboard"),
    neetocommons: "@bigbinary/neeto-commons-frontend",
  },
  fallback: {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
  },
  extensions: [
    ".ts",
    ".mjs",
    ".js",
    ".sass",
    ".scss",
    ".css",
    ".module.sass",
    ".module.scss",
    ".module.css",
    ".png",
    ".svg",
    ".gif",
    ".jpeg",
    ".jpg",
  ],
};
