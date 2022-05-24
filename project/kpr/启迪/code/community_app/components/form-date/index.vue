<template>
  <view :class="['ui-form-date']">
    <picker 
      @change="pickerChangeHandler" 
      mode="date" 
      :value="date" 
    >
      <ui-link :label="label" size="small" :arrow="true" :required="required">
        <input 
          :value="date"
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
    name: 'FormDate',
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
    },
		data() {
			return {
        date: '',
			}
    },
    computed: {
     
    },
    watch: {
    },
		methods: {
      pickerChangeHandler(e) {
        this.date = e.detail.value;
        this.$emit('input', e.detail.value);
        this.$emit('change', e.detail.value);
      },
		},
		beforeMount() {
      this.date = this.value;
		},
	}
</script>

<style scoped lang="less">
  .ui-form-date {
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
