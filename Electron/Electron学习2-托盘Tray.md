## electron的托盘Tray

```js
import { Tray, Menu } from "electron";
const path = require("path");
// 获取托盘图标
const baseSRC = process.cwd(); //这里不能使用__dirname,使用dirname会直接获取dist_electron中的文件，我们需要的文件在public文件中
const filePath = path.join(baseSRC, "/public/favicon.ico");
// 创建tray
let tray = null;
app.on("ready", async () => {
  tray = new Tray(filePath);
  const contextMenu = Menu.buildFromTemplate([
    { label: "Item1", type: "radio" },
    { label: "Item2", type: "radio" },
    { label: "Item3", type: "radio", checked: true },
    { label: "Item4", type: "radio" },
  ]);
  tray.setToolTip("This is my application.");
  tray.setContextMenu(contextMenu);

  tray.on("click", () => {
    //给托盘绑定点击事件
  });
  createWindow();
});
```
