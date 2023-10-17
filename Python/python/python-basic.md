## [Python Basic](#top)
- [Basic](#basic)
  - [数据类型和变量](#数据类型和变量)
  - [字符串和编码](#字符串和编码)
  - [list列表和tuple有序列表](#list列表和tuple有序列表)
  - [dict和set](#dict和set)
  - [条件判断](#条件判断)
  - [循环](#循环)
- [函数](#函数)
  - [内置函数](#内置函数)
  - [自定义函数](#自定义函数)
  - [函数的参数:](#函数的参数)
    - [位置参数](#位置参数)
    - [默认参数](#默认参数)
    - [可变参数](#可变参数)
    - [关键字参数](#关键字参数)
    - [命名关键字参数](#命名关键字参数)
    - [参数组合](#参数组合)
    - [参数小结](#参数小结)
  - [递归函数](#递归函数)
    - [解决递归调用栈溢出的方法 - 尾递归优化](#解决递归调用栈溢出的方法---尾递归优化)
- [高级特性](#高级特性)
  - [切片](#切片)
  - [迭代](#迭代)
  - [列表生成式](#列表生成式)
  - [生成器](#生成器)
  - [迭代器](#迭代器)
- [函数式编程Functional Programming](#函数式编程functional-programming)
  - [高阶函数Higher-order function](#高阶函数higher-order-function)

---------------------------------------------------------------------
- 日志包  logging文件夹
- 异步包  concurrent文件夹
- 所有的第三方包 site-packages文件夹
----------------------------------------------------------------------------------
### Basic

#### 数据类型和变量

```
整数      | 1, oxff00(十六进制), 10_000_000_000_000(很大的数) | 没有大小限制
浮点数    | 1.23, 1.2e-5                                     | 没有大小限制，但是超出一定范围就直接表示为inf
字符串    | 'abc', "abc", 'I\'m \"OK\"!',                    | 允许用'''...'''的格式表示多行内容
布尔值    | true, false
空值      | none
```

```python
# 允许用'''...'''的格式表示多行内容
print('''line1
... line2
... line3''')
# 多行字符串'''...'''还可以在前面加上r使用
print(r'''hello,\n
world''')
```

#### 字符串和编码

- Python的字符串类型是str，在内存中以Unicode表示(Python 3版本中字符串是以Unicode编码的)
- ord()函数获取字符的整数表示
- chr()函数把编码转换为对应的字符
- encode()方法可以编码为指定的bytes, `'ABC'.encode('ascii')`, `'中文'.encode('utf-8')`
- decode()方法
- len()
- 当你的源代码中包含中文的时候，在保存源代码时，就需要务必指定保存为UTF-8编码。当Python解释器读取源代码时，为了让它按UTF-8编码读取，通常在文件开头写上这两行

```python
#!/usr/bin/env python3                # 告诉Linux/OS X系统，这是一个Python可执行程序，Windows系统会忽略这个注释
# -*- coding: utf-8 -*-               # 告诉Python解释器，按照UTF-8编码读取源代码，否则，你在源代码中写的中文输出可能会有乱码
```

- 格式化:
  - 采用的格式化方式和C语言是一致的，用`%`实现
  - format():  用传入的参数依次替换字符串内的占位符{0}、{1}……
  - f-string:  f开头的字符串，称之为f-string，字符串如果包含{xxx}，就会以对应的变量替换

|占位符 | 替换内容 |
|---|---|
|%d | 整数 |
|%f	|浮点数|
|%s	|字符串|
|%x	|十六进制整数|


```python
print('%2d-%02d' % (3, 1))         # 3-01
print('%.2f' % 3.1415926)          # 3.14
print('growth rate: %d %%' % 7)    # growth rate: 7 %
print('Hello, {0}, 成绩提升了 {1:.1f}%'.format('小明', 17.125))          # Hello, 小明, 成绩提升了 17.1%
r = 2.5
s = 3.14 * r ** 2
print(f'The area of a circle with radius {r} is {s:.2f}')              # The area of a circle with radius 2.5 is 19.62
```

[go to top](#top)

#### list列表和tuple有序列表

- list列表: list是一种有序的集合，可以随时添加和删除其中的元素, 索引是从0开始
  - append(), 追加元素到末尾
  - pop(), 删除list末尾的元素
  - pop(i), 删除指定位置的元素
  - list里面的元素的数据类型也可以不同, `L = ['Apple', 123, True]`
  - list元素也可以是另一个list, `s = ['python', 'java', ['asp', 'php'], 'scheme']`
- tuple有序列表: tuple和list非常类似，但是tuple一旦初始化就不能修改
  - `classmates = ('Michael', 'Bob', 'Tracy')`
  - 空的tuple, `t = ()`
  - 只有1个元素的tuple定义时必须加一个逗号,，来消除歧义：`t=(1,)`

```python
# 一个“可变的”tuple：
t = ('a', 'b', ['A', 'B'])
t[2][0] = 'X'
t[2][1] = 'Y'
print(t)                       # ('a', 'b', ['X', 'Y'])
```

[go to top](#top)

#### dict和set

- dict: 在其他语言中也称为map，使用键-值（key-value）存储
  - `d = {'Michael': 95, 'Bob': 75, 'Tracy': 85}`
  - **dict的key必须是不可变对象**, 在Python中，字符串、整数等都是不可变的，因此，可以放心地作为key
  - dict内部存放的顺序和key放入的顺序是没有关系的
- set:  一组key的集合，但不存储value。由于key不能重复，所以，在set中，没有重复的key
  - `s = set([1, 2, 3])`
  - **重复元素在set中自动被过滤**

[go to top](#top)

#### 条件判断

```python
age = 3
if age >= 18:
    print('adult')
elif age >= 6:
    print('teenager')
else:
    print('kid')
# 简写
if x:
    print('True')
# 用input()读取用户的输入
s = input('birth: ')
birth = int(s)       # 必须先把str转换成整数
if birth < 2000:
    print('00前')
else:
    print('00后')
```

[go to top](#top)

#### 循环

- `for...in`循环，依次把list或tuple中的每个元素迭代出来
  - `range()`函数，可以生成一个整数序列，再通过`list()`函数可以转换为list
- `while`循环，只要条件满足，就不断循环，条件不满足时退出循环
- `break` and `continue`
  - `break`:  跳过循环, 提前退出循环
  - `continue`: 跳过当前的这次循环

```python
# for...in
sum = 0
for x in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]:
    sum = sum + x
for x in range(101):
    sum = sum + x
print(sum)                 # 5050
print(list(range(5)))      # [0, 1, 2, 3, 4]
# while
sum = 0
n = 99
while n > 0:
    sum = sum + n
    n = n - 2
print(sum)                # 2500
# continue
n = 0
while n < 10:
    n = n + 1
    if n % 2 == 0: # 如果n是偶数，执行continue语句
        continue # continue语句会直接继续下一轮循环，后续的print()语句不会执行
    print(n)
```

[go to top](#top)

### 函数

#### 内置函数

- https://docs.python.org/3/library/functions.html
- 命令行可通过`help(函数名)`查看函数的帮助信息, `help(abs)`
- 数据类型转换函数, int(), float(), bool(), str()

#### 自定义函数

```python
def my_abs(x):
    if x >= 0:
        return x
    else:
        return -x
```

- 空函数: 可以用来作为占位符，比如现在还没想好怎么写函数的代码，就可以先放一个pass，让代码能运行起来

```python
if age >= 18:
    pass
```

- 参数检查

```python
def my_abs(x):
    if not isinstance(x, (int, float)):
        raise TypeError('bad operand type')
    if x >= 0:
        return x
    else:
        return -x
```

- 返回多个值, 返回值是一个tuple

```python
import math
def move(x, y, step, angle=0):
    nx = x + step * math.cos(angle)
    ny = y - step * math.sin(angle)
    return nx, ny
x, y = move(100, 100, 60, math.pi / 6)
print(x, y)
```

[go to top](#top)

#### 函数的参数:

除了正常定义的必选参数外，还可以使用默认参数、可变参数和关键字参数，使得函数定义出来的接口，不但能处理复杂的参数，还可以简化调用者的代码

##### 位置参数

```python
# 计算x2的函数
def power(x):
    return x * x
# 两个参数：x和n，这两个参数都是位置参数，调用函数时，传入的两个值按照位置顺序依次赋给参数x和n
def power(x, n):
    s = 1
    while n > 0:
        n = n - 1
        s = s * x
    return s
```

##### 默认参数

```python
def power(x, n=2):
    s = 1
    while n > 0:
        n = n - 1
        s = s * x
    return s
```

- 必选参数在前，默认参数在后，否则Python的解释器会报错
- 如何设置默认参数。当函数有多个参数时，把变化大的参数放前面，变化小的参数放后面。变化小的参数就可以作为默认参数
- **定义默认参数要牢记一点：默认参数必须指向不变对象！**
  - Python函数在定义的时候，默认参数L的值就被计算出来了，即`[]`，因为默认参数L也是一个变量，它指向对象`[]`，每次调用该函数，如果改变了L的内容，则下次调用时，默认参数的内容就变了，不再是函数定义时的`[]`了

```python
def add_end(L=[]):
    L.append('END')
    return L
# 多次调用add_end()时，结果就不对了
def add_end(L=None):   # 用None这个不变对象避免出错
    if L is None:
        L = []
    L.append('END')
    return L
```

[go to top](#top)

##### 可变参数

- 允许传入0个或任意个参数，这些可变参数在函数调用时自动组装为一个tuple

```python
def calc(*numbers):
    sum = 0
    for n in numbers:
        sum = sum + n * n
    return sum
calc(1, 2)    # 5
calc()        # 0
nums = [1, 2, 3]
calc(*nums)   # 14, *nums表示把nums这个list的所有元素作为可变参数传进去。这种写法相当有用，而且很常见
```

[go to top](#top)

##### 关键字参数

- 允许传入0个或任意个含参数名的参数，这些关键字参数在函数内部自动组装为一个dict

```python
def person(name, age, **kw):
    print('name:', name, 'age:', age, 'other:', kw)
person('Michael', 30)        # name: Michael age: 30 other: {}
extra = {'city': 'Beijing', 'job': 'Engineer'}
person('Jack', 24, **extra)  # name: Jack age: 24 other: {'city': 'Beijing', 'job': 'Engineer'}
```

[go to top](#top)

##### 命名关键字参数

- 命名关键字参数需要一个特殊分隔符`*`，`*`后面的参数被视为命名关键字参数

```python
def person(name, age, *, city, job):
    print(name, age, city, job)
person('Jack', 24, city='Beijing', job='Engineer')   # Jack 24 Beijing Engineer
# 如果函数定义中已经有了一个可变参数，后面跟着的命名关键字参数就不再需要一个特殊分隔符*了
def person(name, age, *args, city, job):
    print(name, age, args, city, job)
person('Jack', 24, 'Beijing', 'Engineer')    # 调用时缺少参数名city和job，Python解释器把前两个参数视为位置参数，后两个参数传给*args，但缺少命名关键字参数导致报错
# 命名关键字参数可以有缺省值
def person(name, age, *, city='Beijing', job):
    print(name, age, city, job)
person('Jack', 24, job='Engineer')   # Jack 24 Beijing Engineer
```

##### 参数组合

- **注意，参数定义的顺序必须是：必选参数、默认参数、可变参数、命名关键字参数和关键字参数**


```python
def f1(a, b, c=0, *args, **kw):
    print('a =', a, 'b =', b, 'c =', c, 'args =', args, 'kw =', kw)
def f2(a, b, c=0, *, d, **kw):
f1(1, 2)                          # a = 1 b = 2 c = 0 args = () kw = {}
f1(1, 2, 3, 'a', 'b')             # a = 1 b = 2 c = 3 args = ('a', 'b') kw = {}
f1(1, 2, 3, 'a', 'b', x=99)       # a = 1 b = 2 c = 3 args = ('a', 'b') kw = {'x': 99}
f2(1, 2, d=99, ext=None)          # a = 1 b = 2 c = 0 d = 99 kw = {'ext': None}
# 通过一个tuple和dict，也可以调用上述函数
args = (1, 2, 3, 4)
kw = {'d': 99, 'x': '#'}
f1(*args, **kw)                # a = 1 b = 2 c = 3 args = (4,) kw = {'d': 99, 'x': '#'}
args = (1, 2, 3)
kw = {'d': 88, 'x': '#'}
f2(*args, **kw)                # a = 1 b = 2 c = 3 d = 88 kw = {'x': '#'}
```

##### 参数小结

- Python的函数具有非常灵活的参数形态，既可以实现简单的调用，又可以传入非常复杂的参数
- 默认参数一定要用不可变对象，如果是可变对象，程序运行时会有逻辑错误！
- 要注意定义可变参数和关键字参数的语法：
  - `*args`是可变参数，args接收的是一个**tuple**
  - ` **kw`是关键字参数，kw接收的是一个**dict**
- 调用函数时如何传入可变参数和关键字参数的语法：
  - 可变参数既可以直接传入：`func(1, 2, 3)`，又可以先组装list或tuple，再通过`*args`传入：`func(*(1, 2, 3))；`
  - 关键字参数既可以直接传入：`func(a=1, b=2)`，又可以先组装dict，再通过`**kw传入：func(**{'a': 1, 'b': 2})`
- 命名的关键字参数是为了限制调用者可以传入的参数名，同时可以提供默认值
- 定义命名的关键字参数在没有可变参数的情况下不要忘了写分隔符*，否则定义的将是位置参数

[go to top](#top)

#### 递归函数

```python
def fact(n):
    if n==1:
        return 1
    return n * fact(n - 1)
```

##### 解决递归调用栈溢出的方法 - 尾递归优化

- 在计算机中，函数调用是通过栈（stack）这种数据结构实现的，每当进入一个函数调用，栈就会加一层栈帧，每当函数返回，栈就会减一层栈帧。由于栈的大小不是无限的，所以，递归调用的次数过多，会导致栈溢出
- 尾递归是指，在函数返回的时候，调用自身本身，并且return语句不能包含表达式。这样，编译器或者解释器就可以把尾递归做优化，使递归本身无论调用多少次，都只占用一个栈帧，不会出现栈溢出的情况

```python
def fact(n):
    return fact_iter(n, 1)
def fact_iter(num, product):
    if num == 1:
        return product
    return fact_iter(num - 1, num * product)
# fact(5)对应的fact_iter(5, 1)
===> fact_iter(5, 1)
===> fact_iter(4, 5)
===> fact_iter(3, 20)
===> fact_iter(2, 60)
===> fact_iter(1, 120)
# 无论多少次调用也不会导致栈溢出
===> 120
```

[go to top](#top)

### 高级特性

#### 切片

- 有了切片操作，很多地方循环就不再需要了。Python的切片非常灵活，一行代码就可以实现很多行循环才能完成的操作
- 切片用于取指定索引范围，如取list或tuple或字符串的部分元素

```python
L = ['Michael', 'Sarah', 'Tracy', 'Bob', 'Jack']
L[1:3]          # ['Sarah', 'Tracy']
L[-2:]          # ['Bob', 'Jack']
L[-2:-1]        # ['Bob']    #倒数第一个元素的索引是-1
# sample 2
L = list(range(100))   #[0, 1, 2, 3, ..., 99]
# 2.1 后10个数：
L[-10:]                #[90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
# 2.2 前11-20个数：
L[10:20]               #[10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
# 2.3 前10个数，每两个取一个：
L[:10:2]               #[0, 2, 4, 6, 8]
# 2.4 所有数，每5个取一个：
 L[::5]                #[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95]
# 2.5 甚至什么都不写，只写[:]就可以原样复制一个list：
L[:]
# sample 3   tuple也是一种list，唯一区别是tuple不可变。因此，tuple也可以用切片操作，只是操作的结果仍是tuple
(0, 1, 2, 3, 4, 5)[:3]         # (0, 1, 2)
# sample 4   字符串'xxx'也可以看成是一种list，每个元素就是一个字符。因此，字符串也可以用切片操作，只是操作结果仍是字符串
'ABCDEFG'[:3]         #'ABC'
'ABCDEFG'[::2]        #'ACEG'
# sample 4 利用切片操作，实现一个trim()函数，去除字符串首尾的空格，注意不要调用str的strip()方法

```

[go to top](#top)

#### 迭代

- Python的for循环不仅可以用在list或tuple上，还可以作用在其他可迭代对象上
- 只要是可迭代对象，无论有无下标，都可以迭代，比如dict就可以迭代
- Python内置的enumerate函数可以把一个list变成索引-元素对

```python
d = {'a': 1, 'b': 2, 'c': 3}
for key in d:
    print(key)
# a c b     dict的存储不是按照list的方式顺序排列，所以，迭代出的结果顺序很可能不一样
# 判断一个对象是可迭代对象,: 通过collections.abc模块的Iterable类型判断
from collections.abc import Iterable
isinstance('abc', Iterable)
# Python内置的enumerate函数可以把一个list变成索引-元素对
for i, value in enumerate(['A', 'B', 'C']):
     print(i, value)
# 0 A
# 1 B
# 2 C
```

#### 列表生成式

- 列表生成式(List Comprehensions)是Python内置的非常简单却强大的可以用来创建list的生成式

```python
list(range(1, 11))    # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
# 生成[1x1, 2x2, 3x3, ..., 10x10]
[x * x for x in range(1, 11)]  # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
# for循环后面还可以加上if判断，这样我们就可以筛选出仅偶数的平方：
[x * x for x in range(1, 11) if(x%2 == 0)]   # [4, 16, 36, 64, 100]
# 使用两层循环，可以生成全排列
[m + n for m in 'ABC' for n in 'XYZ']        # ['AX', 'AY', 'AZ', 'BX', 'BY', 'BZ', 'CX', 'CY', 'CZ']
# sample 列出当前目录下的所有文件和目录名
import os                                    # 导入os模块，模块的概念后面讲到
[d for d in os.listdir('.')]                 # os.listdir可以列出文件和目录
```

[go to top](#top)

#### 生成器

- 通过列表生成式，我们可以直接创建一个列表。但是，受到内存限制，列表容量肯定是有限的。而且，创建一个包含100万个元素的列表，不仅占用很大的存储空间，如果我们仅仅需要访问前面几个元素，那后面绝大多数元素占用的空间都白白浪费了。
- 不必创建完整的list，从而节省大量的空间。在Python中，这种一边循环一边计算的机制，称为生成器：`generator`

```python
# 创建一个generator 1 - 把一个列表生成式的[]改成()
L = (x * x for x in range(10))
L         # <generator object <genexpr> at 0x1022ef630>
next(L)   # 可以通过next()函数获得generator的下一个返回值
for n in L:       # 更方便的方法是使用for循环迭代它，因为generator也是可迭代对象
    print(n)
# sample 著名的斐波拉契数列（Fibonacci）: 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
# 使用yield， 如果一个函数定义中包含yield关键字，那么这个函数就不再是一个普通函数，而是一个generator函数，调用一个generator函数将返回一个generator
def fib(max):
    n, a, b = 0, 0, 1
    while n < max:
        yield b                  # print(b)
        a, b = b, a + b
        n = n + 1
    return 'done'
# 调用该generator函数时，首先要生成一个generator对象
for n in fib(6)
    print(n)
# call generator manually:
g = fib(5)
while 1:
    try:
        x = next(g)
        print('g:', x)
    except StopIteration as e:
        print('Generator return value:', e.value)
        break
```

#### 迭代器

- 可以直接作用于for循环的数据类型有以下几种(凡是可作用于for循环的对象都是Iterable类型)：
  - 集合数据类型，如list、tuple、dict、set、str等
  - 类是generator，包括生成器和带yield的generator function
- 生成器都是Iterator对象，但list、dict、str虽然是Iterable，却不是Iterator
  - 可以使用`isinstance()`判断一个对象是否是Iterator对象
- 把list、dict、str等Iterable变成Iterator可以使用`iter()`函数

```python
isinstance(iter('abc'), Iterator)   # true
```

[go to top](#top)

### 函数式编程Functional Programming

- Functional Programming虽然也可以归结到面向过程的程序设计，但其思想更接近数学计算
- 函数式编程就是一种抽象程度很高的编程范式，纯粹的函数式编程语言编写的函数没有变量，因此，任意一个函数，只要输入是确定的，输出就是确定的，这种纯函数我们称之为没有副作用。而允许使用变量的程序设计语言，由于函数内部的变量状态不确定，同样的输入，可能得到不同的输出，因此，这种函数是有副作用的
  - 函数式编程的一个特点就是，**允许把函数本身作为参数传入另一个函数，还允许返回一个函数！**
- Python对函数式编程提供部分支持。由于Python允许使用变量，因此，Python不是纯函数式编程语言

#### 高阶函数Higher-order function

- 变量可以指向函数
- 函数名也是变量
- 允许传入函数
  - 把函数作为参数传入，这样的函数称为高阶函数，函数式编程就是指这种高度抽象的编程范式

```python
x = abs(-10)
x        # 10
f = abs
f         # <built-in function abs>
f(-10)    # 10
# 允许传入函数
def add(x, y, f):
    return f(x) + f(y)
print(add(-5, 6, abs))     # 11
```

[go to top](#top)

> Reference
- [learn-python3 samples](https://github.com/michaelliao/learn-python3/tree/master/samples/)
- [廖雪峰Python教程](https://www.liaoxuefeng.com/wiki/1016959663602400)
