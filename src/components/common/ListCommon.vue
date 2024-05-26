<template>
  <div class="list">
    <div class="list__items-container" v-for="(item, index) in items" :key="index">
      <ListItem :item="item" rounded></ListItem>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import type { ListItemType } from '@/interfaces/list-item.interface'
import ListItem from '@/components/common/ListItem.vue'

defineProps({
  items: {
    type: Array<ListItemType>,
    required: true
  }
})
</script>
