import {defineConfig} from 'vite'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'


// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
        esbuildOptions: {
            plugins: [
                NodeModulesPolyfillPlugin(),
            ],
        }
    }
})
