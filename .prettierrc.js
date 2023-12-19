module.exports = {
  root: true,
  '*': {
    charset: 'utf-8',
    endOfLine: 'lf',
    insertFinalNewline: true,
    indentStyle: 'space',
    trimTrailingWhitespace: true,
  },
  '*.md': {
    trimTrailingWhitespace: false,
  },
  '*.{tsx,jsx,ts,js}': {
    indentSize: 2,
  },
  '*.php': {
    indentSize: 4,
  },
};
