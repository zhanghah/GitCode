import requests
from requests.api import head, post

def addBuilding():
    headers = {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Authorization": "admin",
        "Cache-Control": "no-cache",
        "comId": "22",
        "Content-Length": "2",
        "Content-Type": "application/json;charset=UTF-8",
        "Cookie": "_ga=GA1.2.1735080188.1624328186",
        "employeeId": "admin",
        "Host": "community.kupurui.cn",
        "Origin": "http://community.kupurui.cn",
        "Pragma": "no-cache",
        "propertyId": "1",
        "Proxy-Connection": "keep-alive",
        "Referer": "http://community.kupurui.cn/admin/owner/room/unit/9b77b648c3af4a4cb023658737b932f2",
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36"
        }

    for i in range(1,44):
        # 根据楼层数添加楼层
        url = 'http://community.kupurui.cn/gatewayApi/propertyManageApi/floor/add?t=1628148769764&platform=pc'
        data = {
            "entity":{
            "comId":"22",
            "buildingId":"4c5a98a681b64a82b0128129800823d1",
            "unitId":"1da51b14189e436d879d8f3d1fea5956",
            "name":i,
            "floorNumber":i,
            "roomNumber":"10"
            },
        "createBy":"admin"
        }
        res = requests.post(url=url, json=data, headers=headers) 
        print(res.text,data["entity"]["floorNumber"])    

#  addBuilding()
def getheaders():
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
    return headers

def addHouse():
    headers = getheaders()
    # 获取楼栋ID
    url = 'http://community.kupurui.cn/gatewayApi/propertyManageApi/floor/getPage?current=1&size=100&unitId=1da51b14189e436d879d8f3d1fea5956&propertyId=1&status=0&t=1628154150768&platform=pc'
    data = {}
    res = requests.post(url=url, json=data, headers=headers)
    text = res.json()["data"]["records"]
    for i in text:
        for j in range(1,11):
            url1 = 'http://community.kupurui.cn/gatewayApi/propertyManageApi/room/add?t=1628155343156&platform=pc'
            data1 = {
                "entity":{
                    "comId":"22",
                    "buildingId":"4c5a98a681b64a82b0128129800823d1",
                    "unitId":"1da51b14189e436d879d8f3d1fea5956",
                    "floorId":i["id"],
                    "roomNumber":j,
                    "buildingArea":"0",
                    "insideArea":"0",
                    "feeArea":"0",
                    "businessType":"house",
                    "roomStatus":"free",
                    "proprietorName":"0",
                    "proprietorPhone":"0"
                    },
                    "createBy":"admin"
                }
            res1 = requests.post(url=url1, json=data1, headers=headers)
            print(res1.text)
    
        

addHouse()