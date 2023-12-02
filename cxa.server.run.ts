import { spawn } from "child_process";
import { Readable } from "stream";
import props from "./cxa.server.props";

module cxa.server.run {
	function stripAnsiColors(text: string): string {
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
						console.log(stripAnsiColors(line));
					}
				});
		});
	}

	export function start() {
		const appProcess = spawn(props.appPath, [props.runFile], {
			env: {
				/**
				 * Starts the process as a normal Node.js process.
				 * In this mode, you will be able to pass cli options to Node.js as you would when running the normal Node.js executable
				 * @link https://www.electronjs.org/docs/latest/api/environment-variables#electron_run_as_node
				 */
				ELECTRON_RUN_AS_NODE: "1",
			},
		});

		[appProcess.stdout, appProcess.stderr].forEach(redirectOutput);
	}
}

export default cxa.server.run;
