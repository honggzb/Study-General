- [安装和配置](#安装和配置)
- [测试ant](#测试ant)
- [ant脚本：使用节点、元素和属性、命令指令](#)
- [ant命令](#ant命令)

### 安装和配置

1、下载ant，http://mirror.esocc.com/apache//ant/binaries/apache-ant-1.9.1-bin.zip

2、解压zip压缩包，如D:\apache-ant-1.9.1

- bin是ant的程序运行入口，如果没有配置ANT_HOME的情况下，可以通过bin目录中的bat程序进行运行build任务

	如：在cmd中运行ant.bat就可以执行程序，当然当前目录中存在一个build.xml（build.xml是默认的ant执行文件，可以指定其他文件）

- etc目录中存放的都是一些xsl的输出模板，创建一个加强的导出各种任务的XML输出，使你的build文件摆脱过时的警告
- lib目录中存放的是ant程序需要依赖的jar包
- manual目录是ant程序的帮助文档

3、在我的电脑 –> 右键属性 –> 高级系统配置 -> 环境变量 中配置ant

- 新建系统变量 `ANT_HOME = D:\apache-ant-1.9.1`
- 环境变量的path变量中，配置
	`%PATH%=...maybe-other-entries...;%ANT_HOME%\bin;...maybe-other-entries... `

### 测试ant

运行cmd的dos窗口中输入ant或ant -version

### ant的运行时环境

ant在运行命令的时候，有时候会出现一些公用的jar库。这些库会存在于每个ant工程中，那么这个时候我们可以把这个jar包放到ant_home\lib目录中作为全局的库使用。

如果你不想“污染”原始的ant程序，那可以把jar包放在当前windows用户的目录下，具体位置应该是${user.home}/.ant/lib 下。没有以上目录可以手动建立。

如果只是临时要添加lib，又不想把lib添加到当前ant工程中。可以在运行ant程序的时候指定依赖的lib参数。

`ant -lib helloworld.jar -f build.xml`


### ant脚本：使用节点、元素和属性、命令指令

### ant命令

![](http://i.imgur.com/m5AHbGa.png)

- help : 显示描述ant 命令及其选项的帮助信息 
- projecthelp : 显示包含在构建文件中的、所有用户编写的帮助文档。即为各个<target>中description 属性的文本，以及包含在<description>元素中的任何文本。将有description 属性的目标列为主目标（Main target），没有此属性的目标则列为子目标（Subtarget）。 
- version :要求ant 显示其版本信息，然后退出。 
-quiet: 制并非由构建文件中的echo 任务所产生的大多数消息。 
- verbose: 示构建过程中每个操作的详细消息。此选项与-debug 选项只能选其一。 
-debug: 显示Ant 和任务开发人员已经标志为调试消息的消息。此选项与-verbose 只能选其一。 
- emacs: 日志消息进行格式化，使它们能够很容易地由Emacs 的shell 模式（shellmode）所解析；也就是说，打印任务事件，但并不缩排，在其之前也没有[taskname]。 
- logfile filename: 日志输出重定向到指定文件。 
- logger classname: 定一个类来处理Ant 的日志记录。所指定的类必须实现了org.apache.tools.ant.BuildLogger 接口。 
- listener classname:  Ant 声明一个监听类，并增加到其监听者列表中。在Ant与IDE或其他Java程序集成时，此选项非常有用。可以阅读第六章以了解有关监听者的更多信息。必须将所指定的监听类编写为可以处理Ant 的构建消息接发。 
- buildfile filename:  指定Ant 需要处理的构建文件。默认的构建文件为build.xml。 
- Dproperty=value: 在命令行上定义一个特性名－值对。 
- find filename:  指定Ant 应当处理的构建文件。与-buildfile 选项不同，如果所指定文件在当前目录中未找到，-find 就要求Ant 在其父目录中再进行搜索。这种搜索会继续在其祖先目录中进行，直至达到文件系统的根为止，在此如果文件还未找到，则构建失败。 
- atuoproxy jdk1.5以上的可以使用代理设置 
- nouserlib 运行ant时不使用用户lib中的jar包 
- nice 设计主线程优先级 
- logfile 使用指定的log日志 
- noinput 不允许交互输入 
- keep-going, -k 执行不依赖于所有目标 
- propertyfile 加载所有属性配置文件 -d 属性文件优先

> reference

- [ant 使用指南](http://www.cnblogs.com/hoojo/archive/2013/06/14/java_ant_project_target_task_run.html)
