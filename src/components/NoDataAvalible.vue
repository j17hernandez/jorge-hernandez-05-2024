<template>
  <div
    class="no-data-avalible"
    :class="{ 'no-data-avalible--is-mobile': isMobile }"
  >
    <span class="no-data-avalible__title">{{ message }}</span>
    <div class="no-data-avalible__image"></div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
import { useIsMobile } from "@/mixins/isMobileMixin";

const { isMobile } = useIsMobile();

defineProps({
  message: {
    type: String,
    default: "",
  },
});
</script>
