import type { BuildContext, ServeResult, BuildOptions } from 'esbuild'
import type { ChildProcess } from 'child_process'

export module state {
  export var options: BuildOptions
  export var context: BuildContext
  export var server: ServeResult
  // @ts-ignore
  export var proccess: ChildProcess = process.__cxa_server
  export var tid: NodeJS.Timeout
}
