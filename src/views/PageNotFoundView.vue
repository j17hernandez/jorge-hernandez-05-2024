<template>
  <div class="page-not-found">
    <NoDataAvalible
      class="page-not-found__container"
      message="Page not found"
    />
    <Button contained @click="$router.push('/')">
      <span>Go Home</span>
    </Button>
  </div>
</template>
<script setup lang="ts">
import Button from "@/components/common/ButtonCommon.vue";
import NoDataAvalible from "@/components/NoDataAvalible.vue";
</script>
