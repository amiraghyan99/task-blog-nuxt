<template>
  <div>
    <slot/>
  </div>
</template>

<script setup lang="ts">
const {appName} = useRuntimeConfig().public
useHead({
  titleTemplate: (title: string | undefined) => {
    return title ? `${appName} - ${title}` : `${appName}`;
  },
})
</script>