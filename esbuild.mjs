import * as esbuild from 'esbuild'
import path from 'path'
import pkg from './package.json' assert { type: "json" }

const arg = process.argv[2]

console.log(`\n${pkg.name} v${pkg.version}\n`)
console.log(process.cwd())


// console.log(process.send)

/**
 * @type {import('esbuild').BuildOptions}
 */
const options = {
    preserveSymlinks: true,
    entryPoints: ["./src/**/*.ts"],
    sourcemap: 'linked',
    outdir: './lib',
    platform: 'node',
    format: "cjs",
    logLevel: "debug",
    banner: {
        js: `// ${pkg.name} v${pkg.version}`
    },
    define: {
        CLAPP_SRC_PATH: `"${path.resolve(process.env.PWD, '../')}"`
    }
}

const ctx = await esbuild.context(options)

if (arg === '--watch') {
    await ctx.watch()
    console.log('Watching...')
} else {
    const start = Date.now()
    await ctx.rebuild()
    const took = Date.now() - start
    console.log(`Build done in ${took}ms`)
    await ctx.dispose()
}

async function onExit(e) {
    ctx.dispose()
    console.log('[onExit]', e)
}

[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
    process.on(eventType, onExit.bind(null, eventType));
})