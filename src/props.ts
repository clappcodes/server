import * as esbuild from "esbuild";
import * as path from "path";
import * as fs from "fs";

export class Props {
	version = 1;

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
	appName = "Crawless.app";

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
		return path.resolve(this.resPath, "dev");
	}
	get libPath(): string {
		return path.resolve(this.devPath, "lib"); // library files
	}
	get proPath(): string {
		return path.resolve(this.devPath, "pro"); // project files
	}
	get runFile(): string {
		return path.resolve(this.resPath, "node_modules/@clapp/server/lib/app.js");
	}

	get build(): esbuild.BuildOptions {
		return {
			preserveSymlinks: true,
			entryPoints: ["./**/*.ts"],
			platform: "node",
			color: true,
			logLevel: "debug",
			format: "cjs",
			outdir: "./",
		};
	}

	get serve(): esbuild.ServeOptions {
		return {
			port: this.appPort,
			servedir: fs.realpathSync(this.devPath),
		};
	}

	constructor(init = {}) {
		Object.assign(this, init);
	}

	resFile(file: string) {
		return path.resolve(this.resPath, file);
	}

	modFile(file: string) {
		return path.resolve(this.resPath, "node_modules", file);
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
