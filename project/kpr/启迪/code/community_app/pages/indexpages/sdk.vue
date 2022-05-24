<template>
    <view style="padding: 50rpx;">
        <button type="primary" @click="testAsyncFunc">testAsyncFunc</button>
        <button type="primary" @click="testSyncFunc">testSyncFunc</button>
    </view>
</template>

<script>
    var testModule = uni.requireNativePlugin("DCTestUniPluginA-TestModule")
    export default {
        methods: {
            testAsyncFunc() {
                // 调用异步方法
                testModule.testAsyncFunc({
                        'name': 'uni-app',
                        'age': 1
                    },
                    (ret) => {
                        uni.showToast({
                            title:'调用异步方法 ' + ret,
                            icon: "none"
                        })
                    })
            },
            testSyncFunc() {
                // 调用同步方法
                var ret = testModule.testSyncFunc({
                    'name': 'uni-app',
                    'age': 1
                })

                uni.showToast({
                    title:'调用同步方法 ' + ret,
                    icon: "none"
                })
            }
        }
    }
</script>