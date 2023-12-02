import * as esbuild from "esbuild";
import * as path from "path";

module cxa.server.props {
	export const appName = "Crawless28Nov.app";

	export const appPath = path.resolve("/Applications", appName);
	export const resPath = path.resolve(appPath, "Contents/Resources");
	export const runPath = path.resolve(appPath, "Contents/MacOS/Crawless");
	export const devPath = path.resolve(resPath, "app.ext");
	export const libPath = path.resolve(devPath, "lib"); // library files
	export const proPath = path.resolve(devPath, "pro"); // project files
	export const runFile = path.resolve(libPath, "cxa.server.app.js");

	export const libFile = (file: string) => path.resolve(libPath, file);
	export const proFile = (file: string) => path.resolve(proPath, file);

	export const build: esbuild.BuildOptions = {
		entryPoints: [
			proFile("index.ts"),
			libFile("index.ts"),
			libFile("cx.server.ts"),
			libFile("cx.server.props.ts"),
			libFile("cx.server.app.ts"),
		],
		bundle: true,
		platform: "node",
		color: true,
		logLevel: "debug",
		target: ["es2020", "node12"],
		outdir: devPath,
	};

	export const serve: esbuild.ServeOptions = {
		port: 1212,
		servedir: devPath,
	};
}

export default cxa.server.props;
