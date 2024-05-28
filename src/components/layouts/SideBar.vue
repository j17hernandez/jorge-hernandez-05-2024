<template>
  <aside
    class="sidebar"
    :class="{
      'sidebar--hidden': !layoutStore.showSidebar,
      'sidebar--show': layoutStore.showSidebar,
    }"
  >
    <div
      class="sidebar__container"
      :class="{
        'sidebar__container--expanded': contentExpanded,
        'sidebar__container--unexpanded': !contentExpanded,
      }"
    >
      <div class="sidebar__container__logo" @click="goToPath(items[0])">
        <img
          class="sidebar__container__logo__image"
          :src="pokeballImage"
          alt="logo-app"
        />
      </div>
      <div class="sidebar__container__menu">
        <List :items="items" @click="goToPath" />
      </div>
      <section v-if="!isMobile" class="sidebar__container__expander">
        <img
          v-if="!contentExpanded"
          :src="expandedOn"
          alt="icon-expanded"
          @click="openOrCloseSidebar"
        />

        <img
          v-if="contentExpanded"
          :src="expandedOff"
          alt="icon-unexpanded"
          @click="openOrCloseSidebar"
        />
      </section>
    </div>
  </aside>
</template>
<script lang="ts" setup>
import { ref, defineEmits, onMounted } from "vue";
import { useLayoutStore } from "@/stores/layout";
import { useBreadcrumb } from "@/stores/breadcrumb";
import { useRouter } from "vue-router";
import List from "@/components/common/ListCommon.vue";
import expandedOn from "@/assets/img/icons/expanded_on.svg";
import expandedOff from "@/assets/img/icons/expanded_off.svg";
import homeIcon from "@/assets/img/icons/home.svg";
import groupIcon from "@/assets/img/icons/group.svg";
import pokeballImage from "@/assets/img/pokeball.png";
import type { ListItemType } from "@/interfaces/list-item.interface";
import type { BreadCrumb } from "@/interfaces/breadcrumb.interface";
import { useIsMobile } from "@/mixins/isMobileMixin";

const { isMobile } = useIsMobile();
const router = useRouter();
const layoutStore = useLayoutStore();
const breadcrumbStore = useBreadcrumb();
const emit = defineEmits(["isExpanded"]);
const contentExpanded = ref(true);
const items = ref([
  {
    name: "Home",
    path: "/",
    icon: homeIcon,
  },
  {
    name: "Team",
    path: "/team",
    icon: groupIcon,
  },
]);
const openOrCloseSidebar = () => {
  contentExpanded.value = !contentExpanded.value;
  emit("isExpanded", contentExpanded.value);
};

onMounted(() => {
  emit("isExpanded", contentExpanded.value);
});

const goToPath = (item: ListItemType) => {
  const breadcrumb: BreadCrumb = { name: item.name!, link: item.path };
  breadcrumbStore.updateBreadcrumb(breadcrumb);
  router.push(item.path);
};
</script>
