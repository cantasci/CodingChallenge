
/**
 * 
 * Get solution
 * 
 * @param {*} router_count 
 * @param {*} link_count 
 * @param {*} links 
 */
function solution(router_count, link_count, links) {
  
  const tree = prepareTree(link_count, links);
  const foundedRouters = findRouters(tree, router_count)
  return foundedRouters;
}


/**
 * 
 * Prepare tree
 * 
 * @param {*} numLinks 
 * @param {*} links 
 */
function prepareTree(numLinks, links) {
  let tree = {};
  for(let i=0; i<numLinks; i+=1){
    const key1 = links[i][0];
    const key2 = links[i][1];
    if(typeof(tree[key1]) === 'undefined') {
      tree[key1] = [];
    }

    if(typeof(tree[key2]) === 'undefined') {
      tree[key2] = [];
    }

    tree[key2].push(key1);
    tree[key1].push(key2);
  } 

  return tree;
}


/**
 * 
 * Find reachable routers
 * 
 * @param {*} tree 
 * @param {*} numRouters 
 */
function findRouters(tree, numRouters) {  
  const keys = Object.keys(tree); 
  const result = []; 
  for(let i=0; i<numRouters; i+=1){    
    let visited = [];  
    let disabled = keys[i]; 
    let startPoint = keys[0];
    let reachedRouters = reachableRouter(tree, keys, visited, disabled, startPoint);
    if(reachedRouters.length === numRouters - 1) {
      result.push(parseInt(keys[i]));
    }
  }

  return result;
}


/**
 * 
 * Fetch reachable routers
 * 
 * @param {*} tree 
 * @param {*} numRouters 
 */
function reachableRouter(tree, keys, visited, disabled, key) {
  const children = tree[key]; 
  for(let i=0; i<children.length; i+=1){
    let child = children[i].toString();    
    if(key === child) {
      continue;
    }

    if(disabled === child) {
      continue;
    }
 
    if(visited.find(v => v === child)) {
      continue;
    }

    visited.push(child);
    reachableRouter(tree, keys, visited, disabled, child);   
  }

  return visited;
}


/**
 * 
 * Check result
 * 
 * @param {*} expectedResult 
 * @param {*} foundedResult 
 */
function checkResult(expectedResult, foundedResult) {
  if(expectedResult.length !== foundedResult.length) {
    return false;
  }

  for(let i=0; i<expectedResult.length; i+=1) {
    const key1 = expectedResult[i];
    const key2 = foundedResult[i];
    if(key1 !== key2) {
      return false;
    }
  }
   

  return true;
}
  


 
// Test
const result = solution(7, 7, [[1,2], [1,3], [2,4], [3,4],[3,6],[6,7],[4,5]]);
console.log(result, checkResult(result, [1,2,5,7] ));
