# -*- coding:utf-8 -*-
"""
    登录页面元素以及操作
"""
from time import sleep

from selenium.webdriver.common.by import By
from selenium import webdriver

from base.base_page import BasePage
from utils.yaml_tool import YamlTools


class LoginPage(BasePage):
    # 核心元素
    url = 'http://139.186.141.69/admin/'

    username = (By.XPATH, '//*[@id="app"]/section/div/div/div/div[1]/div[2]/input')
    password = (By.XPATH, '//*[@id="app"]/section/div/div/div/div[2]/div[2]/input')
    login_button = (By.XPATH, '//*[@id="app"]/section/div/div/div/div[3]/div')
    text = (By.XPATH, '//*[@id="app"]/section/div[1]/header/h1/span')
    title = '雅琪朵内部业务管理系统'

    # 核心业务流
    def login(self, username, password):
        self.visit()
        # self.driver.get(self.url)
        self.input_(self.username, username)
        self.input_(self.password, password)
        self.click(self.login_button)
        sleep(10)
        return self.get_text(self.text)


# if __name__ == '__main__':
#     driver = webdriver.Chrome()
#     username = '18166484258'
#     password = '123456'
#
#     LP = LoginPage(driver)
#     LP.login(username, password)
