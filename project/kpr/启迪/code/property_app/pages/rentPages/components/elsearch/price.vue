<template>
	<view class="el-search-price">
    <view class="col col1">
      <view class="item active">
        单价
      </view>
    </view>
    <view class="col last">
      <view class="item" :class="{active:item.type}" v-for="(item,index) in dataList" :key="index" @click="activeGo(item,index)">
        {{item.name}}
        <view class="icon"></view>
      </view>
     
    </view>
  </view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				dataList:[
					{name:"不限",id:"1,-1",type:false},
					{name:"1万元/㎡以下",id:"0,9999",type:false},
					{name:"1万-1.3万元/㎡",id:"10000,13000",type:false},
					{name:"1.3万-1.6万元/㎡",id:"13000,16000",type:false},
					{name:"1.6万-2万元/㎡",id:"16000,20000",type:false},
					{name:"2万元/㎡以上",id:"20000,-1",type:false},
				]
			}
    },
	computed:{
		...mapState(['search'])
	},
    props: {
      info: {
        type: Object,
        default() {
          return {};
        },
      },
    },
		methods: {
			...mapMutations('search', {
				price: 'PRICE',
			}),
			activeGo(item,index){
				item.type=!item.type
				let newArr = []
				let arr = this.dataList.filter(t => t.type)
				arr.forEach(item => {
					newArr.push(item.id)
				})
				this.price(newArr)
				console.log(newArr)
			},
			// 回显
			getPrice(){
				let price=this.search.price;
				if(price.length>0){
					this.dataList.forEach(item=>{
						if(item.id==price){
							item.type=true
						}
					})
				}
			},
		},
		beforeMount() {
			this.getPrice()
		},
	}
</script>  

<style scoped lang="less">
  .el-search-price {
    display: flex;

    .col {
      width: 220rpx;
      font-size: 28rpx;
      color: #333333;
      .item {
        padding: 25rpx 0;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        box-sizing: border-box;

        &.active {
          background-color: #E6E6E6;
        }
      }

      &.col1 {
        background-color: #F5F5F5;
      }

      &.last {
        flex: 1;

        .icon {
          width: 38rpx;
          height: 25rpx;
          background: url(../../static/rent/icon_check.png) no-repeat center center;
          background-size: 100% 100%;

          position: absolute;
          right: 30rpx;
          top: 50%;
          transform: translateY(-50%);
          display: none;
        }

        .item {
          padding-left: 124rpx;
          justify-content: flex-start;
        }

        .item.active{
          background-color: transparent;
          color: #1B76FF;

          .icon {
            display: block;
          }
        }
      }
    }
  }
</style>
