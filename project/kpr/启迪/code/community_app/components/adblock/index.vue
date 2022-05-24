<template>
  <swiper class="swiper" 
    :indicator-dots="true" 
    :autoplay="true" 
    indicator-color="rgba(255, 255, 255, 0.9)"
    indicator-active-color="rgba(255, 255, 255, 0.4)"
  >
    <swiper-item class="swiper-item" 
      v-for="item in list" :key="item.id"
      @tap="adItemTapHandler(item, $event)"
    >
      <image mode="aspectFill" :src="`${imageView}${item.image}`"/>
    </swiper-item>
  </swiper>
</template>

<script>
  import { mapState } from 'vuex';
  import api from '@/api';

	export default {
    name: 'AdBlock',
		components: {
    },
    props: {
      // 未传type的情况下将使用source作为数据源
      // 有type将主动拉取对应类型数据
      type: {
        type: String,
        default: '',
      },
      source: {
        type: Array,
        default() {
          return [];
        },
      }
    },
    computed: {
      ...mapState([
        'imageView',
      ]),
    },
    watch: {
      source(val) {
        this.list = val;
      },
    },
		data() {
			return {
        list: [],
			}
		},
		methods: {
      adItemTapHandler(item) {
        console.log(item);
      },
      async loadAdList() {
				const res = await api.ad.getList({
					type: this.type,
				})

				if (res) {
          this.list = res.data;
				}
			}
		},
		beforeMount() {
      if (this.type) {
        this.loadAdList();
      } else {
        this.list = this.source;
      }
		},
	}
</script>

<style scoped lang="less">
  .swiper {
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
    overflow: hidden;
    background: #e7e7e7;
	}
	.swiper image {
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
	}
</style>
