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
var props_exports = {};
__export(props_exports, {
  Props: () => Props,
  props: () => props
});
module.exports = __toCommonJS(props_exports);
var path = __toESM(require("path"));
class Props {
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
    return path.resolve(this.libPath, "@clapp/server/lib/app.js");
  }
  get build() {
    return {
      entryPoints: ["./**/*.ts"],
      platform: "node",
      color: true,
      logLevel: "debug",
      format: "cjs",
      outdir: "./"
    };
  }
  get serve() {
    return {
      port: this.appPort,
      servedir: this.devPath
    };
  }
  constructor(init = {}) {
    Object.assign(this, init);
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
}
const props = new Props();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Props,
  props
});
//# sourceMappingURL=props.js.map
