import { ErrorObject } from 'ajv';
export declare class PositionalArgsError extends Error {
    constructor();
}
export declare class ArgumentTypeError extends Error {
    constructor(argName: string, argType: string, argValue: any);
}
export declare class TypedError extends Error {
    type: string;
    context?: ErrorContext;
    constructor(message?: string, type?: string, context?: ErrorContext);
}
export declare class ErrorContext {
    transactionHash?: string;
    constructor(transactionHash?: string);
}
export declare function logWarning(...args: any[]): void;
export declare class UnsupportedSerializationError extends Error {
    constructor(methodName: string, serializationType: string);
}
export declare class UnknownArgumentError extends Error {
    constructor(actualArgName: string, expectedArgNames: string[]);
}
export declare class ArgumentSchemaError extends Error {
    constructor(argName: string, errors: ErrorObject[]);
}
export declare class ConflictingOptions extends Error {
    constructor();
}
