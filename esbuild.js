const esbuild = require('esbuild')
const path = require('path')
const pkg = require('./package.json')

const arg = process.argv[2]

console.log(`\n${pkg.name} v${pkg.version}\n`)
console.log('js', __dirname, process.cwd())


// console.log(process.send)

let ctx;

const startPlugin = () => {
    return {
        name: "startPlugin",
        setup(build) {
            build.onStart(() => {
                console.log('build started')
                process.send('onStart')
            })

            build.onEnd((res) => {
                console.log('onEnd', res)
                process.send('onEnd')
            });
        },
    };
};

async function start() {
    ctx = await esbuild.context({
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
        },
        // watch: true,
        plugins: [startPlugin()],

    })

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

}

start()

process.on('message', (msg) => {
    console.log('esbuildOnMessage', msg)
})

async function onExit(e) {
    ctx.dispose()
    console.log('[onExit]', e)
}

[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
    process.on(eventType, onExit.bind(null, eventType));
})