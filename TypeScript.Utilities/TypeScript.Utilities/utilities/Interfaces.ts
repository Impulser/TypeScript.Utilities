module Functions {

    export interface ICompareFunction<T> {
        (a: T, b: T): number;
    }

    export interface IEqualsFunction<T> {
        (a: T, b: T): boolean;
    }

    export interface ILoopFunction<T> {
        (a: T): boolean;
    }
} 