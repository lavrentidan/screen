from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
import time
import json
import os
# ? Is there a way to pip install all the dependancies from within the program?

chrome_options = Options()
options = Options()
chrome_options.add_argument("--headless") 
chrome_options.add_argument("--window-size=1920,1080")
chrome_options.add_argument("--disable-notifications")
chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
chrome_options.add_experimental_option('useAutomationExtension', False)
chrome_options.add_argument('--disable-gpu')

def BT_scraper(user, passw, download_path):
    driver = webdriver.Chrome(ChromeDriverManager().install(), options=chrome_options)
    params = {'behavior': 'allow', 'downloadPath': download_path}

    print ("Headless Chrome Initialized")

    driver.execute_cdp_cmd('Page.setDownloadBehavior', params)

    driver.get("https://buildertrend.net")

    print ('logging into buildertrend')

    user_field = driver.find_element_by_name('ctl00$ctl00$ctl00$MasterMain$MasterMain$MasterMain$txtUserID$Textbox1')
    pass_field = driver.find_element_by_name('ctl00$ctl00$ctl00$MasterMain$MasterMain$MasterMain$txtPassword$Textbox1')
    login_btn = driver.find_element_by_xpath('//*[@id="ctl00_ctl00_ctl00_MasterMain_MasterMain_bootstrapWrapperCol"]/div[2]/div/div/div[2]/div[1]/div[1]/div[7]/button')

    user_field.send_keys(user)
    pass_field.send_keys(passw)
    login_btn.click()

    print('Logged in')

    try:
        element = WebDriverWait(driver, 10, poll_frequency=0.1).until( # Poll frequency may be subject to change depending on if it affects performance on a larger scale
            EC.presence_of_element_located((By.XPATH, '//*[@id="reactMainNavigation"]/div/ul/li[4]/div'))
        )
    except (Exception):
        print("Can't find home_dropdown, goodbye")
        driver.quit()

    home_dropdown = driver.find_element_by_xpath('//*[@id="reactMainNavigation"]/div[1]/ul/li[12]')
    jobs_list_btn = driver.find_element_by_xpath('//*[@id="job$Menu"]/li[3]/div/div/div/div')

    home_dropdown.click()
    time.sleep(.5)
    jobs_list_btn.click()

    print('Made it to jobs list')
    time.sleep(1)
    # TODO: Test with diffrent network speeds
    # try:
    #     element = WebDriverWait(driver, 10, poll_frequency=1).until( # Poll frequency may be subject to change depending on if it affects performance on a larger scale
    #         EC.presence_of_element_located((By.XPATH, '//*[@id="ifrdivBasePopupWithIFrame"]'))
    #     )
    # except (Exception):
    #     print("Can't find IFrame, goodbye")
    #     driver.quit()

    # jobs_list_iframe = driver.find_element_by_xpath('//*[@id="ifrdivBasePopupWithIFrame"]')
    # driver.switch_to.frame(jobs_list_iframe)

    try:
        element = WebDriverWait(driver, 10, poll_frequency=0.1).until( # Poll frequency may be subject to change depending on if it affects performance on a larger scale
            EC.presence_of_element_located((By.XPATH, '//*[@id="reactJobsListDiv"]/div/section/div[2]/div/div[3]/div[1]/div[2]/div[2]/div[2]/button[1]'))
        )
    except (Exception):
        print("Can't find Excel button, goodbye")
        driver.quit()

    export_to_excel_btn = driver.find_element_by_xpath('//*[@id="reactJobsListDiv"]/div/section/div[2]/div/div[3]/div[1]/div[2]/div[2]/div[2]/button[1]')
    export_to_excel_btn.click()

    print('Got it!')
    time.sleep(2) # TODO: make this wait until the file is downloaded instead of an arbitrary 2 seconds
    driver.quit()

    # TODO: Need to make a directory structure


def progress_scraper(user, passw, download_path):
    driver = webdriver.Chrome(ChromeDriverManager().install(), options=chrome_options)
    params = {'behavior': 'allow', 'downloadPath': download_path}

    print ("Headless Chrome Initialized")

    driver.execute_cdp_cmd('Page.setDownloadBehavior', params)

    driver.get("https://buildertrend.net")

    print ('logging into buildertrend')

    user_field = driver.find_element_by_name('ctl00$ctl00$ctl00$MasterMain$MasterMain$MasterMain$txtUserID$Textbox1')
    pass_field = driver.find_element_by_name('ctl00$ctl00$ctl00$MasterMain$MasterMain$MasterMain$txtPassword$Textbox1')
    login_btn = driver.find_element_by_xpath('//*[@id="ctl00_ctl00_ctl00_MasterMain_MasterMain_bootstrapWrapperCol"]/div[2]/div/div/div[2]/div[1]/div[1]/div[7]/button')

    user_field.send_keys(user)
    pass_field.send_keys(passw)
    login_btn.click()

    print('Logged in')

    # try:
    #     element = WebDriverWait(driver, 10, poll_frequency=0.1).until( # Poll frequency may be subject to change depending on if it affects performance on a larger scale
    #         EC.presence_of_element_located((By.XPATH, '//*[@id="reactMainNavigation"]/div[1]/ul/li[22]/div/div[1]/div'))
    #     )
    # except (Exception):
    #     print("Can't find reports button, goodbye")
    #     driver.quit()

    # reports_button = driver.find_element_by_xpath('//*[@id="reactMainNavigation"]/div[1]/ul/li[22]/div/div[1]/div')

    # reports_button.click()

    # try:
    #     element = WebDriverWait(driver, 10, poll_frequency=0.1).until( # Poll frequency may be subject to change depending on if it affects performance on a larger scale
    #         EC.presence_of_element_located((By.XPATH, '//*[@id="reportList"]/div[2]/div/div[3]/div[2]/div[1]/a/div[1]'))
    #     )
    # except (Exception):
    #     print("Can't find schedule report button, goodbye")
    #     driver.quit()

    # schedule_report_button = driver.find_element_by_xpath('//*[@id="reportList"]/div[2]/div/div[3]/div[2]/div[1]/a/div[1]')

    # schedule_report_button.click()

    # time.sleep(3)

    # try:
    #     element = WebDriverWait(driver, 10, poll_frequency=0.1).until( # Poll frequency may be subject to change depending on if it affects performance on a larger scale
    #         EC.presence_of_element_located((By.XPATH, '//*[@id="ui-id-27"]'))
    #     )
    # except (Exception):
    #     print("Can't find graph, goodbye")
    #     driver.quit()
    
    # print('found wrapper')

    # graph_list = driver.find_element_by_xpath('//*[@id="ui-id-27"]')
    # items = graph_list.find_elements_by_tag_name('rect')
    # item_names = graph_list.find_elements_by_tag_name('tspan')
    # counter = 0


    # for item in items:
    #     item_class = item.get_attribute('class')
    #     item_value = item.get_attribute('height')
    #     if item_class == 'highcharts-point':
    #         print('Found rect: ' + item_class + " Value: " + item_value)
    #         counter = counter + 1

    # for te in item_names:
    #     item_name = te.get_attribute('textContent')
    #     print (item_name)


    # print(counter)

    # elem = driver.find_element_by_tag_name('body')

    # def open_tab():
    #     elem.send_keys(Keys.CONTROL + 't')

    # def close_tab():
    #     elem.send_keys(Keys.CONTROL + 'w')

    # def download_page():
    #     elem.send_keys(Keys.CONTROL + 's' + Keys.RETURN)
    
    time.sleep(3)
    driver.find_element_by_tag_name('body').send_keys(Keys.CONTROL + 't')
    driver.get(r"https://buildertrend.net/api/Reporting/Details?reportType=8&filterType=112&filterString={%220%22:%22{\%22SelectedValue\%22:2147483647,\%22StartDate\%22:null,\%22EndDate\%22:null}%22,%221%22:1,%222%22:%22-1,75994,92311,92308,106525,137022,137027,89302,89301,100428,89787,75463,75989,86636,94065,89299,95293,94119,75783,151692,89939,91448,76549,91423,91468,75139,79318,129915,130948,139787,139744,89670,91547,74406,142306,75703,82478,77042,79099,75075,131004,76998,89674,91561,75732,148128,122839,99235,103533,128521,125069,74060,131239,134056,110102,93910,74493,145024,115028,114616,78967,131447,86654,82474,139751,131231,82481,82227,110109,76831,104727,132704,79732,154881,74059,110671,82476,74058,155872,155005,131010,98155,86395,94444,123457,74982,80925,78610,132701,162177,76830%22,%223%22:%22%22,%224%22:%22%22}&_=1617236165954")
    time.sleep(3)
    # driver.find_element_by_tag_name('body').send_keys(Keys.CONTROL + 's')
    # time.sleep(3)
    # driver.find_element_by_tag_name('body').send_keys(Keys.CONTROL + 'w')

    time.sleep(2)

    pre = driver.find_element_by_tag_name("pre").text
    data = json.loads(pre)
    print(data)

    with open(os.path.join(download_path, 'progress.json'), 'w') as json_file:
        json.dump(data, json_file)

    driver.quit()



