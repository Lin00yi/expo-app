/** @type {import('eslint').Linter.FlatConfig} */
const config = [
  {
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
      },
      parser: require('@babel/eslint-parser'), // 使用 @babel/eslint-parser
      parserOptions: {
        requireConfigFile: false, // 允许不使用 Babel 配置文件
        ecmaVersion: 2020, // 根据需要设置 ECMAScript 版本
        sourceType: 'module', // 使用模块导入
      },
    },
    files: ['**/*.js', '**/*.jsx'], // 根据你的文件类型进行设置
    rules: {
      // 你的自定义规则
    },
  },
  {
    plugins: {
      prettier: require('eslint-plugin-prettier'), // 使用 prettier 插件
      react: require('eslint-plugin-react'), // 使用 react 插件
    },
    languageOptions: {
      // 这里不需要 plugins，直接在 rules 中配置
    },
    files: ['**/*.js', '**/*.jsx'], // 根据你的文件类型进行设置
    rules: {
      'react/react-in-jsx-scope': 'off', // 如果你在使用 React 17 或以上版本
      'prettier/prettier': 'error', // 将 Prettier 的规则添加到这里
    },
  },
];

module.exports = config;
