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

// src/app.ts
var app_exports = {};
__export(app_exports, {
  init: () => init,
  props: () => props,
  startServer: () => startServer,
  state: () => state
});
module.exports = __toCommonJS(app_exports);
var esbuild = __toESM(require("esbuild"));
var path2 = __toESM(require("path"));
var fs = __toESM(require("fs"));

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

// src/state.ts
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  init,
  props,
  startServer,
  state
});
//# sourceMappingURL=app.js.map
