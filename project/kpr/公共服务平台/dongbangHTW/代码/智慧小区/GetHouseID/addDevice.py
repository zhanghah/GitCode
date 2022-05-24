import requests

class addDevice:
    def headers(self):
        headers = {
                'employeeId':'67b09623f16b415eb47d346ad07f1333',
                'Authorization':'78e976f332004aeb97b18184f2d32074',
                'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
                'propertyId':'c9ca4ff351ed471ab50e01736d1bab93',
                'Content-Type':'application/json;charset=UTF-8',
                'Origin':'http://community.kupurui.cn',
                'Referer':'http://community.kupurui.cn/admin/owner/room/building/61f4e25cd9e949e6904dc4e3b4eeaa69',
                'Accept-Encoding':'gzip, deflate',
                'Accept-Language':'zh-CN,zh;q=0.9',
                'Cookie':'PHPSESSID=svgnc11tt0mlh4v5ncfj1f8eu9',
                'Connection':'keep-alive'
                }
        return headers
        
    
    def getuntiinfo(self):
        url1 = 'http://community.kupurui.cn/gatewayApi/propertyManageApi/building/getPage?current=1&size=1000&comId=61f4e25cd9e949e6904dc4e3b4eeaa69&propertyId=c9ca4ff351ed471ab50e01736d1bab93&status=0'
        res1 = requests.post(url1, headers=self.headers())
        loudongtxt = res1.json()['data']['records']
        num = 117
        for i in loudongtxt:
            # print(i['id'],i['buildingNumber'])
            url2 = 'http://community.kupurui.cn/gatewayApi/propertyManageApi/unit/getPage?current=1&size=1000&buildingId={}&propertyId=c9ca4ff351ed471ab50e01736d1bab93&status=0&t=1622080884031&platform=pc'.format(i['id'])
            res2 = requests.post(url2, headers=self.headers())
            unittxt = res2.json()['data']['records']
            for j in unittxt:
                text = "{}栋{}单元负一楼".format(i['buildingNumber'],j['unitNumber'])
                url3 = 'http://community.kupurui.cn/gatewayApi/deviceApi/accessControl/add?t=1627459521832&platform=pc'
                data = {
                    "area":"重庆市",
                    "buildingId":i['id'],
                    "unitId":j['id'],
                    "comId":"61f4e25cd9e949e6904dc4e3b4eeaa69",
                    "detailedAddress":text,
                    "equipmentName":text,
                    "equipmentNumber":'000{}'.format(num),
                    "manufacturer":"1",
                    "position":2,
                    "programId":"4cff1d4c57ff4f25be2bee0242e94f7a",
                    "ddtId":"37",
                    "status":"1",
                    "type":"1,3",
                    "propertyId":"c9ca4ff351ed471ab50e01736d1bab93",
                    "createBy":"6ba6a2582ee84093af71b901d836edd8"
                }
                res3 = requests.post(url3, json=data, headers=self.headers())
                num += 1
                print(res3.text,text)

    
addDevice().getuntiinfo()
