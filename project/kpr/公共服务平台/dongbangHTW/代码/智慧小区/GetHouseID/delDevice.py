import requests

url = 'http://community.kupurui.cn/gatewayApi/deviceApi/houseDevice/delete?t=1646806105450&platform=pc'
devicesId = [199813,199812,199811,199810,199809,199808,199807,199806,199805,199804,199803,199802,199801,199800,199799,199798,199797,199796,199795,199794]
headers = {
    'Host':'community.kupurui.cn',
    'Proxy-Connection':'keep-alive',
    'Content-Length':'16',
    'Accept':'application/json, text/plain, */*',
    'comId':'61f4e25cd9e949e6904dc4e3b4eeaa69',
    'employeeId':'67b09623f16b415eb47d346ad07f1333',
    'Authorization':'78e976f332004aeb97b18184f2d32074',
    'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
    'propertyId':'c9ca4ff351ed471ab50e01736d1bab93',
    'Content-Type':'application/json;charset=UTF-8',
    'Origin':'http://community.kupurui.cn',
    'Referer':'http://community.kupurui.cn/admin/current/indoor/list',
    'Accept-Encoding':'gzip, deflate',
    'Accept-Language':'zh-CN,zh;q=0.9'
}

a = 0
for id in devicesId:
    # 循环id并调用接口
    data = {"ids":[int(id)]}
    try:
        res = requests.post(url=url, json=data, headers=headers)
        if int(res.json()['status']) != 0:
            print('失败---',res.json(),id)
        else:
            print('成功---',res.json())
    except Exception as e:
        print(id)
    a += 1
print(a)
