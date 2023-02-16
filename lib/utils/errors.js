"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictingOptions = exports.ArgumentSchemaError = exports.UnknownArgumentError = exports.UnsupportedSerializationError = exports.logWarning = exports.ErrorContext = exports.TypedError = exports.ArgumentTypeError = exports.PositionalArgsError = void 0;
class PositionalArgsError extends Error {
    constructor() {
        super('Contract method calls expect named arguments wrapped in object, e.g. { argName1: argValue1, argName2: argValue2 }');
    }
}
exports.PositionalArgsError = PositionalArgsError;
class ArgumentTypeError extends Error {
    constructor(argName, argType, argValue) {
        super(`Expected ${argType} for '${argName}' argument, but got '${JSON.stringify(argValue)}'`);
    }
}
exports.ArgumentTypeError = ArgumentTypeError;
class TypedError extends Error {
    constructor(message, type, context) {
        super(message);
        this.type = type || 'UntypedError';
        this.context = context;
    }
}
exports.TypedError = TypedError;
class ErrorContext {
    constructor(transactionHash) {
        this.transactionHash = transactionHash;
    }
}
exports.ErrorContext = ErrorContext;
function logWarning(...args) {
    if (!(process === null || process === void 0 ? void 0 : process.env['NEAR_NO_LOGS'])) {
        console.warn(...args);
    }
}
exports.logWarning = logWarning;
class UnsupportedSerializationError extends Error {
    constructor(methodName, serializationType) {
        super(`Contract method '${methodName}' is using an unsupported serialization type ${serializationType}`);
    }
}
exports.UnsupportedSerializationError = UnsupportedSerializationError;
class UnknownArgumentError extends Error {
    constructor(actualArgName, expectedArgNames) {
        super(`Unrecognized argument '${actualArgName}', expected '${JSON.stringify(expectedArgNames)}'`);
    }
}
exports.UnknownArgumentError = UnknownArgumentError;
class ArgumentSchemaError extends Error {
    constructor(argName, errors) {
        super(`Argument '${argName}' does not conform to the specified ABI schema: '${JSON.stringify(errors)}'`);
    }
}
exports.ArgumentSchemaError = ArgumentSchemaError;
class ConflictingOptions extends Error {
    constructor() {
        super('Conflicting contract method options have been passed. You can either specify ABI or a list of view/call methods.');
    }
}
exports.ConflictingOptions = ConflictingOptions;
