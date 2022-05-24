import requests,json
import hashlib
from testHudong.getSign import getSign


__TOKEN__ = ''

class requestMethod():

    host = 'https://testmomp.hklcn.com'
    getSign = getSign()

    def __init__(self):
        global __TOKEN__
        self.token = __TOKEN__
        # print("缓存{}".format(self.token))
        if len(self.token) < 1:
            self.token = self.getAuthorization()
            __TOKEN__ = self.token

    def getHeaders(self):
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36",
            "Accept": "application/json, text/plain, */*",
            "Authorization": self.token,
            "Content-Type": "application/json;charset=UTF-8",
            # "comId": "fee1918726b94817bad646aad1d285b2",
            # "Host": "property.kupurui.cn",
            "employeeId": "admin",
            "propertyId": "0"
        }
        return headers

    def post(self,url,data):

        data['platform'] = 'android'  # 写入常量传参
        data['randstr'] = 'BaMfDc'

        sign = self.getSign.Sign(data)         #写入签名
        data['sign'] = sign

        print("请求地址：{}{}".format(self.host, url))
        for data_data, value in data.items():
            print("请求参数：%s : %s" % (data_data, value))

        r = requests.post(
            url=self.host + url,
            data=data,
            # headers=self.getHeaders()
        )

        self.totalSeconds = r.elapsed.total_seconds()  # 获取接口响应时间
        self.resultCode = r.status_code
        if self.resultCode == 200:
            print('接口请求成功，接口状态码：{}，接口响应时长：{}'.format(self.resultCode,self.totalSeconds))

            status = r.json()['status']
            info = r.json()['info']
            if status == "YES":
                print('接口数据返回正常，status：{}，info：{}'.format(status, info))
            else:
                print('接口数据返回异常，status：{}，info：{}，{}'.format(status, info, r.json()))

            return r.json()
        else:
            print('接口请求失败，接口状态码：{}'.format(self.resultCode))
            print(r.text)


    def get(self,url,params):

        params['platform'] = 'android'  # 写入常量传参
        params['randstr'] = 'BaMfDc'

        sign = self.getSign.Sign(params)  # 写入签名
        params['sign'] = sign

        print("请求地址：{}{}".format(self.host, url))
        for data_data, value in params.items():
            print("请求参数：%s : %s" % (data_data, value))

        # sign = self.getSign.Sign(data)
        # data['sign'] = sign

        r = requests.get(
            url=self.host + url,
            params=params,
            # headers=self.getHeaders()
        )

        self.totalSeconds = r.elapsed.total_seconds()  # 获取接口响应时间
        self.resultCode = r.status_code
        if self.resultCode == 200:
            print('接口请求成功，接口状态码：{}，接口响应时长：{}'.format(self.resultCode,self.totalSeconds))

            status = r.json()['status']
            info = r.json()['info']
            if status == "YES":
                print('接口数据返回正常，status：{}，info：{}'.format(status, info))
            else:
                print('接口数据返回异常，status：{}，info：{}，{}'.format(status, info, r.json()))

            return r.json()

        else:
            print('接口请求失败，接口状态码：{}'.format(self.resultCode))
            print(r.text)

    def getAuthorization(self):
        url = 'https://property.kupurui.cn/gatewayApi/propertyManageApi/public/login'
        params = {
            'phone': 'admin',
            'pwd': '96e79218965eb72c92a549dd5a330112',
            't': 1609810528173,
            'platform': 'pc'
        }
        r = requests.get(url, params)
        r = r.json()
        self.token = r['data'][0]['employee']['id']
        return self.token