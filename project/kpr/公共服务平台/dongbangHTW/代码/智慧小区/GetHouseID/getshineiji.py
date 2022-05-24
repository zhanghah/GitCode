import requests

def getshineiji():
    url = 'http://community.kupurui.cn/gatewayApi/deviceApi/houseDevice/getPage?current=1&size=1600&propertyId=c9ca4ff351ed471ab50e01736d1bab93&t=1622090989016&platform=pc'
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
    res = requests.get(url, headers=headers)
    list = res.json()['data']['records']
    list.sort(key=lambda x:x['houseNumber'], reverse=False)
    a = 0
    for i in list:
        if int(i['houseNumber']) >= 21010101:
            print('{}'.format(i['houseNumber']))
            a += 1
    print(a)

getshineiji()