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
    if (typeof left != 'undefined') this.left = left;
    if (typeof right != 'undefined') this.right = right;
}

Node.prototype.printSelf = function(printChr) {
    if (printChr) console.log(this.chr);
    var hasLeft = typeof this.left != 'undefined';
    var hasRight= typeof this.right != 'undefined';

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

var g = new Node('g');
var f = new Node('f');
var e = new Node('e');
var d = new Node('d', f, g);
var c = new Node('c');
var b = new Node('b', d, e);
var a = new Node('a', b, c);

// core algorithm //
////////////////////

var node = root;
var parents = [];

// traverse to bottom, gathering stack of parents
while (typeof node.left != 'undefined') {
    parents.push(node);
    node = node.left;
}

// reference to soon-to-be root node
root = node;

// perform rotation and inversion
var parent;
while (typeof (parent = parents.pop()) != 'undefined') {
    if (typeof parent.right != 'undefined') {
        node.left = parent.right;
        parent.right = undefined;
    } else node.left = null;
    node.right = parent;
    node = parent;
}
// cleanup
node.left = undefined; node.right = undefined;

root.printSelf(true);
