/// <reference types="node" />
/// <reference types="node" />
import type { BuildContext, ServeResult, BuildOptions } from "esbuild";
import type { ChildProcess } from "child_process";
export declare namespace state {
    var options: BuildOptions;
    var context: BuildContext;
    var server: ServeResult;
    var proccess: ChildProcess;
    var tid: NodeJS.Timeout;
}
//# sourceMappingURL=state.d.ts.map