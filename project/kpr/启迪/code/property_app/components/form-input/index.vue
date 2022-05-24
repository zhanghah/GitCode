<template>
  <view :class="['ui-form-input', `ui-${type}`]">
		<ui-link
      :label="label"
      :required="required"
      :size="size" 
      :arrow="false"
    >
      <view class="input-wrap" slot="ext">
        <input 
          v-model="localval"
          :type="type"
          class="input" 
          :placeholder="placeholder"
		  :maxlength="maxlength"
        />
        <view class="ext" v-if="$slots.ext">
          <slot name="ext"/>
        </view>
      </view>
		</ui-link>
  </view>
</template>

<script>

	export default {
    name: 'FormInput',
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
      type: {
        type: String,
        default: 'text',
      },
      ext: {
        type: String,
        default: '',
      },
      size: {
        type: String,
        default: 'small',
      },
	  maxlength:{
		  type:String,
		  default:'140'
	  }
    },
		data() {
			return {
        localval: '',
			}
    },
    watch: {
      localval(val) {
        this.$emit('input', val);
      }
    },
		methods: {
		},
		beforeMount() {
      this.localval = this.value;
		},
	}
</script>

<style scoped lang="less">
  .ui-form-input {
    .input-wrap {
      height: 100%;
      flex: 1;
      display: flex;
      align-items: center;
    }


    .input {
      text-align: right;
      font-size: 30rpx;
      width: 490rpx;
      height: 90%;
      border: none;
      appearance: none;
      outline: none;
    }

    .ext {
      font-size: 32rpx;
      color: #333333;
      flex-shrink: 0;
      flex-grow: 0;
      margin-left: 30rpx;
    }
	}
</style>
