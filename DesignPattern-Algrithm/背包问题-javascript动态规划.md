[Knapsack Problem背包问题-javascript动态规划(dynamic programming)](#top)

- [Problem](#problem)
- [Approach - ZeroOnePack](#approach---zeroonepack)
- [Javascript Algorithm](#javascript-algorithm)
- [各种优化](#%E5%90%84%E7%A7%8D%E4%BC%98%E5%8C%96)

## Problem

- Given a Knapsack of a maximum capacity of W and N items each with its own value and weight, throw in items inside the Knapsack such that the final contents has the maximum value
- The problem often arises in resource allocation where there are financial constraints and is studied in fields such as combinatorics, computer science, complexity theory, cryptography, applied mathematics, and daily fantasy sports
- [Link to the problem page in wiki](https://www.javacodegeeks.com/2014/07/the-knapsack-problem.html)
- 背包问题两点是构建二维数组和通过数组寻找最优解。构建的核心在于比较寻找最大值

**背包问题版本**

- 01背包（ZeroOnePack）: 有N件物品和一个容量为V的背包。每种物品均只有一件,第i件物品的费用是c[i]，价值是w[i]。求解将哪些物品装入背包可使价值总和最大
- 完全背包(CompletePack): 有N种物品和一个容量为V的背包，每种物品都有无限件可用。第i种物品的费用是c[i]，价值是w[i]。求解将哪些物品装入背包可使这些物品的费用总和不超过背包容量，且价值总和最大
- 多重背包(MultiplePack): 有N种物品和一个容量为V的背包。第i种物品最多有n[i]件可用，每件费用是c[i]，价值是w[i]。求解将哪些物品装入背包可使这些物品的费用总和不超过背包容量，且价值总和最大

**经典题型**

- 瀑布流布局怎么让每列高度差最少
- 找零钱问题：有n种面额的硬币，每种硬币无限多，至少用多少枚硬币表示给定的面值M？
- 有一堆石头质量分别为W1,W2,W3…WN.(W＜＝100000,N <30)现在需要你将石头合并为两堆，使两堆质量的差为最小
- 给一个整数的集合，要把它分成两个集合，要两个集合的数的和最接近
- 有一个箱子容量为V（正整数，0≤V≤20000），同时有n个物品（0小于n≤30），每个物品有一个体积（正整数）。要求从n个物品中，任取若干个装入箱内，使箱子的剩余空间为最小
- 数字组合问题: 有m个正整数1-m，找出其中和为n的可能的组合方式, 如：m=5，则5个数分别为1,2,3,4,5，n=5；那么可能的组合有5=1+4和5=2+3和5=5三种组合方式。
- 整数划分问题: 是指把一个正整数n写成如下形式： n=m1+m2+...+mi; （其中mi为正整数，并且1 <= mi <= n），则{m1,m2,...,mi}为n的一个划分。 
  - 如果{m1,m2,...,mi}中的最大值不超过m，即max(m1,m2,...,mi)<=m，则称它属于n的一个m划分
  - 例如当n=5时，他有7个划分，{5},{4,1},{3,2},{3,1,1},{2,2,1},{2,1,1,1},{1,1,1,1,1};     注意5=3+2 和 5=2+3被认为是同一个划分
  
## Approach - ZeroOnePack

```
Knapsack Max weight     :       W = 10 (units)
Total items             :       N = 4
Values of items         :       v[] = {10, 40, 30, 50}
Weight of items         :       w[] = {5, 4, 6, 3}
```

build an Item x Weight array called V (Value array):   `V[N][W] = 4 rows * 10 columns`
  1. N  -> 可选物品
  2. M  -> 背包容量

![](https://i.imgur.com/cBItp6H.png)
![](https://i.imgur.com/HLoHaWI.png)

## Javascript Algorithm

```javascript
//by 司徒正美
 function knapsack(weights, values, W){
    var n = weights.length -1
    var f = [[]]
    for(var j = 0; j <= W; j++){
        if(j < weights[0]){ //如果容量不能放下物品0的重量，那么价值为0
           f[0][j] = 0
        }else{ //否则等于物体0的价值
           f[0][j] = values[0]
        }
    }
    for(var j = 0; j <= W; j++){
        for(var i = 1; i <= n; i++ ){
            if(!f[i]){ //创建新一行
                f[i] = []
            }
            if(j < weights[i]){ //等于之前的最优值
                f[i][j] = f[i-1][j]
            }else{
                f[i][j] = Math.max(f[i-1][j], f[i-1][j-weights[i]] + values[i]) 
            }
        }
    }
    return f[n][W]
}
var a = knapsack([2,2,6,5,4],[6,3,5,4,6],10);
//选择物品: 看到底选择了哪些物品
/* 从f(n−1,W)逆着走向f(0,0)，设i=n-1,j=W，如果f(i,j)==f(i−1,j−wi)+vi说明包里面有第i件物品，因此我们只要当前行不等于上一行的总价值，就能挑出第i件物品，然后j减去该物品的重量，一直找到j = 0就行了 */
//by 司徒正美
function knapsack(weights, values, W){
    var n = weights.length;
    var f = new Array(n);
    f[-1] = new Array(W+1).fill(0);
    var selected = [];
    for(var i = 0 ; i < n ; i++){ //注意边界，没有等号
        f[i] = [] //创建当前的二维数组
        for(var j=0; j<=W; j++){ //注意边界，有等号
            if( j < weights[i] ){ //注意边界， 没有等号
                f[i][j] = f[i-1][j];//case 1
            }else{
                f[i][j] = Math.max(f[i-1][j], f[i-1][j-weights[i]]+values[i]);//case 2
            }
        }
    }
    var j = W, w = 0
    for(var i=n-1; i>=0; i--){
         if(f[i][j] > f[i-1][j]){
             selected.push(i);
             console.log("物品",i,"其重量为", weights[i],"其价格为", values[i]);
             j = j - weights[i];
             w +=  weights[i];
         }
     }
    console.log("背包最大承重为",W," 现在重量为", w, " 总价值为", f[n-1][W]);
    return [f[n-1][W], selected.reverse()];
}
var a = knapsack([2,3,4,1],[2,5,3, 2],5);
console.log();
```

## 各种优化

```javascript
// 1) 合并循环:  现在方法里面有两个大循环，它们可以合并成一个, f[i][j] = Math.max(f[i-1][j], f[i-1][j-weights[i]] + values[i])
function knapsack(weights, values, W){
    var n = weights.length;
    var f = new Array(n);
    for(var i = 0 ; i < n; i++){
        f[i] = []
    }
   for(var i = 0; i < n; i++ ){
       for(var j = 0; j <= W; j++){
            if(i === 0){ //第一行
                f[i][j] = j < weights[i] ? 0 : values[i];
            }else{
                if(j < weights[i]){ //等于之前的最优值
                    f[i][j] = f[i-1][j];
                }else{
                    f[i][j] = Math.max(f[i-1][j], f[i-1][j-weights[i]] + values[i]); 
                }
            }
        }
    }
    return f[n-1][W];
}
// 2) 添加一个−1行, 那么在方程中就不用区分i==0与0>0的情况, 负一行的出现可以大大减少了在双层循环的分支判定。是一个很好的技巧
function knapsack(weights, values, W){
    var n = weights.length;
    var f = new Array(n);
    f[-1] = new Array(W+1).fill(0);
    for(var i = 0 ; i < n ; i++){   //注意边界，没有等号
        f[i] = new Array(W).fill(0);
        for(var j=0; j<=W; j++){    //注意边界，有等号
            if( j < weights[i] ){    //注意边界， 没有等号
                f[i][j] = f[i-1][j];
            }else{
                f[i][j] = Math.max(f[i-1][j], f[i-1][j-weights[i]]+values[i]);//case 3
            }
        }
    }
    return f[n-1][W];
}
//3) 使用滚动数组压缩空间
/*
目前是使用一个i∗j的二维数组来储存每一步的最优解。在求解的过程中，可以发现，当前状态只与前一行的状态有关，那么更之前存储的状态信息已经无用了，可以舍弃的，只需要存储当前状态和前一行状态，所以只需使用2∗j的空间，循环滚动使用，就可以达到跟i∗j一样的效果。这是一个非常大的空间优化
注意，这种解法由于丢弃了之前N行的数据，因此很难解出挑选的物品，只能求最大价值
*/
//by 司徒正美
function knapsack(weights, values, W){
    var n = weights.length;
    var lineA = new Array(W+1).fill(0);
    var lineB = [], lastLine = 0, currLine;
    var f = [lineA, lineB]; //case1 在这里使用es6语法预填第一行
    for(var i = 0; i < n; i++){ 
        currLine = lastLine === 0 ? 1 : 0; //决定当前要覆写滚动数组的哪一行
        for(var j=0; j<=W; j++){
            f[currLine][j] = f[lastLine][j] ;//case2 等于另一行的同一列的值
            if( j>= weights[i] ){                         
                var a = f[lastLine][j];
                var b = f[lastLine][j-weights[i]] + values[i];
                f[currLine][j] = Math.max(a, b);//case3
            }
           
        }
        lastLine = currLine;   //交换行
   }
   return f[currLine][W];
}
var a = knapsack([2,3,4,1],[2,5,3, 2],5);
//还可以用更hack的方法代替currLine, lastLine
//by 司徒正美
function knapsack(weights, values, W){
    var n = weights.length;
    var f = [new Array(W+1).fill(0),[]], now = 1, last;  //case1 在这里使用es6语法预填第一行
    for(var i = 0; i < n; i++){ 
        for(var j=0; j<=W; j++){
            f[now][j] = f[1-now][j]; //case2 等于另一行的同一列的值
            if( j>= weights[i] ){                         
                var a = f[1-now][j];
                var b = f[1-now][j-weights[i]] + values[i];
                f[now][j] = Math.max(a, b);//case3
            }
         }
         last = f[now];
         now = 1-now; // 1 - 0 => 1;1 - 1 => 0; 1 - 0 => 1 ....
   }
   return last[W];
}
var a = knapsack([2,3,4,1],[2,5,3, 2],5);
console.log(a);
```

> Reference
- [js动态规划---背包问题](https://www.cnblogs.com/muamaker/p/9298129.html)
- [javascript背包问题详解](https://segmentfault.com/a/1190000012829866)
- [The Knapsack problem](https://www.javacodegeeks.com/2014/07/the-knapsack-problem.html)
- [dd大牛的背包九讲-背包问题汇总](https://blog.csdn.net/stack_queue/article/details/53544109)
- [背包问题九讲笔记](https://github.com/tianyicui/pack)
- [笔试中背包问题的应用](http://www.itdaan.com/blog/2017/09/09/60de97b871a6c0cca8e4235a79a9e9b1.html)
