import { spawn } from 'child_process'
import { Readable } from 'stream'
import { props } from './props'
import { state } from './state'

export { props, state }

function stripAnsiColors(text: string): string {
  return text
  return text.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    '',
  )
}

function redirectOutput(stream: Readable) {
  stream.on('data', (data: any) => {
    data
      .toString()
      .split('\n')
      .forEach((line: string) => {
        if (line !== '') {
          console.log(stripAnsiColors(line))
        }
      })
  })
}

export function spawnServer(force = false) {
  clearTimeout(state.tid)

  if (state.proccess) {
    console.log('Process exists')
    if (force) {
      if (!state.proccess.killed) {
        console.log('KILL', state.proccess.kill())
        state.tid = setTimeout(() => spawnServer(true), 500)
      }
    } else return state.proccess
  }

  const appProcess = spawn(props.cmdPath, [props.runFile], {
    env: {
      /**
       * Starts the process as a normal Node.js process.
       * In this mode, you will be able to pass cli options to Node.js as you would when running the normal Node.js executable
       * @link https://www.electronjs.org/docs/latest/api/environment-variables#electron_run_as_node
       */
      ELECTRON_RUN_AS_NODE: '1',
      CXA_SERVER_START: '1',
    },
  })

  state.proccess = appProcess
  state.tid = null

  console.log('[run] PROCESS', state)

  // console.log('appProcess', appProcess)
  ;[appProcess.stdout, appProcess.stderr].forEach(redirectOutput)

  return appProcess
}

export const kill = (signal: number | NodeJS.Signals) =>
  state.proccess.kill(signal)

export const reload = (self: typeof globalThis, id: string) => {
  try {
    const resolved = self.require.resolve(id)
    delete self.require.cache[resolved]
    return self.require(id)
  } catch (e) {
    console.log('load error', e)
  }
}

export function addModulePaths(self: typeof globalThis) {
  try {
    // @ts-ignore
    self.module.paths.push(process.resourcesPath)
    self.module.paths.push(props.libPath)
    self.module.paths.push(props.libFile('node_modules'))

    return self.require('server/run')
  } catch (e) {
    console.log('addModulePaths/Error', e)
  }
}

console.log('[run] CXA_SERVER_SPAWN', process.env.CXA_SERVER_SPAWN)
console.log('[run] process', state.proccess)

// if (process.env.CXA_SERVER_SPAWN) {
//   spawnServer()
// }
