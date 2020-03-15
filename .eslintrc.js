module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'comma-dangle': ['warn', 'always-multiline', { 'functions': 'never' }], // cảnh báo dấu phẩy cuối dòng
    'comma-spacing': 'warn', // cảnh báo khoảng cách trước và sau dấu phẩy
    'eol-last': ['warn', 'always'], // cảnh báo dòng trống cuối file
    'eqeqeq': ['warn', 'always'], // cảnh báo toán tử ba bằng
    'no-cond-assign': ['warn', 'always'], // cảnh báo toán tử gán trong câu lệnh có điều kiện
    'no-console': ['warn'], // cảnh báo sử dụng console
    'no-multiple-empty-lines': ['warn', { 'max': 1 }], // cảnh báo số dòng trống nhiều hơn 1
    'no-trailing-spaces': 'warn', // cảnh báo khoảng trắng ở cuối dòng
    'semi': ['warn', 'always'], // cảnh báo dấu chấm phẩy cuối dòng
    'semi-spacing': ['warn', { 'before': false, 'after': true }], // cảnh báo khoảng cách trước và sau dấu chấm phẩy
    'space-before-blocks': ['warn', { 'functions': 'always', 'keywords': 'always', 'classes': 'always' }], // cảnh báo khoảng trắng trước khối lệnh
    'space-infix-ops': ['warn', { 'int32Hint': false }], // cảnh báo khoảng cách giữa các toán tử
    'object-shorthand': ['warn', 'always'], // cảnh báo đối tượng tốc ký
    'quotes': ['warn', 'single'], // cảnh báo dấu nháy đơn
  },
};
