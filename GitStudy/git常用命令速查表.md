[Git常用命令](#top)

- [分支操作](#%E5%88%86%E6%94%AF%E6%93%8D%E4%BD%9C)
    - [git branch操作(列出，创建或者删除分支)](#git-branch%E6%93%8D%E4%BD%9C%E5%88%97%E5%87%BA%E5%88%9B%E5%BB%BA%E6%88%96%E8%80%85%E5%88%A0%E9%99%A4%E5%88%86%E6%94%AF)
    - [git checkout 操作(对于内容来说，该操作是检出版本，本质上只是移动head指针)](#git-checkout-%E6%93%8D%E4%BD%9C%E5%AF%B9%E4%BA%8E%E5%86%85%E5%AE%B9%E6%9D%A5%E8%AF%B4%E8%AF%A5%E6%93%8D%E4%BD%9C%E6%98%AF%E6%A3%80%E5%87%BA%E7%89%88%E6%9C%AC%E6%9C%AC%E8%B4%A8%E4%B8%8A%E5%8F%AA%E6%98%AF%E7%A7%BB%E5%8A%A8head%E6%8C%87%E9%92%88)
    - [git reset操作(将当前分支回退到历史某个版本)](#git-reset%E6%93%8D%E4%BD%9C%E5%B0%86%E5%BD%93%E5%89%8D%E5%88%86%E6%94%AF%E5%9B%9E%E9%80%80%E5%88%B0%E5%8E%86%E5%8F%B2%E6%9F%90%E4%B8%AA%E7%89%88%E6%9C%AC)
    - [git reflog: 按从新到旧的顺序，记录head访问提交的记录](#git-reflog-%E6%8C%89%E4%BB%8E%E6%96%B0%E5%88%B0%E6%97%A7%E7%9A%84%E9%A1%BA%E5%BA%8F%E8%AE%B0%E5%BD%95head%E8%AE%BF%E9%97%AE%E6%8F%90%E4%BA%A4%E7%9A%84%E8%AE%B0%E5%BD%95)
    - [git stash(保存目前的工作目录和暂存区状态，并返回到干净的工作空间)](#git-stash%E4%BF%9D%E5%AD%98%E7%9B%AE%E5%89%8D%E7%9A%84%E5%B7%A5%E4%BD%9C%E7%9B%AE%E5%BD%95%E5%92%8C%E6%9A%82%E5%AD%98%E5%8C%BA%E7%8A%B6%E6%80%81%E5%B9%B6%E8%BF%94%E5%9B%9E%E5%88%B0%E5%B9%B2%E5%87%80%E7%9A%84%E5%B7%A5%E4%BD%9C%E7%A9%BA%E9%97%B4)
    - [git merge(合并分支)](#git-merge%E5%90%88%E5%B9%B6%E5%88%86%E6%94%AF)
    - [git rebase(修剪提交历史基线，变基)](#git-rebase%E4%BF%AE%E5%89%AA%E6%8F%90%E4%BA%A4%E5%8E%86%E5%8F%B2%E5%9F%BA%E7%BA%BF%E5%8F%98%E5%9F%BA)
    - [rebase和merge的比较](#rebase%E5%92%8Cmerge%E7%9A%84%E6%AF%94%E8%BE%83)
- [Git命令速查表](#git%E5%91%BD%E4%BB%A4%E9%80%9F%E6%9F%A5%E8%A1%A8)
    - [常用的Git命令](#%E5%B8%B8%E7%94%A8%E7%9A%84git%E5%91%BD%E4%BB%A4)
    - [对象库操作相关命令](#%E5%AF%B9%E8%B1%A1%E5%BA%93%E6%93%8D%E4%BD%9C%E7%9B%B8%E5%85%B3%E5%91%BD%E4%BB%A4)
    - [引用操作相关命令](#%E5%BC%95%E7%94%A8%E6%93%8D%E4%BD%9C%E7%9B%B8%E5%85%B3%E5%91%BD%E4%BB%A4)
    - [版本库管理相关命令](#%E7%89%88%E6%9C%AC%E5%BA%93%E7%AE%A1%E7%90%86%E7%9B%B8%E5%85%B3%E5%91%BD%E4%BB%A4)
    - [数据传输相关命令](#%E6%95%B0%E6%8D%AE%E4%BC%A0%E8%BE%93%E7%9B%B8%E5%85%B3%E5%91%BD%E4%BB%A4)
    - [合并相关的辅助命令](#%E5%90%88%E5%B9%B6%E7%9B%B8%E5%85%B3%E7%9A%84%E8%BE%85%E5%8A%A9%E5%91%BD%E4%BB%A4)

## 分支操作

### git branch操作(列出，创建或者删除分支)

git branch|操作(列出，创建或者删除分支)
---|---
git branch <branchName> |创建一个分支
git branch -d <branchName>|删除指定分支
git branch -v|显示现在的所有分支信息

### git checkout 操作(对于内容来说，该操作是检出版本，本质上只是移动head指针)

git checkout|操作(对于内容来说，该操作是检出版本，本质上只是移动head指针)
---|---
git checkout <branchName> |将head指针指向目标分支
git checkout -b <branchName> |创建该分支，并将head指针指向它
git checkout <reference> |将head指针移动到任何引用对象上
git checkout - |恢复到上一个head指向的分支

### git reset操作(将当前分支回退到历史某个版本)

git reset|操作(将当前分支回退到历史某个版本)
---|---
git reset --mixed <commit> (默认)：|内容复制回暂存区
git reset --soft <commit>|内容区和暂存区保存原有状态
git reset --hard<commit>|内容复制回工作区和暂存区
git reset <branchName>^|回退到branchName的父提交
git reset <branchName>~n|回退到branchName前的第n次提交

### git reflog: 按从新到旧的顺序，记录head访问提交的记录

命令|范例|移动（head/branch）|说明
---|---|---|---
`git reset [commit]`| git reset HEAD^ --soft|YES/YES|完全回退到某提交
`git reset [file]`| git reset readme.md|NO/NO|恢复暂存区到某提交状态
`git checkout [commit]`| git checkout master|YES/NO|移动当前指针HEAD到某提交
`git checkout [file]`| git checkout readme.md|NO/NO|恢复工作目录到某状态

### git stash(保存目前的工作目录和暂存区状态，并返回到干净的工作空间)

```
git stash save ‘message’ ：压入stash区栈顶
git stash list ：列出stash区的元素
git stash apply stash编号 ：将stash栈中对应编号的对应的状态返回给工作区
git stash drop stash编号 ：删除stash栈中对应编号的状态
git stash pop ：等价于 stash apply 栈顶元素+ stash drop 栈顶元素
```

### git merge(合并分支)

```
git merge branchName1 branchName2 ：将分支1合并到分支2
git merge branchName ：将branchName合并到当前分支
git merge branchName —ff ：将branchName合并到当前分支，使用fast-forward方式
fast-forward(快速向前合并)的形式是，两个分支，有一个并未有提交记录。
git merge branchName --no-ff ：将branchName合并到当前分支，不使用fast-forward方式
```

### git rebase(修剪提交历史基线，变基)

```
git rebase master ：将head所指向的分支在master分支上重演
git rebase --onto master 5751363 ：将5751363后的提交在master上重演
```

### rebase和merge的比较

![](https://i.imgur.com/GtsdyVL.png)


## Git命令速查表

### 常用的Git命令

<table class="jbborder" style="border-collapse:collapse;border-spacing:0px;border:;text-align:center;clear:both;color:rgb(0,0,0);font-family:tahoma, arial, '宋体';font-size:14px;line-height:25.2px;"><thead><tr><td width="200" style="border:1px solid rgb(204,204,204);background:rgb(218,238,243);">
<p align="left" style="font-size:14px;">
<strong><span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">命令</span></strong></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(218,238,243);">
<p align="left" style="font-size:14px;">
<strong><span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">简要说明</span></strong></p>
</td>
</tr></thead><tbody><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git add</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">添加至暂存区</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git add–interactive</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">交互式添加</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git apply</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">应用补丁</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git am</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">应用邮件格式补丁</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git annotate</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">同义词，等同于 git blame</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git archive</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">文件归档打包</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git bisect</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">二分查找</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git blame</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">文件逐行追溯</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git branch</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">分支管理</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git cat-file</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">版本库对象研究工具</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git checkout</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">检出到工作区、切换或创建分支</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git cherry-pick</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">提交拣选</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git citool</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">图形化提交，相当于 git gui&nbsp;</span>命令</p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git clean</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">清除工作区未跟踪文件</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git clone</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">克隆版本库</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git commit</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">提交</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git config</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">查询和修改配置</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git describe</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">通过里程碑直观地显示提交ID</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git diff</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">差异比较</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git difftool</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">调用图形化差异比较工具</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git fetch</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">获取远程版本库的提交</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git format-patch</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">创建邮件格式的补丁文件。参见 git am&nbsp;</span>命令</p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git grep</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">文件内容搜索定位工具</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git gui</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">基于Tcl/Tk</span>的图形化工具，侧重提交等操作</p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git help</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">帮助</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git init</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">版本库初始化</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git init-db*</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">同义词，等同于 git init</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git log</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">显示提交日志</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git merge</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">分支合并</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git mergetool</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">图形化冲突解决</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git mv</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">重命名</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git pull</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">拉回远程版本库的提交</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git push</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">推送至远程版本库</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git rebase</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">分支变基</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git rebase–interactive</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">交互式分支变基</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git reflog</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">分支等引用变更记录管理</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git remote</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">远程版本库管理</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git repo-config*</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">同义词，等同于 git config</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git reset</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">重置改变分支“</span>游标”指向</p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git rev-parse</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">将各种引用表示法转换为哈希值等</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git revert</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">反转提交</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git rm</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">删除文件</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git show</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">显示各种类型的对象</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git stage*</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">同义词，等同于 git add</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git stash</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">保存和恢复进度</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git status</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">显示工作区文件状态</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git tag</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">里程碑管理</span></p>
</td>
</tr></tbody></table>

### 对象库操作相关命令

<table class="jbborder" style="border-collapse:collapse;border-spacing:0px;border:;text-align:center;clear:both;color:rgb(0,0,0);font-family:tahoma, arial, '宋体';font-size:14px;line-height:25.2px;"><thead><tr><td width="200" style="border:1px solid rgb(204,204,204);background:rgb(218,238,243);">
<p align="left" style="font-size:14px;">
<strong><span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">命令</span></strong></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(218,238,243);">
<p align="left" style="font-size:14px;">
<strong><span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">简要说明</span></strong></p>
</td>
</tr></thead><tbody><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git commit-tree</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">从树对象创建提交</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git hash-object</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">从标准输入或文件计算哈希值或创建对象</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git ls-files</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">显示工作区和暂存区文件</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git ls-tree</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">显示树对象包含的文件</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git mktag</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">读取标准输入创建一个里程碑对象</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git mktree</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">读取标准输入创建一个树对象</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git read-tree</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">读取树对象到暂存区</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git update-index</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">工作区内容注册到暂存区及暂存区管理</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git unpack-file</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">创建临时文件包含指定 blob&nbsp;</span>的内容</p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git write-tree</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">从暂存区创建一个树对象</span></p>
</td>
</tr></tbody></table>

### 引用操作相关命令

<table class="jbborder" style="border-collapse:collapse;border-spacing:0px;border:;text-align:center;clear:both;color:rgb(0,0,0);font-family:tahoma, arial, '宋体';font-size:14px;line-height:25.2px;"><thead><tr><td width="200" style="border:1px solid rgb(204,204,204);background:rgb(218,238,243);">
<p align="left" style="font-size:14px;">
<strong><span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">命令</span></strong></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(218,238,243);">
<p align="left" style="font-size:14px;">
<strong><span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">简要说明</span></strong></p>
</td>
</tr></thead><tbody><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git check-ref-format</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">检查引用名称是否符合规范</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git for-each-ref</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">引用迭代器，用于shell</span>编程</p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git ls-remote</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">显示远程版本库的引用</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git name-rev</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">将提交ID</span>显示为友好名称</p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git peek-remote*</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">过时命令，请使用 git ls-remote</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git rev-list</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">显示版本范围</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git show-branch</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">显示分支列表及拓扑关系</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git show-ref</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">显示本地引用</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git symbolic-ref</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">显示或者设置符号引用</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git update-ref</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">更新引用的指向</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git verify-tag</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">校验 GPG&nbsp;</span>签名的Tag</p>
</td>
</tr></tbody></table>

### 版本库管理相关命令

<table class="jbborder" style="border-collapse:collapse;border-spacing:0px;border:;text-align:center;clear:both;color:rgb(0,0,0);font-family:tahoma, arial, '宋体';font-size:14px;line-height:25.2px;"><thead><tr><td width="200" style="border:1px solid rgb(204,204,204);background:rgb(218,238,243);">
<p align="left" style="font-size:14px;">
<strong><span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">命令</span></strong></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(218,238,243);">
<p align="left" style="font-size:14px;">
<strong><span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">简要说明</span></strong></p>
</td>
</tr></thead><tbody><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git count-objects</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">显示松散对象的数量和磁盘占用</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git filter-branch</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">版本库重构</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git fsck</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">对象库完整性检查</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git fsck-objects*</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">同义词，等同于 git fsck</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git gc</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">版本库存储优化</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git index-pack</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">从打包文件创建对应的索引文件</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git lost-found*</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">过时，请使用 git fsck –lost-found&nbsp;</span>命令</p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git pack-objects</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">从标准输入读入对象ID</span>，打包到文件</p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git pack-redundant</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">查找多余的 pack&nbsp;</span>文件</p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git pack-refs</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">将引用打包到 .git/packed-refs&nbsp;</span>文件中</p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git prune</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">从对象库删除过期对象</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git prune-packed</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">将已经打包的松散对象删除</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git relink</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">为本地版本库中相同的对象建立硬连接</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git repack</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">将版本库未打包的松散对象打包</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git show-index</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">读取包的索引文件，显示打包文件中的内容</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git unpack-objects</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">从打包文件释放文件</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git verify-pack</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">校验对象库打包文件</span></p>
</td>
</tr></tbody></table>

### 数据传输相关命令

<table class="jbborder" style="border-collapse:collapse;border-spacing:0px;border:;text-align:center;clear:both;color:rgb(0,0,0);font-family:tahoma, arial, '宋体';font-size:14px;line-height:25.2px;"><thead><tr><td width="200" style="border:1px solid rgb(204,204,204);background:rgb(218,238,243);">
<p align="left" style="font-size:14px;">
<strong><span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">命令</span></strong></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(218,238,243);">
<p align="left" style="font-size:14px;">
<strong><span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">简要说明</span></strong></p>
</td>
</tr></thead><tbody><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git fetch-pack</span></p>
</td>
<td colspan="2" style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">执行 git fetch&nbsp;</span>或 git pull 命令时在本地执行此命令，用于从其他版本库获取缺失的对象</p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git receive-pack</span></p>
</td>
<td colspan="2" style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">执行 git push&nbsp;</span>命令时在远程执行的命令，用于接受推送的数据</p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git send-pack</span></p>
</td>
<td colspan="2" style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">执行 git push&nbsp;</span>命令时在本地执行的命令，用于向其他版本库推送数据</p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git upload-archive</span></p>
</td>
<td colspan="2" style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">执行 git archive –remote&nbsp;</span>命令基于远程版本库创建归档时，远程版本库执行此命令传送归档</p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git upload-pack</span></p>
</td>
<td colspan="2" style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">执行 git fetch&nbsp;</span>或 git pull 命令时在远程执行此命令，将对象打包、上传</p>
</td>
</tr></tbody></table>

### 合并相关的辅助命令

<table class="jbborder" style="border-collapse:collapse;border-spacing:0px;border:;text-align:center;clear:both;color:rgb(0,0,0);font-family:tahoma, arial, '宋体';font-size:14px;line-height:25.2px;"><thead><tr><td width="200" style="border:1px solid rgb(204,204,204);background:rgb(218,238,243);">
<p align="left" style="font-size:14px;">
<strong><span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">命令</span></strong></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(218,238,243);">
<p align="left" style="font-size:14px;">
<strong><span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">简要说明</span></strong></p>
</td>
</tr></thead><tbody><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git merge-base</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">供其他脚本调用，找到两个或多个提交最近的共同祖先</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git merge-file</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">针对文件的两个不同版本执行三向文件合并</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git merge-index</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">对index</span>中的冲突文件调用指定的冲突解决工具</p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git merge-octopus</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">合并两个以上分支。参见 git merge&nbsp;</span>的octopus合并策略</p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git merge-one-file</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">由 git merge-index&nbsp;</span>调用的标准辅助程序</p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git merge-ours</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">合并使用本地版本，抛弃他人版本。参见 git merge&nbsp;</span>的ours合并策略</p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git merge-recursive</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">针对两个分支的三向合并。参见 git merge&nbsp;</span>的recursive合并策略</p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git merge-resolve</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">针对两个分支的三向合并。参见 git merge&nbsp;</span>的resolve合并策略</p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git merge-subtree</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">子树合并。参见 git merge&nbsp;</span>的 subtree 合并策略</p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git merge-tree</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">显式三向合并结果，不改变暂存区</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git fmt-merge-msg</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">供执行合并操作的脚本调用，用于创建一个合并提交说明</span></p>
</td>
</tr><tr><td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:#FF0000;">git rerere</span></p>
</td>
<td style="border:1px solid rgb(204,204,204);background:rgb(238,238,238);">
<p align="left" style="font-size:14px;">
<span style="line-height:21.6px;font-size:12px;color:rgb(78,78,78);">重用所记录的冲突解决方案</span></p>
</td>
</tr></tbody></table>

> [Git 常用命令速查表(图文+表格)](https://blog.csdn.net/peterxiaoq/article/details/73496697)

