import { importShared } from './__federation_fn_import-yO-o9H28.js';
import Button, { j as jsxRuntimeExports } from './__federation_expose_Button-DJiJGM-o.js';
import { r as reactDomExports } from './__federation_shared_react-dom-81eQxVv-.js';
import useCount from './__federation_expose_Store-BMeLR9PP.js';

var client = {};

var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

function App() {
  const [count, setCount] = useCount();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "App", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: " Remote Application" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: " Remote Application" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setCount((count2) => count2 + 1), children: [
        "count is ",
        count
      ] })
    ] })
  ] });
}

const React = await importShared('react');
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
