(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/todolist.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$trpc$2f$client$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/trpc/client.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const Todolist = ()=>{
    _s();
    const trpc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$trpc$2f$client$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTRPC"])();
    const todolists = trpc.getTodos.queryOptions();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: JSON.stringify(todolists)
    }, void 0, false, {
        fileName: "[project]/app/components/todolist.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Todolist, "aTyXX3HVK2sI3DBdKKyoHJo8bL8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$trpc$2f$client$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTRPC"]
    ];
});
_c = Todolist;
const __TURBOPACK__default__export__ = Todolist;
var _c;
__turbopack_context__.k.register(_c, "Todolist");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_components_todolist_tsx_0ih16zt._.js.map