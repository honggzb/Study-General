<template>
  <div>
    <el-button @click="showAddAuthorDialog">添加作者</el-button>
    <el-button @click="showAddBookDialog">添加书本</el-button>
  </div>
  <div>
    <el-table :data="booksResult?.books">
      <el-table-column prop="name" label="书名"/>
      <el-table-column prop="type" label="类型"/>
      <el-table-column prop="author.name" label="作者"/>
    </el-table>
  </div>

  <el-dialog v-model="authorDialogVisible">
    <el-form :model="authorFormData">
      <el-form-item label="姓名">
        <el-input v-model="authorFormData.name"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="authorFormData.gender">
          <el-radio value=1>男</el-radio>
          <el-radio value=2>女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="authorFormData.email"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="onSubmitAuthor"> 提交 </el-button>
    </template>
  </el-dialog>
  <el-dialog v-model="bookDialogVisible">
    <el-form :model="bookFormData">
      <el-form-item label="书名">
        <el-input v-model="bookFormData.name"/>
      </el-form-item>
      <el-form-item label="类型">
        <el-input v-model="bookFormData.type"/>
      </el-form-item>
      <el-form-item label="作者">
        <el-select v-model="bookFormData.authorId">
          <el-option v-for="item in authorsResult?.authors"
                     :key="item.name"
                     :value="item.id"
                     :label="item.name"/>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="onSubmitBook"> 提交 </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useBooks, useAuthors, useAddAuthor, useAddBook } from './service/index'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const { result: booksResult, refetch: refetchBooks} = useBooks()
const { result: authorsResult, refetch: refetchAuthors } = useAuthors()

// 作者
const authorDialogVisible = ref(false)
const authorFormData = ref({})

const showAddAuthorDialog = () => {
  // clear form data
  authorFormData.value = {}
  authorDialogVisible.value = true
}

const onSubmitAuthor = () => {
  const { mutate, onDone } = useAddAuthor()
  mutate({
    createAuthorInput: {
      name: authorFormData.value.name,
      gender: parseInt(authorFormData.value.gender),
      email: authorFormData.value.email
    }
  })
  onDone(() => {
    refetchAuthors()
    ElMessage.success('操作成功')
    authorDialogVisible.value = false
  })
}

// 书本
const bookDialogVisible = ref(false)
const bookFormData = ref({})

const showAddBookDialog = () => {
  bookFormData.value = {}
  bookDialogVisible.value = true
}

const onSubmitBook = () => {
  const { mutate, onDone } = useAddBook()
  mutate({
    createBookInput: {
      name: bookFormData.value.name,
      type: bookFormData.value.type,
      authorId: bookFormData.value.authorId
    }
  })
  onDone(() => {
    refetchBooks()
    ElMessage.success('操作成功')
    bookDialogVisible.value = false
  })
}


</script>

<style scoped>
</style>
