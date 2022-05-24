const files = require.context('.', false, /\.js$/);

const modules = {};

files.keys().forEach((key) => {
  if (key === './index.js' || key === './http.js') return;

  const reg = /^\.\/(.*)\.js$/;
  const m = key.match(reg);

  if (m[1]) {
    modules[m[1]] = files(key).default;
  }
});

export default modules;
