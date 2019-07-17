```
     Declarative Approach                Programmatic Approach
--------------------------------------------------------------------
           Page Layouts       User       Visualforce Pages
           Record types     Interface    Visualforce Components
   Lighting App Builder                  Lightning Components
--------------------------------------------------------------------
         Formula fields
       Validation Rules     Business     Apex Controllers
workflows and Approvals      Logic       Apex Triggers
        Process Builder
--------------------------------------------------------------------
        Custom Objects       Data        Metadata API
         Custom Fields       Model       REST API
         Relationships                   Bulk API
```

## salesforce Apex的变量基础知识，集合，表达式，流程控制语句

salesforce如果简单的说可以大概分成两个部分：Apex,VisualForce Page

- 基本变量
  - Integer: 一个32位整数的对象，取值范围为-2^31 -- 2^31
  - Long: 一个64位整数的对象，取值范围为-2^63--2^63-1
    - Long类型在不超过范围情况下可以通过intValue()方法转成Integer类型
  - Double: Double变量为包含小数点的64位数，很像java中的Double类型变量
  - Decimal: 包含小数点的32位数就是Decimal，很像java中的float类型变量
  - String:
  - Boolean: 和java区别为：Boolean类型变量有三个取值：true,false,null(default)，所以使用Boolean类型声明的时候必须赋予初始值，否则初始值为null
  - ID: 可以用任何一个符合规则的18位字符表示，如果你设置ID字符为15位，则将字符自动扩展成18位。不符合规则的ID字符在运行时则运行时异常
- 时间日期常用对象：
  - Datetime: 声明一个日期时间的对象, 包含两部分：日期，时间。因为salesforce一般制作global项目，所以日期时间一般取格林时间。Datetime无构造函数，如果实例化只能通过其静态方法初始化
  - Date: 声明一个日期的对象，Date可以和Datetime相互转换
  - Time: 声明一个时间的对象，对于时间需要考虑的是：因为中国时间和格林时间相差8小时，所以具体项目时如果是global项目需要考虑使用格林时间，即GMT时间
- 集合常用的对象：均为泛型方式，所以声明变量时，直接带上泛型
  - List<T>: 代表一类的有序数据列表。数据序号从0开始。与JAVA不同的是：List是一个类，并且不存在ArrayList等子类
  - Set<T>: 代表一类数据的无序列表。与JAVA不同的是：Set是一个类，不存在HashSet等子类
    - **注：set()方法在设置插入位置以前应确保长度大于需要插入的位置，否则将抛出异常**
  - Map<T>: 代表着键值对，与JAVA用法类似，区别为Map是一个类，不是接口，不存在HashMap<K,V>等子类
- 其他：Object，sObject(与数据库相关)
- **与JAVA一个最大的区别是：Apex中基本对象的初始值均为null**

```java
Integer i;
i += 1;
System.debug(i);   //会抛出NullPointerException, 在java中此种写法是可以的，因为int类型初始值为0
Integer i;
System.debug(i+'1');   // 输出的结果则为null1
```

- [salesforce 零基础开发入门学习（二）变量基础知识，集合，表达式，流程控制语句]https://www.cnblogs.com/zero-zyq/p/5278303.html

[back to top](#top)

## Apex Class structure

```java
public with sharing class myControllerExtension implements Util {
    private final Account acct;
    public Contact newContact { get; set; }
    pulic myControllerExtension(ApexPages.StandardController stdController){
        this.acct = (Account)stdController.getRecord();
    }
    public PageReference associateNewContact(Id cid){
        newContact = [SELECT Id, Account from Contact WHERE Id =: cid LIMIT 1];  //inline SOQL
        newContact.Account = acct;
        update newContact;      //inline DML
    }
}
```

- [Intro to Apex Code for Programmers Webinar](https://www.youtube.com/watch?v=WBeCWlbGX38)

## sObject简单介绍以及简单DML操作（SOQL）

- sObject指的是存储在Force.com平台数据库中的任何的对象
- sObject变量代表一行数据并且在Apex中只能使用SOAP API对象名称中声明的一行数据
- 新建一个数据表的操作步骤
  - setup-->左侧Build-->Create-->Objects,或者在上方搜索栏直接搜索Objects
  - 点击右侧主页面信息的New Custom Object
  - 在Label中输入要建立的数据库的名称，比如创建Student, 则在Label中输入Student，鼠标指向Object Name则自动填充Student，点击save按钮
  - 创建Student表成功,其API Name被平台自动设置为**Student__c**
- 当Student表创建成功的时候，API Name赋值为**Student__c**, 这个则为Student表的sObject对象，即**Student__c**对象为Student表的一行记录的引用

```java
//执行student表一行数据的插入
Student__c student = new Student__c();
student.Name__c = 'zero.zhang';
insert student;
```

[back to top]

## SOQL - Salesforce Object Query Language

- insert, update, upsert(insert && update), delete
  - upsert原理：upsert通过是否存在此ID来判断此条记录是否存在，
    1. 如果不存在此ID则执行insert操作；
    2. 如果存在并且只存在一个ID，则执行update操作；
    3. 存在并且存在多个ID，则抛出DMLException
- 拼串: Apex提供':'符号来声明查询语句中使用的变量，类似于Java中的PreparedStatement
- Force.com平台数据库中，查询不能使用'*'符号代表查询全部字段，如果查询全部字段需要全部列出来

### 查询

- 一种为通过`[select ...]`方式来进行查询
- 第二种方式为通过构造查询字符串，通过`Database.query(queryString)`方法来检索数据
- salesforce对查询记录条数以及DML操作次数均有严格的限制：
  - 查询条数一次不能超过50000条
  - DML操作一次不能超过10000次
  - 如果超过限制则抛异常。如果需要大量的进行DML操作，请使用批处理方式进行数据处理

```java
//查询列表
String args1 = '%zhang%';
String args2 = 'zhangsan';
List<Student__c> students = [select Id,Name__c from Student__c where Name__c like :args1 limit 10000];//查询名称含zhang的学生列表
/*
上述语句等同与:
String query = 'select Id,Name__c from Student__c where Name__c like :args1 limit 10000';
List<Student__c> students = Database.query(query);
*/
//查询表数据条数
String countQuery = 'select count(Id) from Student__c where Name__c = :args2 ';//查询名称为zhangsan的学生个数
Integer studentsCount = Database.countQuery(countQuery);
```

## 异常处理

```java
// 进行DML 操作时有可能发生DMLException，所以在进行DML操作时最好进行try,catch处理
try {
      insert student1;
} catch(DMLException e) {
      // TODO
} finally {
      // TODO
}
```

[back to top]

## 多表关联下的SOQL

- 查看数据表
  1. 采用schema Builder查看表结构以及多表之间的关联关系，可以登录后点击setup在左侧搜索框输入schema Builder 或者build-->schema Builder
  2. 采用[force.com Explorer](http://force-com-explorer-beta.software.informer.com/)通过自己写查询语句来查询数据
- 多表关联下的SOQL查询, 多表关联涉及到Data type中的look up或者master-detail

### Data type类型

类型|说明
---|---
Auto Number|系统生成的序列号，通过自身定义的形式显示，为每条新纪录自动递增数
Formula|声明一个计算式，功能很强大，以后会单独篇章讲解formula用法
Lookup Relationship|创建链接一个对象和另一个对象的关系，创建关系后，通过一个对象可以访问另一个对象的内容信息
Master-Detail Relationship|创建一个特殊的父子关系（主从关系），和lookup Relationship 的相同与差异在下面介绍
External Lookup Relationship|创建一个对象和另一个额外对象的关系。其中这个对象的数据存储在额外对象的数据源中
Checkbox|声明一个布尔类型
Currency|声明一个货币类型
Date|声明一个Date类型，用户在前台绑定后可以直接使用Date类型相应的控件
Date/Time|声明一个Date和Time类型，用户选择日期后，日期和当前时间便赋值到输入域
Email|声明一个Email类型
Geolocation|声明一个位置的类型，此类型包含经纬度信息
Number|允许输入任何的数字，如果输入的全是0则全部移除
Percent|声明一个百分比类型
Phone|声明一个手机号码类型，输入的内容自动转换成此类型
Picklist|声明一个列表类型，类似于HTML中的`<select><option></option></select>`关系
Picklist（Multi-Select）|声明一个列表类型，区别上面的为允许多选
Text|声明一个字符串类型，最大长度为255
Text Area|和Text类型相似，区别为内容可以换行
Text Area(Long)|和Text Area相似，最大长度为131072
Text Area(Rich)|富输入框，可以存储图片等
Text(Encrypted)|可以加密的形式存储
URL|声明一个URL类型

### PickList

1. 如果存在Student表情况下，在setup-->create-->Objects下找到Student，点击进入。如果不存在Student，则按照上一篇步骤新建Student表
2. 在Custom Fields & Relationships模块下点击add新建一个字段并选择PickList点击Next
3. 在Field Label 中输入Education，鼠标移动到Field Name中则自动输入。将Value选择第二个Enter Value，并在输入框中输入相应值
4. 一直选择Next，最后点击Save按钮新增PickList类型字段

### Lookup Relationship与Master-detail Relationship

1. master detail关系比较紧密，可以自动进行级联删除，Lookup关系相对灵活，不可以级联删除，如果删除操作，则需要先删除从表，再删除主表操作
2. 用lookup允许父为空，master不允许--master模式需要级联删除，如果master情况父为空则无法级联删除
3. 构建出LookUp关系和Master-detail关系
   1. 增一个字段，Datatype选择LookUp，点击Next，如图3;
   2. 在Relate To下拉框处选择需要关联的表，此处选择PRIVELEGE表，如图4，然后点击Next;
   3. 在Field Label 输入字段名称，此处输入PRIVELEGEID，鼠标移动到Field Name,则自动赋值，如图5，一直点击next;
   4. 点击save&new按钮，重复4--6步骤，将于ROLE表关联的字段创建

![](https://i.imgur.com/eC1MZi8.png)

```java
//增加操作 - 添加操作需要先添加主表，主表添加以后，ID便自动赋值，然后再取出ID操作从表
PRIVELEGE__c privelege = new PRIVELEGE__c(PRIVELEGENAME__c='权限添加',PRIVELEGEDESCRIBE__c='权限描述');
ROLE__c role = new ROLE__c(ROLENAME__c='角色添加',ROLEDESCRIBE__c='角色描述');
insert privelege;           //执行insert后，privelege的ID字段便会自动被赋值，且唯一
insert role;
ID roleId = [select Id from ROLE__c limit 1][0].ID;
ID privelegeId = [select Id from PRIVELEGE__c limit 1][0].ID;
PRIVELEGEROLE__c privelegeRole = new PRIVELEGEROLE__c();
privelegeRole.ROLEID__c = roleId;
privelegeRole.PRIVELEGEID__c = privelegeId;
insert privelegeRole;
//删除操作 - 先删除从表，在删除主表。删除从表后，表数据即消失。所以在表数据删除以前，需要先将需要的数据取出，比如上述的ID字段
String deletePrivelegeRoleSql = 'SELECT  ROLEID__c, Id,PRIVELEGEID__r.ID,ROLEID__r.ID' +
                                'FROM PRIVELEGEROLE__c';
List<SObject> privelegeRoles = Database.query(deletePrivelegeRoleSql);
 if(privelegeRoles.size() > 0) {//查询有记录的时候才对子表进行删除操作
    PRIVELEGEROLE__c privelegeRole = (PRIVELEGEROLE__c)privelegeRoles[0];
    ID privelegeId = privelegeRole.PRIVELEGEID__r.ID;    //通过层级A.B.C可以查出需要使用的变量
    ID roleId = privelegeRole.ROLEID__r.ID;
    try {
      Database.delete(privelegeRole.Id);
    } catch(Exception e) {
      System.debug('error occured when deleting privelegerole!');
    }
    try {
      Database.delete(privelegeId);
      Database.delete(roleId);
    } catch(DmlException e) {
      System.debug('error occured when deleting privelege or role');
    }
}
```

- https://developer.salesforce.com/trailhead/en/module/apex_database
- [salesforce 零基础开发入门学习（三）sObject简单介绍以及简单DML操作（SOQL）](https://www.cnblogs.com/zero-zyq/p/5283611.html)
- [salesforce 零基础开发入门学习（四）多表关联下的SOQL以及表字段Data type详解](https://www.cnblogs.com/zero-zyq/p/5284479.html)

[back to top](#top)

## 异步进程介绍与数据批处理Batchable

salesforce数据操纵|次数的限制|说明
---|---|---
Number of SOQL queries|100|一次执行SOQL的次数不能超过100次
Number of query rows|50000|一次查出的数据行数不能超过50000条
Number of SOSL queries|20|一次执行SOSL次数不能超过20次
Number of DML statements|150|DML语句不能超过150条
Number of DML rows|10000|一次操作数据行数不能超过10000行
Maximum CPU time|10000 |最大的CPU时间不能超过10000ms
Maximum heap size|6000000|堆大小不能超过6000000B
Number of callouts|100|一次执行callouts次数不能超过100次
Number of Email Invocations|10|Email调用次数不能超过10次
Number of future calls|50|调用Future次数不能超过50次
Number of queueable jobs added to the queue|50|添加到队列的queueable job数量不能超过50次
Number of Mobile Apex push calls|10|移动端Apex push调用最多不能超过10次

因为对于DML操作有限制，比如因为项目需求，需要修改50万条数据，直接调用`Database.update()`便会抛出异常，因为salesforce只允许一次性查出5万条数据并且只允许一次性修改1万条数据。如果需要达到目的，就只能使用批处理

### 数据批处理Batchable

原理：新建一个批处理类需要实现**Database.Batchable接口**。此接口封装了三个方法，并且三个方法构成一个批处理的生命周期

- start()方法:   用于查询数据，并将查询数据封装到List中
- execute()方法: 用于操作数据，形参中List为start()方法中返回的数据，可以直接对此List进行修改以达到批处理行为
- finish()方法:  批处理全部执行后执行finish()方法，finish()方法用于进行一些后期处理，比如发邮件等操作
- **Note:**
  1. start()方法执行后，数据便无法修改
  2. execute()原则上可以执行多次，比如在调用的时规定执行次数，则按照规定次数执行execute()
  3. finish()方法执行以后，批处理类用到的所有的变量对象都会恢复到最开始的状态，即值回滚到最开始状态
  4. 如果批处理类不实现Database.Stateful接口，则变量只在相应方法起作用，当方法执行完成，变量则会回滚到初始状态
     - 如在类中声明成员变量A，在start()方法对A进行处理，如果类不实现上述接口，则方法执行完start()方法后A会回滚到初始状态，在execute()方法或者finish()方法调用A时值为最开始声明的值，在start方法的处理结果不保留

实现批处理类步骤

  1. 实现Database.Batchable接口;
  2. 实现start()方法，此方法中通常写查询语句，并将数据通过`Database.getQueryLocator(queryString)`方法将数据传递到execute()形参中。此方法定义： `global (Database.QueryLocator | Iterable<sObject>) start(Database.BatchableContext bc) {};`
  3. 实现execute()方法，此方法对数据进行DML操作。此方法定义：`global void execute(Database.BatchableContext BC, list<P>){};`
  4. 实现finish方法(),此方法进行后期处理，如果无需要处理，可以不进行处理

```java
global with sharing class GoodsBatch implements Database.Batchable<sObject>, Database.Stateful {
    Integer queryCount = 0;
    String myEmailAddress = 'myAddress@xx.com';
    global Database.QueryLocator start(database.BatchableContext bc )
    {
        String query = 'select GOODSPRICE__c,Id from GOODS__c';
        return Database.getQueryLocator(query);
    }
    global void execute (Database.BatchableContext bc, List<GOODS__c> goodsList)
    {
        for(GOODS__c goods : goodsList) {
            Decimal price = goods.GoodsPrice__c;
            price += 1;
            queryCount +=1;
        }
        upsert goodsList;
    }
    global void finish(Database.BatchableContext bc)
    {
        /*--------execute finish----------*/
        /*注意：如果不实现Database.Stateful接口，则queryCount为0
              因为在execute执行完成便会回滚到初始状态*/
        System.debug('query count:' + queryCount);
        //send email
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        email.setToAddresses(new String[]{myEmailAddress});//set mail getter
        email.setSubject('show count'); //set subject
        email.setHtmlBody('query Count' + queryCount);
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { email });
    }
}
implements Batchable
implements Batchable
```

[back to top](#top)

## 异步进程

- 异步进程用于在单独的线程内来运行进程。异步进程是一个在后台运行，不需要用户等到任务结束的进程或者方法。异步进程好处很多，包括不需要用户等待，节省响应时间等等
- 异步进程主要有以下几种形式：

类型|介绍|常用情景
---|---|---
Future方法|在自己线程中运行，直到资源可用才运行|Web service callout
Batch Apex|运行大量的Job,数量超过正常处理限制|数据DML操作
QueueableApex|和Future类似，但是提供额外的工作链，允许完成更复杂的类型|执行顺序处理操作与外部Web服务
ScheduledApex|指定时间运行apex|固定时间的任务，例如每日或每周等任务

### Future方法
　
Future方法用于异步处理，常用于Web service callout操作, Future方法需要有几个规范：

1. 方法必须是静态static的
2. 方法上方需要使用`@Future`标签
3. 方法返回类型必须是void类型
4. 方法参数必须是模块私有的变量，不能使public等
5. 方法参数不允许使用标准的Object或sObject类型，可以使用基本类型或者集合类型
6. 不能再一个future方法调用另一个future方法，当future方法运行的时候也不可以在trigger中调用
7. future方法中不能使用getContent()和getContentAsPDF()方法

```java
public with sharing class FutureSample {
    @future
    public static void futuremethod(List<ID> ids) {
        String sql = 'select Id,Name from Account where Id in :ids';
        List<Account> accounts = Database.query(sql);
        for(Account account : accounts) {
            System.debug(account.Id);
        }
    }
}　
//测试future方法在Test类中执行，和普通的方法测试区别的是，future方法执行需要在Test.startTest()和Test.stopTest()方法中进行
@isTest
private class Test_FutureSample {
    static testMethod void myUnitTest() {
        Test.startTest();
        List<ID> ids= new ID[]{'0012800000Hz6ozAAB','0012800000Hz6oxAAB'};
        FutureSample.futuremethod(ids);
        Test.stopTest();
    }
}
```

有几点需要注意：

1. future方法执行不保证质量，如果需要好的质量可以使用Queueable方法
2. 可以允许两个future方法同时运行，当两个future方法同时对一条记录进行操作时，可能引起记录锁定或者运行时异常

[back to top](#top)

### Queueable接口

Queueable接口有着类似future的特性，类似将future特性和批处理功能混合在一起，相对future方法来讲，有很大的优势：

1. 可以使用Object和sObject类型作为参数
2. 便于监控，可以直接通过System.enqueueJob()方法运行返回AsyncApexJob ，方法不用限制在startTest()和stopTest()方法中
3. 可以链接两个job，一个Queueable接口方法可以调用另一个Queueable接口

Note:
- Queueable在执行异步的时候大部分可以替代掉future，但是不是所有的情况都可以替换。当一个方法有时需要同步执行有时需要异步执行，相对来讲用future操作更为简单，毕竟不需要修改方法的内容，只是注解而已
- Queueable尽管很好用很强大，不过force.com对于Queueable有很多限制和规范，详情请参看官方文档

```java
public with sharing class QueueableSample implements Queueable{
    private List<ID> ids{get;set;}
    public QueueableSample(List<ID> ids) {
        this.ids = ids;
    }
    public void execute(QueueableContext qc) {
        String sql = 'select Id,Name from Account where Id in :ids';
        List<Account> accounts = Database.query(sql);
        for(Account account : accounts) {
            System.debug(account.Id);
        }
    }
}
//test
@isTest
private class Test_QueueableSample {
    static testMethod void myUnitTest() {
        Test.startTest();
        List<ID> ids= new ID[]{'0012800000Hz6ozAAB','0012800000Hz6oxAAB'};
        QueueableSample sample = new QueueableSample(ids);
        ID jobID = System.enqueueJob(sample);
        Test.stopTest();
    }
}
```

[back to top](#top)

### ScheduledApex

定时任务的声明和调用都很简单，通过以下步骤即可完成操作：

1. 实现Schedulable接口，并重写execute方法，此方法体内实现需要定时执行的操作
2. 使用System.schedule()方法实现定时任务的调用, System.schedule()方法有三个参数
   - 第一个参数为定时任务名称；第二个参数为定时任务执行时间；第三个参数为需要执行的定时任务的对象

```java
//定时任务: 实现批处理操作GOODS表
public class GoodsSchedule implements Schedulable {
    public void execute(SchedulableContext sc) {
        String queryString = 'select Id,GOODSNAME__c from GOODS__c';
        SimpleBatchUtil batchUtil = new SimpleBatchUtil(queryString);
        Database.executeBatch(batchUtil);
    }
}
//test
@isTest
private class TestGoodsSchedule {

    static testMethod void myUnitTest() {
        String executeTime = '0 10 2 * * ?';
        GoodsSchedule goodsSchedule = new GoodsSchedule();
        System.schedule('batch goods',executeTime,goodsSchedule);
    }
}
```

note:

- **定时任务在每24小时同时只允许最多100个定时任务。超过数量则会抛出异常**
- 执行时间字符串通过空格分隔每个时间点，时间点的顺序为：`Seconds --> Minutes --> Hours --> Day_of_month --> Month Day_of_week --> optional_year`
- Schedulable除了在代码中通过`System.schedule()`方法启动定时任务还可以通过页面设置启动定时器。步骤如下：
  1. 点击setup-->develop-->Apex Classes
  2. 点击Schedule Apex按钮
  3. 输入Job Name，为定时任务显示的任务名称，点击Apex Class的查找按钮选择需要定时任务的实现Schedulable接口的类，设定时间，点击保存
  4. 定时任务创建成功，在setup-->Jobs-->Scheduled Jobs中可以看到创建的定时任务了
- 通过页面设置启动定时器和代码的区别为：使用页面配置定时器无法精确到分和秒

- https://developer.salesforce.com/trailhead/force_com_dev_intermediate/asynchronous_apex/async_apex_batch
- [salesforce零基础开发入门学习（五）异步进程介绍与数据批处理Batchable](https://www.cnblogs.com/zero-zyq/p/5287343.html)
- [salesforce-administration-test quiz](https://www.proprofs.com/quiz-school/story.php?title=salesforce-administration-test-adm201)
- [Visualforce初步 [1] —— 基本概念](https://www.cnblogs.com/abovecloud/p/6346986.html)

[back to top](#top)

##

> Reference
- [Salesforce Certified Administrator Exam Guide](https://trailhead.salesforce.com/help?article=Salesforce-Certified-Administrator-Exam-Guide)
- [Administration Essentials for New Admins (ADM201)](https://trailhead.salesforce.com/en/academy/classes/adm201-administration-essentials-for-new-admins/)
- [Build a Conference Management App-official Demo](https://trailhead.salesforce.com/content/learn/projects/salesforce_developer_workshop)
- [salesforce 401在线练习](http://www.proprofs.com/quiz-school/story.php?title=mtm3mza4ng2tli)
- [salesforce帮助文档入口](https://help.salesforce.com/apex/HTHome)
- [salesforce零基础开发入门学习](https://zzk.cnblogs.com/s?w=blog%3Azero-zyq%20salesforce%20%E9%9B%B6%E5%9F%BA%E7%A1%80%E5%BC%80%E5%8F%91%E5%85%A5%E9%97%A8%E5%AD%A6%E4%B9%A0)
- [Salesforce 入门学习](https://blog.csdn.net/ss19497/article/details/54598738)


[APEX](#top)

# Basic

- Apex is force.com-native programming language
- Object-oriented(Classes, Interfaces, Inheritance)
- Tenant Secure
- Syntactically similar to Java and C#
- Compiles to Java bytecode
- Strongly typed
- Compiled only on the server, no local compiler
- Governor limits



At least 2 of the following Salesforce certifications is required prior to joining

Salesforce Administrator
Salesforce Advanced Administrator
Salesforce Platform App Builder
Salesforce Platform Developer I
Salesforce Platform Developer II
B2C Commerce Developer
or other Specialized/Domain or Technical Architects
