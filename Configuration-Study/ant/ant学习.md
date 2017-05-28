1. ant案例build.xml

- dir： 指明文件集要选择的路径
- id：　文件集的名称，在使用的时候可直接的引用
- include/exclude: 包含和排除的文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project default="execute">
  
  <!-- 设置属性， 使用${}来引用属性 -->
  <property name="build.dir" location="build"></property>
  <!--使用属性定义路径时候一定使用location，可将路径转换为当前系统的路径格式，不要使用value -->
  <property name="build.classes" location="${build.dir}\classes"></property> 
  <property name="build.src" location="${build.dir}\src"></property> 
  <property name="build.lib.dir" location="${build.dir}\dist"></property> 
  <!-- <property name="execute.classes" value="ant.zztc.edu.cn.HelloWorld"></property>
  <property name="jar.name" value="hello.jar"></property> -->
  <!-- 引入外部属性文件， 不建议在外部文件中定义路径 -->
  <property file="build.properties"></property>
  <!-- 将环境变量中的参数导入env变量中 -->
  <property environment="env"></property>
  <target name="execute" depends="jar,copysrc">
    <echo>{$env.CATALINA_HOME}</echo>
    <echo>{$env.OS}</echo>
  </target>
    
  <!-- 文件集 -->
  <!-- <fileset id="src.path" dir="src" includes="**/*.*"><fileset> -->
  <fileset id="src.path" dir="src">
    <include name="**/*.*" />
    <exclude name="**/Test*" />　　<!-- 排除以Test开头的文件 -->
  <fileset>
  
  <target name="init">
    <delete dir="${build.dir}"></delete>
    <mkdir dir="${build.dir}" />
    <mkdir dir="${build.src}" />
    <mkdir dir="${build.classes}" />
    <mkdir dir="${build.lib.dir}" />
  </target>

  <target name="copysrc" depends="init">
    <copy todir="${build.src}">
      <fileset refid="src.path"></fileset>
    </copy>
  </target> 

  <target name="compile" depends="init">
    <javac destdir="${build.classes}" srcdir="{src}"></javac>
  </target>

  <target name="jar" depends="compile">
    <jar destdir="${build.lib.dir}/${jar.name}" basedir="${build.classes}">
      <manifest>
        <attribute name="Main-Class" value="{execute.classes}" />  <!-- 在目录meta-inf下的manifest.mf中添加Main-Class的值 -->
        <attribute name="Build-By" value="yourName" />
      </manifest>
    </jar>
  </target>

  <target name="execute" depends="jar,copysrc">
    <echo>基于类路径的classname来完成执行</echo>
    <java classname="{execute.classes}" classpath="${build.classes}">
      <arg value="1" />
      <arg value="2" />
      <arg value="3" />
    </java>
    <echo>基于jar来完成执行</echo>
    <java jar="${build.lib.dir}/${jar.name}" fork="true"> <!-- fork="true"使用jdk环境进行编译 -->
      <arg value="1" />
      <arg value="2" />
      <arg value="3" />
    </java>
  </target>

</project>
```

2. 外部属性文件build.properties（当属性很多时候）

```
execute.classes=ant.zztc.edu.cn.HelloWorld
jar.name=hello.jar
```

3. ant的内部属性

- ant.file
- ant.home
- ant.java.version
- ant.project.name
- ant.version
- basedir

4. junit Test

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project name="junit-test">
  <property name="src.dir" location="src"></property>
  <property name="test.src.dir" location="test"></property>
  <property name="lib.dir" location="lib"></property>
  <property name="build.dir" location="build"></property>
  <property name="build.classes" location="${build.dir}\classes"></property> 
  <property name="build.test.dir" location="${build.dir}\test"></property> 
  <property name="build.test.classes" location="${build.test.dir}\classes"></property> 
  <property name="build.test.report" location="${build.test.dir}\report"></property> 
  
  <!-- <property name="run-test-class" value="cn.edu.zttc.test.TestHello"></property> -->
  <property name="run-test-class" value="**/Test*.class"></property>
  
  <path id="compile-path">
    <fileset dir="${lib.dir}" includes="*.jar"></fileset>  <!-- 包含所有的依赖包， 如junit-4.jar -->
  </path>
  <path id="compile-test-path">
    <path refid="compile-path"></path>
    <pathelement location="${build.classes}" />
  </path>
  <path id="run-test-path">
    <path refid="compile-test-path"></path>
    <pathelement location="${build.test.classes}" />
  </path>
  
  <target name="clean">
    <delete dir="{build.dir}"></delete>
  </target> 
  
  <target name="init">
    <mkdir dir="${build.dir}" />
    <mkdir dir="${build.classes}" />
    <mkdir dir="${build.test.dir}" />
    <mkdir dir="${build.test.classes}" />
    <mkdir dir="${build.test.report}" />
  </target> 

  <target name="compile" depends="init">
    <echo>编译源文件</echo>
    <javac includeantruntime="true" destdir="${build.classes}" srcdir="{src.dir}" classpathhref="compile-path"></javac>
  </target>

  <target name="compile-test" depends="compile">
    <echo>编译测试文件</echo>
    <javac failonerror="true" includeantruntime="true" destdir="${build.test.classes}" srcdir="{test.src.dir}" classpathhref="compile-test-path"></javac>
  </target>

  <target name="run-test" depends="compile-test">
    <echo>运行测试文件</echo>
    <junit printsummary="true" haltonfailure="true">
      <classpath refid="run-test-path"></classpath>
      <formatter type="brief" usefile="false" />
      <formatter type="xml" />
      <!-- <test name="${run-test-class}"></test> -->
      <batchtest todir="${build.test.report}">  <!-- 写入test report -->
        <fileset dir="${build.test.classes}" includes="${run.test.classes}"></fileset>
      </batchtest>
    </junit>
    <junitreport todir="${build.test.report}">
      <fileset dir="${build.test.report}" includes="TEST-*.xml"></fileset>
      <report format="frames" todir="${build.test.report}/html" />
    </junitreport>
  </target> />
  
</project>
```
