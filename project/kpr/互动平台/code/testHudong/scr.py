from testHudong.updateStatus import requestMethod
from testHudong.getSign import getSign
import json

class login():
    requestMethod = requestMethod()

    def __init__(self):
        self.test_001_getLogin()

    def test_001_getLogin(self):
        """登录"""
        url = '/back/login'
        data = {
            'userName':'18888888888',
            'userPwd': '654321'
        }
        r = self.requestMethod.post(url,data)
        self.g['token'] = r['data']['token']
        print(r)


login().test_001_getLogin()