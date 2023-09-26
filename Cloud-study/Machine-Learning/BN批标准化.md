## Batch Normaliztion(BN批标准化)

- BN(也称为批量规范)是一种方法,通过对层的输入进行重新居中和重新缩放,使人工神经网络的训练更快、更稳定
- 对输入的标准化（浅层模型）
  - 处理后的任意一个特征在数据集中所有样本上的均值为0、标准差为1
标准化处理输入数据使各个特征的分布相近
- 批量归一化（深度模型）
  - 利用小批量上的均值和标准差，不断调整神经网络中间输出，从而使整个神经网络在各层的中间输出的数值更稳定

### 提出背景

- 深度神经网络之所以难训练，其中一个重要原因就是网络中层与层之间存在高度的关联性与耦合性。随着训练的进行，网络中的参数也随着梯度下降在不停更新，一方面，当底层网络中参数发生微弱变化时，由于每一层中的线性变换与非线性激活映射，这些微弱变化随着网络层数的加深而被放大；另一方面，参数的变化导致每一层的输入分布会发生改变，进而上层的网络需要不停地去适应这些分布变化，使得我们的模型训练变得困难。
- Internal Covariate Shift: 在深层网络训练的过程中，由于网络中参数变化而引起内部结点数据分布发生变化的这一过程被称作Internal Covariate Shift。简言之，即a+1层要不停适应a层这种数据分布的变化。
- Internal Covariate Shift带来的问题是什么呢？
  1. 上层网络需要不停调整来适应输入数据分布的变化，导致网络学习速度的降低
  2. 网络的训练过程容易陷入梯度饱和区，减缓网络收敛速度
- 对于激活函数梯度饱和问题，有两种解决思路
  - 第一种就是更为非饱和性激活函数，例如线性整流函数ReLU可以在一定程度上解决训练进入梯度饱和区的问题
  - 另一种思路是，我们可以让激活函数的输入分布保持在一个稳定状态来尽可能避免它们陷入梯度饱和区，这也就是Normalization的思路
  
### BN的思路

- 单独对每个特征进行normalizaiton，让每个特征都有均值为0，方差为1的分布就OK。
- Normalization操作我们虽然缓解了ICS问题，让每一层网络的输入数据分布都变得稳定，但却导致了数据表达能力的缺失。也就是我们通过变换操作改变了原有数据的信息表达（representation ability of the network），使得底层网络学习到的参数信息丢失。另一方面，通过让每一层的输入分布均值为0，方差为1，会使得输入在经过sigmoid或tanh激活函数时，容易陷入非线性激活函数的线性区域。
  - 因此，BN又引入了两个可学习（learnable）的参数$\gamma$与$\beta$。这两个参数的引入是为了恢复数据本身的表达能力，对规范化后的数据进行线性变换，即$\hat Z_j = \gamma_j \hat Z_j + \beta_j$ 
 。特别地，当$\gamma^2 = \sigma^2, \beta = \mu$时，可以实现等价变换（identity transform）并且保留了原始输入特征的分布信息
 - [批量归一化(BatchNormalization)](https://zhuanlan.zhihu.com/p/108837487)

### Pytorch中的BN

```python
from torch import nn
bn = nn.BatchNorm2d(num_features = 6,            # 特征数
                    eps = 0.00001,               # 防止0除
                    momentum = 0.1,              # 滑动平均与方差的动量（与Keras中相反），如果设为None，momentum = 1/i，i是输入的次数
                    affine = True,               # 是否使用gamma与beta再次映射，也就是会多出几个训练参数
                    track_running_stats = True)  # 是否累计每次计算的均值与方差
for i in bn.state_dict():
  print(i,bn.state_dict()[i])
```

- 直接默认对特征维度进行规范化，特征维度在pytorch中是倒数第3维。需要注意的是，track_running_stats，也就是累计每次输入计算的均值与方差，只要你传入一个输入，累计的均值与方差就会被修改。因此，如果你在推理时不想修改这两个累计值，就要将track_running_stats设置为False。而在训练时，只需再修改回True即可
- [批量归一化（BN, Batch Normalization）](https://blog.51cto.com/u_15471597/4927826)
- [动手学深度学习（二十三）——批量归一化（BN）](https://blog.csdn.net/jerry_liufeng/article/details/119696814)
- [28 批量归一化【动手学深度学习v2】](https://www.bilibili.com/read/cv16064081/?jump_opus=1)

$$ \mu_{B}=\frac{1}{|B|} \sum_{i \in B} x_{i} \text { and } \sigma_{B}^{2}=\frac{1}{|B|} \sum_{i \in B}\left(x_{i}-\mu_{B}\right)^{2}+\epsilon $$ 

$$ x_{i+1}=\gamma \frac{x_{i}-\mu_{B}}{\sigma_{B}}+\beta $$
