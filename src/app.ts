import * as esbuild from "esbuild";
import { Props } from "./props";
import { state } from "./state";

const props = new Props(
	process.env.CLAPP_SERVER_PROPS
		? JSON.parse(process.env.CLAPP_SERVER_PROPS)
		: {}
);
export { props, state };

export async function startServer() {
	state.options = props.build;
	state.context = await esbuild.context(props.build);
	await state.context.watch();
	state.server = await state.context.serve(props.serve);

	console.log(`[app] ${startServer.name}`, process.send);

	return state;
}

if (process.env.CXA_SERVER_START) {
	startServer();
	console.log("[app] Started");
}
