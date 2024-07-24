import { createApp, h } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import { provideApolloClient } from "@vue/apollo-composable";

// HTTP connection to the API
const httpLink = new HttpLink ({
    // You should use an absolute URL here
    uri: 'http://localhost:3000/graphql',
    fetchOptions: {
        mode: 'no-cors',  // no-cors, *cors, same-origin
    },
  })
  // Cache implementation
  const cache = new InMemoryCache()
  // Create the apollo client
  const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
  })

  createApp({
    setup() {
      provideApolloClient(apolloClient)
    },
    render:() => h(App)
  }).use(ElementPlus).mount('#app')
