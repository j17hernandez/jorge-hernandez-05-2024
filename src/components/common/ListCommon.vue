<template>
  <div class="list">
    <div
      class="list__items-container"
      v-for="(item, index) in items"
      :key="index"
    >
      <ListItem :item="item" rounded @click="handleClick"></ListItem>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import type { ListItemType } from "@/interfaces/list-item.interface";
import ListItem from "@/components/common/ListItem.vue";

const emit = defineEmits(["click"]);
defineProps({
  items: {
    type: Array<ListItemType>,
    required: true,
  },
});

const handleClick = (item: ListItemType) => {
  emit("click", item);
};
</script>
