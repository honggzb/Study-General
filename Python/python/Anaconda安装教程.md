## Anaconda安装教程

- Anaconda应用
  - Anaconda Navigtor ：用于管理工具包和环境的图形用户界面，后续涉及的众多管理命令也可以在 Navigator 中手工实现
  - Jupyter notebook ：基于web的交互式计算环境，可以编辑易于人们阅读的文档，用于展示数据分析的过程
  - qtconsole ：一个可执行 IPython 的仿终端图形界面程序，相比 Python Shell 界面，qtconsole 可以直接显示代码生成的图形，实现多行代码输入执行，以及内置许多有用的功能和函数
  - spyder ：一个使用Python语言、跨平台的、科学运算集成开发环境

```shell
# 1. install1 anaconda
# 2. create the basic environment
# go to command line from menu
conda create -n myproject python=3 scikit-learn numpy pandas scipy tensorflow
# 3. activate env
conda activate myproject
# 4. start Jupyter web application
jupyter lab
```

- set path manually
  - 'Anaconda安装路径'
  - 'Anaconda安装路径\Scripts'
  - 'Anaconda安装路径\Library\bin'
  - 测试Anaconda环境是否配置成功: cmd(WIN+R) -> 'conda -version'
- other command

```shell
Conda list       # 查看环境中现有的包
conda -version”  # 查看conda版本
deactivate 环境名                 # 退出当前环境
conda remove -n 环境名 --all      # 删除环境
conda info --envs                # 查看现有的环境
conda upgrade --all              # 所有工具包进行升级
activate                         # 切换到base环境
activate learn                   # 切换到learn环境
conda create -n learn python=3   # 创建一个名为learn的环境并指定python版本为3(的最新版本)
conda env list                   # 列出conda管理的所有环境
conda install requests           # 安装requests包
conda remove requests            # 卸载requets包
conda remove -n learn --all      # 删除learn环境及下属所有包
conda update requests            # 更新requests包
conda env export > environment.yaml   # 导出当前环境的包信息
conda env create -f environment.yaml  # 用配置文件创建新的虚拟环境
```

> reference
- [Anaconda中文网](https://anaconda.org.cn/)
- [Anaconda完全入门指南](https://www.jianshu.com/p/eaee1fadc1e9)
- [Anaconda安装教程（超详细版）](https://blog.csdn.net/m0_61607990/article/details/129531686)

