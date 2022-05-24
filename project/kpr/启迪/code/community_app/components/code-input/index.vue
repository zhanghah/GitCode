<template>
  <view class="code-input">
    <view class="wrap" @tap="focusHandler">
      <view 
        :class="[
          'cell', 
          { last: index === length - 1 }, 
          { active: index <= value.length }
        ]" 
        v-for="(val, index) in fill" 
        :key="index"
      >
        <view class="val">{{val}}</view>
      </view>
    </view>

    <input v-model="value" 
      :focus="focus" 
      type="number"
      class="input" 
      :maxlength="length"
      @blur="blurHandler"
    >
  </view>
</template>

<script>
	export default {
    name: 'CodeInput',
		components: {
    },
    props: {
      length: {
        type: Number,
        default: 6
      }
    },
		data() {
			return {
        focus: false,
        value: '',
        fill: new Array(this.length).fill(''),
			}
    },
    watch: {
      value(val) {
        const valArr = val.split('');
        this.fill = new Array(this.length).fill('');
        Object.assign(this.fill, valArr);

        if (val.length >= this.length) {
          this.$emit('change', val);
        }
      },
    },
		methods: {
      focusHandler() {
        this.focus = true;
      },
      blurHandler() {
        this.focus = false;
      }
		},
		beforeMount() {
    },
    mounted() {
      this.focus = true;  
    },
	}
</script>

<style scoped lang="less">
  .code-input {
    position: relative;
    height: 80rpx;
    width: 100%;
    overflow: hidden;

    .wrap {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
    }

    .input {
      width: 100%;
      height: 100%;
      position: absolute;;
      top: -10000rpx;
      left: 0;
      opacity: 0;
    }

    .cell {
      height: 100%;
      box-sizing: border-box;
      padding: 14rpx 0;
      flex: 1;
      color: #424242;
      font-size: 36rpx;
      
      margin-right: 18rpx;
      border-bottom: 1px solid #A6A6A6;
      text-align: center;

      &.active {
        border-bottom-color: #424242;
      }
      &.last {
        margin-right: 0;
      }
    }
	}
</style>
