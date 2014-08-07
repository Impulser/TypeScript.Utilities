module Utilities {

    var // Prototypes
        ArrayProto = Array.prototype,
        ObjProto = Object.prototype,
        FuncProto = Function.prototype;

    var // Functions
        push = ArrayProto.push,
        slice = ArrayProto.slice,
        concat = ArrayProto.concat,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;

    export function has(obj: any, key: string): boolean {
        return obj != null && hasOwnProperty.call(obj, key);
    }

    export function isUndefined(obj: any): boolean {
        return obj === void 0;
    }

    export function isNull(obj: any): boolean {
        return obj === null;
    }

    export function isObject(obj: any): boolean {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    }

    export function isFunction(func: any): boolean {
        return typeof func === 'function';
    }

    export function isBoolean(obj: any) : boolean {
        return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
    }

    export function isString(obj: any): boolean {
        return toString.call(obj) === '[object String]';
    }

    export function defaultCompare<T>(a: T, b: T): number {
        return a < b ? -1 : (a === b ? 0 : 1);
    }

    export function defaultEquals<T>(a: T, b: T): boolean {
        return a === b;
    }

    export function defaultToString(item: any): string {
        if (item === null) {
            return 'COLLECTION_NULL';
        } else if (Utilities.isUndefined(item)) {
            return 'COLLECTION_UNDEFINED';
        } else if (Utilities.isString(item)) {
            return item;
        } else {
            return item.toString();
        }
    }

    export function makeString<T>(item: T, join: string = ","): string {
        if (item === null) {
            return 'COLLECTION_NULL';
        } else if (Utilities.isUndefined(item)) {
            return 'COLLECTION_UNDEFINED';
        } else if (Utilities.isString(item)) {
            return item.toString();
        } else {
            var toret = "{";
            var first = true;
            for (var prop in item) {
                if (item.hasOwnProperty(prop)) {
                    if (first)
                        first = false;
                    else
                        toret = toret + join;
                    toret = toret + prop + ":" + item[prop];
                }
            }
            return toret + "}";
        }
    }
}