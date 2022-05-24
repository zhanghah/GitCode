import requests

class getID:
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
        
    
    def getloudongid(self):
        # 获取楼栋信息
        data = {}
        url1 = 'http://community.kupurui.cn/gatewayApi/propertyManageApi/building/getPage?current=1&size=1000&comId={}&propertyId={}&status=0&t=1646794517591&platform=pc'.format('61f4e25cd9e949e6904dc4e3b4eeaa69','c9ca4ff351ed471ab50e01736d1bab93')
        res1 = requests.post(url1, headers=self.headers())
        loudongtxt = res1.json()['data']['records']
        a = 1
       
        # 获取楼栋下单元信息
        for i in loudongtxt:
            if i['buildingNumber'] > 20:
                    
                url2 = 'http://community.kupurui.cn/gatewayApi/propertyManageApi/unit/getPage?current=1&size=1000&buildingId={}&propertyId=c9ca4ff351ed471ab50e01736d1bab93&status=0&t=1622080884031&platform=pc'.format(i['id'])
                res2 = requests.post(url2, headers=self.headers())
                unittxt = res2.json()['data']['records']
                # 获取单元下楼层信息
                for j in unittxt:
                    url3 = 'http://community.kupurui.cn/gatewayApi/propertyManageApi/floor/getPage?current=1&size=1000&unitId={}&propertyId=c9ca4ff351ed471ab50e01736d1bab93&status=0&t=1622080881758&platform=pc'.format(j['id'])
                    res3 = requests.post(url3, headers=self.headers())
                    floortxt = res3.json()['data']['records']
                    # 获取楼层下房屋信息
                    for k in floortxt:
                        url4 = 'http://community.kupurui.cn/gatewayApi/propertyManageApi/room/getPage?current=1&size=1000&floorId={}&propertyId=c9ca4ff351ed471ab50e01736d1bab93&status=0&t=1622080616573&platform=pc'.format(k['id'])
                        res4 = requests.post(url4, headers=self.headers())
                        roomtxt = res4.json()['data']['records']
                        for l in roomtxt:
                            txt = '{}{}{}-{}'.format(i['name'],j['name'],k['name'],l['name'])
                            data[txt]=l['id']
                            # res5=self.addshineiji(l['id'])
                            # print('{}{}{}-{}'.format(i['name'],j['name'],k['name'],l['name']))
        return data
    
    
    def addshineiji(self,locationId):
        # 添加室内机
        url = 'http://community.kupurui.cn/gatewayApi/deviceApi/houseDevice/add?t=1622089436186&platform=pc'
        json = {
            "communityId":"61f4e25cd9e949e6904dc4e3b4eeaa69",
            "locationId":locationId
            }
        try:
            res = requests.post(url, json=json, headers=self.headers())
            if int(res.json()['status']) == 0:
                print(res.json()['msg'])
            else:
                print(res.json()['msg'],locationId)
        except:
            print(locationId)


            
    def selectTsnj(self,locationId):
        url = 'http://community.kupurui.cn/gatewayApi/deviceApi/houseDevice/getPage?current=1&size=10&propertyId=c9ca4ff351ed471ab50e01736d1bab93&localtionId={}&t=1647229627749&platform=pc'.format(locationId)
        res = requests.get(url=url,headers=self.headers())
        return res

#getID().addshineiji('6741ed28452e4f1c9a6fd7bd856ea170')
# getID().getloudongid()

data = getID().getloudongid()
for i in data.items():
    res = getID().selectTsnj(i[1])
    if res.json()['data']['total'] != 1:
        print('不匹配   {} {}'.format(i[0],res.json()['msg']))
    # elif res.json()['data']['total'] == 1:
    #     print('匹配   {} {}'.format(i[0],res.json()['msg']))
    # elif res.json()['status'] != 0:
    #     print('接口异常   {} {}'.format(i[0],res.json()['msg']))
    # else:
    #     print('正常   {} {}'.format(i[0],res.json()['msg']))

