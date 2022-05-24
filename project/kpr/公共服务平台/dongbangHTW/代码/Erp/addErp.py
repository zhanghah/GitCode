import requests


def getHeaders():
    headers = {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Connection': 'keep-alive',
        'Content-Length': '48',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': 'UM_distinctid=179ee9da07c1a9-042f96e050b35-113a6054-1aeaa0-179ee9da07d8ee; '
                  'Hm_lvt_fa50a38276f22660b610ce29e542cca4=1623225346; PHPSESSID=shridik8lupvc3goer5q3jskl1; '
                  'think_admin___forward__=%2Fadmin%2Fproject_distribution%2Findex.html',
        'DNT': '1',
        'Host': 'erp.kupurui.com',
        'Origin': 'http://erp.kupurui.com',
        'Referer': 'http://erp.kupurui.com/admin/project_distribution/add.html',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) '
                      'Chrome/90.0.4430.93 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
    }
    return headers


def demo(startTime, num):
    for y in range(1, num):

        submit_time = startTime - 1 + int(y)
        if submit_time < 10:
            submit_time = '0{}'.format(submit_time)

        url = 'http://erp.kupurui.com/admin/project_distribution/add.html'
        """
           198 长嘉汇
           226 画先生
           237 加州家
        """
        data = {

            'project_id': '198',
            'use_time': '1',
            'submit_time': '2021-05-{}'.format(submit_time),

        }
        print("请求地址：{}".format(url))
        for data_data, value in data.items():
            print("请求参数：%s : %s" % (data_data, value))

        # r = requests.post(url, data, headers=getHeaders())
        # print(r.text)


def outInput():
    startTime = 24
    num = 5
    demo(startTime, num + 1)


outInput()
