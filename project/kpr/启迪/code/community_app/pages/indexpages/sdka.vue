<template>
    <div>
        <div>{{res}}</div>
        <button type="primary" @click="uniCalcNum()">计算10+100=多少?</button>
        <button type="primary" @click="uniSleepCalcNum()">睡眠计算20+100=多少?</button>
        <!-- <ElitetycText ref="telText" tel="1814037xxxx" style="width:200;height:100" @onTel="onTel" ></ElitetycText> -->
        <button type="primary" @click="nativeCallUni()">调用原生，通过原生调用uniapp中的方法</button>
        <button type="primary" @click="clearText()">清除textview电话</button>
    </div>
</template>

<script>
    var testModule = uni.requireNativePlugin("MyModule")
    var _self
    export default {
        data() {
            return {
                title: 'Hello',
                res:"计算的值是:???"
            }
        },
        onLoad() {
            _self = this
        },
        methods: {
        
            uniCalcNum(){
                // 注意调用的方法名和原生中定义的方法名一致，
                //参数中获的为num1和num2，所以这里也传入这两个值
                testModule.calcNum({
                    num1:10,
                    num2:100
                },(res)=>{
                    _self.res = res.res
                    uni.showToast({
                        title:"计算的结果是"+res.res
                    })
                })
                
            },
            uniSleepCalcNum(){
                testModule.sleepCalcNum({
                    num1:20,
                    num2:100
                },(res)=>{
                    _self.res = res.res
                    uni.showToast({
                        title:"计算的结果是"+res.res
                    })
                })
            },
            
            
            nativeCallUni(){
                this.$refs.telText.showTel()
            },
            clearText(){
                this.$refs.telText.clearTel()
            },
            // 原生调用的方法
            onTel(e) {
                uni.showToast({
                    title:e.detail.tel,
                    icon:"none"
                })
            },
    
        }
    }
</script>

<style>

</style>