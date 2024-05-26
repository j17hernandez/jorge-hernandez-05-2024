<template>
  <aside
    class="sidebar"
    :class="{
      'sidebar--hidden': !layoutStore.showSidebar,
      'sidebar--show': layoutStore.showSidebar
    }"
  >
    <div
      class="sidebar__container"
      :class="{
        'sidebar__container--expanded': contentExpanded,
        'sidebar__container--unexpanded': !contentExpanded
      }"
    >
      <img
        v-if="isMobile"
        class="sidebar__container__close-icon"
        :src="closeIcon"
        alt="close-icon"
        @click="layoutStore.openOrCloseSidebar(false)"
      />

      <div class="sidebar__container__menu"></div>

      <img
        v-if="!contentExpanded"
        class="sidebar__container__expander"
        :src="expandedOn"
        alt=""
        @click="openOrCloseSidebar"
      />

      <img
        v-if="contentExpanded"
        class="sidebar__container__expander"
        :src="expandedOff"
        alt=""
        @click="openOrCloseSidebar"
      />
    </div>
  </aside>
</template>
<script lang="ts" setup>
import { ref, defineEmits, onMounted } from 'vue'
import { useLayoutStore } from '@/stores/layout'
import expandedOn from '@/assets/img/icons/expanded_on.svg'
import expandedOff from '@/assets/img/icons/expanded_off.svg'
import closeIcon from '@/assets/img/icons/close.svg'
import { useIsMobile } from '@/mixins/isMobileMixin'

const layoutStore = useLayoutStore()
const emit = defineEmits(['isExpanded'])
const contentExpanded = ref(true)
const { isMobile } = useIsMobile()
const openOrCloseSidebar = () => {
  contentExpanded.value = !contentExpanded.value
  emit('isExpanded', contentExpanded.value)
}

onMounted(() => {
  emit('isExpanded', contentExpanded.value)
})
</script>
