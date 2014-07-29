/**
 * Source: http://www.careercup.com/question?id=6266917077647360
 * Description:
 * for example, turn these:
 *
 *        1                 1
 *       / \                 / \
 *      2   3            2   3
 *     / \
 *    4   5
 *   / \
 *  6   7
 *
 * into these:
 *
 *        1               1
 *       /               /
 *      2---3         2---3
 *     /
 *    4---5
 *   /
 *  6---7
 *
 * where 6 is the new root node for the left tree, and 2 for the right tree.
 * oriented correctly:
 *
 *     6                   2
 *    / \                   / \
 *   7   4              3   1
 *        / \
 *       5   2
 *            / \
 *          3   1
 **/

// data structures //
/////////////////////

function Node(chr, left, right) {
    this.chr = chr;
    this.left  = (typeof left  == 'undefined') ? null : left;
    this.right = (typeof right == 'undefined') ? null : right;
}

Node.prototype.printSelf = function(printChr) {
    if (printChr) console.log(this.chr);
    var hasLeft = this.left != null;
    var hasRight= this.right != null;

    if (hasLeft && hasRight) {
        console.log('|', '\\');
        console.log(this.left.chr, '', this.right.chr);
    }
    else if (hasLeft) {
        console.log('|');
        console.log(this.left.chr);
    }
    else if (hasRight) {
        console.log('  \\');
        console.log(this.right.chr);
    }
    if (hasLeft) this.left.printSelf(false);
    if (hasRight) this.right.printSelf(false);
}

var g = new Node('g')
  , f = new Node('f')
  , e = new Node('e')
  , d = new Node('d', f, g)
  , c = new Node('c')
  , b = new Node('b', d, e)
  , a = new Node('a', b, c);

var root = a;

// core algorithm //
////////////////////

function invertTree(n) {
    if (n.left == null && n.right == null) {
        return n;
    }
    var newRoot = invertTree(n.left);
    n.left.left = n.right;
    n.left.right = n;
    n.left = null; n.right = null;
    return newRoot;
}

root = invertTree(root);

root.printSelf(true);
