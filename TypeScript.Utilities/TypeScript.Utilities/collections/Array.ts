

/// <reference path="../utilities/Utilities.ts" />
/// <reference path="../utilities/Interfaces.ts" />
module Collections {

    module Array {
        export function toString<T>(array: T[]): string {
            return '[' + array.toString() + ']';
        }
    }
}