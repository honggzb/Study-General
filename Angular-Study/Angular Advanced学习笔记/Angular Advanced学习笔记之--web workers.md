[Angular Advanced学习笔记之--web workers](#top)

- Web workers lets you run CPU-intensive computations in a background thread, freeing the main thread to update the user interface
- Web workers are used for running any script in the background threads, without interfering with the user’s interface

## Add Web workers to project by CLI

1. `ng g web-worker big-int`
   1. CREATE 'src/app/big-int.worker.ts'
   2. CREATE 'tsconfig.worker.json'
   3. UPDATE 'angular.json'
2. using web-worker in project component
   1. create 'src\app\big-int.ts'
   2. modify 'src/app/big-int.worker.ts'
   3. modify app.component.ts
      1.` worker.postMessage(factorialInput)`: sending data to the web worker
      2.` worker.onmessage`: receiving the response

> references
- [Web Workers in Angula](https://medium.com/codex/web-workers-in-angular-99fc4dac1d40)
- [Angular 8 - Web Workers](https://www.tutorialspoint.com/angular8/angular8_web_workers.htm)
