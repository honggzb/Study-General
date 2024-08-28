- [常用快捷键](#%E5%B8%B8%E7%94%A8%E5%BF%AB%E6%8D%B7%E9%94%AE)
- [设置'打开工程文件的所在位置'](#%E8%AE%BE%E7%BD%AE%E6%89%93%E5%BC%80%E5%B7%A5%E7%A8%8B%E6%96%87%E4%BB%B6%E7%9A%84%E6%89%80%E5%9C%A8%E4%BD%8D%E7%BD%AE)
- [eclipse删除工程失败的解决方案(强制删除工程）](#eclipse%E5%88%A0%E9%99%A4%E5%B7%A5%E7%A8%8B%E5%A4%B1%E8%B4%A5%E7%9A%84%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88%E5%BC%BA%E5%88%B6%E5%88%A0%E9%99%A4%E5%B7%A5%E7%A8%8B)

## 常用快捷键

- F3-> see reference class
- ctrl+shift+O -> auto import

## 设置'打开工程文件的所在位置'

1. Run --> External Tools --> External Tools Configurations
2. ![](https://i.imgur.com/mBbHJjG.png)
3. ![](https://i.imgur.com/YJXG8wa.png)
    1. Location: 'C:/WINDOWS/explorer.exe'
    2. Arguments:  '${container_loc:}' - 当前所选择的资源的parent的绝对路径
4. 点击Common-->External Tools -> 点击apply
    1. ![](https://i.imgur.com/Tnf1MkQ.png)
    
## eclipse删除工程失败的解决方案(强制删除工程）

1. 关闭eclipse
2. 打开<workspaceDir>\.metadata\.plugins\org.eclipse.core.resources\.projects
3. 删除你的项目
4. 打开eclipse,根据提示删除工程
5. or
    1. 删除.metadata文件夹
    2. 打开eclipse, 重新import project
    
