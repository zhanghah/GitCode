<template>
	<view class="post">
    <view class="title">热门帖子</view>
		<view class="box" @click="toCircle(source.id)">
			<view class="user">
				<view class="photo">
					<image :src="`${imageView}${source.publisherImage}`"></image>
				</view>

				<view class="info">
					<view class="name">{{source.publisherName}}</view>
					<view class="time">{{(source.createTime || source.updateTime) | date}}</view>
				</view>

				<view class="more"></view>
			</view>

			<view class="content">
				{{source.postContent}}
			</view>

			<view class="imgs" v-if="fileList.length > 0">
				<view class="img" v-for="(path, index) in fileList" :key="index">
					<image :src="`${imageView}${path}`"></image>
				</view>
			</view>

			<view class="footer">
				<view class="tags">
					<view class="tag">#{{source.labelName}}#</view>
				</view>
				<view class="option">
					<view class="item msg">{{source.commentsNumber}}</view>
					<!-- <view class="item zan">{{source.fabNum}}</view> -->
					<view :class="source.fabulousStatus?'item zanHover':'item zan'" @click.stop="addFabulous(source.id,1,source.fabulousStatus)">{{source.fabNum}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api';
	import { mapState } from 'vuex';

	export default {
    name: 'Post',
		components: {
		},
		props: {
			source: {
				type: Object,
				default() {
					return Object.create(null);
				},
			},
		},
		data() {
			return {
			}
		},
		computed: {
			...mapState(['user','imageView']),
			fileList() {
				if (this.source.fileList) {
					return this.source.fileList.map(file => file.filePath);
				}

				return [];
			},
		},
		onLoad() {
		},
		methods: {
			toCircle(id){
				console.log(id)
				uni.navigateTo({
				   url: `/pages/servicePages/circle/postXq?postId=${id}`,
				});
			},
			
			//点赞
			addFabulous(id, type,isDZ) {
				isDZ=!isDZ
				let canshu = {
					fabulousStatus: isDZ,
					infoId: id,
					type: type,
					userId: this.user.id
				}
				console.log(canshu)
				api.service.addFabulous(canshu).then(res => {
					if (res.status != '0') {
						return
					};
					console.log(res)
					this.source.fabulousStatus = res.data.fabulousStatus;
					if (res.data.fabulousStatus) {
						this.source.fabNum += 1
					} else {
						this.source.fabNum -= 1
					}
				}).catch(err => {
					console.log(err)
				})
			},
		}
	}
</script>

<style scoped lang="less">
	.title {
		color: #020204;
		font-size: 30rpx;
		margin: 23rpx 0;
		font-weight: bold;
	}
	.box {
		background: #FFFFFF;
		padding: 30rpx;
		border-radius: 16rpx;
	}

	.user {
		position: relative;
		display: flex;
		align-items: center;
		color: #7A7A7C;

		.photo {
			width: 80rpx;
			height: 80rpx;
			overflow: hidden;
			border-radius: 50%;
			background: #e7e7e7;
			margin-right: 20rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.name {
			font-size: 28rpx;
		}

		.time {
			font-size: 24rpx;
		}

		.more {
			width: 30rpx;
			height: 8rpx;
			position: absolute;
			top: 10rpx;
			right: 0;
			background: url(@/static/find/icon_more.png) no-repeat;
			background-size: 100% 100%;
		}
	}

	.content {
		font-size: 28rpx;
		color: #020204;
		padding: 25rpx 0;
	}

	.imgs {
		display: flex;
		height: 200rpx;
		flex-wrap: wrap;
		overflow: hidden;
		justify-content: space-between;
		margin-bottom: 30rpx;

		.img {
			width: 200rpx;
			height: 200rpx;
			background: rgba(0, 0, 0, 0.1);
			border-radius: 15rpx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.footer {
		display: flex;
		justify-content: space-between;
		.tags {
			display: flex;
			.tag {
				background: #FFF2DE;
				border-radius: 5px;
				color: #FB9200;
				font-size: 24rpx;
				padding: 0 10rpx;
				display: flex;
				align-items: center;
				margin-right: 10rpx;
			}
		}
		.option {
			color: #7A7A7C;
			font-size: 24rpx;
			display: flex;
			justify-content: space-between;

			.item {
				padding-left: 42rpx;
			}

			.msg {
				background: url(@/static/find/icon_msg.png) no-repeat left center;
				background-size: 30rpx 30rpx;
				margin-right: 30rpx;
			}

			.zan {
				background: url(@/static/find/icon_zan.png) no-repeat left center;
				background-size: 28rpx 28rpx;
			}
			.zanHover {
				background: url(@/static/find/zan_hover.png) no-repeat left center;
				background-size: 28rpx 28rpx;
			}
		}
	}
</style>
