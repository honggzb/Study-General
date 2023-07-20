[机器学习之逻辑回归（Logistic Regression）模型](#top)

- [概念](#概念)
- [混淆矩阵](#混淆矩阵)
  - [二分类混淆矩阵](#二分类混淆矩阵)
  - [一级指标](#一级指标)
  - [二级指标](#二级指标)
  - [三级指标（F-score）](#三级指标f-score)
  - [F1-score](#f1-score)

## 概念

- 逻辑回归是一种广义的线性回归模型，主要用于解决二分类问题。所谓二分类问题，就是比如判断一个邮件是否是垃圾邮件、根据某些特征判断肿瘤是否为恶性肿瘤等问题.
- 当对二分类问题进行回归分析时，采用传统的线性回归函数进行拟合并不是一个好的方案。于是将使用另一种函数——Sigmoid函数
  - Sigmoid函数又称为Logistic函数
  - Sigmoid函数表达式:  $g(z) = \frac{1}{1+e^{-z}}$
  - Sigmoid函数输出值在(0,1)之间，而且可以解决离群点对拟合线性回归的影响

## 混淆矩阵

- 混淆矩阵（又称误差矩阵）是评判模型结果的指标，属于模型评估的一部分。混淆矩阵多用于判断分类器的优劣，适用于分类型数据模型。如分类树、逻辑回归、线性判别分析等方法。
- 除了混淆矩阵外，常见的分类型模型判别标准还有ROC曲线和AUC面积

### 二分类混淆矩阵

```
------------------------------------------------------------------
                          |           真实类别
                          |---------------------------------------                 
                          | 正类(Positive)    | 负类(Negative)
------------------------------------------------------------------ 
        | 正类(Positive)  | True Positive(TP) | False Positive(FP)
预测类别 |--------------------------------------------------------- 
        | 负类(Negative)  | False Negative(FN) | True Negative(TN)
------------------------------------------------------------------
```

### 一级指标

- TP(True Positive，真阳性)：样本的真实类别是正类，并且模型预测的结果也是正类
- FP(False Positive，假阳性)：样本的真实类别是负类，但是模型将其预测成为正类
- TN(True Negative，真阴性)：样本的真实类别是负类，并且模型将其预测成为负类
- FN(False Negative，假阴性)：样本的真实类别是正类，但是模型将其预测成为负类

### 二级指标

- **准确率（Accuracy）**: 分类模型所有判断正确的结果占总观测值的比重。（准确率是针对整个模型）
  - $Acc = \frac{TP+TN}{TP+TN+FP+FN}$
- **精确率（Precision）**: 在模型预测为正类的所有结果中，模型预测正确的比重
  - $Pc = \frac{TP}{TP+FP}$
- **召回率（Recall）**: 在真实值为正类的所有结果中，模型预测正确的比重(又称灵敏度Sensitivity)
  - $Rc = \frac{TP}{TP+FN}$
- **特异度（Specificity）**: 在真实值为负类的所有结果中，模型预测正确的比重(特异度用的比较少)
  - $Sc = \frac{TN}{TN+FP}$

### 三级指标（F-score）

- 通过二级指标可以引出三级指标F Score。
- F-Score是可以综合考虑精确度（Precision）和召回率（Recall）的调和值，公式如下：
  - $F Score = (1 + \beta^2)\frac{Precision \times Recall}{\beta^2 + Recall}$
  - 当我们认为精确度更重要，调整$\beta< 1$
  - 当我们认为召回率更重要，调整$\beta> 1$
  - 当$\beta = 1$时，精确度和召回率权重相同。此时称为F1-Score或F1-Measure

### F1-score

$$F1 Score = \frac{2Precision \times Recall}{Precision + Recall}$$

[go to top](#top)

> reference
- [【机器学习笔记4】逻辑回归模型](https://blog.csdn.net/qq_52466006/article/details/126113034?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-126113034-blog-122702842.pc_relevant_multi_platform_whitelistv3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-126113034-blog-122702842.pc_relevant_multi_platform_whitelistv3&utm_relevant_index=1)
- [【机器学习笔记15】多分类混淆矩阵、F1-score指标详解与代码实现](https://blog.csdn.net/qq_52466006/article/details/127633149?spm=1001.2014.3001.5501)
- [逻辑斯特回归模型(logistic regression)](http://wjhsh.net/wangbogong-p-3059546.html)
- [数据挖掘系列：什么是逻辑回归训练模型？](https://www.cda.cn/view/15799.html)
