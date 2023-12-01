<script setup></script>

<template>
  <div class="p-8 fundo">
    <router-view />
  </div>
</template>

<style scoped>
.fundo {
  background-image: url(../../img/fundo.png);
  height: 100vh;
  background-size: cover;
}
</style>
