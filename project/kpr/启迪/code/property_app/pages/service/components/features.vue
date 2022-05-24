<template>
	<view class="features">
    <view class="big row">
      <view class="item" @click="$utils.moduleRedirect(item)" v-for="item in source" :key="item.id">
        <view class="icon-wrap">
          <image :src="`${imageView}${item.iconBig}`"></image>
        </view>
        <view class="name">{{item.name}}</view>
      </view>
    </view>
  </view>
</template>

<script>
  import { mapState } from 'vuex';

	export default {
    name: 'Features',
		components: {
    },
    props: {
			source: {
				type: Array,
				default() {
					return [];
				},
			},
    },
		data() {
			return {
			}
    },
    computed: {
      ...mapState(['imageView']),
    },
		onLoad() {
		},
		methods: {
		}
	}
</script>

<style scoped>
  .row {
    display: flex;
    flex-wrap: wrap;
    margin: 25rpx 0;
    
  }
  .row .item {
    width: 20%;
    font-size: 24rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .big .item {
    width: 25%;
    margin-bottom: 25rpx;
  }

  .icon-wrap {
    background: rgba(0, 0, 0, 0);
    margin-bottom: 6rpx;
  }

  .item image {
    width: 100%;
    height: 100%;
  }

  .big .icon-wrap {
    width: 104rpx;
    height: 104rpx;
  }
</style>
