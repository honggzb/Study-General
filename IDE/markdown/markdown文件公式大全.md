[Markdown文件公式大全](#top)

- [关系运算符](#关系运算符)
- [一般公式](#一般公式)
- [括号](#括号)
- [集合](#集合)
- [希腊字母](#希腊字母)
- [箭头](#箭头)
- [高数必备](#高数必备)
- [平面几何](#平面几何)
- [分支公式](#分支公式)
- [矩阵](#矩阵)
- [高亮一行公式](#高亮一行公式)

```
- 数学公式用$$或$包括起来
- $表示公式在行内显示,$$表示公式独占一行，并居中显示
- 自动编号的公式可以用如下方法表示
    \begin{equation}
        表达式
        \label{eq:当前公式名}
    \end{equation}
    - 若需要手动编号，可在公式后使用 \tag{编号} 语句
    - 自动编号后的公式可在全文任意处使用 \eqref{eq:公式名} 语句引用。
```

- 连加、连乘、极限、积分等用`\sum, \prod, \lim, \int`,这些符号在行内公式中会被压缩，以适应行高, 加上`\limits`属性后，就会在行内强制正常显示，不会压缩运算符
	- `$\sum_{i=1}^{m}$`, $$\sum_{i=1}^{m}$$
 	- `$\sum\limits_{i=1}^{m}$`, $$\sum_{i=1}^{m}$$
- $J_\alpha(x) = \sum_{m=0}^\infty \frac{(-1)^m}{m! \Gamma (m + \alpha + 1)} {\left({ \frac{x}{2} }\right)}^{2m + \alpha} \text{, 行内公式示例}$
- `$ J_\alpha(x) = \sum_{m=0}^\infty \frac{(-1)^m}{m! \Gamma (m + \alpha + 1)} {\left({ \frac{x}{2} }\right)}^{2m + \alpha} \text {，行内公式示例}`
 
$$ J_\alpha(x) = \sum_{m=0}^\infty \frac{(-1)^m}{m! \Gamma (m + \alpha + 1)} {\left({ \frac{x}{2} }\right)}^{2m + \alpha} \text{，独立公式示例，使用tag手动编号} \tag{0.1} $$

 - `$$ J_\alpha(x) = \sum_{m=0}^\infty \frac{(-1)^m}{m! \Gamma (m + \alpha + 1)} {\left({ \frac{x}{2} }\right)}^{2m + \alpha} \text{，独立公式示例，使用 \tag 手动编号} \tag{0.1} $$`
 - `$a=\frac{\sum\limits_{i=1}^{m}(x_{i}-\overline{x})(y_{i}-\overline{y})}{\sum\limits_{i=1}^{m}(x_{i}-\overline{x})^2}$` $$a=\frac{\sum\limits_{i=1}^{m}(x_{i}-\overline{x})(y_{i}-\overline{y})}{\sum\limits_{i=1}^{m}(x_{i}-\overline{x})^2}$$
 - `$\quad\quad b=\overline{y}-a\overline{x}$`  $$\quad\quad b=\overline{y}-a\overline{x}$$: 
 - 明可夫斯基距离 `$(\sum\limits_{i=1}^{n}|X_i^{(a)}-X_i^{(b)}|^{p})^\frac{1}{p}$` $$(\sum\limits_{i=1}^{n}|X_i^{(a)}-X_i^{(b)}|^{p})^\frac{1}{p}$$

## 关系运算符

|关系| 运算符| markdown|
|---|---|---|
|正负|$\pm$ | `\pm`|
|加| $+$ | `+`|
|减|$-$ | `-`|
|乘|$1 \times 2$ | `\times`|
|乘|$1 \cdot 2$ | `\cdot `|
|乘|$1 \ast 2$ | `\ast`|
|除|$\div$ | `\div`
|分数|$\frac{x}{y}$ | `\frac{x}{y}`|
|总和|$\sum$, $\sum \limits_{i=0}^{n}$ | `\sum`, `$\sum \limits_{i=0}^{n}$`|
|开二次方|$\sqrt{x} $ | `$\sqrt{x}$`|
|开多次方|$\sqrt[3]{x}$, `sqrt[开方数]{被开方数}`|`$\sqrt[3]{x}$`|
|连乘|$\prod$, $\prod \limits_{i=1}^{n} P(w_i)$| `\prod`, `$\prod \limits_{i=1}^{n} P(w_i)$`|
|不等于|$\neq$ | `\neq`|
|小于等于|$\leq$ | `\leq`|
|大于等于|$\geq$ | `\geq`|
|不大于等于|$\ngeq$ | `\ngeq`|
|约等于 |$\approx$ | `\approx`|
|恒等于|$\equiv$ | `\equiv `|
|`|`|$\mid$ | `$\mid$`|

## 一般公式

算式  | 语法 | markdown
---|---|---
分数，平方| $\frac{7x+5}{1+y^2}$ | `\frac{7x+5}{1+y^2}`
上标| $z=z^l$ | `z=z^l`
下标| $z=z_l$ | `z=z_l`
矢量hat| $\hat y=a\hat x+b$ | `$\hat y=a\hat x+b$`
矢量vec| $\vec{a}$ | `$\vec{a}$`
矢量check| $\check{a}$ | `$\check{a}$`
矢量breve| $\breve{a}$ | `$\breve{a}$`
矢量check| $\check{a}$ | `$\check{a}$`
矢量tilde| $\tilde{a}$ | `$\tilde{a}$`
矢量bar| $\bar{a}$ | `$\bar{a}$`
矢量acute| $\acute{a}$ | `$\acute{a}$`
矢量mathring| $\mathring{a}$ | `$\mathring{a}$`
省略号| $\cdots$| `\cdots`
平均数| $\overline{a+b+c+d}$| `$\overline{a+b+c+d}$`
下划线| $\underline{a+b+c+d}$| `$ \underline{a+b+c+d} $`
上大括号| $\overbrace{a+b+c+d}$,   $\overbrace{a+\underbrace{b+c}_{2.0}}^{3.0}$| `$\overbrace{a+b+c+d}$`, `$\overbrace{a+\underbrace{b+c}_{2.0}}^{3.0}$`
下大括号| $\underbrace{a+b+c+d} $| `$\underbrace{a+b+c+d} $`
行间公式（使用两个$包含公式可以独立一行）| $\frac{d}{dx}e^{ax}=ae^{ax}\quad \sum_{i=1}^{n}{(X_i - \overline{X})^2}$ | `$\frac{d}{dx}e^{ax}=ae^{ax}\quad \sum_{i=1}^{n}{(X_i - \overline{X})^2}$`
开根号| $\sqrt{2};\sqrt[n]{3}$ | `\sqrt{2};\sqrt[n]{3}`
矢量 | $\vec{a} \cdot \vec{b}=0$ | `\vec{a} \cdot \vec{b}=0`
微积分-积分| $\int$, $\int_0^1 x^2 {\rm d}x $| `\int`, `$\int_0^1 x^2 {\rm d}x $`
微积分| $\mathrm{d}$ | `\mathrm{d}`
微积分| $\prime$ | `\prime`
微积分-向量| $\vec{a}$ 或 $\overrightarrow{a} $ | `$\vec{a}$` 或 `$\overrightarrow{a} $`
微积分-收敛| $x_n\stackrel{p}\longrightarrow0$| `$x_n\stackrel{p}\longrightarrow0$`
微积分-极限| $\lim_{x\to \infty}$ , $\lim_{n\rightarrow+\infty}n$ | `$\lim_{x\to \infty}$`, `$\lim_{n\rightarrow+\infty}n$`
微积分-块公式格式|  $\displaystyle \lim_{x\to\infty} $ | ` $\displaystyle \lim_{x\to \infty} $`
微积分-部分| $\frac{\partial x}{\partial y} $ | `$ \frac{\partial x}{\partial y} $`
微积分| $\left.\frac{\partial f(x,y)}{\partial x}\right.$ | `\left.\frac{\partial f(x,y)}{\partial x}\right.`
微积分-求和| $\sum$, $\sum_1^n $ | `\sum`, `$\sum_1^n $`
累加| $\frac{1}{i^2}$ | `\frac{1}{i^2}`
累乘| $\prod\frac{1}{i^2}$ | `\prod \frac{1}{i^2}`
给公式编号，如: (1)| $$e^{i\theta}=cos\theta+\sin\theta i\tag{1}$$ | `$$e^{i\theta}=cos\theta+\sin\theta i\tag{1}$$`
三角函数| $sin$, $f(x)=\sin(x)$ | `sin`, `$f(x)=\sin(x)$`
三角函数| $cos$, $f(x)=\cos(x)$ | `cos`, `$f(x)=\cos(x)$`
三角函数| $tan$, $f(x)=\tan(x)$ | `tan`, `$f(x)=\tan(x)$`
对数函数| $\ln15$ | `\ln15`
对数函数| $\log_2^{10}$ | `\log_2^{10}`
对数函数| $\lg7$ | `\lg7`
属于| $x \in y$ | `x \in y`
不属于| $x \notin y$ | `x \notin y`
属于| $x \in y$ | `x \in y`
不属于| $x \notin y$ | `x \notin y`
子集| $x \subset y$ | `x \subset y`
非子集| $x \not\subset y$ | `x \not\subset y`
超集| $x \supset y$ | `x \supset y`
超集| $x \supseteq y$ | `x \supseteq y`
并集| $x \cup y$ | `x \cup y`
交集| $x \cap y$ | `x \cap y`
转置符号|$\mathtt{X}'$ | `$\mathtt{X}'$`
异或|$\bigoplus$ | `\bigoplus`
省略号| $\cdots$| `\cdots`
底端对齐的省略号| $1,2, \ldots,n$ | `$1,2, \ldots,n$`
中线对齐的省略号| $1,2, \cdots,n$ | `$1,2, \cdots,n $`
竖直对齐的省略号| $\vdots$ | `$\vdots$`
斜对齐的省略号| $\ddots$ | `$\ddots$`
随机变量| $\mathtt{X}_n$ | `\mathtt{X}_n`
期望| $\mathbb{E}$ | `$\mathbb{E}$`
||${n\choose m}$|`${n\choose m}$`
||$C_n^m$|`$C_n^m$`

[go to top](#top)

## 括号

算式  | 语法 | markdown
---|---|---
大括号| $\lbrace a+x \rbrace$ | `\lbrace a+x \rbrace`
尖括号| $\langle x \rangle$ | `\langle x \rangle`
上取整| $\lceil \frac{x}{2} \rceil$ | `\lceil \frac{x}{2} \rceil`
下取整| $\lfloor x \rfloor$ | `\lfloor x \rfloor`
原始括号| $\lbrace \sum_{i=0}^{n}i^{2}=\frac{2a}{x^2+1} \rbrace$ | `\lbrace \sum_{i=0}^{n}i^{2}=\frac{2a}{x^2+1} \rbrace`
全包括号| $\left\lbrace \sum_{i=0}^{n}i^{2}=\frac{2a}{x^2+1} \right\rbrace$ | `\left\lbrace \sum_{i=0}^{n}i^{2}=\frac{2a}{x^2+1} \right\rbrace`

## 集合

语法 | markdown
---|---
$\in$ | `\in`
$\notin$ | `\notin`
$\varnothing$ | `\varnothing`
$\subset$ | `\subset`
$\not\subset$ | `\not\subset`
$\subseteq$ | `\subseteq`
$\not\subseteq$ | `\not\subseteq`
$\cup$ | `\cup`
$\cap$ | `\cap`
$\vee$ | `\vee`
$\wedge$ | `\wedge`
$\neg$ | `\neg`

[go to top](#top)

## 希腊字母

|大写| markdown | 小写 | markdown|
|---|---|---|---|
|$A$ | `\A` | $\alpha$ | `\alpha`|
|$B$ | `\B`| $\beta$ | `\beta`|
|$\Gamma$ | `\Gamma` | $\gamma$ | `\gamma`|
|$\Delta$ | `\Delta` | $\delta$ | `\delta`|
|$E$ | `E` | $\epsilon$ | `\epsilon`|
| |  | $\varepsilon$ | `\varepsilon`|
|$Z$ | `Z` | $\zeta$ | `\zeta`|
|$H$ | `H` | $\eta$ | `\eta`|
|$\Theta$ | `\Theta` | $\theta$ | `\theta`|
|$I$ | `I` | $\iota$ | `\iota`|
|$K$ | `K` | $\kappa$ | `\kappa`|
|$\Lambda$ | `\Lambda` | $\lambda$ | `\lambda`|
|$M$ | `M` | $\mu$ | `\mu`|
|$N$ | `N` | $\nu$ | `\nu`|
|$\Xi$ | `\Xi` | $\xi$ | `\xi`|
|$O$ | `O` | $\omicron$ | `\omicron`|
|$\Pi$ | `\Pi` | $\pi$ | `\pi`|
|$P$ | `P` | $\rho$ | `\rho`|
|$\Sigma$ | `\Sigma` | $\sigma$ | `\sigma`|
|$T$ | `T` | $\tau$ | `\tau`|
|$\Upsilon$ | `\Upsilon` | $\upsilon$ | `\upsilon`|
|$\Phi$ | `\Phi` | $\phi$ | `\phi`|
| |  | $\varphi$ | `\varphi`|
|$X$ | `X` | $\chi$ | `\chi`|
|$\Psi$ | `\Psi` | $\psi$ | `\psi`|
|$\Omega$ | `\Omega` | $\omega$ | `\omega`|

## 箭头

|符号| markdown | 符号 | markdown|
|---|---|---|---|
|$\uparrow$ | `\uparrow` | $\Uparrow$ | `\Uparrow`|
|$\downarrow$ | `\downarrow` | $\Downarrow$ | `\Downarrow`|
|$\leftarrow$ | `\leftarrow` | $\Leftarrow$ | `\Leftarrow`|
|$\rightarrow$ | `\rightarrow` | $\Rightarrow$ | `\Rightarrow`|
|$\leftrightarrow$ | `\leftrightarrow` | $\Longleftarrow$ | `\Longleftarrow`|
|$\longleftarrow$ | `\longleftarrow` | $\Longrightarrow$ | `\Longrightarrow`|
|$\longleftrightarrow$ | `\longleftrightarrow` | $\Longleftrightarrow$ | `\Longleftrightarrow`|

[go to top](#top)

## 高数必备

语法 | markdown
---|---
$\int$ | `\int`
$\iint$ | `\iint`
$\oint$ | `\oint`
$\infty$ | `\infty`
$\nabla$ | `\nabla`
$\because$ | `\because`
$\therefore$ | `\therefore`
$\forall$ | `\forall`
$\exists$ | `\exists`

## 平面几何

语法 | markdown
---|---
$\triangle$ | `\triangle`
$\odot$ | `\odot`
$\angle$ | `\angle`
$\perp$ | `\perp`
$30^\circ $| `30^\circ`
$\sim$ | `\sim`
$\cong$ | `\cong`

[go to top](#top)

## 分支公式

$$f(x)=\begin{cases} 
		1, & x>0\\ 
		0, & x=0\\
		-1, & x<0
\end{cases}
$$

$$y=\begin{cases}
		-x,\quad x \leq 0\\
		x, \quad x > 0
\end{cases}
$$

```
$f(x)=\begin{cases} 
		1, & x>0\\ 
		0, & x=0\\
		-1, & x<0
\end{cases}$
$y=\begin{cases}
-x,\quad x \leq 0\\
x, \quad x > 0
\end{cases}
$
```

## 矩阵

- 基本矩阵

$$
\begin{matrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9 
\end{matrix} \tag{1}
$$

$$\left(              
\begin{array}{lcr}    
a & b\\         
c & d 
\end{array}         
\right)\tag{1}$$      

- 带括号的矩阵

```
$\begin{pmatrix} a & b \\ c & d \\ \end{pmatrix} \quad
\begin{bmatrix} a & b \\ c & d \\ \end{bmatrix} \quad
\begin{Bmatrix} a & b \\ c & d\\ \end{Bmatrix} \quad
\begin{vmatrix} a & b \\ c & d \\ \end{vmatrix} \quad
\begin{Vmatrix} a & b \\ c & d \\ \end{Vmatrix}$
```

$$
\left[
\begin{matrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9 
\end{matrix} \right]\tag{2}
$$

$$
\left[
\begin{pmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9 
\end{pmatrix} \right]\tag{3}
$$

$$
\left[
\begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9 
\end{bmatrix} \right]\tag{3}
$$

$$
\left[
\begin{Bmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9 
\end{Bmatrix} \right]\tag{4}
$$

$$
\left[
\begin{Bmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9 
\end{Bmatrix} \right]\tag{5}
$$

$$
\left[
\begin{vmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9 
\end{vmatrix} \right]\tag{6}
$$

$$
\left[
\begin{Vmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9 
\end{Vmatrix} \right]\tag{7}
$$

[go to top](#top)

## 高亮一行公式

- 使用 `\bbox[底色, (可选)边距, (可选)边框 border: 框宽度 框类型 框颜色]` 命令来高亮一行公式

$$\bbox[yellow]{
    e^x=\lim_{n\to\infty} \left( 1+\frac{x}{n} \right)^n \qquad (1)
}$$

$$
\bbox[#9ff, 5px]{ % 此处向外添加 5 像素的边距
    e^x=\lim_{n\to\infty} \left( 1+\frac{x}{n} \right)^n \qquad (1)
}
$$

$$
% 此处使用 0.5 倍行高作为边距，附加 2 像素的实线边框（Ctrl+Alt+Y 可见）
\bbox[#2f3542, 0.5em, border:2px solid #f1f2f6]{
    \color{#f1f2f6}{e^x=\lim_{n\to\infty} \left( 1+\frac{x}{n} \right)^n \qquad (1)}
}
$$

[go to top](#top)

> Reference
- [Cmd Markdown 公式指导手册](https://www.zybuluo.com/codeep/note/163962)
- [markdown最全数学公式速查](https://blog.csdn.net/jyfu2_12/article/details/79207643)
- [【Markdown】如何用 Markdown 写好数学表达式](https://blog.csdn.net/qq_42907802/article/details/104536794?spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-2-104536794-blog-89952211.pc_relevant_3mothn_strategy_recovery&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-2-104536794-blog-89952211.pc_relevant_3mothn_strategy_recovery&utm_relevant_index=3)
- [Markdown 符号公式大全](http://t.zoukankan.com/izcat-p-14264850.html)
