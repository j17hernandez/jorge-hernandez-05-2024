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
      <div class="sidebar__container__logo">
        <img class="sidebar__container__logo__image" :src="pokeballImage" alt="logo-app" />
      </div>
      <div class="sidebar__container__menu">
        <List :items="items" />
      </div>

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
import List from '@/components/common/ListCommon.vue'
import expandedOn from '@/assets/img/icons/expanded_on.svg'
import expandedOff from '@/assets/img/icons/expanded_off.svg'
import homeIcon from '@/assets/img/icons/home.svg'
import groupIcon from '@/assets/img/icons/group.svg'
import pokeballImage from '@/assets/img/pokeball.png'

const layoutStore = useLayoutStore()
const emit = defineEmits(['isExpanded'])
const contentExpanded = ref(true)
const items = ref([
  {
    name: 'Home',
    path: '/',
    icon: homeIcon
  },
  {
    name: 'Grupo',
    path: '/team',
    icon: groupIcon
  }
])
const openOrCloseSidebar = () => {
  contentExpanded.value = !contentExpanded.value
  emit('isExpanded', contentExpanded.value)
}

onMounted(() => {
  emit('isExpanded', contentExpanded.value)
})
</script>
