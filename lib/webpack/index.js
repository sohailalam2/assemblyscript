var base64 = require("@protobufjs/base64");

function loader(buffer) {
  var data = base64.encode(buffer, 0, buffer.length);
  var code = [
    'var data = "' + data + '", wasm;',
    'module.exports = function(options) {',
    '  if (!wasm) wasm = require("@assemblyscript/webpack/decode")(data);',
    '  return new WebAssembly.Instance(new WebAssembly.Module(wasm), options && options.imports || {}).exports;',
    '};'
  ];
  return code.join("\n") + "\n";
}

loader.raw = true;

Object.defineProperties(module.exports = loader, {
  __esModule: { value: true },
  default: { value: loader }
});