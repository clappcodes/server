// @clapp/server v1.0.2
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  Props: () => Props,
  app: () => app_exports,
  props: () => props,
  run: () => run_exports,
  state: () => state_exports
});
module.exports = __toCommonJS(main_exports);

// src/props.ts
var path = __toESM(require("path"));
var Props = class {
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
  srcPath = "/Users/serebano/dev/@clapp";
  //process.env.PWD
  get appPath() {
    return path.resolve(this.appRoot, this.appName);
  }
  get resPath() {
    return path.resolve(this.appPath, "Contents/Resources");
  }
  get cmdPath() {
    return path.resolve(this.appPath, "Contents/MacOS/Crawless");
  }
  get devPath() {
    return path.resolve(this.resPath, "app.dev");
  }
  get libPath() {
    return path.resolve(this.devPath, "lib");
  }
  get proPath() {
    return path.resolve(this.devPath, "pro");
  }
  get runFile() {
    return path.resolve(this.libPath, "app.js");
  }
  get build() {
    return {
      entryPoints: [this.proFile("main.ts"), this.libFile("main.ts")],
      bundle: true,
      platform: "node",
      color: true,
      logLevel: "debug",
      target: ["es2020", "node12"],
      outdir: this.devPath,
      external: ["esbuild"]
    };
  }
  get serve() {
    return {
      port: this.appPort,
      servedir: this.devPath
    };
  }
  constructor(init2 = {}) {
    Object.assign(this, init2);
  }
  srcFile(file) {
    return path.resolve(this.srcPath, file);
  }
  libFile(file) {
    return path.resolve(this.libPath, file);
  }
  proFile(file) {
    return path.resolve(this.proPath, file);
  }
};
var props = new Props();

// src/app.ts
var app_exports = {};
__export(app_exports, {
  init: () => init,
  props: () => props,
  startServer: () => startServer,
  state: () => state
});
var esbuild = __toESM(require("esbuild"));
var path2 = __toESM(require("path"));
var fs = __toESM(require("fs"));

// src/state.ts
var state_exports = {};
__export(state_exports, {
  state: () => state
});
var state;
((state2) => {
  state2.proccess = process.__cxa_server;
})(state || (state = {}));

// src/app.ts
function init(force = false) {
  const { devPath, libPath, proPath, srcPath } = props;
  if (force || !fs.existsSync(props.devPath)) {
    fs.mkdirSync(props.libPath, { recursive: true });
    fs.mkdirSync(props.proPath, { recursive: true });
    fs.writeFileSync(
      path2.resolve(props.devPath, "index.html"),
      `
      <script>var _es = new EventSource('/esbuild').addEventListener('change', (e) => console.log(e.data))</script>
      <h1>crawless (ext) app</h1><pre>${JSON.stringify(props, null, 2)}</pre>`
    );
    fs.writeFileSync(props.libFile("main.ts"), ``);
    fs.writeFileSync(props.proFile("main.ts"), ``);
    console.log("[app] [init]", { devPath, libPath, proPath, srcPath });
  }
  console.log("[app] [paths]", { devPath, libPath, proPath, srcPath });
}
async function startServer() {
  state.options = props.build;
  state.context = await esbuild.context(props.build);
  await state.context.watch();
  state.server = await state.context.serve(props.serve);
  console.log(`[app] ${startServer.name}`, state);
  return state;
}
console.log("[app] ELECTRON_RUN_AS_NODE", process.env.ELECTRON_RUN_AS_NODE);
console.log("[app] CXA_SERVER_START", process.env.CXA_SERVER_START);
console.log("[app] CMD", process.execPath, ...process.execArgv);
if (process.env.CXA_SERVER_START) {
  startServer();
  console.log("[app] PROCESS", process.pid);
}

// src/run.ts
var run_exports = {};
__export(run_exports, {
  addModulePaths: () => addModulePaths,
  kill: () => kill,
  props: () => props,
  reload: () => reload,
  spawnServer: () => spawnServer,
  state: () => state
});
var import_child_process = require("child_process");
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
        console.log(stripAnsiColors(line));
      }
    });
  });
}
function spawnServer(force = false) {
  clearTimeout(state.tid);
  if (state.proccess) {
    console.log("Process exists");
    if (force) {
      if (!state.proccess.killed) {
        console.log("KILL", state.proccess.kill());
        state.tid = setTimeout(() => spawnServer(true), 500);
      }
    } else
      return state.proccess;
  }
  const appProcess = (0, import_child_process.spawn)(props.cmdPath, [props.runFile], {
    env: {
      /**
       * Starts the process as a normal Node.js process.
       * In this mode, you will be able to pass cli options to Node.js as you would when running the normal Node.js executable
       * @link https://www.electronjs.org/docs/latest/api/environment-variables#electron_run_as_node
       */
      ELECTRON_RUN_AS_NODE: "1",
      CXA_SERVER_START: "1"
    }
  });
  state.proccess = appProcess;
  state.tid = null;
  console.log("[run] PROCESS", state);
  [appProcess.stdout, appProcess.stderr].forEach(redirectOutput);
  return appProcess;
}
var kill = (signal) => state.proccess.kill(signal);
var reload = (self, id) => {
  try {
    const resolved = self.require.resolve(id);
    delete self.require.cache[resolved];
    return self.require(id);
  } catch (e) {
    console.log("load error", e);
  }
};
function addModulePaths(self) {
  try {
    self.module.paths.push(process.resourcesPath);
    self.module.paths.push(props.libPath);
    self.module.paths.push(props.libFile("node_modules"));
    return self.require("server/run");
  } catch (e) {
    console.log("addModulePaths/Error", e);
  }
}
console.log("[run] CXA_SERVER_SPAWN", process.env.CXA_SERVER_SPAWN);
console.log("[run] process", state.proccess);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Props,
  app,
  props,
  run,
  state
});
//# sourceMappingURL=main.js.map
