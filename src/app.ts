import * as esbuild from 'esbuild'
import * as path from 'path'
import * as fs from 'fs'
import { props } from './props'
import { state } from './state'

export { props, state }

export function init(force = false) {
  const { devPath, libPath, proPath, srcPath } = props

  if (force || !fs.existsSync(props.devPath)) {
    fs.mkdirSync(props.libPath, { recursive: true })
    fs.mkdirSync(props.proPath, { recursive: true })

    fs.writeFileSync(
      path.resolve(props.devPath, 'index.html'),
      `
      <script>var _es = new EventSource('/esbuild').addEventListener('change', (e) => console.log(e.data))</script>
      <h1>crawless (ext) app</h1><pre>${JSON.stringify(props, null, 2)}</pre>`,
    )

    // create empty entry points
    fs.writeFileSync(props.libFile('main.ts'), ``)
    fs.writeFileSync(props.proFile('main.ts'), ``)

    console.log('[app] [init]', { devPath, libPath, proPath, srcPath })
  }

  console.log('[app] [paths]', { devPath, libPath, proPath, srcPath })

  // copy app & run files
  // fs.copyFileSync(props.srcFile('app.js'), props.libFile('app.js'))
  // fs.copyFileSync(props.srcFile('run.js'), props.libFile('run.js'))

  // console.log('[app] synced!', [
  //   props.libFile('app.js'),
  //   props.libFile('run.js'),
  // ])
}

export async function startServer() {
  state.options = props.build
  state.context = await esbuild.context(props.build)
  await state.context.watch()
  state.server = await state.context.serve(props.serve)

  console.log(`[app] ${startServer.name}`, state)

  return state
}

console.log('[app] ELECTRON_RUN_AS_NODE', process.env.ELECTRON_RUN_AS_NODE)
console.log('[app] CXA_SERVER_START', process.env.CXA_SERVER_START)
console.log('[app] CMD', process.execPath, ...process.execArgv)

if (process.env.CXA_SERVER_START) {
  startServer()
  console.log('[app] PROCESS', process.pid)
}
