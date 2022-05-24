"""
    读取yaml数据
"""
import json

import yaml
from string import Template
# from selenium import webdriver

class YamlTools:
    def __init__(self, path,):
        self.path = path
        # self.driver = webdriver.Chrome()

    def read_yaml(self):
        file = open(self.path, 'r', encoding='utf-8')
        data = yaml.load(file, yaml.FullLoader)
        return data




# if __name__ == '__main__':
#     path = '../data/login_info.yaml'
#     yt = YamlTools(path)
#     text = yt.update_cookies(123902390821)
#     print(text)
#     # yt.update_cookies(968987897)
