/*
Have the function TreeConstructor(strArr) take the array of strings stored in strArr, which will contain pairs of integers in the following format: (i1,i2), 
where i1 represents a child node in a tree and the second integer i2 signifies that it is the parent of i1. 
For example: if strArr is ["(1,2)", "(2,4)", "(7,2)"], then this forms the following tree:
    4
   /
  2
 /  \
1    7
which you can see forms a proper binary tree. Your program should, in this case, return the string true 
  because a valid binary tree can be formed. If a proper binary tree cannot be formed with the integer pairs, 
    then return the string false . All of the integers within the tree will be unique, which means there can only be one node in the tree with the given integer value.
*/

function TreeConstructor(strArr) {
  const pairs = strArr.map(pair => pair.match(/\d+/g));
  let tree = {};

  pairs.forEach((p)=>{
    const child = p[0];
    const parent = p[1];
    tree[child] = tree[child] || {parent: null, children: []};
    tree[parent] = tree[parent] || {parent: null, children: []};
    tree[child].parent = parent;
    tree[parent].children.push(child);
  });

  if (Object.values(tree).every(node => node.children.length <= 2) &&
    Object.values(tree).filter(node => node.parent === null).length === 1) {
    return true;
  } else return false;
}
