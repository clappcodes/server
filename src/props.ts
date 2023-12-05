import * as esbuild from "esbuild";
import * as path from "path";

export class Props {
	/**
	 * ESBuild serve port
	 */
	appPort = 1212;
	/**
	 * Applications root dir
	 */
	appRoot = "/Applications";
	/**
	 * Application name
	 */
	appName = "Crawless28Nov.app";

	/**
	 * Source path
	 */
	// @ts-ignore
	srcPath = CLAPP_SRC_PATH; //process.env.PWD

	get appPath(): string {
		return path.resolve(this.appRoot, this.appName);
	}
	get resPath(): string {
		return path.resolve(this.appPath, "Contents/Resources");
	}
	get cmdPath(): string {
		return path.resolve(this.appPath, "Contents/MacOS/Crawless");
	}
	get devPath(): string {
		return path.resolve(this.resPath, "app.dev");
	}
	get libPath(): string {
		return path.resolve(this.devPath, "lib"); // library files
	}
	get proPath(): string {
		return path.resolve(this.devPath, "pro"); // project files
	}
	get runFile(): string {
		return path.resolve(this.libPath, "app.js");
	}

	get build(): esbuild.BuildOptions {
		return {
			entryPoints: [this.proFile("main.ts"), this.libFile("main.ts")],
			bundle: true,
			platform: "node",
			color: true,
			logLevel: "debug",
			target: ["es2020", "node12"],
			outdir: this.devPath,
			external: ["esbuild"],
		};
	}

	get serve(): esbuild.ServeOptions {
		return {
			port: this.appPort,
			servedir: this.devPath,
		};
	}

	constructor(init = {}) {
		Object.assign(this, init);
	}

	srcFile(file: string) {
		return path.resolve(this.srcPath, file);
	}

	libFile(file: string) {
		return path.resolve(this.libPath, file);
	}

	proFile(file: string) {
		return path.resolve(this.proPath, file);
	}
}

export const props = new Props();
