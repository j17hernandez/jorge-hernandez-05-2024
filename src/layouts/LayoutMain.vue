<template>
  <section class="layout-main">
    <SideBar @is-expanded="getIsExpanded"></SideBar>
    <div
      class="layout-main__container"
      :class="{
        'layout-main__container--open': isExpanded,
        'layout-main__container--close': !isExpanded
      }"
    >
      <div class="container-main">
        <div class="container-view">
          <slot> </slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SideBar from '@/components/layouts/SideBar.vue'

const isExpanded = ref(false)

const getIsExpanded = (value: boolean) => {
  isExpanded.value = value
}
</script>
