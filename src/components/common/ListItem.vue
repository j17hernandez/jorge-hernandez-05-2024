<template>
  <div
    class="item__container"
    :class="{
      'item__container--selected-path': isSelectedItemPath,
      'item__container--rounded': rounded
    }"
    @click="goToPath(item.path)"
  >
    <div
      class="item__container__data"
      :class="{
        'item__container__data--navigation': item.path
      }"
    >
      <!--List item icon-->
      <div v-if="item.icon" class="item__container__data__icon-container">
        <img
          class="item__container__data__icon-container__icon"
          :class="{
            'item__container__data__icon-container__icon-selected': isSelectedItemPath
          }"
          :src="item.icon"
          :alt="item.name"
        />
      </div>
      <div class="item__container__data__name-container">
        <span class="item__container__data__name-container__name">
          {{ itemText ? item[itemText] : item.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ListItemType } from '@/interfaces/list-item.interface'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  item: {
    type: Object as () => ListItemType,
    required: true
  },
  itemText: {
    type: String,
    default: ''
  },
  rounded: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()

const isSelectedItemPath = computed(() => {
  const pathSplit = router.currentRoute.value.path.split('/')
  return pathSplit[1] === props.item.path.replace('/', '')
})

const goToPath = (path: string) => {
  router.push(path)
}
</script>
