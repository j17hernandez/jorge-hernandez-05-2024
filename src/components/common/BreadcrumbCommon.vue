<template>
  <ul class="breadcrumbs">
    <li class="breadcrumbs__item" v-for="(item, index) in items" :key="index">
      <a class="breadcrumbs__link" @click="clickItem(item, index)">
        {{ item.name }}
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'
import type { BreadCrumb } from '@/interfaces/breadcrumb.interface'

const props = defineProps({
  items: {
    type: Array<BreadCrumb>,
    required: true
  }
})

const router = useRouter()

const clickItem = (item: BreadCrumb, index: number) => {
  if (props.items.length - 1 !== index) {
    const deleteItems = props.items.length - index - 1
    // eslint-disable-next-line vue/no-mutating-props
    props.items.splice(index + 1, deleteItems)
    router.push(item.link)
  }
}
</script>
