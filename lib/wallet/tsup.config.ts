import { defineConfig } from 'tsup';

// tsup index.ts --format cjs,esm --dts
export default defineConfig({
    entry: ['./src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    sourcemap: true,
    minify: true,
});