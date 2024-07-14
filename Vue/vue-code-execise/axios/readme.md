## Axios 1 - put all method to store by using pinia

- refer to 'counter.js'

## Axios 2 -put in onMounted of component 
```ts
<script setup lang="ts">
    import { ref, onMounted, toRow } from "vue";
    import axios from "axios";
    import type { USERS } from "./user.ts"
    import { useUsers } from '../../stores/counter'

    const allUsers = ref<USERS>()
    const usersStore = useUsers()
    usersStore.getUsers()
    const userToDeleteId = ref("0")

    onMounted(() => {     // or onBeforMount
        axios.get("http://localhost:4000/users").then((response) => {
            allUsers.value = response.data;
        });
    });
    const deleteUser = (id: string) => {
        userToDeleteId.value = id;
        axios.delete(`http://localhost:4000/users/${userToDeleteId.value}`)
             .then(() => {
                if(usersStore.userList) {
                    usersStore.userList = usersStore.userList.filter(
                        (_) => _.id !== userToDeleteId.value
                    );
                    userToDeleteId.value = "0";
                }
        });
    };
</script>
```

## axios封装

 - utils/request.ts
 - using request -- api/xxx.ts
