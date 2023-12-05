// @clapp/server v1.0.2
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var run_exports = {};
__export(run_exports, {
  kill: () => kill,
  proccess: () => proccess,
  props: () => import_props.props,
  server: () => server,
  state: () => import_state.state
});
module.exports = __toCommonJS(run_exports);
var import_child_process = require("child_process");
var import_props = require("./props");
var import_state = require("./state");
const proccess = import_state.state.proccess;
function stripAnsiColors(text) {
  return text;
  return text.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    ""
  );
}
function redirectOutput(stream) {
  stream.on("data", (data) => {
    data.toString().split("\n").forEach((line) => {
      if (line !== "") {
        console.log(line);
      }
    });
  });
}
function server(force = false) {
  clearTimeout(import_state.state.tid);
  if (import_state.state.proccess && !import_state.state.proccess.__closed) {
    console.log("Process exists");
    if (force) {
      console.log("KILL", import_state.state.proccess.kill());
      import_state.state.tid = setTimeout(() => server(true), 500);
    } else {
      return import_state.state.proccess;
    }
  }
  const child = (0, import_child_process.spawn)(import_props.props.cmdPath, [import_props.props.runFile], {
    cwd: import_props.props.proPath,
    env: {
      CLAPP_SERVER_PROPS: JSON.stringify(import_props.props),
      /**
       * Starts the process as a normal Node.js process.
       * In this mode, you will be able to pass cli options to Node.js as you would when running the normal Node.js executable
       * @link https://www.electronjs.org/docs/latest/api/environment-variables#electron_run_as_node
       */
      ELECTRON_RUN_AS_NODE: "1",
      CXA_SERVER_START: "1"
    }
  });
  import_state.state.proccess = child;
  import_state.state.tid = null;
  console.log("[run] success", import_state.state.proccess.pid);
  [child.stdout, child.stderr].forEach(redirectOutput);
  child.on("error", (error) => {
    child.__closed = true;
    console.error(`[run] error: ${error.message}`);
  });
  child.on("close", (code) => {
    child.__closed = true;
    console.log(`[run] child process exited with code ${code}`);
  });
  return child;
}
const kill = (signal) => import_state.state.proccess.kill(signal);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  kill,
  proccess,
  props,
  server,
  state
});
//# sourceMappingURL=run.js.map
