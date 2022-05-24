<template>
	<view class="map-box" >
		<map style="width: 690rpx; height: 600rpx;" :latitude="latitudes" :longitude="longitudes" :markers="covers"></map>
	</view>
</template>
<script>
	export default {
		props: {
		  loctionDu: {
		    type: String,
		    default: 1,
		  }
		},
	    data() {
	        return {
	      id:0, // 使用 marker点击事件 需要填写id
	            title: 'map',
	            // latitude: 29.6184337,
	            // longitude: 106.5089887,
	            covers: [{
	                latitude: 29.618,
	                longitude: 106.50898,
	                // iconPath: '../../../static/location.png'
	            }, {
	                latitude: 29.618,
	                longitude: 106.50898,
	                // iconPath: '../../../static/location.png'
	            }]
	        }
	    },
		computed:{
			latitudes(){
				let loctions=this.loctionDu
				let longitude=loctions.split(",")
				let lat =longitude[0]
				return lat
			},
			longitudes(){
				let loctions=this.loctionDu
				let longitude=loctions.split(",")
				let log =longitude[1]
				return log
			}
		},
	    methods: {
	
	    }
	}
</script>

<style>
	.map-box{
		margin-top: 15rpx;
		padding: 10rpx;
	}
</style>
