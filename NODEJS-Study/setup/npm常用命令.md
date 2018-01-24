- [Remove Node.js from Windows completely](#Remove-Node)
- [安装Node模块](#安装Node模块)
- [升级nodejs 的npm](#升级nodejs)
- [npm删除后重新安装](#npm删除后重新安装)

<h3 id="Remove-Node">Remove Node.js from Windows completely</h3>

```
1. Uninstall from Programs & Features with the uninstaller.
2. Reboot (or you probably can get away with killing all node-related processes from Task Manager).
3. Look for these folders and remove them (and their contents) if any still exist. Depending on the version you installed, UAC settings, and CPU architecture, these may or may not exist:
  C:\Program Files (x86)\Nodejs
  C:\Program Files\Nodejs
  C:\Users\{User}\AppData\Roaming\npm (or %appdata%\npm)
  C:\Users\{User}\AppData\Roaming\npm-cache (or %appdata%\npm-cache)
  C:\Users\{User}\.npmrc (and possibly check for that without the . prefix too)
5. Check your %PATH% environment variable to ensure no references to Nodejs or npm exist.
7. If it's still not uninstalled, type where node at the command prompt and you'll see where it resides -- delete that (and probably the parent directory) too.
8. Reboot, for good measure.
```

<h3 id="安装Node模块">`npm install moduleNames`：安装Node模块</h3>

- `npm install -g moduleName` 全局安装
- `$npm get global` 可以查看当前使用的安装模式
- `npm install <name> --save` 安装的同时，将信息写入package.json中项目路径中如果有package.json文件
1. `npm uninstall express`  #删除指定的模块

2. `npm view moduleNames`：查看node模块的package.json文件夹, 注意事项：如果想要查看package.json文件夹下某个标签的内容，可以使用`npm view moduleName labelName`
3. `npm list`：查看当前目录下已安装的node包
4. `npm help`：查看帮助命令
5. `npm show express`     #显示模块详情
5. `npm view moudleName dependencies`：查看包的依赖关系
6. `npm view moduleName repository.url`：查看包的源文件地址
7. `npm view moduleName engines`：查看包所依赖的Node的版本
8. `npm help folders`：查看npm使用的所有文件夹
9. `npm rebuild moduleName`：用于更改包内容后进行重建
10. `npm outdated：检查包是否已经过时`，此命令会列出所有已经过时的包，可以及时进行包的更新
11. `npm update moduleName：更新node模块`
12. `npm uninstall moudleName`：卸载node模块
13. `npm help json`： 查看访问npm的json文件夹
14. `npm search packageName`： 检验某个包名是否已存在
15. `npm init`：会引导你创建一个package.json文件，包括名称. 版本. 作者这些信息等
16. `npm root`：查看当前包的安装路径,  `npm root -g`：查看全局的包的安装路径
17. `npm -v`：查看npm安装的版本
18. `npm clean cache`：
19. `npm config set cache c:\dev\nodejs\npm-cache --global`:  NPM tries t opickup packages from cache and the default location is sometimes prohibited from reading
20. `npm update`        #升级当前目录下的项目的所有模块 
21. `npm update express`    #升级当前目录下的项目的指定模块
22. `npm update -g express`  #升级全局安装的express模块

<h3 id="升级nodejs">升级nodejs 的npm</h3>

- 首先安装n模块：`npm install -g n`   
- 升级node.js到最新稳定版   `n stable`
- `npm install -g npm@latest  #upgrade to the latest version of npm`
- `npm install -g npm@lts   # upgrade to the most recent LTS release`

<h3 id="npm删除后重新安装">npm删除后重新安装</h3>

通过从github的方式将npm安装到nodejs\node_modules

`git clone --recursive git://github.com/isaacs/npm.git`

下载完成后，打开nodejs命令行窗口，进入到npm的代码文件夹下，使用下边命令安装

`node cli.js install npm -gf` 

其中-gf是指全局安装的意思，你可以不要，这样会安装在当前文件夹下，当前工程下而已。

`npm -v`查看npm安装版本

- 更多命令请参看npm官方文档：https://www.npmjs.org/doc/
- http://www.bubuko.com/infodetail-915159.html
