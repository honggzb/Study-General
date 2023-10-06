[Markdown文件公式大全](#top)

- [运算符-数学关系逻辑](#运算符-数学关系逻辑)
- [数学符号](#数学符号)
- [上下位符号](#上下位符号)
- [一般公式](#一般公式)
- [括号](#括号)
- [占位符](#占位符)
- [集合](#集合)
- [集合运算](#集合运算)
- [希腊字母](#希腊字母)
- [箭头](#箭头)
- [高数必备](#高数必备)
- [平面几何](#平面几何)
- [分支公式](#分支公式)
- [矩阵](#矩阵)
- [高亮一行公式](#高亮一行公式)
- [公式加边框](#公式加边框)

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

- 连加、连乘、极限、积分等用`\sum, \prod, \lim, \int`,这些符号在行内公式中会被压缩，以适应行高, 加上`\displaystyle`或`\limits`属性后，就会在行内强制正常显示，不会压缩运算符
	- `$\displaystyle \sum_{i=1}^{m}$`, $$\sum_{i=1}^{m}$$
 	- `$\sum\limits_{i=1}^{m}$`, $$\sum_{i=1}^{m}$$
- `$ J_\alpha(x) = \displaystyle \sum_{m=0}^\infty \frac{(-1)^m}{m! \Gamma (m + \alpha + 1)} {\left({ \frac{x}{2} }\right)}^{2m + \alpha} \text {，行内公式示例}`
$$J_\alpha(x) = \displaystyle \sum_{m=0}^\infty \frac{(-1)^m}{m! \Gamma (m + \alpha + 1)} {\left({ \frac{x}{2} }\right)}^{2m + \alpha} \text{，独立公式示例，使用tag手动编号} \tag{0.1} $$
 - `$$ J_\alpha(x) = \displaystyle \sum_{m=0}^\infty \frac{(-1)^m}{m! \Gamma (m + \alpha + 1)} {\left({ \frac{x}{2} }\right)}^{2m + \alpha} \text{，独立公式示例，使用 \tag 手动编号} \tag{0.1} $$`
 $$a=\frac{\sum\limits_{i=1}^{m}(x_{i}-\overline{x})(y_{i}-\overline{y})}{\sum\limits_{i=1}^{m}(x_{i}-\overline{x})^2}$$
 - `$a=\frac{\sum\limits_{i=1}^{m}(x_{i}-\overline{x})(y_{i}-\overline{y})}{\sum\limits_{i=1}^{m}(x_{i}-\overline{x})^2}$`
$$\quad\quad b=\overline{y}-a\overline{x}$$
 - `$\quad\quad b=\overline{y}-a\overline{x}$`
 - 明可夫斯基距离 $$(\sum\limits_{i=1}^{n}|X_i^{(a)}-X_i^{(b)}|^{p})^\frac{1}{p}$$ `$(\sum\limits_{i=1}^{n}|X_i^{(a)}-X_i^{(b)}|^{p})^\frac{1}{p}$`
 - 角标 $$m\leq a,n\leq b$) is $p_1=\dfrac{C_{a}^mC_{b}^n}{C_{a+b}^{m+n}}$$  `$m\leq a,n\leq b$) is $p_1=\dfrac{C_{a}^mC_{b}^n}{C_{a+b}^{m+n}}$`
 - 多个式子组合:
$$
\left\{
\begin{aligned}
\frac{d r}{d \omega^{\prime}}&=\frac{v}{f \omega^{\prime}} \\
\frac{d v}{d \omega^{\prime}}&=\frac{(F / m) \sin \psi-g / r^{2}+r_{\omega^{2}}}{f \omega^{\prime}} \\
\frac{\mathrm{d} \theta}{\mathrm{d} \omega^{\prime}}&=\frac{\omega}{f \omega}\\
\frac{\mathrm{d} \omega}{\mathrm{d} \omega^{\prime}}&=-1 \\
\frac{\mathrm{d} m}{\mathrm{d} \omega^{\prime}}&=-\frac{F}{I_{\mathrm{sp}}} \cdot \frac{1}{f \omega^{\prime}}
\end{aligned}
\right.
$$

```
$$
\left\{
\begin{aligned}
\frac{d r}{d \omega^{\prime}}&=\frac{v}{f \omega^{\prime}} \\
\frac{d v}{d \omega^{\prime}}&=\frac{(F / m) \sin \psi-g / r^{2}+r_{\omega^{2}}}{f \omega^{\prime}} \\
\frac{\mathrm{d} \theta}{\mathrm{d} \omega^{\prime}}&=\frac{\omega}{f \omega}\\
\frac{\mathrm{d} \omega}{\mathrm{d} \omega^{\prime}}&=-1 \\
\frac{\mathrm{d} m}{\mathrm{d} \omega^{\prime}}&=-\frac{F}{I_{\mathrm{sp}}} \cdot \frac{1}{f \omega^{\prime}}
\end{aligned}
\right.
$$
```

## 运算符-数学关系逻辑

|关系| 运算符| markdown|
|---|---|---|
|正负|$\pm$ | `\pm`|
|加| $+$ | `+`|
|减|$-$ | `-`|
|乘|$1 \times 2$ | `\times`|
|乘|$1 \cdot 2$ | `\cdot `|
|乘|$1 \ast 2$ | `\ast`|
|除|$\div$ | `\div`
|小字体分数|$\frac{x}{y}$ | `\frac{x}{y}`|
|大字体分数|$\dfrac{x}{y}$ | `\dfrac{x}{y}`|
|分数其他表示|${x+y} \over {y+z}$ | `${x+y} \over {y+z}$`|
|总和|$\sum$, $\sum \limits_{i=0}^{n}$ | `\sum`, `$\sum \limits_{i=0}^{n}$`|
|开二次方|$\sqrt{x} $ | `$\sqrt{x}$`|
|开多次方|$\sqrt[3]{x}$, `sqrt[开方数]{被开方数}`|`$\sqrt[3]{x}$`|
|对数运算|$\log_5{8}$, `\log_低数{真数}`|`$\log_5{8}$`|
|连乘|$\prod$, $\prod \limits_{i=1}^{n} P(w_i)$| `\prod`, `$\prod \limits_{i=1}^{n} P(w_i)$`|
|不等于|$\neq$ | `\neq`|
|小于等于|$\leq$ | `\leq`|
|大于等于|$\geq$ | `\geq`|
|不大于等于|$\ngeq$ | `\ngeq`|
|不小于等于|$\nleq$ | `\nleq`|
|约等于 |$\approx$ | `\approx`|
|恒等于|$\equiv$ | `\equiv `|
|`|`|$\mid$ | `$\mid$`|
| |$\because$|`\because`
| |$\therefore$|`\therefore`
|向上取整|$\lceil x \rceil$|`\lceil x \rceil`|
|向下取整|$\lfloor x \rfloor$|`\lfloor x \rfloor`|

## 数学符号

算式  | 语法 | markdown
---|---|---
无穷|$\infty$|`\infty`|
虚数|$\imath$|`\imath`|
虚数|$\jmath$|`\jmath`|
矢量hat| $\hat y=a\hat x+b$ | `$\hat y=a\hat x+b$`
矢量vec| $\vec{a}$ | `$\vec{a}$`
矢量check| $\check{a}$ | `$\check{a}$`
矢量breve| $\breve{a}$ | `$\breve{a}$`
矢量check| $\check{a}$ | `$\check{a}$`
矢量tilde| $\tilde{a}$ | `$\tilde{a}$`
矢量bar| $\bar{a}$ | `$\bar{a}$`
矢量acute| $\acute{a}$ | `$\acute{a}$`
矢量mathring| $\mathring{a}$ | `$\mathring{a}$`
矢量符号|$\vec{a}|`\vec{a}`
数学符号|$\acute{a}$|`\acute{a}`
一阶导数符号|$\dot{a}$|`\dot{a}`
二阶导数符号|$\ddot{a}$|`\ddot{a}`
省略号| $\cdots$| `\cdots`

## 上下位符号

- `$\stackrel{上位内容}{进行上位的符号}$`

语法| markdown
---|---
$\stackrel{n}{\bigcup}$|`$\stackrel{n}{\bigcup}$`
$\bigcup\limits_{i=1}$| `$\bigcup\limits_{i=1}$`
$\stackrel{n}{\bigcup\limits_{i=1}}$|`$\stackrel{n}{\bigcup\limits_{i=1}}$`
$\stackrel{n}{\sum\limits_{i=1}}$| `$\stackrel{n}{\sum\limits_{i=1}}$`
$\stackrel{n}{\bigcap\limits_{i=1}}$|`$\stackrel{n}{\bigcap\limits_{i=1}}$`

## 一般公式

算式  | 语法 | markdown
---|---|---
分数，平方| $\frac{7x+5}{1+y^2}$ | `\frac{7x+5}{1+y^2}`
上标| $z=z^l$ | `z=z^l`
下标| $z=z_l$ | `z=z_l`
平均数| $\overline{a+b+c+d}$| `$\overline{a+b+c+d}$`
下划线| $\underline{a+b+c+d}$| `$ \underline{a+b+c+d} $`
上大括号| $\overbrace{a+b+c+d}$,   $\overbrace{a+\underbrace{b+c}_{2.0}}^{3.0}$| `$\overbrace{a+b+c+d}$`, `$\overbrace{a+\underbrace{b+c}_{2.0}}^{3.0}$`
下大括号| $\underbrace{a+b+c+d} $| `$\underbrace{a+b+c+d} $`
开根号| $\sqrt{2};\sqrt[n]{3}$ | `\sqrt{2};\sqrt[n]{3}`
矢量 | $\vec{a} \cdot \vec{b}=0$ | `\vec{a} \cdot \vec{b}=0`
微积分-积分| $\int$, $\int_0^1 x^2 {\rm d}x $| `\int`, `$\int_0^1 x^2 {\rm d}x $`
微积分| $\mathrm{d}$ | `\mathrm{d}`
微积分| $\prime$ | `\prime`
微积分-向量| $\vec{a}$ 或 $\overrightarrow{a} $ | `$\vec{a}$` 或 `$\overrightarrow{a} $`
微积分-收敛| $x_n\stackrel{p}\longrightarrow0$| `$x_n\stackrel{p}\longrightarrow0$`
微积分-极限| $\lim_{x\to \infty}$ , $\lim_{n\rightarrow+\infty}n$ | `$\lim_{x\to \infty}$`, `$\lim_{n\rightarrow+\infty}n$`
微积分-块公式格式`\displaystyle`|  $\displaystyle \lim_{x\to\infty} $ | ` $\displaystyle \lim_{x\to \infty} $`
微积分-偏微分| $\frac{\partial x}{\partial y} $, $\displaystyle \frac{\partial xy^2}{\partial y}$| `$ \frac{\partial x}{\partial y} $`, `$\displaystyle \frac{\partial xy^2}{\partial y}$`
微积分| $\left.\frac{\partial f(x,y)}{\partial x}\right.$ | `\left.\frac{\partial f(x,y)}{\partial x}\right.`
微积分-求和| $\sum$, $\displaystyle \sum_1^n$ | `\sum`, `$\displaystyle \sum_1^n$`
块公式（`\displaystyle`）| $\frac{d}{dx}e^{ax}=ae^{ax}\quad \displaystyle sum_{i=1}^{n}{(X_i - \overline{X})^2}$ | `$\frac{d}{dx}e^{ax}=ae^{ax}\quad \displaystyle \sum_{i=1}^{n}{(X_i - \overline{X})^2}$`
累加| $\frac{1}{i^2}$ | `\frac{1}{i^2}`
累乘| $\prod\frac{1}{i^2}$ | `\prod \frac{1}{i^2}`
余积|$\coprod\frac{1}{i^2}$|`\coprod\frac{1}{i^2}`
给公式编号，如: (1)| $$e^{i\theta}=cos\theta+\sin\theta i\tag{1}$$ | `$$e^{i\theta}=cos\theta+\sin\theta i\tag{1}$$`
三角函数| $sin$, $f(x)=\sin(x)$ | `sin`, `$f(x)=\sin(x)$`
三角函数| $cos$, $f(x)=\cos(x)$ | `cos`, `$f(x)=\cos(x)$`
三角函数| $tan$, $f(x)=\tan(x)$ | `tan`, `$f(x)=\tan(x)$`
对数函数| $\ln15$ | `\ln15`
对数函数| $\log_2^{10}$ | `\log_2^{10}`
对数函数| $\lg7$ | `\lg7`
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
原始括号| $\displaystyle \lbrace \sum_{i=0}^{n}i^{2}=\frac{2a}{x^2+1} \rbrace$ | `\displaystyle \lbrace \sum_{i=0}^{n}i^{2}=\frac{2a}{x^2+1} \rbrace`
全包括号| $\displaystyle \left\lbrace \sum_{i=0}^{n}i^{2}=\frac{2a}{x^2+1} \right\rbrace$ | `\displaystyle \left\lbrace \sum_{i=0}^{n}i^{2}=\frac{2a}{x^2+1} \right\rbrace`
圆括号|$\big(\big)$ |`$\big(\big)$`
圆括号|$\Big(\Big)$ |`$\Big(\Big)$`
圆括号|$\bigg(\bigg)$ |`$\bigg(\bigg)$`
圆括号|$\Bigg(\Bigg)$ |`$\Bigg(\Bigg)$`
尖括号|$\langle x \rangle$|`$\langle x \rangle$`

## 占位符

算式  | 语法 | markdown
---|---|---
两个quad空格 |$x \qquad y$ |`x \qquad y`
quad空格 |$x \quad y$ |`x \quad y`
空格 |$x \ y$ |`x \ y`
紧贴 |$x \! y$ |`x \! y`

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

## 集合运算

算式  | 语法 | markdown
---|---|---
属于| $x \in y$ | `x \in y`
不属于| $x \notin y$ | `x \notin y`
子集| $x \subset y$, $x \supset y$ | `x \subset y`, `x \supset y`
子集| $x \subseteq y$, $x \supseteq y$ | `x \subseteq y`, `x \supseteq y`
非子集| $x \not\subset y$ | `x \not\subset y`
非子集| $x \not\subseteq  y$,  $x \not\supseteq y$ | `x \not\subseteq  y`,` x \not\supseteq y`
真子集| $\subsetneq$ , $\supsetneq$| `\subsetneq` , `\supsetneq`
非真子集| $\not\subsetneq$, $\not\supsetneq$ | `\not\subsetneq` , `\not\supsetneq`
超集| $x \supset y$ | `x \supset y`
超集| $x \supseteq y$ | `x \supseteq y`
并集| $x \cup y$ | `x \cup y`
交集| $x \cap y$ | `x \cap y`
差集|$x \setminus y$|`x \setminus y`
转置符号|$\mathtt{X}'$ | `$\mathtt{X}'$`
异或|$\bigoplus$ | `\bigoplus`
同与|$\bigotimes$ | `\bigotimes`
同与|$\bigodot$ | `\bigodot`
实数集合|$\mathbb{R}$|`\mathbb{R}`
自然数集合|$\mathbb{Z}$|`\mathbb{Z}`
空集|$\emptyset$|`\emptyset`
任意|$\forall$|`\forall`
存在| $\exists$|`\exists`
析取|$\vee$|`vee`
合取|$\wedge$|`\wedge`
空集|$\empty$|`\empty`

- Commutative law 交换律：$A\cup B=B\cup A,\quad A\cap B=B\cap A;$
- Associative law 结合律：$A\cup(B\cup C)=(A\cup B)\cup C,\quad A\cap(B\cap C)=(A\cap B)\cap C$.
- Distributive law 分配律：$A\cup (B\cap C)=(A\cup B)\cap(A\cup C),\quad A\cap (B\cup C)=(A\cap B)\cup(A\cap C)$
- $A\cap (\stackrel{n}{\bigcup\limits_{i=1}}A_i)=\stackrel{n}{\bigcup\limits_{i=1}}(A\cap A_i),\quad A\cup (\stackrel{n}{\bigcap\limits_{i=1}}A_i)=\stackrel{n}{\bigcap\limits_{i=1}}(A\cup A_i);$
- $A\cap (\stackrel{\infty}{\bigcup\limits_{i=1}}A_i)=\stackrel{\infty}{\bigcup\limits_{i=1}}(A\cap A_i),\quad A\cup (\stackrel{\infty}{\bigcap\limits_{i=1}}A_i)=\stackrel{\infty}{\bigcap\limits_{i=1}}(A\cup A_i).$
- $\overline{\stackrel{n}{\bigcup\limits_{i=1}}A_i}=\stackrel{n}{\bigcap\limits_{i=1}}\overline{A_i},\quad \overline{\stackrel{n}{\bigcap\limits_{i=1}}A_i}=\stackrel{n}{\bigcup\limits_{i=1}}\overline{A_i};$
- $\overline{\stackrel{\infty}{\bigcup\limits_{i=1}}A_i}=\stackrel{\infty}{\bigcap\limits_{i=1}}\overline{A_i},\quad \overline{\stackrel{\infty}{\bigcap\limits_{i=1}}A_i}=\stackrel{\infty}{\bigcup\limits_{i=1}}\overline{A_i}.$ 

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
$\int$ 定积分| `\int`
$\displaystyle \int^{\infty}_{1}{\frac{1}{x}dx}$ | `$\displaystyle \int^{\infty}_{1}{\frac{1}{x}dx}$`
$\iint$ 二重积分| `\iint`
$\iiint$ 三重积分| `\iiint`
$\oint$ 曲线积分| `\oint`
$\oiint$ 曲面积分| `\oiint`
$\infty$ | `\infty`
$\nabla$ | `\nabla`
$\because$ | `\because`
$\therefore$ | `\therefore`
$\forall$ | `\forall`
$\exists$ | `\exists`

## 平面几何

语法 | markdown| 说明
---|---|---
$\triangle$ | `\triangle`| 
$\odot$ | `\odot`| 
$\angle$ | `\angle`|夹角 
$\perp$ | `\perp`| 垂直
$30^\circ $| `30^\circ`|角度
$\sim$ | `\sim`| 
$\cong$ | `\cong`| 

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

$$
\begin{equation}
S
=\begin{bmatrix}
A  &  B  & \cdots\ &C\\
D  &  E  & \cdots\ & F\\
 \vdots   & \vdots & \ddots  & \vdots  \\
 G & H  & \cdots\ & I\\
\end{bmatrix}
\end{equation}
$$

$$
\left( 
\begin{matrix} 1 & x_{11} & x_{12} & \cdots & x_{1p} \\ 
1 & x_{11} & x_{12} & \cdots &x_{1p}\\ 
\vdots & \vdots & \vdots & \ddots & \vdots \\ 
1 & x_{11} & x_{12} & \cdots &x_{1p} 
\end{matrix} 
\right)
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

## 公式加边框

- `\boxed` 命令修饰
- `$$\boxed{n = p_1^{k_1} p_2^{k_2} \dots p_r^{k_r}}$$`

$$\boxed{n = p_1^{k_1} p_2^{k_2} \dots p_r^{k_r}}$$

[go to top](#top)

> Reference
- [Cmd Markdown 公式指导手册](https://www.zybuluo.com/codeep/note/163962)
- [markdown最全数学公式速查](https://blog.csdn.net/jyfu2_12/article/details/79207643)
- [MarkDown数学公式语法整理](https://blog.csdn.net/guoxulieying/article/details/131107653)
- [【Markdown】如何用 Markdown 写好数学表达式](https://blog.csdn.net/qq_42907802/article/details/104536794?spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-2-104536794-blog-89952211.pc_relevant_3mothn_strategy_recovery&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-2-104536794-blog-89952211.pc_relevant_3mothn_strategy_recovery&utm_relevant_index=3)
- [Markdown 符号公式大全](http://t.zoukankan.com/izcat-p-14264850.html)
