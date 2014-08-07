/// <reference path="../utilities/Utilities.ts" />
/// <reference path="../utilities/Interfaces.ts" />
/// <reference path="Array.ts" />
module Collections {

    module LinkedList {

        export class Node<T> {
            element: T;
            next: Node<T>;
            prev: Node<T>;

            constructor(prev: Node<T>, value: T, next: Node<T>) {
                this.element = value;
                this.prev = prev;
                this.next = next;
            }
        }

        export class LinkedList<T> {
            public firstNode: Node<T> = null;

            private lastNode: Node<T> = null;

            private nodeCount = 0;

            constructor() {
            }

            add(item: T): boolean {
                this.linkLast(item);
                return true;
            }

            ad(item: T, index: number): void {
                if (index === this.nodeCount) {
                    this.linkLast(item);
                } else {
                    this.linkBefore(item, this.node(index));
                }
            }

            node(index: number): Node<T> {
                var node: Node<T>;
                var i: number;
                if (index < (this.nodeCount >> 1)) {
                    node = this.firstNode;
                    for (i = 0; i < index; i++) {
                        node = node.next;
                    }
                    return node;
                } else {
                    node = this.lastNode;
                    for (i = this.nodeCount - 1; i > index; i--) {
                        node = node.prev;
                    }
                    return node;
                }
            }


            first(): T {

                if (this.firstNode !== null) {
                    return this.firstNode.element;
                }
                return undefined;
            }

            last(): T {

                if (this.lastNode !== null) {
                    return this.lastNode.element;
                }
                return undefined;
            }

            elementAtIndex(index: number): T {

                var node = this.nodeAtIndex(index);
                if (node === null) {
                    return undefined;
                }
                return node.element;
            }

            indexOf(item: T, equalsFunction?: Functions.IEqualsFunction<T>): number {

                var equalsF = equalsFunction || Utilities.defaultEquals;
                if (Utilities.isUndefined(item)) {
                    return -1;
                }
                var currentNode = this.firstNode;
                var index = 0;
                while (currentNode !== null) {
                    if (equalsF(currentNode.element, item)) {
                        return index;
                    }
                    index++;
                    currentNode = currentNode.next;
                }
                return -1;
            }

            contains(item: T, equalsFunction?: Functions.IEqualsFunction<T>): boolean {
                return (this.indexOf(item, equalsFunction) >= 0);
            }

            remove(item: T, equalsFunction?: Functions.IEqualsFunction<T>): boolean {
                var equalsF = equalsFunction || Utilities.defaultEquals;
                if (this.nodeCount < 1 || Utilities.isUndefined(item)) {
                    return false;
                }
                var previous: Node<T> = null;
                var currentNode: Node<T> = this.firstNode;

                while (currentNode !== null) {
                    if (equalsF(currentNode.element, item)) {

                        if (currentNode === this.firstNode) {
                            this.firstNode = this.firstNode.next;
                            if (currentNode === this.lastNode) {
                                this.lastNode = null;
                            }
                        } else if (currentNode === this.lastNode) {
                            this.lastNode = previous;
                            previous.next = currentNode.next;
                            currentNode.next = null;
                        } else {
                            previous.next = currentNode.next;
                            currentNode.next = null;
                        }
                        this.nodeCount--;
                        return true;
                    }
                    previous = currentNode;
                    currentNode = currentNode.next;
                }
                return false;
            }

            clear(): void {
                this.firstNode = null;
                this.lastNode = null;
                this.nodeCount = 0;
            }

            equals(other: LinkedList<T>, equalsFunction?: Functions.IEqualsFunction<T>): boolean {
                var eqF = equalsFunction || Utilities.defaultEquals;
                if (!(other instanceof LinkedList)) {
                    return false;
                }
                if (this.size() !== other.size()) {
                    return false;
                }
                return this.equalsAux(this.firstNode, other.firstNode, eqF);
            }

            private equalsAux(n1: Node<T>, n2: Node<T>, eqF: Functions.IEqualsFunction<T>): boolean {
                while (n1 !== null) {
                    if (!eqF(n1.element, n2.element)) {
                        return false;
                    }
                    n1 = n1.next;
                    n2 = n2.next;
                }
                return true;
            }

            removeElementAtIndex(index: number): T {
                if (index < 0 || index >= this.nodeCount) {
                    return undefined;
                }
                var element: T = null;
                if (this.nodeCount === 1) {
                    //First node in the list.
                    element = this.firstNode.element;
                    this.firstNode = null;
                    this.lastNode = null;
                } else {
                    var previous = this.nodeAtIndex(index - 1);
                    if (previous === null) {
                        element = this.firstNode.element;
                        this.firstNode = this.firstNode.next;
                    } else if (previous.next === this.lastNode) {
                        element = this.lastNode.element;
                        this.lastNode = previous;
                    }
                    if (previous !== null) {
                        element = previous.next.element;
                        previous.next = previous.next.next;
                    }
                }
                this.nodeCount--;
                return element;
            }

            forEach(callback: (item: T) => boolean): void {
                var currentNode = this.firstNode;
                while (currentNode !== null) {
                    if (callback(currentNode.element) === false) {
                        break;
                    }
                    currentNode = currentNode.next;
                }
            }

            reverse(): void {
                var previous: Node<T> = null;
                var current: Node<T> = this.firstNode;
                var temp: Node<T> = null;
                while (current !== null) {
                    temp = current.next;
                    current.next = previous;
                    previous = current;
                    current = temp;
                }
                temp = this.firstNode;
                this.firstNode = this.lastNode;
                this.lastNode = temp;
            }

            toArray(): T[] {
                var array: T[] = [];
                var currentNode: Node<T> = this.firstNode;
                while (currentNode !== null) {
                    array.push(currentNode.element);
                    currentNode = currentNode.next;
                }
                return array;
            }

            size(): number {
                return this.nodeCount;
            }

            isEmpty(): boolean {
                return this.nodeCount <= 0;
            }

            toString(): string {
                return Collections.Array.toString(this.toArray());
            }

            private nodeAtIndex(index: number): Node<T> {

                if (index < 0 || index >= this.nodeCount) {
                    return null;
                }
                if (index === (this.nodeCount - 1)) {
                    return this.lastNode;
                }
                var node = this.firstNode;
                for (var i = 0; i < index; i++) {
                    node = node.next;
                }
                return node;
            }

            private linkFirst(item: T): void {
                var f = this.firstNode;
                var newNode = new Node(null, item, f);
                this.firstNode = newNode;
                if (f === null) {
                    this.lastNode = newNode;
                } else {
                    f.prev = newNode;
                }
                this.nodeCount++;
            }

            private linkLast(item: T): void {
                var l = this.lastNode;
                var newNode = new Node(l, item, null);
                this.lastNode = newNode;
                if (l === null) {
                    this.firstNode = newNode;
                } else {
                    l.next = newNode;
                }
                this.nodeCount++;
            }

            private linkBefore(item: T, successor: Node<T>): void {
                var pred = successor.prev;
                var newNode = new Node(pred, item, successor);
                if (pred === null) {
                    this.firstNode = newNode;
                } else {
                    pred.next = newNode;
                }
                this.nodeCount++;
            }

            private unlinkFirst(node: Node<T>): void {
                var element = node.element;
                var next = node.next;
                node.element = null;
                node.next = null;
                this.firstNode = next;
                if (next === null) {
                    this.lastNode = null;
                } else {
                    next.prev = null;
                }
                this.nodeCount--;
            }

            private unlinkLast(node: Node<T>): T {
                var element = node.element;
                var prev = node.prev;
                node.element = null;
                node.prev = null;
                this.lastNode = prev;
                if (prev == null) {
                    this.firstNode = null;
                } else {
                    prev.next = null;
                }

                this.nodeCount--;
                return element;
            }

            private unlink(node: Node<T>): T {
                var element = node.element;
                var next = node.next;
                var prev = node.prev;

                if (prev === null) {
                    this.firstNode = next;
                } else {
                    prev.next = next;
                    node.prev = null;
                }

                if (next === null) {
                    this.lastNode = prev;
                } else {
                    next.prev = prev;
                    node.next = null;
                }

                node.element = null;
                this.nodeCount--;
                return element;
            }

        }
    }
}