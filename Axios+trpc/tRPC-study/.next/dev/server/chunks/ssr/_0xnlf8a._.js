module.exports = [
"[project]/app/components/todolist.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@trpc/client/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@trpc/client/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
const Todolist = ()=>{
    const trpc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTRPC"])();
    const getTodos = trpc.getTodos.useQuery();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: JSON.stringify(getTodos.data)
    }, void 0, false, {
        fileName: "[project]/app/components/todolist.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = Todolist;
}),
"[project]/node_modules/@trpc/client/dist/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TRPCClientError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$TRPCClientError$2d$apv8gw59$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TRPCClientError"],
    "TRPCUntypedClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TRPCUntypedClient"],
    "clientCallTypeToProcedureType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["clientCallTypeToProcedureType"],
    "createTRPCClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createTRPCClient"],
    "createTRPCClientProxy",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createTRPCClientProxy"],
    "createTRPCProxyClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createTRPCProxyClient"],
    "createTRPCUntypedClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createTRPCUntypedClient"],
    "createWSClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$wsLink$2d$DSf4KOdW$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createWSClient"],
    "experimental_localLink",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["experimental_localLink"],
    "getFetch",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$httpUtils$2d$BNq9QC3d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFetch"],
    "getUntypedClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getUntypedClient"],
    "httpBatchLink",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$httpBatchLink$2d$CaWjh1oW$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["httpBatchLink"],
    "httpBatchStreamLink",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["httpBatchStreamLink"],
    "httpLink",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$httpLink$2d$oiU8eqFi$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["httpLink"],
    "httpSubscriptionLink",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["httpSubscriptionLink"],
    "isFormData",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$httpLink$2d$oiU8eqFi$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isFormData"],
    "isNonJsonSerializable",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$httpLink$2d$oiU8eqFi$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNonJsonSerializable"],
    "isOctetType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$httpLink$2d$oiU8eqFi$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isOctetType"],
    "isTRPCClientError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$TRPCClientError$2d$apv8gw59$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isTRPCClientError"],
    "jsonEncoder",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$wsLink$2d$DSf4KOdW$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsonEncoder"],
    "loggerLink",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$loggerLink$2d$ineCN1PO$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loggerLink"],
    "retryLink",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["retryLink"],
    "splitLink",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$splitLink$2d$B7Cuf2c_$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["splitLink"],
    "unstable_httpBatchStreamLink",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["unstable_httpBatchStreamLink"],
    "unstable_httpSubscriptionLink",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["unstable_httpSubscriptionLink"],
    "unstable_localLink",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["unstable_localLink"],
    "wsLink",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$wsLink$2d$DSf4KOdW$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["wsLink"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@trpc/client/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$splitLink$2d$B7Cuf2c_$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@trpc/client/dist/splitLink-B7Cuf2c_.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$TRPCClientError$2d$apv8gw59$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@trpc/client/dist/TRPCClientError-apv8gw59.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$httpUtils$2d$BNq9QC3d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@trpc/client/dist/httpUtils-BNq9QC3d.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$httpLink$2d$oiU8eqFi$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@trpc/client/dist/httpLink-oiU8eqFi.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$httpBatchLink$2d$CaWjh1oW$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@trpc/client/dist/httpBatchLink-CaWjh1oW.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$loggerLink$2d$ineCN1PO$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@trpc/client/dist/loggerLink-ineCN1PO.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$client$2f$dist$2f$wsLink$2d$DSf4KOdW$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@trpc/client/dist/wsLink-DSf4KOdW.mjs [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=_0xnlf8a._.js.map