Angular响应式表单之更新表单的值

- setValue方法会在赋值给任何表单控件之前先检查数据对象的值。故当提供一个FromGroup中并不存在的字段时，会抛出一个错误
- patchValue不会检查缺失的控件值，并且不会抛出有用的错误信息

## FormControl

- patchValue() 和 setValue() 这两个方法是等价的
- 如果只更新subset的值，使用patchvalue
- 此外setValue() 方法中做了三件事：
  - 更新控件当前值
  - 判断是否注册 onChange 事件，若有则循环调用已注册的 changeFn 函数。
  - 重新计算控件的值和验证状态

## FormGroup

FormGroup下的三种方式setValue、patchValue、reset

- setValue()方法相比 patchValue()会更严格，会执行多个判断：
  - 判断的是否为所有控件都设置更新值
  - 判断控件是否存在
- patchValue()方法，会先使用this.controls[name]进行过滤，只更新参数value中设定控件的值
  - 当提供一个FromGroup中并不存在的字段时，会抛出一个错误
- reset()方法, 正常情况下，表单需要提供一个重置按钮时调用此方法
  - 允许直接传递一个数据对象做为重置后的默认值, `<button (click)="form.reset({ nickname: 'xx' })">Reset</button>`
