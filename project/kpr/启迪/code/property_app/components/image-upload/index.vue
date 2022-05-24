<template>
	<view class="image-upload" @tap="chooseImageHandler">
    <slot/>
    <ui-button v-if="!$slots.default">上传图片</ui-button>
	</view>
</template>

<script>
  import config from '../../config';

	export default {
    name: 'ImageUpload',
		components: {
    },
    props: {
      params: {
        type: Object,
        default() {
          return Object.create(null);
        },
      },
      target: {
        type: String,
        default: 'java',
      },
    },
		data() {
			return {
        state: 'waiting', // waiting  pending  error  done
        url: {
          java: `${config.apiRoot}/resourceApi/fileUpload/upload`,
          php: `${config.phpRoot}/index.php?s=/home/upload/image`,
        }
			}
    },
    computed: {
      name() {
        return this.target === 'php' ? 'iFile' : 'file';
      }
    },
    watch: {
      state(val) {
        this.$emit('stateChange', val);
      },
    },
		methods: {
      chooseImageHandler() {
        if (this.state === 'pending') {
          return;
        }

        if (!this.params.type) {
          this.$toast('未指定上传类型');
          return;
        }

        uni.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['camera ', 'album'],
          success: (chooseImageRes) => {
            const tempFilePaths = chooseImageRes.tempFilePaths;

            // TODO: 登录接口返回后, 这里需要对应替换
            this.params.wxapp_id = '10013';

            this.state = 'pending';
            uni.uploadFile({
              url: this.url[this.target],
              filePath: tempFilePaths[0],
              name: this.name,
              formData: this.params,
              header: {},
              success: (uploadFileRes) => {
                const res = JSON.parse(uploadFileRes.data);

                let err = '';
                if (this.target === 'php') {
                  if (res.code !== 200) {
                    err = res.msg
                  }
                } else if (this.target === 'java') {
                  if (res.status !== '0') {
                    err = res.msg;
                  }
                }

                if (!err) {
                  this.state = 'done';
                  this.$emit('success', res);
                } else {
                  this.state = 'error';
                  this.$toast(err);
                }
              },
              fail: () => {
                // 上传失败
                this.state = 'error';
                this.$toast('上传失败！');
              }
            });
          }
        });
      }
    },
	}
</script>

<style scoped>
  .image-upload {
  }
</style>
