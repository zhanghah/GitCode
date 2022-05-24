# -*- coding:utf-8 -*-


import pytest
import os
import shutil

if __name__ == '__main__':
    # 删除结果目录，重置结果
    shutil.rmtree(r'.\allure_results')
    # 执行测试用例获得测试数据
    pytest.main(['-s', r'.\test_case', '--alluredir', r'.\allure_results'])
    # 找到测试数据，生成测试报告
    os.system(r'allure generate .\allure_results -o .\allure_report --clean')