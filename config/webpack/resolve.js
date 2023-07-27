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
    channels: absolutePath("src/channels"),
    reducers: absolutePath("src/reducers"),
    helpers: absolutePath("src/helpers"),
    Dashboard: absolutePath("src/components/Dashboard"),
    images: absolutePath("src/assets/images"),
    hooks: absolutePath("src/hooks"),
    utils: absolutePath("src/utils"),
    neetoui: "@bigbinary/neetoui",
    neetoicons: "@bigbinary/neeto-icons",
    neetoeditor: "@bigbinary/neeto-editor",
    neetocommons: "@bigbinary/neeto-commons-frontend",
    neetomolecules: "@bigbinary/neeto-molecules",
    progressbar: "@ramonak/react-progress-bar",
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
