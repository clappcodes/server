import * as esbuild from "esbuild";
export declare class Props {
    /**
     * ESBuild serve port
     */
    appPort: number;
    /**
     * Applications root dir
     */
    appRoot: string;
    /**
     * Application name
     */
    appName: string;
    /**
     * Source path
     */
    srcPath: any;
    get appPath(): string;
    get resPath(): string;
    get cmdPath(): string;
    get devPath(): string;
    get libPath(): string;
    get proPath(): string;
    get runFile(): string;
    get build(): esbuild.BuildOptions;
    get serve(): esbuild.ServeOptions;
    constructor(init?: {});
    srcFile(file: string): string;
    libFile(file: string): string;
    proFile(file: string): string;
}
export declare const props: Props;
