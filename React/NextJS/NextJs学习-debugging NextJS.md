## [NextJs学习-debugging NextJS](#top)

- [debugging Next.js in VSCode](#debugging-nextjs-in-vscode)
- [Debugging with Browser DevTools](#debugging-with-browser-devtools)
  - [React Developer Tools](#react-developer-tools)
  - [Client-side code](#client-side-code)
  - [Server-side code](#server-side-code)

## debugging Next.js in VSCode

1. create a file named '.vscode/launch.json' at the root of your project
2. `npm run dev` or `pnpm dev`
3. go to the Debug panel in VSCode **-->** select a launch configuration **-->** press F5 or select 'Debug: Start Debugging' from the Command Palette

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    },
    {
      "name": "Next.js: debug client-side (Firefox)",
      "type": "firefox",
      "request": "launch",
      "url": "http://localhost:3000",
      "reAttach": true,
      "pathMappings": [
        {
          "url": "webpack://_N_E",
          "path": "${workspaceFolder}"
        }
      ]
    },
    {
      "name": "Next.js: debug full stack",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/next/dist/bin/next",
      "runtimeArgs": ["--inspect"],
      "skipFiles": ["<node_internals>/**"],
      "serverReadyAction": {
        "action": "debugWithEdge",
        "killOnServerStop": true,
        "pattern": "- Local:.+(https?://.+)",
        "uriFormat": "%s",
        "webRoot": "${workspaceFolder}"
      }
    }
  ]
}
```

[⬆ back to top](#top)

## Debugging with Browser DevTools

### React Developer Tools

- Inspect React components
- Edit props and state
- Identify performance problems

### Client-side code

- `npm run dev` or `pnpm dev`

### Server-side code

- `"dev": "NODE_OPTIONS='--inspect' next dev"` in package.json
- Launching the Next.js dev server with the `--inspect` flag
  - Debugger -->  **ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e**
  - ready --> **http://localhost:3000**
- For Chrome
  - go to 'chrome://inspect'
  - Click `Configure...` to ensure both debugging ports are listed
  - Add both `localhost:9229` and `localhost:9230` if they're not already present
- **note**:  Use `NODE_OPTIONS='--inspect=0.0.0.0'` to allow remote debugging access outside localhost, such as when running the app in a Docker container.

[⬆ back to top](#top)

> [How to use debugging tools with Next.js](https://nextjs.org/docs/app/guides/debugging)
