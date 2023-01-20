
[Markdown文件公式大全](#top)

- [一般公式](#一般公式)
- [关系运算符](#关系运算符)
- [括号](#括号)
- [希腊字母](#希腊字母)
- [矩阵](#矩阵)

## 一般公式

算式  | 语法 | markdown
---|---|---
分数，平方| $\frac{7x+5}{1+y^2}$ | `\frac{7x+5}{1+y^2}`
下标| $z=z_l$ | `z=z_l`
省略号| $\cdots$| `\cdots`
行间公式（使用两个$包含公式可以独立一行）| $\frac{d}{dx}e^{ax}=ae^{ax}\quad \sum_{i=1}^{n}{(X_i - \overline{X})^2}$ | `$\frac{d}{dx}e^{ax}=ae^{ax}\quad \sum_{i=1}^{n}{(X_i - \overline{X})^2}$`
开根号| $\sqrt{2};\sqrt[n]{3}$ | `\sqrt{2};\sqrt[n]{3}`
矢量 | $\vec{a} \cdot \vec{b}=0$ | `\vec{a} \cdot \vec{b}=0`
微积分| $\iint$ | `\iint`
微积分| $\iiint$ | `\iiintx`
微积分| $\oint$ | `\oint`
微积分| $\oint$ | `\oint`
微积分| $\mathrm{d}$ | `\mathrm{d}`
微积分| $\prime$ | `\prime`
微积分| $\lim$ | `\lim`
微积分| $\infty$ | `\infty`
微积分| $\partial$ | `\partial`
微积分| $\left.\frac{\partial f(x,y)}{\partial x}\right.$ | `\left.\frac{\partial f(x,y)}{\partial x}\right.`
微积分| $\sum$ | `\sum`
极限| $\lim_{n\rightarrow+\infty} n$ | `\lim_{n\rightarrow+\infty} n`
微积分| $\sum$ | `\sum`
累加| $\frac{1}{i^2}$ | `\frac{1}{i^2}`
累乘| $\prod\frac{1}{i^2}$ | `\prod \frac{1}{i^2}`
给公式编号，如: (1)| $$e^{i\theta}=cos\theta+\sin\theta i\tag{1}$$ | `$$e^{i\theta}=cos\theta+\sin\theta i\tag{1}$$`
三角函数| $sin$ | `sin`
对数函数| $\ln15$ | `\ln15`
对数函数| $\log_2^{10}$ | `\log_2^{10}`
对数函数| $\lg7$ | `\lg7`

[go to top](#top)

## 关系运算符

关系运算符| markdown
---|---
$\pm$ | `\pm`
$\times$ | `\times`
$\div$ | `\div`
$\sum$ | `\sum`
$\prod$ | `\prod`
$\neq$ | `\neq`
$\leq$ | `\leq`
$\geq$ | `\geq`

## 括号

算式  | 语法 | markdown
---|---|---
大括号| $\lbrace a+x \rbrace$ | `\lbrace a+x \rbrace`
尖括号| $\langle x \rangle$ | `\langle x \rangle`
上取整| $\lceil \frac{x}{2} \rceil$ | `\lceil \frac{x}{2} \rceil`
下取整| $\lfloor x \rfloor$ | `\lfloor x \rfloor`
原始括号| $\lbrace \sum_{i=0}^{n}i^{2}=\frac{2a}{x^2+1} \rbrace$ | `\lbrace \sum_{i=0}^{n}i^{2}=\frac{2a}{x^2+1} \rbrace`
全包括号| $\left\lbrace \sum_{i=0}^{n}i^{2}=\frac{2a}{x^2+1} \right\rbrace$ | `\left\lbrace \sum_{i=0}^{n}i^{2}=\frac{2a}{x^2+1} \right\rbrace`

[go to top](#top)

## 希腊字母

|大写| markdown | 小写 | markdown|
|---|---|---|---|
|$A$ | `\A` | $\\alpha$ | `\alpha`|
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

[go to top](#top)

## 矩阵

- 矩阵

$$
\begin{matrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9 
\end{matrix} \tag{1}
$$

- 带括号的矩阵

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

> reference
> [markdown最全数学公式速查](https://blog.csdn.net/jyfu2_12/article/details/79207643)
