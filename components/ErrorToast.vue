<script setup lang="ts">

import {laravelError} from "~/plugins/error-handler";
</script>

<template>
  <h1 v-if="laravelError">{{ laravelError }}</h1>
</template>