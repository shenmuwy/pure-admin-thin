import type { Directive } from "vue";

export const focus: Directive = {
  mounted(el: HTMLElement) {
    const inputElementBelow = el.querySelector("input");
    inputElementBelow.focus();
  }
};
