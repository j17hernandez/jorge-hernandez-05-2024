<template>
  <div class="checkbox--wrapper" :style="disabled ? 'pointer-events: none;' : ''">
    <input
      type="checkbox"
      v-model="valueCheck"
      class="check-checkbox"
      :class="{
        'check--primary': type === 'primary',
        'check--secondary': type === 'secondary'
      }"
      :id="name"
      @click="handleClick"
    />
    <label
      :for="name"
      class="checkmark"
      :class="{
        'checkbox--sm': size === 'sm',
        'checkbox--md': size === 'md',
        'checkbox--lg': size === 'lg',
        'checkmark--primary': type === 'primary',
        'checkmark--secondary': type === 'secondary',
        'checkmark--disabled': disabled
      }"
      @click="handleClick"
    >
      <img
        v-if="status === 'select'"
        src="../../assets/img/icons/icon-check.svg"
        alt="icon-check"
        :class="{
          'checkbox__icon--sm-check': size === 'sm',
          'checkbox__icon--md-check': size === 'md',
          'checkbox__icon--lg-check': size === 'lg',
          'icon__disabled-checkmark': disabled
        }"
      />
      <img
        v-if="status === 'parcial'"
        src="../../assets/img/icons/icon-line.svg"
        alt="icon-line"
        :class="{
          'checkbox__icon--sm-check': size === 'sm',
          'checkbox__icon--md-check': size === 'md',
          'checkbox__icon--lg-check': size === 'lg',
          'icon__disabled-checkmark': disabled
        }"
      />
    </label>
    <span
      class="label-checkbox"
      :class="{
        'checkbox__label--sm': size === 'sm',
        'checkbox__label--md': size === 'md',
        'checkbox__label--lg': size === 'lg'
      }"
    >
      {{ label }}
    </span>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, watch, toRefs, defineProps, defineEmits } from 'vue'

const props = defineProps({
  value: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: null
  },
  size: {
    type: String,
    default: null
  },
  label: {
    type: String,
    default: null
  },
  status: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: 'primary'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:value', 'click'])

const { value, name, size, label, status, type, disabled } = toRefs(props)

const check = ref(value.value)

const valueCheck = computed({
  get() {
    return value.value
  },
  set(newValue: boolean) {
    emit('update:value', newValue)
  }
})

const handleClick = () => {
  emit('click')
}

watch(value, (newValue) => {
  check.value = newValue
})

watch(check, (newValue) => {
  emit('update:value', newValue)
})
</script>
