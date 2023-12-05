/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import { ChildProcess } from "child_process";
import { props } from "./props";
import { state } from "./state";
export { props, state };
export declare const proccess: ChildProcess;
export declare function server(force?: boolean): ChildProcess;
export declare const kill: (signal: number | NodeJS.Signals) => boolean;
//# sourceMappingURL=run.d.ts.map