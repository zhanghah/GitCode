<template>
	<view class="el-search-filter">
    <view class="block">
      <view class="title">
        面积
      </view>
      <view class="content">
        <view class="btn" :class="{active:item.type}" v-for="(item,index) in areaList" :key="index" @click="areaGo(item,index)">
          {{item.name}}
        </view>
      </view>
    </view>
    
    <view class="block">
      <view class="title">
        类型
      </view>

      <view class="content">
        <view class="btn" :class="{active:item.type}" v-for="(item,index) in typeList" :key="index" @click="typeGo(item,index)">
          {{item.name}}
        </view>
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
				areaList:[
					{name:"60㎡以下",id:"0,60",type:false},
					{name:"60-90㎡",id:"60,90",type:false},
					{name:"90-120㎡",id:"90,120",type:false},
					{name:"120-200㎡",id:"120,200",type:false},
					{name:"200㎡以上",id:"200,-1",type:false},
				],
				// roomTypes:["house","villa","business","office","industry","highRise"],
				typeList:[
					{name:"住宅",id:"house",type:false},
					{name:"别墅",id:"villa",type:false},
					{name:"商业",id:"business",type:false},
					{name:"写字楼",id:"office",type:false},
					{name:"工业",id:"industry",type:false},
					{name:"高层",id:"highRise",type:false},
				]
			}
    },
	computed:{
		...mapState(['search'])
	},
    props: {
    },
		methods: {
			...mapMutations('search', {
				area: 'AREA',
				roomType:'ROOM_TYPE'
			}),
			areaGo(item,index){
				item.type=!item.type
				let newArr = []
				let arr = this.areaList.filter(t => t.type)
				arr.forEach(item => {
					newArr.push(item.id)
				})
				this.area(newArr)
			},
			typeGo(item,index){
				item.type=!item.type
				let newArrs = []
				let arrs = this.typeList.filter(t => t.type)
				arrs.forEach(item => {
					newArrs.push(item.id)
				})
				this.roomType(newArrs)
				console.log(this.search.roomType)
			},
			// store回显
			getInfo(){
				let areaList=this.search.area;
				let roomTypeList=this.search.roomType;
				if(areaList.length>0){
					this.areaList.forEach(item=>{
						areaList.forEach(val=>{
							if(item.id==val){
								item.type=true
							}
						})
					})
				}
				if(roomTypeList.length>0){
					this.typeList.forEach(item=>{
						roomTypeList.forEach(val=>{
							if(item.id==val){
								item.type=true
							}
						})
					})
				}
			}
		},
		beforeMount() {
			this.getInfo()
		},
	}
</script>  

<style scoped lang="less">
  .el-search-filter {
    padding: 25rpx 15rpx;
    
    .title {
      color: #333333;
      font-size: 28rpx;
      padding: 12rpx 10rpx;
    }
    .content {
      display: flex;
      flex-wrap: wrap;
    }

    .btn {
      width: 160rpx;
      height: 80rpx;
      background-color: #F5F4F2;
      border-radius: 8rpx;
      margin: 10rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666666;
      font-size: 28rpx;

      &.active {
        background-color: #DFECFF;
        color: #1B76FF;
        font-weight: bold;
      }
    }
  }
</style>
