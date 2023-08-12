"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _dec, _class, _class2, _descriptor;
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
var Animal = (_dec = flag('哺乳类'), _dec(_class = (_class2 = /*#__PURE__*/function () {
  function Animal() {
    _classCallCheck(this, Animal);
    _initializerDefineProperty(this, "PI", _descriptor, this);
    _defineProperty(this, "name", 'xxx');
  }
  _createClass(Animal, [{
    key: "say",
    value:
    // 实例属性，es7 新增
    function say() {
      console.log('say');
    }
  }]);
  return Animal;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "PI", [readonly], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 3.14;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "say", [before], Object.getOwnPropertyDescriptor(_class2.prototype, "say"), _class2.prototype)), _class2)) || _class);
function flag(value) {
  return function (constructor) {
    constructor.type = value;
  };
}
function readonly(target, property, descriptor) {
  descriptor.writable = false;
}
function before(target, property, descriptor) {
  var oldSay = descriptor.value;
  descriptor.value = function () {
    console.log('before');
    oldSay.call.apply(oldSay, [target].concat(Array.prototype.slice.call(arguments)));
  };
}
console.log('Animal.type:', Animal.type); // Animal.type: 哺乳类
