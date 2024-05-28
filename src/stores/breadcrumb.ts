import { defineStore } from "pinia";
import type { BreadCrumb } from "@/interfaces/breadcrumb.interface";

export const useBreadcrumb = defineStore("breadcrumbStore", {
  state: () => ({
    breadcrumbs: [{ name: "Home", link: "/" }] as BreadCrumb[],
  }),
  actions: {
    updateBreadcrumb(item: BreadCrumb) {
      this.breadcrumbs = [item];
    },
    addBreadcrumb(breadcrumb: BreadCrumb) {
      this.breadcrumbs.push(breadcrumb);
    },
  },
});
