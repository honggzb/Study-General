"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/components/post-form.tsx":
/*!**************************************!*\
  !*** ./src/components/post-form.tsx ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _hookform_resolvers_zod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @hookform/resolvers/zod */ \"(app-pages-browser)/./node_modules/@hookform/resolvers/zod/dist/zod.mjs\");\n/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-hook-form */ \"(app-pages-browser)/./node_modules/react-hook-form/dist/index.esm.mjs\");\n/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/schema */ \"(app-pages-browser)/./src/schema/index.ts\");\n/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/ui/button */ \"(app-pages-browser)/./src/components/ui/button.tsx\");\n/* harmony import */ var _components_ui_textarea__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/ui/textarea */ \"(app-pages-browser)/./src/components/ui/textarea.tsx\");\n/* harmony import */ var _components_ui_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/ui/form */ \"(app-pages-browser)/./src/components/ui/form.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\nconst PostForm = ()=>{\n    _s();\n    // 1. Define your form.\n    const form = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_6__.useForm)({\n        resolver: (0,_hookform_resolvers_zod__WEBPACK_IMPORTED_MODULE_1__.zodResolver)(_schema__WEBPACK_IMPORTED_MODULE_2__.PostSchema),\n        defaultValues: {\n            post: \"\"\n        }\n    });\n    // 2. Define a submit handler.\n    function onSubmit(values) {\n        console.log(values);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_form__WEBPACK_IMPORTED_MODULE_5__.Form, {\n        ...form,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n            onSubmit: form.handleSubmit(onSubmit),\n            className: \"w-full space-y-8 mt-8\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_form__WEBPACK_IMPORTED_MODULE_5__.FormField, {\n                    control: form.control,\n                    name: \"post\",\n                    render: (param)=>{\n                        let { field } = param;\n                        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_form__WEBPACK_IMPORTED_MODULE_5__.FormItem, {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_form__WEBPACK_IMPORTED_MODULE_5__.FormControl, {\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_textarea__WEBPACK_IMPORTED_MODULE_4__.Textarea, {\n                                        placeholder: \"write your post...\",\n                                        ...field\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\project\\\\react-study\\\\next-ts-template\\\\src\\\\components\\\\post-form.tsx\",\n                                        lineNumber: 39,\n                                        columnNumber: 15\n                                    }, void 0)\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\project\\\\react-study\\\\next-ts-template\\\\src\\\\components\\\\post-form.tsx\",\n                                    lineNumber: 38,\n                                    columnNumber: 15\n                                }, void 0),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_form__WEBPACK_IMPORTED_MODULE_5__.FormMessage, {}, void 0, false, {\n                                    fileName: \"C:\\\\project\\\\react-study\\\\next-ts-template\\\\src\\\\components\\\\post-form.tsx\",\n                                    lineNumber: 41,\n                                    columnNumber: 15\n                                }, void 0)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\project\\\\react-study\\\\next-ts-template\\\\src\\\\components\\\\post-form.tsx\",\n                            lineNumber: 37,\n                            columnNumber: 13\n                        }, void 0);\n                    }\n                }, void 0, false, {\n                    fileName: \"C:\\\\project\\\\react-study\\\\next-ts-template\\\\src\\\\components\\\\post-form.tsx\",\n                    lineNumber: 33,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__.Button, {\n                    type: \"submit\",\n                    className: \"float-right\",\n                    children: \"Submit\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\project\\\\react-study\\\\next-ts-template\\\\src\\\\components\\\\post-form.tsx\",\n                    lineNumber: 45,\n                    columnNumber: 9\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\project\\\\react-study\\\\next-ts-template\\\\src\\\\components\\\\post-form.tsx\",\n            lineNumber: 32,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"C:\\\\project\\\\react-study\\\\next-ts-template\\\\src\\\\components\\\\post-form.tsx\",\n        lineNumber: 31,\n        columnNumber: 5\n    }, undefined);\n};\n_s(PostForm, \"woqMTX6igxsX6/9vX4dQZlxR7yY=\", false, function() {\n    return [\n        react_hook_form__WEBPACK_IMPORTED_MODULE_6__.useForm\n    ];\n});\n_c = PostForm;\n/* harmony default export */ __webpack_exports__[\"default\"] = (PostForm);\nvar _c;\n$RefreshReg$(_c, \"PostForm\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL3Bvc3QtZm9ybS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNzRDtBQUNaO0FBRUo7QUFDVTtBQUNJO0FBU3ZCO0FBRTdCLE1BQU1VLFdBQVc7O0lBQ2YsdUJBQXVCO0lBQ3ZCLE1BQU1DLE9BQU9WLHdEQUFPQSxDQUE2QjtRQUMvQ1csVUFBVVosb0VBQVdBLENBQUNFLCtDQUFVQTtRQUNoQ1csZUFBZTtZQUNiQyxNQUFNO1FBQ1I7SUFDRjtJQUNBLDhCQUE4QjtJQUM5QixTQUFTQyxTQUFTQyxNQUFrQztRQUNsREMsUUFBUUMsR0FBRyxDQUFDRjtJQUNkO0lBQ0EscUJBQ0UsOERBQUNYLHFEQUFJQTtRQUFFLEdBQUdNLElBQUk7a0JBQ1osNEVBQUNBO1lBQUtJLFVBQVVKLEtBQUtRLFlBQVksQ0FBQ0o7WUFBV0ssV0FBVTs7OEJBQ3JELDhEQUFDYiwwREFBU0E7b0JBQ1JjLFNBQVNWLEtBQUtVLE9BQU87b0JBQ3JCQyxNQUFLO29CQUNMQyxRQUFROzRCQUFDLEVBQUVDLEtBQUssRUFBRTs2Q0FDaEIsOERBQUNoQix5REFBUUE7OzhDQUNQLDhEQUFDRiw0REFBV0E7OENBQ1osNEVBQUNGLDZEQUFRQTt3Q0FBQ3FCLGFBQVk7d0NBQXNCLEdBQUdELEtBQUs7Ozs7Ozs7Ozs7OzhDQUVwRCw4REFBQ2YsNERBQVdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs4QkFJbEIsOERBQUNOLHlEQUFNQTtvQkFBQ3VCLE1BQUs7b0JBQVNOLFdBQVU7OEJBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSXREO0dBL0JNVjs7UUFFU1Qsb0RBQU9BOzs7S0FGaEJTO0FBaUNOLCtEQUFlQSxRQUFRQSxFQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL3Bvc3QtZm9ybS50c3g/MGYwNyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCc7XHJcbmltcG9ydCB7IHpvZFJlc29sdmVyIH0gZnJvbSBcIkBob29rZm9ybS9yZXNvbHZlcnMvem9kXCI7XHJcbmltcG9ydCB7IHVzZUZvcm0gfSBmcm9tIFwicmVhY3QtaG9vay1mb3JtXCI7XHJcbmltcG9ydCB7IHogfSBmcm9tIFwiem9kXCI7XHJcbmltcG9ydCB7IFBvc3RTY2hlbWEgfSBmcm9tIFwiQC9zY2hlbWFcIjtcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcIkAvY29tcG9uZW50cy91aS9idXR0b25cIjtcclxuaW1wb3J0IHsgVGV4dGFyZWEgfSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL3RleHRhcmVhXCI7XHJcbmltcG9ydCB7XHJcbiAgRm9ybSxcclxuICBGb3JtQ29udHJvbCxcclxuICBGb3JtRGVzY3JpcHRpb24sXHJcbiAgRm9ybUZpZWxkLFxyXG4gIEZvcm1JdGVtLFxyXG4gIEZvcm1MYWJlbCxcclxuICBGb3JtTWVzc2FnZSxcclxufSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL2Zvcm1cIlxyXG5cclxuY29uc3QgUG9zdEZvcm0gPSAoKSA9PiB7XHJcbiAgLy8gMS4gRGVmaW5lIHlvdXIgZm9ybS5cclxuICBjb25zdCBmb3JtID0gdXNlRm9ybTx6LmluZmVyPHR5cGVvZiBQb3N0U2NoZW1hPj4oe1xyXG4gICAgcmVzb2x2ZXI6IHpvZFJlc29sdmVyKFBvc3RTY2hlbWEpLFxyXG4gICAgZGVmYXVsdFZhbHVlczoge1xyXG4gICAgICBwb3N0OiBcIlwiLFxyXG4gICAgfSxcclxuICB9KVxyXG4gIC8vIDIuIERlZmluZSBhIHN1Ym1pdCBoYW5kbGVyLlxyXG4gIGZ1bmN0aW9uIG9uU3VibWl0KHZhbHVlczogei5pbmZlcjx0eXBlb2YgUG9zdFNjaGVtYT4pIHtcclxuICAgIGNvbnNvbGUubG9nKHZhbHVlcylcclxuICB9XHJcbiAgcmV0dXJuIChcclxuICAgIDxGb3JtIHsuLi5mb3JtfT5cclxuICAgICAgPGZvcm0gb25TdWJtaXQ9e2Zvcm0uaGFuZGxlU3VibWl0KG9uU3VibWl0KX0gY2xhc3NOYW1lPVwidy1mdWxsIHNwYWNlLXktOCBtdC04XCI+XHJcbiAgICAgICAgPEZvcm1GaWVsZFxyXG4gICAgICAgICAgY29udHJvbD17Zm9ybS5jb250cm9sfVxyXG4gICAgICAgICAgbmFtZT1cInBvc3RcIlxyXG4gICAgICAgICAgcmVuZGVyPXsoeyBmaWVsZCB9KSA9PiAoXHJcbiAgICAgICAgICAgIDxGb3JtSXRlbT5cclxuICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2w+XHJcbiAgICAgICAgICAgICAgPFRleHRhcmVhIHBsYWNlaG9sZGVyPVwid3JpdGUgeW91ciBwb3N0Li4uXCIgey4uLmZpZWxkfSAvPlxyXG4gICAgICAgICAgICAgIDwvRm9ybUNvbnRyb2w+XHJcbiAgICAgICAgICAgICAgPEZvcm1NZXNzYWdlIC8+XHJcbiAgICAgICAgICAgIDwvRm9ybUl0ZW0+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPEJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwiZmxvYXQtcmlnaHRcIj5TdWJtaXQ8L0J1dHRvbj5cclxuICAgICAgPC9mb3JtPlxyXG4gICAgPC9Gb3JtPlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUG9zdEZvcm0iXSwibmFtZXMiOlsiem9kUmVzb2x2ZXIiLCJ1c2VGb3JtIiwiUG9zdFNjaGVtYSIsIkJ1dHRvbiIsIlRleHRhcmVhIiwiRm9ybSIsIkZvcm1Db250cm9sIiwiRm9ybUZpZWxkIiwiRm9ybUl0ZW0iLCJGb3JtTWVzc2FnZSIsIlBvc3RGb3JtIiwiZm9ybSIsInJlc29sdmVyIiwiZGVmYXVsdFZhbHVlcyIsInBvc3QiLCJvblN1Ym1pdCIsInZhbHVlcyIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVTdWJtaXQiLCJjbGFzc05hbWUiLCJjb250cm9sIiwibmFtZSIsInJlbmRlciIsImZpZWxkIiwicGxhY2Vob2xkZXIiLCJ0eXBlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/post-form.tsx\n"));

/***/ }),

/***/ "(app-pages-browser)/./src/schema/index.ts":
/*!*****************************!*\
  !*** ./src/schema/index.ts ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PostSchema: function() { return /* binding */ PostSchema; }\n/* harmony export */ });\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zod */ \"(app-pages-browser)/./node_modules/zod/lib/index.mjs\");\n/* __next_internal_client_entry_do_not_use__ PostSchema auto */ \nconst PostSchema = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({\n    post: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().min(2).max(50)\n});\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9zY2hlbWEvaW5kZXgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Z0VBRXVCO0FBRWhCLE1BQU1DLGFBQWFELGtDQUFDQSxDQUFDRSxNQUFNLENBQUM7SUFDakNDLE1BQU1ILGtDQUFDQSxDQUFDSSxNQUFNLEdBQUdDLEdBQUcsQ0FBQyxHQUFHQyxHQUFHLENBQUM7QUFDOUIsR0FBRSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvc2NoZW1hL2luZGV4LnRzP2VhODciXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCJcclxuXHJcbmltcG9ydCB7IHogfSBmcm9tIFwiem9kXCJcclxuXHJcbmV4cG9ydCBjb25zdCBQb3N0U2NoZW1hID0gei5vYmplY3Qoe1xyXG4gIHBvc3Q6IHouc3RyaW5nKCkubWluKDIpLm1heCg1MCksXHJcbn0pIl0sIm5hbWVzIjpbInoiLCJQb3N0U2NoZW1hIiwib2JqZWN0IiwicG9zdCIsInN0cmluZyIsIm1pbiIsIm1heCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/schema/index.ts\n"));

/***/ })

});