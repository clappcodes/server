import { ChildProcess, spawn } from "child_process";
import { Readable } from "stream";
import { props } from "./props";
import { state } from "./state";

export { props, state };
export const proccess = state.proccess;

function stripAnsiColors(text: string): string {
	return text;
	return text.replace(
		/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
		""
	);
}

function redirectOutput(stream: Readable) {
	stream.on("data", (data: any) => {
		data
			.toString()
			.split("\n")
			.forEach((line: string) => {
				if (line !== "") {
					console.log(line);
				}
			});
	});
}

export function server(force = false) {
	clearTimeout(state.tid);
	// @ts-ignore
	if (state.proccess && !state.proccess.__closed) {
		console.log("Process exists");
		if (force) {
			console.log("KILL", state.proccess.kill());
			state.tid = setTimeout(() => server(true), 500);
		} else {
			return state.proccess;
		}
	}

	const child = spawn(props.cmdPath, [props.runFile], {
		cwd: props.proPath,
		env: {
			CLAPP_SERVER_PROPS: JSON.stringify(props),
			/**
			 * Starts the process as a normal Node.js process.
			 * In this mode, you will be able to pass cli options to Node.js as you would when running the normal Node.js executable
			 * @link https://www.electronjs.org/docs/latest/api/environment-variables#electron_run_as_node
			 */
			ELECTRON_RUN_AS_NODE: "1",
			CXA_SERVER_START: "1",
		},
	});

	state.proccess = child;
	state.tid = null;

	console.log("[run] success", state.proccess.pid);

	// console.log('appProcess', appProcess)
	[child.stdout, child.stderr].forEach(redirectOutput);

	child.on("error", (error) => {
		// @ts-ignore
		child.__closed = true;
		console.error(`[run] error: ${error.message}`);
	});

	child.on("close", (code) => {
		// @ts-ignore
		child.__closed = true;
		console.log(`[run] child process exited with code ${code}`);
	});

	return child;
}

export const kill = (signal: number | NodeJS.Signals) =>
	state.proccess.kill(signal);
