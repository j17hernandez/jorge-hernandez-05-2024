<template>
  <div class="no-data-avalible">
    <span class="no-data-avalible__title">{{ message }}</span>
    <div class="no-data-avalible__image"></div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";

defineProps({
  message: {
    type: String,
    default: "",
  },
});
</script>
