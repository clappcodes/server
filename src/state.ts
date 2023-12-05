import type { BuildContext, ServeResult, BuildOptions } from "esbuild";
import type { ChildProcess } from "child_process";

export module state {
	export var options: BuildOptions;
	export var context: BuildContext;
	export var server: ServeResult;
	export var proccess: ChildProcess;
	export var tid: NodeJS.Timeout;

	Object.defineProperty(state, "proccess", {
		get: () => globalThis.__clapp_server_proccess,
		set: (val) => (globalThis.__clapp_server_proccess = val),
		enumerable: true,
		configurable: true,
	});
}
//
