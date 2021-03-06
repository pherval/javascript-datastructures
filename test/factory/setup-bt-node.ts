import BTNode from "tree/binary-tree/node";

/**
 *
 * creates the tree
 *     10
 * 		/  \
 *   20   30
 *  /
 * 40
 *
 * @return {Record<string, BTNode<number>>}
 */
export function setupBTNode(): Record<string, BTNode<number>> {
	const root = new BTNode(10);
	root.insertLeft(20);
	root.insertRight(30);

	const left = root.left as NonNullable<BTNode<number>>;
	const right = root.right as NonNullable<BTNode<number>>;

	left.insertLeft(40);

	const leaf = left.left as NonNullable<BTNode<number>>;

	return {
		root,
		left,
		right,
		leaf,
	};
}
