import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginSvelte from "eslint-plugin-svelte";
import svelteParser from "svelte-eslint-parser";
import typescriptParser from "@typescript-eslint/parser";

export default tseslint.config(
    { ignores: ["node_modules/", "build/", ".svelte-kit/"] },
    js.configs.recommended,
    ...eslintPluginSvelte.configs['flat/recommended'],
    {
        files: ['**/*.svelte'],
        languageOptions: {
            parser: svelteParser,
            parserOptions: {
                parser: typescriptParser,
                project: './tsconfig.json',
                extraFileExtensions: ['.svelte']
            }
        }
    }

)