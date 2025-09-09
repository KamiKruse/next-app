import { FlatCompat } from '@eslint/eslintrc'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            [
              // Side effect imports.
              '^\\u0000',
              // Node.js builtins prefixed with `node:`.
              '^node:',
              // Packages.
              // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
              '^@?\\w',
              // Absolute imports and other imports such as Vue-style `@/foo`.
              // Anything not matched in another group.
              '^[^.]',
              // Relative imports.
              // Anything that starts with a dot.
              '^\\.',
            ],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
]

export default eslintConfig
