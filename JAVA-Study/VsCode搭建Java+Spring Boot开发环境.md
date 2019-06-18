## VsCode搭建Java+Spring Boot开发环境

### 安装java+spring主要扩展

![](https://i.imgur.com/G0HGPZV.png)

- Java Extension Pack (Java 扩展包)，
- 如果已经安装了 Language Support for Java(TM) by Red Hat，也可以单独找到并安装 Java Debugger for Visual Studio Code
- Spring Boot Extension Pack
- setting.json

```json
{
    "workbench.iconTheme": "vscode-icons",
    "workbench.startupEditor": "newUntitledFile",
    "java.errors.incompleteClasspath.severity": "ignore",
    "workbench.colorTheme": "Atom One Dark",
    "java.home":"D:\\software\\Java\\jdk1.8.0_60",
    "java.configuration.maven.userSettings": "D:\\software\\apache-maven-3.3.3-bin\\apache-maven-3.3.3\\conf\\settings.xml",
    "maven.executable.path": "D:\\software\\apache-maven-3.3.3-bin\\apache-maven-3.3.3\\bin\\mvn.cmd",
    "maven.terminal.useJavaHome": true,
    "maven.terminal.customEnv": [
        {
            "environmentVariable": "JAVA_HOME",
            "value": "D:\\software\\Java\\jdk1.8.0_60"
        }
    ],
}
```

### 创建Spring Boot项目

- 使用快捷键(Ctrl+Shift+P)命令窗口，输入Spring选择创建"Spring Initializer: Generate a Maven Project"
- Spring Initializr Java Support
