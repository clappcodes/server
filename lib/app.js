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
var app_exports = {};
__export(app_exports, {
  props: () => props,
  startServer: () => startServer,
  state: () => import_state.state
});
module.exports = __toCommonJS(app_exports);
var esbuild = __toESM(require("esbuild"));
var import_props = require("./props");
var import_state = require("./state");
const props = new import_props.Props(
  process.env.CLAPP_SERVER_PROPS ? JSON.parse(process.env.CLAPP_SERVER_PROPS) : {}
);
async function startServer() {
  import_state.state.options = props.build;
  import_state.state.context = await esbuild.context(props.build);
  await import_state.state.context.watch();
  import_state.state.server = await import_state.state.context.serve(props.serve);
  console.log(`[app] ${startServer.name}`, process.send);
  return import_state.state;
}
if (process.env.CXA_SERVER_START) {
  startServer();
  console.log("[app] Started");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  props,
  startServer,
  state
});
//# sourceMappingURL=app.js.map
