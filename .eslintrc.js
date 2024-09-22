module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  rules: {
    // Agrega tus reglas personalizadas aquí
    'semi': 'error', // Punto y coma al final de las sentencias
    'quotes': ['error', 'single'], // Comillas simples para cadenas de texto
    'indent': ['error', 2], // Indentación de 2 espacios
    'no-unused-vars': 'warn', // Advertencia para variables no utilizadas
    'no-console': [
      'warn',
      { allow: ['error', 'info'] }, // Permite console.error, pero advierte sobre otros usos de console
    ],
    'no-var': 'error', // Prefiere el uso de let o const en lugar de var
    'prefer-const': 'error', // Prefiere const para variables que no se reasignan
  },
  ignorePatterns: ['node_modules/'], // Ignorar node_modules
  env: {
    node: true, // Especifica que el entorno es Node.js
  },
};