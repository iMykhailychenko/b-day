import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: process.env.NODE_ENV === 'production' ? '/b-day/' : '/',
    resolve: {
        alias: [{ find: '@app', replacement: path.resolve(__dirname, 'src') }],
    },
});
