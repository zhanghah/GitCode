<template>
	<view>
		<nav-bar :home="false" fontColor="#333333" :backState="1000" :shadow="false" bgColor="#ffffff">
			发布信息
		</nav-bar>
		<view class="conter">
			<view class="item">
				<view class="item_name">
					<text>*</text>
					标题
				</view>
				<view class="item_input">
					<input type="text" v-model="form.title" maxlength="15" placeholder="请输入信息标题" placeholder-class="placeholder" />
				</view>
				<view class="item_limit">
					{{form.title.length}}/15
				</view>
			</view>
			
			<view class="item">
				<view class="item_name">
					<text>*</text>
					类型
				</view>
				<view class="item_type">
					<picker @change="bindPickerChange" :value="arrayIndex" :range="array" :range-key="'name'">
						<view class="uni-input" :class="arrayname == '请选择类型'?'ash':''">
							{{arrayname}}
						</view>
					</picker>
				</view>
				<view class="item_limit">
					<image src="/static/inform/add2.png" mode=""></image>
				</view>
			</view>
			
			<view class="item">
				<view class="item_name">
					<text>*</text>
					开始时间
				</view>
				<view class="item_type">
					<picker mode="date" :value="strtime" :start="startDate" :end="endDate" @change="strbindDateChange">
						<view class="uni-input" :class="strtime == '请选择'?'ash':''">
							{{strtime}}
						</view>
					</picker>
				</view>
				<view class="item_limit">
					<image src="/static/inform/add2.png" mode=""></image>
				</view>
			</view>
			
			<view class="item">
				<view class="item_name">
					<text>*</text>
					结束时间
				</view>
				<view class="item_type">
					<picker mode="date" :value="endtime" :start="startDate" :end="endDate" @change="endbindDateChange">
						<view class="uni-input" :class="endtime == '请选择'?'ash':''">
							{{endtime}}
						</view>
					</picker>
				</view>
				<view class="item_limit">
					<image src="/static/inform/add2.png" mode=""></image>
				</view>
			</view>
			
			<view class="frame">
				<view class="frame_title">
					<text>*</text>
					内容
				</view>
				<view class="textarea">
					<textarea v-model="form.content" placeholder="请输入内容" placeholder-class="placeholder" />
				</view>
				<view class="picture">
					<ui-image-upload target="java" :params="{ type: 8 }" @success="uploadSuccessHandler">
						<view class="upload">
							<image src="/static/inform/add1.png" mode=""></image>
						</view>
					</ui-image-upload>
					<view class="imgs" v-for="(item,index) in imgList" :key="index">
						<image :src="`${imageView}${item}`" @tap="privewImg(`${imageView}${item}`,imgList)" mode=""></image>
						<view class="delete" @tap="delimg(index)">
							<image src="/static/inform/delete.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="frame">
				<view class="frame_title">
					<text>*</text>
					推送范围
				</view>
				<view class="radio">
					<radio-group @change="typeChange" class="radio_ul">
						<view :class="['label',{'cor':item.value == type}]" v-for="(item,index) in typeList" :key="index">
							<radio color="#7F298E" :value="item.value" :checked="type == item.value" />
							{{item.name}}
						</view>
					</radio-group>
				</view>
				<view class="radio" v-if="type == 2">
					<radio-group @change="typeChangetwo" class="radio_ul">
						<view :class="['label',{'cor':item.value == typeAppoint}]" v-for="(item,index) in appointList" :key="index">
							<radio color="#7F298E" :value="item.value" :checked="typeAppoint == item.value" />
							{{item.name}}
						</view>
					</radio-group>
				</view>
			</view>
			<!-- 电话号码 -->
			<view class="frame" v-if="typeAppoint == 3">
				<view class="frame_title">
					<text>*</text>
					电话号码
				</view>
				<view class="textarea">
					<textarea v-model="form.phones" maxlength="-1" placeholder="请输入电话号码，多个请用逗号隔开例如：180****1234，181****9081" placeholder-class="placeholder" />
				</view>
			</view>
			<!-- 选择小区 -->
			<view class="frame" v-if="typeAppoint == 2">
				<view class="frame_title">
					<text>*</text>
					选择小区
				</view>
				<view class="radio">
					<checkbox-group @change="villageChange" class="checkbox_ul">
						<view :class="['label',{'cor':village.includes(item.id)}]" v-for="(item,index) in villageList" :key="index">
							<checkbox color="#7F298E" :value="item.id" :checked="village.includes(item.id)"/>
							{{item.name}}
						</view>
					</checkbox-group>
				</view>
			</view>
			
			<!-- 发布 -->
			<view class="release">
				<view class="submit_btn" @tap="submit">确认发布</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api';
	import { mapState } from 'vuex';
	
	export default {
		data() {
			return {
				arrayIndex: '',
				arrayname: '请选择类型',
				array: [],
				type: 1,
				typeAppoint: '',
				village: [],
				typeList:[
					{name:'政务平台',value:'1'},
					{name:'小区',value:'2'}
				],
				appointList:[
					{name:'全部小区',value:'1'},
					{name:'指定小区',value:'2'},
					{name:'指定人员',value:'3'}
				],
				villageList:[],
				form: {
					title: '',
					content: '',
					phones: '',
				},
				strtime: '请选择',
				endtime: '请选择',
				imgList: [],
			}
		},
		onLoad() {
			this.getTypes();
			this.getVillages();
		},
		computed: {
			...mapState(['user','imageView']),
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
			
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.arrayIndex = e.target.value;
				this.arrayname = this.array[this.arrayIndex].name;
			},
			typeChange(e) {
				console.log(e.detail.value);
				this.type = e.detail.value;
				this.typeAppoint = '';
			},
			typeChangetwo(e) {
				console.log(e.detail.value);
				this.typeAppoint = e.detail.value;
				this.village = [];
			},
			villageChange(e) {
				console.log(e.detail.value);
				this.village = e.detail.value;
			},
			// 时间选择
			strbindDateChange(e) {
				this.strtime = e.detail.value;
			},
			endbindDateChange(e) {
				this.endtime = e.detail.value;
			},
			// 获取类型
			async getTypes() {
				const res = await api.inform.informType({})
				if (res) {
					this.array = [];
					res.data.forEach((item,index) => {
						var obj = {
							name:item.typeName,
							value:item.id,
						}
						this.array.push(obj);
					});
				}
			},
			// 获取小区
			async getVillages() {
				const res = await api.inform.informVillage({})
				if (res) {
					this.villageList = res.data;
				}
			},
			// 转时间戳
			timeProcessing(times){
				times = times.replace(/-/g,"/");
				let Time = new Date(times);
				let timestemp = Time.getTime();
				return timestemp;
			},
			// 发起
			async submit() {
				this.form.title = this.form.title.replace(/\s*/g,'');
				if(!this.form.title){
					this.$toast('请填写标题');
					return false;
				}
				if(this.arrayname == '请选择类型'){
					this.$toast('请选择类型');
					return false;
				}
				if(this.strtime == '请选择'){
					this.$toast('请选择开始时间');
					return false;
				}
				if(this.endtime == '请选择'){
					this.$toast('请选择结束时间');
					return false;
				}
				var start_pro = this.timeProcessing(`${this.strtime} 00:00:00`);
				var end_pro = this.timeProcessing(`${this.endtime} 23:59:59`);
				if (start_pro >= end_pro) return this.$toast('结束时间需大于开始时间');
				
				this.form.content = this.form.content.replace(/\s*/g,'');
				if(!this.form.content){
					this.$toast('请填写内容');
					return false;
				}
				if(this.imgList.length == 0){
					this.$toast('请选择图片');
					return false;
				}
				if(this.type == 2) {
					if(this.typeAppoint == ''){
						this.$toast('请选择推送范围类型');
						return false;
					}
				}
				if(this.typeAppoint == 2) {
					if(this.village.length == 0){
						this.$toast('请选择小区');
						return false;
					}
				}else if (this.typeAppoint == 3) {
					this.form.phones = this.form.phones.replace(/\s*/g,'');
					if(!this.form.phones){
						this.$toast('请填写指定人员手机号码');
						return false;
					}
				}
				
				var param = {
					rsInformationTypeId:this.array[this.arrayIndex].value,
					title:this.form.title,
					content: this.form.content,
					files: this.imgList,
					pushRange:this.type,
					startTime: start_pro,
					endTime: end_pro,
				}
				if(this.type == 2) {
					param.selectType = this.typeAppoint
				}
				if(this.typeAppoint == 2) {
					param.selectTypeInfo = this.village
				}else if (this.typeAppoint == 3) {
					param.phones = this.form.phones
				}
				const res = await api.inform.addInform(param)
				if (res) {
					this.$toast(res.msg);
					setTimeout(() => {
						uni.navigateBack();
					},1800);
				}
			},
			// 上传图片
			uploadSuccessHandler(url) {
				console.log(url);
				this.imgList = [...this.imgList, url.data];
			},
			// 删除图片
			delimg(index) {
				this.imgList.splice(index,1);
			},
			// 预览图片
			privewImg(url,urls) {
				var urlse = [];
				urls.forEach((item,index) =>{
					urlse.push(this.imageView+item);
				});
				uni.previewImage({
					current: url,
					urls: urlse,
				});
			}
		}
	}
</script>

<style lang="less">
page {
	background: #f5f5f5;
}
.conter {
	width: 100%;
	padding: 24rpx;
	box-sizing: border-box;
	.item {
		width: 100%;
		padding: 27rpx 24rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 6rpx;
		margin-bottom: 20rpx;
		display: -webkit-flex;
		flex-direction: row;
		align-items: center;
		.item_name {
			width: 140rpx;
			font-size: 30rpx;
			color: #333333;
			text {
				color: #F05050;
				font-size: 22rpx;
			}
		}
		.item_input {
			flex: 1;
			input {
				width: 100%;
				border: none;
				outline: none;
			}
			.placeholder {
				color: #AAAAAA;
				font-size: 30rpx;
			}
		}
		.item_limit {
			color: #AAAAAA;
			font-size: 24rpx;
			margin-left: 24rpx;
			image {
				width: 10rpx;
				height: 20rpx;
			}
		}
		.item_type {
			flex: 1;
			justify-content: flex-end;
			.uni-input {
				text-align: right;
				color: #282828;
				font-size: 30rpx;
			}
			.ash {
				color: #AAAAAA;
			}
		}
	}
	.frame {
		width: 100%;
		padding: 24rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 6rpx;
		margin-bottom: 20rpx;
		.frame_title {
			width: 100%;
			font-size: 30rpx;
			color: #333333;
			margin-bottom: 27rpx;
			text {
				color: #F05050;
				font-size: 22rpx;
			}
		}
		.textarea {
			width: 100%;
			margin-bottom: 30rpx;
			textarea {
				width: 100%;
				height: 150rpx;
				border: none;
				font-size: 30rpx;
			}
			.placeholder {
				color: #AAAAAA;
				font-size: 30rpx;
			}
		}
		.picture {
			width: 100%;
			display: -webkit-flex;
			flex-direction: row;
			flex-wrap: wrap;
			.upload {
				width: 100rpx;
				height: 100rpx;
				line-height: 0;
				margin-right: 16rpx;
				image {
					width: 100rpx;
					height: 100rpx;
				}
			}
			.imgs {
				width: 100rpx;
				height: 100rpx;
				line-height: 0;
				margin-right: 16rpx;
				margin-bottom: 16rpx;
				position: relative;
				image {
					width: 100rpx;
					height: 100rpx;
				}
				.delete {
					width: 30rpx;
					height: 30rpx;
					line-height: 0;
					position: absolute;
					top: 0;
					right: 0;
					image {
						width: 30rpx;
						height: 30rpx;
					}
				}
			}
		}
		.radio {
			width: 100%;
			margin-bottom: 25rpx;
			.radio_ul {
				width: 100%;
				display: -webkit-flex;
				flex-direction: row;
				.label {
					width: 210rpx;
					color: #999999;
					font-size: 26rpx;
					radio {
						transform: scale(0.77);
					}
				}
				.cor {
					color: #7F298E;
				}
			}
			.checkbox_ul {
				width: 100%;
				display: -webkit-flex;
				flex-direction: row;
				flex-wrap: wrap;
				.label {
					margin-right: 40rpx;
					margin-bottom: 20rpx;
					color: #999999;
					font-size: 26rpx;
					checkbox {
						transform: scale(0.77);
					}
				}
				.cor {
					color: #7F298E;
				}
			}
		}
	}
	.release {
		padding: 30rpx 0;
	}
}
</style>
