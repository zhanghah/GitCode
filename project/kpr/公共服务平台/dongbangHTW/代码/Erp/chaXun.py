import requests as re

def chaXun(a):
    url = 'https://pmdc.hklcn.com/adminhk.php/manager/edit.html?id=12'
    headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36',
    'Content-Type': 'text/html',
    }
    res = re.get(url,headers=headers)
    print(res.text)

chaXun(1)