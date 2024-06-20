import esbuild from 'esbuild';
import { excludeVendorFromSourceMapPlugin, notifyBuild } from './esbuild-plugin.js';
import pkg from './package.json' assert { type: 'json' };

const watch = process.argv.includes("--watch")

const ctx = await esbuild[watch ? "context" : "build"]({
    logLevel: 'info',
    external: Object.keys(pkg?.dependencies || {}),
    entryPoints: ['index.ts', 'src/**/'],
    entryNames: '[dir]/[name]',
    outdir: 'dist',
    outExtension: { '.js':  '.mjs'},
    bundle: true,
    target: "esnext",
    platform: 'node',
    format: "esm",
    sourcemap: true,
    plugins: [
        excludeVendorFromSourceMapPlugin(['@my-vendor', ...Object.keys(pkg?.devDependencies || {})]),
        notifyBuild()
    ]
})

watch && await ctx.watch()