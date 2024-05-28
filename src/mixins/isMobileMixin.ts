import { ref, onMounted, onBeforeUnmount } from "vue";

export function useIsMobile() {
  const isMobile = ref(false);

  const checkMobile = () => {
    isMobile.value = window.innerWidth <= 960;
  };

  onMounted(() => {
    window.addEventListener("resize", checkMobile);
    checkMobile();
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", checkMobile);
  });

  return { isMobile };
}
