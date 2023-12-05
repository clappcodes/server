import { props } from './props';
import { state } from './state';
export { props, state };
export declare function init(force?: boolean): void;
export declare function startServer(): Promise<typeof state>;
