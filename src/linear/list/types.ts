import type { Collection } from "types";
import type { StackADT } from "linear";
import type { Iterable } from "iterable";

export interface ComparableFn<T> {
	(data: T): boolean;
}

export type ElementOrList<T, R extends number | undefined> = R extends number
	? ListADT<T>
	: T | null;

/**
 * These functions treat a list xs as a indexed collection, with indices ranging
 * from 0 to length xs - 1.
 */
export interface Indexing<T> {
	/**
	 * Get the index of the first apparition of the element or -1 if isn't there
	 *
	 * @param {T} data Data to be compared to
	 */
	indexOf(data: T): number;
	/**
	 * Get the element at given index throwing a error if it's out of range
	 *
	 * It gets any integer value and returns the corresponding data. itemAt can
	 * read negative values as well
	 *
	 * @param index
	 */
	at(index: number): T | null;
	/**
	 * O(n). Replaces element in the list at specified index. Index can be
	 * negative or positive
	 *
	 * @example <caption>Insert element with positive index</caption>
	 * const l = new List(1, 2, 3)
	 * l.insert(2, 10) // gives:  [1, 2, 10]
	 *
	 * @example <caption>Removing with negative index</caption>
	 * const l = new List(1, 2, 3)
	 * l.insert(-1, 10) // gives:  [1, 2, 10]
	 * l.insert(-3, 20) // gives:  [20, 2, 10]
	 *
	 * @example <caption>Removing out of index element</caption>
	 * const l = new List(1, 2, 3);
	 * l.remove(-4) // returns null
	 * l.remove(3) // returns null
	 *
	 * @todo definir o que acontece quando se inserir para lista vazia
	 *
	 * @param {number} index
	 * @return {?T}
	 */
	insert(index: number, ...items: T[]): T[] | T | null;
	/**
	 * O(n). Remove permanently element from the list. Index can be negative or
	 * positive
	 *
	 * @example <caption>Remove with positive index</caption>
	 * const l = new List(1, 2, 3)
	 * l.remove(2) // returns 3
	 * console.log(l) // returns [1, 2]
	 *
	 * @example <caption>Removing with negative index</caption>
	 * const l = new List(1, 2, 3)
	 * l.remove(-1) // returns 3
	 * l.remove(-2) // returns  1
	 * console.log(l) // return [2]
	 *
	 * @example <caption>Removing out of index element</caption>
	 * const l = new List(1, 2, 3);
	 * l.remove(-4) // returns null
	 * l.remove(3) // returns null
	 *
	 * @example <caption>Removing empty list</caption>
	 * const l = new List();
	 * l.remove(0) // Error: Underflow
	 *
	 *	@throws {Underflow}
	 * @param {number} index
	 * @return {?T}
	 */
	removeAt(index: number): T | null;
}

export interface Set<T> {
	/**
	 * O(n). Delete the first occurrence of `data` from its list argument
	 * @param {T} data
	 * @return {?T}
	 */
	remove(data: T): T | null;
	remove(comparator: ComparableFn<T>): T | T[];
}

export interface Sublist<T> {
	take(length: number): ListADT<T>;
	drop(length: number): ListADT<T>;
}

export interface Ordered<T> {
	insert(comparator: ComparableFn<T>, ...data: T[]): T | T[];
}

export interface ListADT<T> extends Collection, StackADT<T>, Iterable<T> {
	/**
	 * O(n). Extract the first element of a list, which must be non-empty. Alias
	 * for {@link Stack.top}. For no argument it gives O(1)
	 *
	 * @example <caption>Head of list</caption>
	 * const l = new List(1, 2, 3)
	 * l.head() // returns 1
	 *
	 * @example <caption>Head of empty list returns empty list</caption>
	 * const l = new List()
	 * console.log(l) // List: []
	 *
	 * @example <caption>Fist n elements</caption>
	 * const l = new List(1, 2, 3, 4)
	 * l.head(3) // returns [1, 2, 3]
	 *
	 * @example <caption>Negative length throws ArgumentError</caption>
	 * const l = new List(1, 2, 3)
	 * l.head(-1) // Error: ArgumentError negative array size
	 *
	 * @throws {ArgumentError}
	 * @param length - aosdkasd
	 */
	head<L extends number | undefined>(length: L): ElementOrList<T, L>;
	/**
	 * O(n). Extract the last element of a list, which must non-empty. For no
	 * argument it gives O(1)
	 *
	 * @example <caption>Last element of list</caption>
	 * const l = new List(1, 2, 3)
	 * l.last() // returns 1
	 *
	 * @example <caption>Empty list throws Underflow</caption>
	 * const l = new List()
	 * l.last() // Error: Underflow
	 *
	 * @example <caption>Last n elements</caption>
	 * const l = new List(1, 2, 3, 4)
	 * l.last(3) // returns [1, 2, 3]
	 *
	 * @example <caption>Negative length throws IndexOutOfRange</caption>
	 * const l = new List(1, 2, 3)
	 * l.last(-1) // Error: IndexOutOfRange
	 *
	 * @throws {@link Underflow}
	 * Throws when list is empty
	 *
	 * @throws {@link ArgumentError}
	 * Throws when length is negative
	 */
	last<L extends number | undefined>(length: L): ElementOrList<T, L>;
	/**
	 * O(1). Extract the elements after the head of non-empty list
	 *
	 * @throws {@link Underflow}
	 *
	 * @example
	 * extracting tail
	 *
	 * const l = new List(1, 2, 3, 4);
	 * l.tail(); // [2, 3, 4]
	 *
	 * @example
	 * tail is empty list when single item is stored
	 * const l = new List(1);
	 * l.tail(); // []
	 *
	 * @example
	 * throws Underflow when list is empty
	 *
	 * const l = new List();
	 * l.tail(); // Error: Underflow
	 *
	 */
	tail(): ListADT<T>;
	/**
	 * O(n). Create list with all elements but the last
	 *
	 * It's quite similar to {@link ListADT.last} but remove the last item
	 *
	 * @example
	 *
	 * ```
	 * const l = new List(1, 2, 3);
	 * l.init() // returns [1, 2]
	 *
	 * const l = new List(1);
	 * l.init() // returns []
	 *
	 * const l = new List();
	 * l.init() // Error: Underflow
	 * ```
	 *
	 * @throws {@link Underflow}
	 * When list is empty
	 */
	init(): ListADT<T>;
	/**
	 * O(1). Remove the first element of non-empty list and return the value
	 *
	 * @example <caption>Removing first element</caption>
	 * const l = new List(1, 2, 3)
	 * l.shift() // returns 1 -> List: [1, 2]
	 *
	 * @example <caption>Throws Underflow when list is empty</caption>
	 * const l = new List()
	 * l.shift() // Error: Underflow
	 *
	 * @example <caption>Leaves empty list</caption>
	 * const l = new List(1)
	 * l.shift() // returns 1 -> List: []
	 *
	 * @throws {Underflow}
	 * Throws when empty
	 */
	shift(): T;
	/**
	 * O(1). Insert multiple elements at the end, keeping the specified order
	 * Also a alias for {@link Stack.push} with multiple items
	 *
	 * @example <caption>Modifying list</caption>
	 * const l = new List(1, 2, 3)
	 * l.append(4, 5, 6) // gives [1, 2, 3, 4, 5, 6];
	 *
	 */
	append(...items: T[]): this;
	/**
	 * O(1). Adds element	 to the beginning of an array and returns the new length
	 * of the array.
	 *
	 * @example <caption>Modify list</caption>
	 * const l = new List()
	 * l.prepend(1, 2, 3) // > List [1, 2, 3]
	 *
	 */
	prepend(...items: T[]): this;
}
