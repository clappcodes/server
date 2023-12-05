/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import { props } from './props';
import { state } from './state';
export { props, state };
export declare function spawnServer(force?: boolean): import("child_process").ChildProcess;
export declare const kill: (signal: number | NodeJS.Signals) => boolean;
export declare const reload: (self: typeof globalThis, id: string) => any;
export declare function addModulePaths(self: typeof globalThis): any;
