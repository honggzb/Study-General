1. Create a shortcut on your desktop
2. Right-click on the shortcut and click Properties
3. t the Target property
4. Set it to "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="C:/ChromeDevSession"
5. In VIsual Studio Code, run ionic serve -l
6. You're gonna see new tab open http://localhost:8100/ionic-lab. You should be aware that this link is opened in the normal chrome tab, not the "disable-web-security" chrome we have set up.
Double click to the shortcut that we have set up to open the "disable-web-security" chrome tab. Then paste http://localhost:8100/ionic-lab into this tab.
