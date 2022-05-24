# -*- coding:utf-8 -*-
from time import sleep

import pytest
from selenium import webdriver

from utils.yaml_tool import YamlTools
from page_object.login_page import LoginPage


@pytest.mark.flaky(reruns=5, reruns_delay=1)
class TestLogin:
    def setup_class(self):
        print('类开始')
        self.driver = webdriver.Chrome()

    def teardown_class(self):
        print('类结束')
        self.driver.quit()
        # pass

    @pytest.mark.parametrize('logininfo', YamlTools('data/login_info.yaml').read_yaml())
    def test_01_login(self, logininfo):
        print('开始执行测试用例01')
        username = logininfo['username']
        password = logininfo['password']

        lp = LoginPage(self.driver)
        text = lp.login(username, password)
        assert text == lp.title

    def test_02_text(self):
        print('开始执行测试用例02')
        assert 2 == 2

    def test_03_text(self):
        print('开始执行测试用例03')
        assert 2 == 3

    def test_04_text(self):
        print('开始执行测试用例04')
        assert 2 == 2