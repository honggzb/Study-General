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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _hookform_resolvers_zod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @hookform/resolvers/zod */ \"(app-pages-browser)/./node_modules/@hookform/resolvers/zod/dist/zod.mjs\");\n/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-hook-form */ \"(app-pages-browser)/./node_modules/react-hook-form/dist/index.esm.mjs\");\n/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/schema */ \"(app-pages-browser)/./src/schema/index.ts\");\n/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/ui/button */ \"(app-pages-browser)/./src/components/ui/button.tsx\");\n/* harmony import */ var _components_ui_textarea__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/ui/textarea */ \"(app-pages-browser)/./src/components/ui/textarea.tsx\");\n/* harmony import */ var _components_ui_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/ui/form */ \"(app-pages-browser)/./src/components/ui/form.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\nconst PostForm = ()=>{\n    _s();\n    // 1. Define your form.\n    const form = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_6__.useForm)({\n        resolver: (0,_hookform_resolvers_zod__WEBPACK_IMPORTED_MODULE_1__.zodResolver)(_schema__WEBPACK_IMPORTED_MODULE_2__.PostSchema),\n        defaultValues: {\n            post: \"\"\n        }\n    });\n    // 2. Define a submit handler.\n    function onSubmit(values) {\n        // Do something with the form values.\n        // ✅ This will be type-safe and validated.\n        console.log(values);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_form__WEBPACK_IMPORTED_MODULE_5__.Form, {\n        ...form,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n            onSubmit: form.handleSubmit(onSubmit),\n            className: \"w-full space-y-8 mt-8\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_form__WEBPACK_IMPORTED_MODULE_5__.FormField, {\n                    control: form.control,\n                    name: \"post\",\n                    render: (param)=>{\n                        let { field } = param;\n                        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_form__WEBPACK_IMPORTED_MODULE_5__.FormItem, {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_form__WEBPACK_IMPORTED_MODULE_5__.FormControl, {\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_textarea__WEBPACK_IMPORTED_MODULE_4__.Textarea, {\n                                        placeholder: \"write your post...\",\n                                        ...field\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\project\\\\react-study\\\\next-ts-template\\\\src\\\\components\\\\post-form.tsx\",\n                                        lineNumber: 41,\n                                        columnNumber: 15\n                                    }, void 0)\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\project\\\\react-study\\\\next-ts-template\\\\src\\\\components\\\\post-form.tsx\",\n                                    lineNumber: 40,\n                                    columnNumber: 15\n                                }, void 0),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_form__WEBPACK_IMPORTED_MODULE_5__.FormMessage, {}, void 0, false, {\n                                    fileName: \"C:\\\\project\\\\react-study\\\\next-ts-template\\\\src\\\\components\\\\post-form.tsx\",\n                                    lineNumber: 43,\n                                    columnNumber: 15\n                                }, void 0)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\project\\\\react-study\\\\next-ts-template\\\\src\\\\components\\\\post-form.tsx\",\n                            lineNumber: 39,\n                            columnNumber: 13\n                        }, void 0);\n                    }\n                }, void 0, false, {\n                    fileName: \"C:\\\\project\\\\react-study\\\\next-ts-template\\\\src\\\\components\\\\post-form.tsx\",\n                    lineNumber: 35,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__.Button, {\n                    type: \"submit\",\n                    className: \"float-right\",\n                    children: \"Submit\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\project\\\\react-study\\\\next-ts-template\\\\src\\\\components\\\\post-form.tsx\",\n                    lineNumber: 47,\n                    columnNumber: 9\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\project\\\\react-study\\\\next-ts-template\\\\src\\\\components\\\\post-form.tsx\",\n            lineNumber: 34,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"C:\\\\project\\\\react-study\\\\next-ts-template\\\\src\\\\components\\\\post-form.tsx\",\n        lineNumber: 33,\n        columnNumber: 5\n    }, undefined);\n};\n_s(PostForm, \"woqMTX6igxsX6/9vX4dQZlxR7yY=\", false, function() {\n    return [\n        react_hook_form__WEBPACK_IMPORTED_MODULE_6__.useForm\n    ];\n});\n_c = PostForm;\n/* harmony default export */ __webpack_exports__[\"default\"] = (PostForm);\nvar _c;\n$RefreshReg$(_c, \"PostForm\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL3Bvc3QtZm9ybS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNzRDtBQUNaO0FBRUo7QUFDVTtBQUNJO0FBU3ZCO0FBRTdCLE1BQU1VLFdBQVc7O0lBQ2YsdUJBQXVCO0lBQ3ZCLE1BQU1DLE9BQU9WLHdEQUFPQSxDQUE2QjtRQUMvQ1csVUFBVVosb0VBQVdBLENBQUNFLCtDQUFVQTtRQUNoQ1csZUFBZTtZQUNiQyxNQUFNO1FBQ1I7SUFDRjtJQUNBLDhCQUE4QjtJQUM5QixTQUFTQyxTQUFTQyxNQUFrQztRQUNsRCxxQ0FBcUM7UUFDckMsMENBQTBDO1FBQzFDQyxRQUFRQyxHQUFHLENBQUNGO0lBQ2Q7SUFDQSxxQkFDRSw4REFBQ1gscURBQUlBO1FBQUUsR0FBR00sSUFBSTtrQkFDWiw0RUFBQ0E7WUFBS0ksVUFBVUosS0FBS1EsWUFBWSxDQUFDSjtZQUFXSyxXQUFVOzs4QkFDckQsOERBQUNiLDBEQUFTQTtvQkFDUmMsU0FBU1YsS0FBS1UsT0FBTztvQkFDckJDLE1BQUs7b0JBQ0xDLFFBQVE7NEJBQUMsRUFBRUMsS0FBSyxFQUFFOzZDQUNoQiw4REFBQ2hCLHlEQUFRQTs7OENBQ1AsOERBQUNGLDREQUFXQTs4Q0FDWiw0RUFBQ0YsNkRBQVFBO3dDQUFDcUIsYUFBWTt3Q0FBc0IsR0FBR0QsS0FBSzs7Ozs7Ozs7Ozs7OENBRXBELDhEQUFDZiw0REFBV0E7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQUlsQiw4REFBQ04seURBQU1BO29CQUFDdUIsTUFBSztvQkFBU04sV0FBVTs4QkFBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJdEQ7R0FqQ01WOztRQUVTVCxvREFBT0E7OztLQUZoQlM7QUFtQ04sK0RBQWVBLFFBQVFBLEVBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvcG9zdC1mb3JtLnRzeD8wZjA3Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50JztcclxuaW1wb3J0IHsgem9kUmVzb2x2ZXIgfSBmcm9tIFwiQGhvb2tmb3JtL3Jlc29sdmVycy96b2RcIjtcclxuaW1wb3J0IHsgdXNlRm9ybSB9IGZyb20gXCJyZWFjdC1ob29rLWZvcm1cIjtcclxuaW1wb3J0IHsgeiB9IGZyb20gXCJ6b2RcIjtcclxuaW1wb3J0IHsgUG9zdFNjaGVtYSB9IGZyb20gXCJAL3NjaGVtYVwiO1xyXG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL2J1dHRvblwiO1xyXG5pbXBvcnQgeyBUZXh0YXJlYSB9IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvdGV4dGFyZWFcIjtcclxuaW1wb3J0IHtcclxuICBGb3JtLFxyXG4gIEZvcm1Db250cm9sLFxyXG4gIEZvcm1EZXNjcmlwdGlvbixcclxuICBGb3JtRmllbGQsXHJcbiAgRm9ybUl0ZW0sXHJcbiAgRm9ybUxhYmVsLFxyXG4gIEZvcm1NZXNzYWdlLFxyXG59IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvZm9ybVwiXHJcblxyXG5jb25zdCBQb3N0Rm9ybSA9ICgpID0+IHtcclxuICAvLyAxLiBEZWZpbmUgeW91ciBmb3JtLlxyXG4gIGNvbnN0IGZvcm0gPSB1c2VGb3JtPHouaW5mZXI8dHlwZW9mIFBvc3RTY2hlbWE+Pih7XHJcbiAgICByZXNvbHZlcjogem9kUmVzb2x2ZXIoUG9zdFNjaGVtYSksXHJcbiAgICBkZWZhdWx0VmFsdWVzOiB7XHJcbiAgICAgIHBvc3Q6IFwiXCIsXHJcbiAgICB9LFxyXG4gIH0pXHJcbiAgLy8gMi4gRGVmaW5lIGEgc3VibWl0IGhhbmRsZXIuXHJcbiAgZnVuY3Rpb24gb25TdWJtaXQodmFsdWVzOiB6LmluZmVyPHR5cGVvZiBQb3N0U2NoZW1hPikge1xyXG4gICAgLy8gRG8gc29tZXRoaW5nIHdpdGggdGhlIGZvcm0gdmFsdWVzLlxyXG4gICAgLy8g4pyFIFRoaXMgd2lsbCBiZSB0eXBlLXNhZmUgYW5kIHZhbGlkYXRlZC5cclxuICAgIGNvbnNvbGUubG9nKHZhbHVlcylcclxuICB9XHJcbiAgcmV0dXJuIChcclxuICAgIDxGb3JtIHsuLi5mb3JtfT5cclxuICAgICAgPGZvcm0gb25TdWJtaXQ9e2Zvcm0uaGFuZGxlU3VibWl0KG9uU3VibWl0KX0gY2xhc3NOYW1lPVwidy1mdWxsIHNwYWNlLXktOCBtdC04XCI+XHJcbiAgICAgICAgPEZvcm1GaWVsZFxyXG4gICAgICAgICAgY29udHJvbD17Zm9ybS5jb250cm9sfVxyXG4gICAgICAgICAgbmFtZT1cInBvc3RcIlxyXG4gICAgICAgICAgcmVuZGVyPXsoeyBmaWVsZCB9KSA9PiAoXHJcbiAgICAgICAgICAgIDxGb3JtSXRlbT5cclxuICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2w+XHJcbiAgICAgICAgICAgICAgPFRleHRhcmVhIHBsYWNlaG9sZGVyPVwid3JpdGUgeW91ciBwb3N0Li4uXCIgey4uLmZpZWxkfSAvPlxyXG4gICAgICAgICAgICAgIDwvRm9ybUNvbnRyb2w+XHJcbiAgICAgICAgICAgICAgPEZvcm1NZXNzYWdlIC8+XHJcbiAgICAgICAgICAgIDwvRm9ybUl0ZW0+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPEJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwiZmxvYXQtcmlnaHRcIj5TdWJtaXQ8L0J1dHRvbj5cclxuICAgICAgPC9mb3JtPlxyXG4gICAgPC9Gb3JtPlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUG9zdEZvcm0iXSwibmFtZXMiOlsiem9kUmVzb2x2ZXIiLCJ1c2VGb3JtIiwiUG9zdFNjaGVtYSIsIkJ1dHRvbiIsIlRleHRhcmVhIiwiRm9ybSIsIkZvcm1Db250cm9sIiwiRm9ybUZpZWxkIiwiRm9ybUl0ZW0iLCJGb3JtTWVzc2FnZSIsIlBvc3RGb3JtIiwiZm9ybSIsInJlc29sdmVyIiwiZGVmYXVsdFZhbHVlcyIsInBvc3QiLCJvblN1Ym1pdCIsInZhbHVlcyIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVTdWJtaXQiLCJjbGFzc05hbWUiLCJjb250cm9sIiwibmFtZSIsInJlbmRlciIsImZpZWxkIiwicGxhY2Vob2xkZXIiLCJ0eXBlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/post-form.tsx\n"));

/***/ })

});