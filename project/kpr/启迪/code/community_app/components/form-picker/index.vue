<template>
  <view :class="['ui-form-picker', `ui-${mode}`]">
    <picker 
      @change="pickerChangeHandler" 
      mode="selector" 
      :value="index" 
      :range="pickerArray"
    >
      <ui-link :label="label" size="small" :arrow="true" :required="required">
        <input 
          :value="selected.label"
          slot="ext" 
          class="input" 
          disabled
          :placeholder="placeholder"
        />
      </ui-link>
    </picker>
  </view>
</template>

<script>

	export default {
    name: 'FormPicker',
		components: {
    },
    props: {
      required: {
        type: Boolean,
        default: false,
      },
      value: {
        type: String,
        default: '',
      },
      label: {
        type: String,
        default: '',
      },
      placeholder: {
        type: String,
        default: '',
      },
      mode: {
        type: String,
        default: 'selector',
      },
      range: {
        type: Array,
        default() {
          return [];
        },
      },
    },
		data() {
			return {
        index: -1,
			}
    },
    computed: {
      pickerArray() {
        return this.range.map(i => i.label);
      },
      selected() {
        return this.range[this.index] || {};
      }
    },
    watch: {
    },
		methods: {
      pickerChangeHandler(e) {
        this.index = e.detail.value;
        this.$emit('input', this.selected.key);
        this.$emit('change', this.selected);
      },
		},
		beforeMount() {
      this.index = this.range.findIndex(i => i.key === this.value);
		},
	}
</script>

<style scoped lang="less">
  .ui-form-picker {
    .input {
      text-align: right;
      font-size: 30rpx;
      width: 100%;
      border: none;
      appearance: none;
      outline: none;
      width: 400rpx;
      height: 100%;
      background: transparent;
    }
	}
</style>
