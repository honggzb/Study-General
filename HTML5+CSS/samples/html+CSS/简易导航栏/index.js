const {createApp} = Vue;
createApp({
    data(){
        return {
            navList:[
                "首页",
                "购物车",
                "我的"
            ]
        }
    }
}).mount("#app")