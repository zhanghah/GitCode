<template>
	<view class="page-choosemap">
		<view>
			<map ref="myMap" id="myMap" @tap="dianji" style="width: 100%; height: 100vh;" :markers="markers"
				:longitude="longitude" :latitude="latitude" :scale="scale" :show-location="true"></map>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				address:'',
				remnant: 0,
				content: "",
				title: "",
				role: false,
				scale: 15,
				latitude: '',
				longitude: '',
				markers: [{
					width: 300,
					height: 300,
					latitude: this.latitude,
					longitude: this.longitude,
					iconPath: '../static/icon_address.png',
				}],
			}
		},
		methods: {
			getLocation(){
				uni.getLocation({
				    type: 'wgs84',
				    success:(res)=> {
				       this.longitude=res.longitude;
					   this.latitude=res.latitude
				    }
				});
			},
			dianji() {
				uni.chooseLocation({
					success: (res)=> {
						this.name=res.name
						this.address=res.address
						this.latitude= res.latitude
						this.longitude= res.longitude
						let data={
							name:res.name,
							address:res.address,
							latitude:res.latitude,
							longitude:res.longitude
						}
						uni.$emit('getAdd', data)
						uni.navigateBack({
							delta:1
						})
						console.log(res)
					}
				});
			},
		},
		onLoad() {
		this.getLocation()		
		},
		beforeMount() {
			uni.setNavigationBarTitle({
				title: '选择事件位置',
			});
		}
	}
</script>

<style>
</style>
