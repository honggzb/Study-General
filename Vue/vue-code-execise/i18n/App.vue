<script lang="ts" setup>
import { watch } from "vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
watch(locale, (newlocale) => {
  localStorage.setItem("locale", newlocale);
});
</script>
<template>
<div class="app">
  <img alt="Vue logo" src="./assets/logo.png" />
  <nav>
    <select v-model="locale">
      <option>zh-TW</option>
      <option>en-US</option>
      <option>ja-JP</option>
    </select>
  </nav>
  <p>{{ t("cancel") }}</p>
  <p>{{ t("email") }}</p>
  <p>{{ t("date") }}</p>
  <p>{{ t("subject") }}</p>
  <p>{{ t("message") }}</p>
  <p>{{ t("upload") }}</p>
</div>
</template>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
