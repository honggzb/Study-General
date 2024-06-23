## Vue 3 Snippets
<table>
<thead>
<tr>
<th>Prefix</th>
<th>JavaScript Snippet Content</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>importFromVue</code></td>
<td><code>import ... from 'vue'</code></td>
</tr>
<tr>
<td><code>reactive</code></td>
<td><code>const obj = reactive()</code></td>
</tr>
<tr>
<td><code>readonly</code></td>
<td><code>const obj = readonly()</code></td>
</tr>
<tr>
<td><code>setup</code></td>
<td><code>setup() { }</code></td>
</tr>
<tr>
<td><code>onBeforeMount</code></td>
<td><code>onBeforeMount(() =&gt; {})</code></td>
</tr>
<tr>
<td><code>onMounted</code></td>
<td><code>onMounted(() =&gt; {})</code></td>
</tr>
<tr>
<td><code>onBeforeUpdate</code></td>
<td><code>onBeforeUpdate(() =&gt; {})</code></td>
</tr>
<tr>
<td><code>onUpdated</code></td>
<td><code>onUpdated(() =&gt; {})</code></td>
</tr>
<tr>
<td><code>onBeforeUnmount</code></td>
<td><code>onBeforeUnmount(() =&gt; {})</code></td>
</tr>
<tr>
<td><code>onUnmounted</code></td>
<td><code>onUnmounted(() =&gt; {})</code></td>
</tr>
<tr>
<td><code>onErrorCaptured</code></td>
<td><code>onErrorCaptured(() =&gt; {})</code></td>
</tr>
<tr>
<td><code>onRenderTracked</code></td>
<td><code>onRenderTracked(() =&gt; {})</code></td>
</tr>
<tr>
<td><code>onRenderTriggered</code></td>
<td><code>onRenderTriggered(() =&gt; {})</code></td>
</tr>
</tbody>
</table>

--------------------------------------------------------------------
<table>
<thead>
<tr>
<th>Prefix</th>
<th>HTML Snippet Content</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>teleport</code></td>
<td><code>&lt;teleport to='' /&gt;</code></td>
</tr>
<tr>
<td><code>componentIs</code></td>
<td><code>&lt;component :is=''&gt;&lt;/component&gt;</code></td>
</tr>
</tbody>
</table>
--------------------------------------------------------------------

## Vu2 2 Snippets
<table>
<thead>
<tr>
<th>Prefix</th>
<th>JavaScript Snippet Content</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>import</code></td>
<td><code>import ... from ...</code></td>
</tr>
<tr>
<td><code>newVue</code></td>
<td><code>new Vue({...})</code></td>
</tr>
<tr>
<td><code>VueConfigSilent</code></td>
<td><code>Vue.config.silent = true</code></td>
</tr>
<tr>
<td><code>VueConfigOptionMergeStrategies</code></td>
<td><code>Vue.config.optionMergeStrategies</code></td>
</tr>
<tr>
<td><code>VueConfigDevtools</code></td>
<td><code>Vue.config.devtools = true</code></td>
</tr>
<tr>
<td><code>VueConfigErrorHandler</code></td>
<td><code>Vue.config.errorHandler = function (err, vm, info) {...}</code></td>
</tr>
<tr>
<td><code>VueConfigWarnHandler</code></td>
<td><code>Vue.config.warnHandler = function (msg, vm, trace) {...}</code></td>
</tr>
<tr>
<td><code>VueConfigIgnoredElements</code></td>
<td><code>Vue.config.ignoredElements = ['']</code></td>
</tr>
<tr>
<td><code>VueConfigKeyCodes</code></td>
<td><code>Vue.config.keyCodes</code></td>
</tr>
<tr>
<td><code>VueConfigPerformance</code></td>
<td><code>Vue.config.performance = true</code></td>
</tr>
<tr>
<td><code>VueConfigProductionTip</code></td>
<td><code>Vue.config.productionTip = false</code></td>
</tr>
<tr>
<td><code>vueExtend</code></td>
<td><code>Vue.extend( options )</code></td>
</tr>
<tr>
<td><code>VueNextTick</code></td>
<td><code>Vue.nextTick( callback, [context] )</code></td>
</tr>
<tr>
<td><code>VueNextTickThen</code></td>
<td><code>Vue.nextTick( callback, [context] ).then(function(){ })</code></td>
</tr>
<tr>
<td><code>VueSet</code></td>
<td><code>Vue.set( target, key, value )</code></td>
</tr>
<tr>
<td><code>VueDelete</code></td>
<td><code>Vue.delete( target, key )</code></td>
</tr>
<tr>
<td><code>VueDirective</code></td>
<td><code>Vue.directive( id, [definition] )</code></td>
</tr>
<tr>
<td><code>VueFilter</code></td>
<td><code>Vue.filter( id, [definition] )</code></td>
</tr>
<tr>
<td><code>VueComponent</code></td>
<td><code>Vue.component( id, [definition] )</code></td>
</tr>
<tr>
<td><code>VueUse</code></td>
<td><code>Vue.use( plugin )</code></td>
</tr>
<tr>
<td><code>VueMixin</code></td>
<td><code>Vue.mixin({ mixin })</code></td>
</tr>
<tr>
<td><code>VueCompile</code></td>
<td><code>Vue.compile( template )</code></td>
</tr>
<tr>
<td><code>VueVersion</code></td>
<td><code>Vue.version</code></td>
</tr>
<tr>
<td><code>data</code></td>
<td><code>data() { return {} }</code></td>
</tr>
<tr>
<td><code>watchWithOptions</code></td>
<td><code>key: { deep: true, immediate: true, handler: function () { } }</code></td>
</tr>
<tr>
<td><code>vmData</code></td>
<td><code>${this, vm}.$data</code></td>
</tr>
<tr>
<td><code>vmProps</code></td>
<td><code>${this, vm}.$props</code></td>
</tr>
<tr>
<td><code>vmEl</code></td>
<td><code>${this, vm}.$el</code></td>
</tr>
<tr>
<td><code>vmOptions</code></td>
<td><code>${this, vm}.$options</code></td>
</tr>
<tr>
<td><code>vmParent</code></td>
<td><code>${this, vm}.$parent</code></td>
</tr>
<tr>
<td><code>vmRoot</code></td>
<td><code>${this, vm}.$root</code></td>
</tr>
<tr>
<td><code>vmChildren</code></td>
<td><code>${this, vm}.$children</code></td>
</tr>
<tr>
<td><code>vmSlots</code></td>
<td><code>${this, vm}.$slots</code></td>
</tr>
<tr>
<td><code>vmScopedSlots</code></td>
<td><code>${this, vm}.$scopedSlots.default({})</code></td>
</tr>
<tr>
<td><code>vmRefs</code></td>
<td><code>${this, vm}.$refs</code></td>
</tr>
<tr>
<td><code>vmIsServer</code></td>
<td><code>${this, vm}.$isServer</code></td>
</tr>
<tr>
<td><code>vmAttrs</code></td>
<td><code>${this, vm}.$attrs</code></td>
</tr>
<tr>
<td><code>vmListeners</code></td>
<td><code>${this, vm}.listeners</code></td>
</tr>
<tr>
<td><code>vmWatch</code></td>
<td><code>${this, vm}.$watch( expOrFn, callback, [options] )</code></td>
</tr>
<tr>
<td><code>vmSet</code></td>
<td><code>${this, vm}.$set( object, key, value )</code></td>
</tr>
<tr>
<td><code>vmDelete</code></td>
<td><code>${this, vm}.$delete( object, key )</code></td>
</tr>
<tr>
<td><code>vmOn</code></td>
<td><code>${this, vm}.$on( event, callback )</code></td>
</tr>
<tr>
<td><code>vmOnce</code></td>
<td><code>${this, vm}.$once( event, callback )</code></td>
</tr>
<tr>
<td><code>vmOff</code></td>
<td><code>${this, vm}.$off( [event, callback] )</code></td>
</tr>
<tr>
<td><code>vmEmit</code></td>
<td><code>${this, vm}.$emit( event, […args] )</code></td>
</tr>
<tr>
<td><code>vmMount</code></td>
<td><code>${this, vm}.$mount( [elementOrSelector] )</code></td>
</tr>
<tr>
<td><code>vmForceUpdate</code></td>
<td><code>${this, vm}.$forceUpdate()</code></td>
</tr>
<tr>
<td><code>vmNextTick</code></td>
<td><code>${this, vm}.$nextTick( callback )</code></td>
</tr>
<tr>
<td><code>vmDestroy</code></td>
<td><code>${this, vm}.$destroy()</code></td>
</tr>
<tr>
<td><code>renderer</code></td>
<td><code>const renderer = require('vue-server-renderer').createRenderer()</code></td>
</tr>
<tr>
<td><code>createRenderer</code></td>
<td><code>createRenderer({ })</code></td>
</tr>
<tr>
<td><code>preventDefault</code></td>
<td><code>preventDefault();</code></td>
</tr>
<tr>
<td><code>stopPropagation</code></td>
<td><code>stopPropagation();</code></td>
</tr>
</tbody>
</table>
-------------------------------------------------------------------------
## HTML snippet
<table>
<thead>
<tr>
<th>Prefix</th>
<th>HTML Snippet Content</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>template</code></td>
<td><code>&lt;template&gt;&lt;/template&gt;</code></td>
</tr>
<tr>
<td><code>script</code></td>
<td><code>&lt;script&gt;&lt;/script&gt;</code></td>
</tr>
<tr>
<td><code>style</code></td>
<td><code>&lt;style&gt;&lt;/style&gt;</code></td>
</tr>
<tr>
<td><code>vText</code></td>
<td><code>v-text=msg</code></td>
</tr>
<tr>
<td><code>vHtml</code></td>
<td><code>v-html=html</code></td>
</tr>
<tr>
<td><code>vShow</code></td>
<td><code>v-show</code></td>
</tr>
<tr>
<td><code>vIf</code></td>
<td><code>v-if</code></td>
</tr>
<tr>
<td><code>vElse</code></td>
<td><code>v-else</code></td>
</tr>
<tr>
<td><code>vElseIf</code></td>
<td><code>v-else-if</code></td>
</tr>
<tr>
<td><code>vForWithoutKey</code></td>
<td><code>v-for</code></td>
</tr>
<tr>
<td><code>vFor</code></td>
<td><code>v-for="" :key=""</code></td>
</tr>
<tr>
<td><code>vOn</code></td>
<td><code>v-on</code></td>
</tr>
<tr>
<td><code>vBind</code></td>
<td><code>v-bind</code></td>
</tr>
<tr>
<td><code>vModel</code></td>
<td><code>v-model</code></td>
</tr>
<tr>
<td><code>vPre</code></td>
<td><code>v-pre</code></td>
</tr>
<tr>
<td><code>vCloak</code></td>
<td><code>v-cloak</code></td>
</tr>
<tr>
<td><code>vOnce</code></td>
<td><code>v-once</code></td>
</tr>
<tr>
<td><code>key</code></td>
<td><code>:key</code></td>
</tr>
<tr>
<td><code>ref</code></td>
<td><code>ref</code></td>
</tr>
<tr>
<td><code>slotA</code></td>
<td><code>slot=""</code></td>
</tr>
<tr>
<td><code>slotE</code></td>
<td><code>&lt;slot&gt;&lt;/slot&gt;</code></td>
</tr>
<tr>
<td><code>slotScope</code></td>
<td><code>slot-scope=""</code></td>
</tr>
<tr>
<td><code>component</code></td>
<td><code>&lt;component :is=''&gt;&lt;/component&gt;</code></td>
</tr>
<tr>
<td><code>keepAlive</code></td>
<td><code>&lt;keep-alive&gt;&lt;/keep-alive&gt;</code></td>
</tr>
<tr>
<td><code>transition</code></td>
<td><code>&lt;transition&gt;&lt;/transition&gt;</code></td>
</tr>
<tr>
<td><code>transitionGroup</code></td>
<td><code>&lt;transition-group&gt;&lt;/transition-group&gt;</code></td>
</tr>
<tr>
<td><code>enterClass</code></td>
<td><code>enter-class=''</code></td>
</tr>
<tr>
<td><code>leaveClass</code></td>
<td><code>leave-class=''</code></td>
</tr>
<tr>
<td><code>appearClass</code></td>
<td><code>appear-class=''</code></td>
</tr>
<tr>
<td><code>enterToClass</code></td>
<td><code>enter-to-class=''</code></td>
</tr>
<tr>
<td><code>leaveToClass</code></td>
<td><code>leave-to-class=''</code></td>
</tr>
<tr>
<td><code>appearToClass</code></td>
<td><code>appear-to-class=''</code></td>
</tr>
<tr>
<td><code>enterActiveClass</code></td>
<td><code>enter-active-class=''</code></td>
</tr>
<tr>
<td><code>leaveActiveClass</code></td>
<td><code>leave-active-class=''</code></td>
</tr>
<tr>
<td><code>appearActiveClass</code></td>
<td><code>appear-active-class=''</code></td>
</tr>
<tr>
<td><code>beforeEnterEvent</code></td>
<td><code>@before-enter=''</code></td>
</tr>
<tr>
<td><code>beforeLeaveEvent</code></td>
<td><code>@before-leave=''</code></td>
</tr>
<tr>
<td><code>beforeAppearEvent</code></td>
<td><code>@before-appear=''</code></td>
</tr>
<tr>
<td><code>enterEvent</code></td>
<td><code>@enter=''</code></td>
</tr>
<tr>
<td><code>leaveEvent</code></td>
<td><code>@leave=''</code></td>
</tr>
<tr>
<td><code>appearEvent</code></td>
<td><code>@appear=''</code></td>
</tr>
<tr>
<td><code>afterEnterEvent</code></td>
<td><code>@after-enter=''</code></td>
</tr>
<tr>
<td><code>afterLeaveEvent</code></td>
<td><code>@after-leave=''</code></td>
</tr>
<tr>
<td><code>afterAppearEvent</code></td>
<td><code>@after-appear=''</code></td>
</tr>
<tr>
<td><code>enterCancelledEvent</code></td>
<td><code>@enter-cancelled=''</code></td>
</tr>
<tr>
<td><code>leaveCancelledEvent</code></td>
<td><code>@leave-cancelled=''</code></td>
</tr>
<tr>
<td><code>appearCancelledEvent</code></td>
<td><code>@appear-cancelled=''</code></td>
</tr>
</tbody>
</table>
-----------------------------------------------------------------------------------------------
## Vue Router Snippet 
<table>
<thead>
<tr>
<th>Prefix</th>
<th>Vue Router Snippet Content</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>routerLink</code></td>
<td><code>&lt;router-link&gt;&lt;/router-link&gt;</code></td>
</tr>
<tr>
<td><code>routerView</code></td>
<td><code>&lt;router-view&gt;&lt;/router-view&gt;</code></td>
</tr>
<tr>
<td><code>to</code></td>
<td><code>to=""</code></td>
</tr>
<tr>
<td><code>tag</code></td>
<td><code>tag=""</code></td>
</tr>
<tr>
<td><code>newVueRouter</code></td>
<td><code>const router = newVueRouter({ })</code></td>
</tr>
<tr>
<td><code>routerBeforeEach</code></td>
<td><code>router.beforeEach((to, from, next) =&gt; { }</code></td>
</tr>
<tr>
<td><code>routerBeforeResolve</code></td>
<td><code>router.beforeResolve((to, from, next) =&gt; { }</code></td>
</tr>
<tr>
<td><code>routerAfterEach</code></td>
<td><code>router.afterEach((to, from) =&gt; { }</code></td>
</tr>
<tr>
<td><code>routerPush</code></td>
<td><code>router.push()</code></td>
</tr>
<tr>
<td><code>routerReplace</code></td>
<td><code>router.replace()</code></td>
</tr>
<tr>
<td><code>routerGo</code></td>
<td><code>router.back()</code></td>
</tr>
<tr>
<td><code>routerBack</code></td>
<td><code>router.push()</code></td>
</tr>
<tr>
<td><code>routerForward</code></td>
<td><code>router.forward()</code></td>
</tr>
<tr>
<td><code>routerGetMatchedComponents</code></td>
<td><code>router.getMatchedComponents()</code></td>
</tr>
<tr>
<td><code>routerResolve</code></td>
<td><code>router.resolve()</code></td>
</tr>
<tr>
<td><code>routerAddRoutes</code></td>
<td><code>router.addRoutes()</code></td>
</tr>
<tr>
<td><code>routerOnReady</code></td>
<td><code>router.onReady()</code></td>
</tr>
<tr>
<td><code>routerOnError</code></td>
<td><code>router.onError()</code></td>
</tr>
<tr>
<td><code>routes</code></td>
<td><code>routes: []</code></td>
</tr>
<tr>
<td><code>beforeEnter</code></td>
<td><code>beforeEnter: (to, from, next) =&gt; { }</code></td>
</tr>
<tr>
<td><code>beforeRouteEnter</code></td>
<td><code>beforeRouteEnter (to, from, next) { }</code></td>
</tr>
<tr>
<td><code>beforeRouteLeave</code></td>
<td><code>beforeRouteLeave (to, from, next) { }</code></td>
</tr>
<tr>
<td><code>scrollBehavior</code></td>
<td><code>scrollBehavior (to, from, savedPosition) { }</code></td>
</tr>
</tbody>
</table>
---------------------------------------------------------------------
## Nuxt.js Snippet
<table>
<thead>
<tr>
<th>Prefix</th>
<th>Nuxt.js Snippet Content</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>nuxt</code></td>
<td><code>&lt;nuxt/&gt;</code></td>
</tr>
<tr>
<td><code>nuxtChild</code></td>
<td><code>&lt;nuxt-child/&gt;</code></td>
</tr>
<tr>
<td><code>nuxtLink</code></td>
<td><code>&lt;nuxt-link to=""/&gt;</code></td>
</tr>
<tr>
<td><code>asyncData</code></td>
<td><code>asyncData() {}</code></td>
</tr>
</tbody>
</table>


