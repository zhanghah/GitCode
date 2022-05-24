import requests

def addHouse():
    headers = {
        'Host': 'community.kupurui.cn',
        'Proxy-Connection': 'keep-alive',
        'Content-Length': '2',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'Accept': 'application/json, text/plain, */*',
        'comId': '22',
        'employeeId': 'admin',
        'Authorization': 'admin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
        'propertyId': '1',
        'Content-Type': 'application/json;charset=UTF-8',
        'Origin': 'http://community.kupurui.cn',
        'Referer': 'http://community.kupurui.cn/admin/owner/room/floor/1da51b14189e436d879d8f3d1fea5956',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cookie': '_ga=GA1.2.1735080188.1624328186'
    }
    # 删除房屋
    url = 'http://community.kupurui.cn/gatewayApi/propertyManageApi/floor/getPage?current=1&size=100&unitId=1da51b14189e436d879d8f3d1fea5956&propertyId=1&status=0&t=1628154150768&platform=pc'
    data = {}
    # 获取楼层ID
    res = requests.post(url=url, json=data, headers=headers)
    text = res.json()["data"]["records"]
    a = 1
    for i in text:
        url1 = 'http://community.kupurui.cn/gatewayApi/propertyManageApi/room/getPage?current=1&size=1000&floorId={}&propertyId=1&status=0&t=1628156958510&platform=pc'.format(i["id"])
        # 获取房屋ID
        res1 = requests.post(url=url1, json=data, headers=headers)
        text1 = res1.json()["data"]["records"]
        for j in text1:
            url3 = 'http://community.kupurui.cn/gatewayApi/propertyManageApi/room/delete?t=1628157134136&platform=pc'
            data1 = {"ids":[j["id"]]}
            res3 = requests.post(url=url3, json=data1, headers=headers)
            print(res3.text,a)
            a += 1
        

addHouse()