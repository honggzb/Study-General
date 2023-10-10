[scikit-learn全解](#top)

- [Scikit-learn的主要特性](#scikit-learn的主要特性)
- [安装必要的依赖库](#安装必要的依赖库)
- [Scikit-learn的数据预处理Pandas](#scikit-learn的数据预处理pandas)
  - [数据清洗](#数据清洗)
  - [数据转换](#数据转换)
  - [特征提取和特征选择](#特征提取和特征选择)
  - [Feature Scaling](#feature-scaling)
- [Scikit-learn中的监督学习算法](#scikit-learn中的监督学习算法)
  - [线性模型](#线性模型)
  - [决策树](#决策树)
  - [支持向量机](#支持向量机)
- [Scikit-learn中的无监督学习算法](#scikit-learn中的无监督学习算法)
  - [聚类](#聚类)
  - [降维](#降维)
- [评估模型和参数调优](#评估模型和参数调优)
  - [模型评估](#模型评估)
  - [参数调优](#参数调优)


### Scikit-learn的主要特性

- ![scikit](https://github.com/honggzb/Study-General/tree/master/Cloud-study/Machine-Learning/images/scikit.png)
- Scikit-learn是一个基于Python的开源机器学习库，它基于NumPy、SciPy和matplotlib，支持各种机器学习模型，包括分类、回归、聚类和降维等。除了提供大量的机器学习算法外，Scikit-learn还包括了一整套模型评估和选择的工具，以及数据预处理和数据分析的功能。
- ![Scikit-learn的主要特性](https://github.com/honggzb/Study-General/tree/master/Cloud-study/Machine-Learning/images/Scikit-learn的主要特性.png)
- Scikit-learn提供了各种常用的监督学习和无监督学习算法，包括回归、分类、聚类、降维等
  - ![Scikit-learn提供了各种常用的监督学习和无监督学习算法](https://github.com/honggzb/Study-General/tree/master/Cloud-study/Machine-Learning/images/Scikit-learn算法.png)
- Scikit-learn提供了丰富的数据预处理功能，包括数据清洗、编码、标准化、特征提取和特征选择等
- Scikit-learn提供了一套完善的模型评估和选择工具，包括交叉验证、网格搜索和多种评估指标
- Scikit-learn以很好地与matplotlib等Python绘图库配合使用，以实现数据和模型效果的可视化
  - ![Scikit-learn可视化](https://github.com/honggzb/Study-General/tree/master/Cloud-study/Machine-Learning/images/Scikit-learn可视化.png)

### 安装必要的依赖库

- Scikit-learn的运行需要依赖一些Python库，包括NumPy和SciPy。这些库一般来说在安装Scikit-learn的时候会自动安装。如果没有自动安装，或者需要更新到最新版本，可以使用以下命令
- `pip install -U numpy scipy`
- `pip install -U pandas matplotlib`

### Scikit-learn的数据预处理Pandas

#### 数据清洗

数据清洗主要包括处理缺失值和异常值。Scikit-learn提供了**Imputer类**，用于处理缺失值。以下是使用Imputer的一个简单示例

```python
from sklearn.impute import SimpleImputer
# 假设我们的数据集中有缺失值NaN
import numpy as np
X = [[1, 2], [np.nan, 3], [7, 6]]
imp = SimpleImputer(missing_values=np.nan, strategy='mean')
print(imp.fit_transform(X))
```

#### 数据转换

数据转换主要包括标准化、归一化、二值化等步骤。Scikit-learn提供了**preprocessing**模块，用于完成这些任务

```python
from sklearn import preprocessing
# 数据标准化示例
X = [[1., -1., 2.], [2., 0., 0.], [0., 1., -1.]]
scaler = preprocessing.StandardScaler().fit(X)
print(scaler.transform(X))
# 数据归一化示例
X_normalized = preprocessing.normalize(X, norm='l2')
print(X_normalized)
```

#### 特征提取和特征选择

Scikit-learn提供了一系列的方法用于特征提取和特征选择。特征提取主要用于将原始数据转换为特征向量，特征选择则用于从原始特征中选择最有价值的特征

```python
from sklearn.feature_extraction.text import CountVectorizer
# 特征提取示例：文本数据转换为词频向量
corpus = ['This is the first document.',
          'This is the second second document.',
          'And the third one.',
          'Is this the first document?']
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(corpus)
print(vectorizer.get_feature_names())
print(X.toarray())
# 特征选择示例：使用卡方检验选择最好的特征
from sklearn.feature_selection import SelectKBest, chi2
X, y = [[1, 2], [3, 4], [5, 6], [7, 8]], [0, 0, 1, 1]
X_new = SelectKBest(chi2, k=1).fit_transform(X, y)
print(X_new)
```

#### Feature Scaling

- Standard Scaler
  - The StandardScaler assumes your data is normally distributed within each feature and will scale them such that the distribution is now centred around 0, with a standard deviation of 1.
  - The mean and standard deviation are calculated for the feature and then the feature is scaled based on:
   $$\frac{x_i-mean(x)}{stdev(x)}$$
  - If data is not normally distributed, this is not the best scaler to use
- Min-Max Scaler
  - The MinMaxScaler is the probably the most famous scaling algorithm, and follows the following formula for each feature:
  $$\frac{x_i-min(x)}{max(x)-min(x)}$$
  - It essentially shrinks the range such that the range is now between 0 and 1 (or -1 to 1 if there are negative values)
- Robust Scaler
  - The RobustScaler uses a similar method to the Min-Max scaler but it instead uses the interquartile range, rathar than the min-max, so that it is robust to outliers. Therefore it follows the formula:
 $$\frac{x_i-Q_1(x)}{Q_3(x)-Q_1(x)}$$
- Normalizer
  - The normalizer scales each value by dividing each value by its magnitude in n-dimensional space for nnumber of features. x, y and z Cartesian co-ordinates your scaled value for x would be:
 $$\frac{x_i}{\sqrt{x^2_i+y^2_i+z^2_i}}$$

[back to top](#top)

### Scikit-learn中的监督学习算法

监督学习是机器学习中最常见的任务之一，包括分类和回归两种类型。Scikit-learn提供了一系列的监督学习算法，包括常见的线性模型、决策树、支持向量机等

#### 线性模型

线性模型是一种常见的监督学习算法，用于解决回归和分类问题。Scikit-learn中的linear_model模块提供了一系列的线性模型，包括线性回归、逻辑回归、岭回归等

```python
from sklearn.linear_model import LinearRegression
# 创建数据
X = [[1, 1], [1, 2], [2, 2], [2, 3]]
y = [1, 1, 2, 2]
# 创建线性回归模型并训练
reg = LinearRegression().fit(X, y)
# 进行预测
print(reg.predict([[3, 5]]))
```

#### 决策树

决策树是一种简单而有效的分类和回归方法。Scikit-learn中的tree模块提供了决策树的实现

```python
from sklearn import tree
# 创建数据
X = [[0, 0], [1, 1]]
Y = [0, 1]
# 创建决策树模型并训练
clf = tree.DecisionTreeClassifier()
clf = clf.fit(X, Y)
# 进行预测
print(clf.predict([[2., 2.]]))
```

#### 支持向量机

支持向量机(SVM)是一种强大的分类方法，同时也可以用于解决回归问题。Scikit-learn中的svm模块提供了SVM的实现

```python
from sklearn import svm
# 创建数据
X = [[0, 0], [1, 1]]
y = [0, 1]
# 创建SVM模型并训练
clf = svm.SVC()
clf.fit(X, y)
# 进行预测
print(clf.predict([[2., 2.]]))
```

[back to top](#top)

### Scikit-learn中的无监督学习算法

无监督学习是指在没有标签的情况下对数据集进行学习，主要包括聚类和降维等任务。Scikit-learn提供了丰富的无监督学习算法

#### 聚类

聚类是无监督学习的一种常见任务，其目标是将相似的样本聚集在一起。Scikit-learn提供了多种聚类算法，如K-means，谱聚类，DBSCAN等

```python
from sklearn.cluster import KMeans
# 创建数据
X = [[1, 2], [1, 4], [1, 0], [4, 2], [4, 4], [4, 0]]
# 创建KMeans模型并训练
kmeans = KMeans(n_clusters=2, random_state=0).fit(X)
# 查看聚类结果
print(kmeans.labels_)
```

#### 降维

降维是无监督学习的另一种常见任务，其目标是将高维数据映射到低维空间，以便于数据的理解和可视化。Scikit-learn提供了多种降维算法，如PCA，t-SNE，等。

```python
from sklearn.decomposition import PCA
# 创建数据
X = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
# 创建PCA模型并训练
pca = PCA(n_components=2)
pca.fit(X)
# 查看降维结果
print(pca.transform(X))
```

Scikit-learn还提供了许多其他的无监督学习算法，如关联规则学习，异常检测等。这些算法在处理特定问题时可以发挥巨大的作用，使得Scikit-learn在处理各种机器学习任务时具有很强的灵活性

[back to top](#top)

### 评估模型和参数调优

创建并训练了机器学习模型后，我们需要对其性能进行评估，并对模型参数进行调优，以达到最佳的学习效果

#### 模型评估

Scikit-learn提供了多种用于模型评估的方法，包括交叉验证、计算精度、召回率、F1分数等。

```python
from sklearn.model_selection import cross_val_score
from sklearn.metrics import classification_report
from sklearn.ensemble import RandomForestClassifier
from sklearn import datasets
# 加载数据集
iris = datasets.load_iris()
X = iris.data
y = iris.target
# 创建模型
clf = RandomForestClassifier(random_state=7)
# 交叉验证
scores = cross_val_score(clf, X, y, cv=5)
print("Cross-validation scores: ", scores)
# 训练模型
clf.fit(X, y)
# 预测结果
y_pred = clf.predict(X)
# 计算各项评价指标
print(classification_report(y, y_pred))
```

#### 参数调优

Scikit-learn提供了GridSearchCV和RandomizedSearchCV等工具用于进行参数调优。

```python
from sklearn.model_selection import GridSearchCV
from sklearn.svm import SVC
# 参数空间
param_grid = {'C': [0.1, 1, 10, 100], 'gamma': [1, 0.1, 0.01, 0.001], 'kernel': ['rbf']}
# 创建SVC模型
svc = SVC()
# 创建GridSearchCV对象并训练
grid = GridSearchCV(svc, param_grid, refit=True, verbose=2)
grid.fit(X, y)
# 输出最优参数
print(grid.best_params_)
```

[back to top](#top)

> [scikit-learn全解：掌握Python最强大的机器学习库](https://techlead.blog.csdn.net/article/details/131959380)
[Feature Scaling with scikit-learn](http://benalexkeen.com/feature-scaling-with-scikit-learn/)
