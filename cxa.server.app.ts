import * as esbuild from "esbuild";
import * as path from "path";
import * as fs from "fs";
import props from "./cxa.server.props";

module cx.server.app {
	export module state {
		export var context: esbuild.BuildContext;
		export var server: esbuild.ServeResult;
	}

	export function init() {
		fs.mkdirSync(props.libPath, { recursive: true });
		fs.mkdirSync(props.proPath, { recursive: true });
		fs.writeFileSync(
			path.resolve(props.devPath, "index.html"),
			`<h1>crawless (ext) app</h1><pre>${JSON.stringify(props, null, 2)}</pre>`
		);
	}

	export async function startServer() {
		state.context = await esbuild.context(props.build);
		await state.context.watch();
		state.server = await state.context.serve(props.serve);

		console.log(`${startServer.name}`, state);
	}
}

cx.server.app.init();
cx.server.app.startServer();
