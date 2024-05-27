<template>
  <section>
    <div class="input__form">
      <input
        class="input"
        :class="{
          'input--icon': icon,
        }"
        ref="input"
        v-model="value"
        autocomplete="off"
        type="text"
        :placeholder="placeholder"
        @input="updateVal"
      />
      <div v-if="icon" class="input__container-icon">
        <slot name="icon">
          <img
            :src="searchIcon"
            alt="Search Icon"
            class="input__container-icon__img"
          />
        </slot>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from "vue";
import searchIcon from "@/assets/img/icons/search.svg";

// Define props
const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  block: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  icon: {
    type: Boolean,
    default: false,
  },
});

// Define emits
const emit = defineEmits(["update:modelValue"]);

// Create a computed property for value
const value = computed({
  get: () => props.modelValue,
  set: (newValue: string | number) => emit("update:modelValue", newValue),
});

// Method to handle input event
const updateVal = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emit("update:modelValue", input.value);
};
</script>
