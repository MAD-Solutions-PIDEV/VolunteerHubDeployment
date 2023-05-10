import time
import os
from pymongo import MongoClient
from selenium import webdriver
from selenium.webdriver.common.by import By
from dotenv import load_dotenv
import sys
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait


# Author Aymen Laroussi

# connect to MongoDB database
client = MongoClient('mongodb://localhost:27017/')
db = client['VolunteerHub']
collection = db['users']
# Load environment variables from .env file
load_dotenv()
# Create some feature to the web browser  like {extention,}
options = webdriver.ChromeOptions()
options.add_extension('MetaMask.crx')
options.add_argument("--headless=new")
options.add_argument(
    '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
    'Chrome/58.0.3029.110 Safari/537.36')
driver = webdriver.Chrome(service=Service(
    ChromeDriverManager().install()), options=options)

time.sleep(5)


def checkInterface():
    time.sleep(5)
    if driver.current_url == "chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#onboarding/import-with" \
                             "-recovery-phrase":
        buttonCheck = driver.find_element(By.XPATH,
                                          '//*[@id="app-content"]/div/div[2]/div/div/div/div[4]/div/button').text
        onlyPassword()
        time.sleep(5)
        print(buttonCheck)
        if buttonCheck == "Confirm Secret Recovery Phrase" or buttonCheck =="Confirmer la phrase secrète de récupération":
            print("true")
            firstForm()
        else:
            secondForm()
            print("false")

        driver.find_element(
            By.XPATH, '// *[ @ id = "app-content"] / div / div[1] / div / div[2] / button').click()
        driver.find_element(
            By.XPATH, '// *[ @ id = "app-content"] / div / div[3] / button[2]').click()
        time.sleep(4)
        driver.find_element(
            By.XPATH, '// *[ @ id = "private-key-box"]').send_keys(os.environ['SECRETKEY'])
        driver.find_element(By.XPATH,
                            '// *[ @ id = "app-content"] / div / div[3] / div / div[2] / div[2] / button[2]').click()
        time.sleep(3)
        print(driver.current_url)


def switchWindow(name):
    current_window = driver.current_window_handle

    WebDriverWait(driver, 10).until(lambda d: len(d.window_handles) > 1)

    # Get a list of all window handles
    all_windows = driver.window_handles

    # Find the MetaMask popup window by its handle
    meta_mask_window = None
    for window in all_windows:
        if window != current_window:
            driver.switch_to.window(window)
            print("te", driver.title)

    # Switch to the MetaMask popup window
    driver.switch_to.window(window)


def firstForm():
    driver.find_element(By.XPATH,
                        '//*[@id="app-content"]/div/div[2]/div/div/div/div[2]/form/div[1]/label/input').send_keys(
        os.environ['NEWPASSWORD'])
    driver.find_element(By.XPATH,
                        '//*[@id="app-content"]/div/div[2]/div/div/div/div[2]/form/div[2]/label/input').send_keys(
        os.environ['NEWPASSWORD'])
    driver.find_element(By.XPATH,
                        '//*[@id="app-content"]/div/div[2]/div/div/div/div[2]/form/div[3]/label/input').click()
    driver.find_element(By.XPATH,
                        '//*[@id="app-content"]/div/div[2]/div/div/div/div[2]/form/button').click()
    time.sleep(3)
    driver.find_element(By.XPATH,
                        '//*[@id="app-content"]/div/div[2]/div/div/div/div[5]/button[1]').click()
    time.sleep(2)
    driver.find_element(By.XPATH,
                        '//*[@id="popover-content"]/div/div/section/div[1]/div/div/label/input').click()
    time.sleep(2)
    driver.find_element(By.XPATH,
                        '//*[@id="popover-content"]/div/div/section/div[2]/div/button[2]').click()
    time.sleep(2)
    driver.find_element(By.XPATH,
                        '//*[@id="app-content"]/div/div[2]/div/div/div/div[2]/button').click()
    time.sleep(2)
    driver.find_element(By.XPATH,
                        '//*[@id="app-content"]/div/div[2]/div/div/div/div[2]/button').click()
    time.sleep(2)
    driver.find_element(By.XPATH,
                        '//*[@id="app-content"]/div/div[2]/div/div/div/div[2]/button').click()
    time.sleep(4)
    driver.find_element(By.XPATH,
                        '//*[@id="popover-content"]/div/div/section/div[2]/div/button').click()

    time.sleep(4)


def onlyPassword():
    time.sleep(5)
    print(os.environ['PHRASE0'])
    driver.find_element(
        By.XPATH, '// *[ @ id = "import-srp__srp-word-0"]').send_keys(os.environ['PHRASE0'])
    driver.find_element(
        By.XPATH, '// *[ @ id = "import-srp__srp-word-1"]').send_keys(os.environ['PHRASE1'])
    driver.find_element(
        By.XPATH, '// *[ @ id = "import-srp__srp-word-2"]').send_keys(os.environ['PHRASE2'])
    driver.find_element(
        By.XPATH, '// *[ @ id = "import-srp__srp-word-3"]').send_keys(os.environ['PHRASE3'])
    driver.find_element(
        By.XPATH, '// *[ @ id = "import-srp__srp-word-4"]').send_keys(os.environ['PHRASE4'])
    driver.find_element(
        By.XPATH, '// *[ @ id = "import-srp__srp-word-5"]').send_keys(os.environ['PHRASE5'])
    driver.find_element(
        By.XPATH, '// *[ @ id = "import-srp__srp-word-6"]').send_keys(os.environ['PHRASE6'])
    driver.find_element(
        By.XPATH, '// *[ @ id = "import-srp__srp-word-7"]').send_keys(os.environ['PHRASE7'])
    driver.find_element(
        By.XPATH, '// *[ @ id = "import-srp__srp-word-8"]').send_keys(os.environ['PHRASE8'])
    driver.find_element(
        By.XPATH, '// *[ @ id = "import-srp__srp-word-9"]').send_keys(os.environ['PHRASE9'])
    driver.find_element(
        By.XPATH, '// *[ @ id = "import-srp__srp-word-10"]').send_keys(os.environ['PHRASE10'])
    driver.find_element(
        By.XPATH, '// *[ @ id = "import-srp__srp-word-11"]').send_keys(os.environ['PHRASE11'])
    driver.find_element(By.XPATH,
                        '// *[ @ id = "app-content"] / div / div[2] / div / div / div / div[4] / div / button').click()
    time.sleep(5)


def secondForm():
    time.sleep(15)
    if driver.current_url == "chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#unlock":
        driver.find_element(
            By.XPATH, '// *[ @ id = "password"]').send_keys(os.environ['NEWPASSWORD'])
        driver.find_element(
            By.XPATH, '// *[ @ id = "app-content"] / div / div[3] / div / div / button').click()
        time.sleep(15)
    else:
        driver.find_element(
            By.XPATH, '// *[ @ id = "import-srp__srp-word-0"]').send_keys(os.environ['PHRASE0'])
        driver.find_element(
            By.XPATH, '// *[ @ id = "import-srp__srp-word-1"]').send_keys(os.environ['PHRASE1'])
        driver.find_element(
            By.XPATH, '// *[ @ id = "import-srp__srp-word-2"]').send_keys(os.environ['PHRASE2'])
        driver.find_element(
            By.XPATH, '// *[ @ id = "import-srp__srp-word-3"]').send_keys(os.environ['PHRASE3'])
        driver.find_element(
            By.XPATH, '// *[ @ id = "import-srp__srp-word-4"]').send_keys(os.environ['PHRASE4'])
        driver.find_element(
            By.XPATH, '// *[ @ id = "import-srp__srp-word-5"]').send_keys(os.environ['PHRASE5'])
        driver.find_element(
            By.XPATH, '// *[ @ id = "import-srp__srp-word-6"]').send_keys(os.environ['PHRASE6'])
        driver.find_element(
            By.XPATH, '// *[ @ id = "import-srp__srp-word-7"]').send_keys(os.environ['PHRASE7'])
        driver.find_element(
            By.XPATH, '// *[ @ id = "import-srp__srp-word-8"]').send_keys(os.environ['PHRASE8'])
        driver.find_element(
            By.XPATH, '// *[ @ id = "import-srp__srp-word-9"]').send_keys(os.environ['PHRASE9'])
        driver.find_element(
            By.XPATH, '// *[ @ id = "import-srp__srp-word-10"]').send_keys(os.environ['PHRASE10'])
        driver.find_element(
            By.XPATH, '// *[ @ id = "import-srp__srp-word-11"]').send_keys(os.environ['PHRASE11'])

        driver.find_element(By.XPATH, '//*[@id="password"]').send_keys(
            os.environ['NEWPASSWORD'])
        driver.find_element(By.XPATH, '//*[@id="confirm-password"]').send_keys(
            os.environ['NEWPASSWORD'])
        driver.find_element(
            By.XPATH, '//*[@id="app-content"]/div/div[3]/div/div/div/form/button').click()
        time.sleep(5)


# Login to OpenSea platform
def loginOpenSea():
    time.sleep(5)
    driver.get("https://rarible.com/create/erc-721")
    time.sleep(10)
    driver.find_element(
        By.XPATH, '//*[@id="root"]/div/div[2]/div[2]/div[1]/div/div/div[2]/div/div[1]/div/div/div/div[2]/div/div/div/div/button[1]').click()
    time.sleep(20)
    driver.switch_to.window(driver.window_handles[-1])
    print("test2")
    driver.find_element(By.XPATH,
                        '//*[@id="app-content"]/div/div[2]/div/div[3]/div[2]/button[2]').click()
    time.sleep(4)
    print("test1")
    driver.find_element(By.XPATH,
                        '// *[ @ id = "app-content"] / div / div[2] / div / div[2] / div[2] / div[2] / footer / button[2]').click()
    time.sleep(16)
    print("test")
    signVerif = driver.switch_to.window(driver.window_handles[-1])
    print(signVerif)
    if signVerif:
        print("sign1:")
        driver.switch_to.window(driver.window_handles[-1])
    else:
        print("sign2")
        driver.switch_to.window(driver.window_handles[-1])
        print("sign3")
        time.sleep(40)

    # driver.find_element(By.XPATH, '//*[@id="app-content"]/div/div[2]/div/div[4]/footer/button[2]').click()

    print("Sign Approved!")
    time.sleep(10)
    signVerif = driver.switch_to.window(driver.window_handles[-1])
    print(signVerif)
    if signVerif:
        print("sign1:")
        driver.switch_to.window(driver.window_handles[-1])
    else:
        print("sign2")
        driver.switch_to.window(driver.window_handles[-1])
        print("sign3")
    driver.find_element(By.XPATH,
                        '//*[@id="app-content"]/div/div[2]/div/div[4]/footer/button[2]').click()
    time.sleep(2)


def createNFT(username):
    time.sleep(10)
    file_path = os.path.abspath(os.path.join(
        os.path.dirname(__file__), 'uploads', 'nft', 'image.jpg'))
    amount = "0.1"
    name = "Special NFT for our member ",username
    description = "On behalf of the Volunteer Hub team,\n I would like to congratulate ",username," you on being selected as the winner of our recent NFT.\n Your enthusiasm and dedication to volunteering have been inspiring, and we are thrilled to have you as a part of our community.\nYour participation in Volunteer Hub has not only helped us achieve our mission of connecting volunteers with meaningful opportunities, but it has also made a positive impact on the lives of those in need.\n We hope that your experience with Volunteer Hub has been fulfilling and that you continue to find opportunities that are meaningful to you.\nWe also invite you to share your experience with others and encourage them to join Volunteer Hub.\n By doing so, you can help us create a stronger community of volunteers and make an even greater impact on the world around us.\nVisit us on : https://volunteerhub.onrender.com/"
    driver.switch_to.window(driver.window_handles[0])
    driver.find_element(By.XPATH,
                        '//*[@id="root"]/div/div[2]/div[2]/div[1]/div/div/div/div/div/div[2]/div/div[1]/div[2]/div[2]/div/input').send_keys(
        file_path)
    time.sleep(5)
    time.sleep(40)
    amountVerif = driver.find_element(By.XPATH,
                                      '//*[@id="root"]/div/div[2]/div[2]/div[1]/div/div/div/div/div/div[2]/div/div[1]/div[5]/div[1]/div[1]/div[2]/div/div/div/div[1]/input').send_keys(
        amount)

    driver.find_element(By.XPATH,
                            '//*[@id="root"]/div/div[2]/div[2]/div[1]/div/div/div/div/div/div[2]/div/div[1]/div[5]/div[1]/div[1]/div[2]/div/div/div/div[1]/input').send_keys(
            amount)
    
    print("2")
    time.sleep(4)
    driver.find_element(By.XPATH,
                        '//*[@id="root"]/div/div[2]/div[2]/div[1]/div/div/div/div/div/div[2]/div/div[1]/div[9]/div[2]/div/div/input').send_keys(
        name)
    time.sleep(2)
    print("3")
    driver.find_element(By.XPATH,
                        '//*[@id="root"]/div/div[2]/div[2]/div[1]/div/div/div/div/div/div[2]/div/div[1]/div[10]/div[2]/div/div/textarea').send_keys(
        description)
    driver.find_element(By.XPATH,
                        '// *[ @ id = "root"] / div / div / div[2] / div[1] / div / div / div / div / div / div[2] / div[1] / div[2] / div / div / button').click()
    time.sleep(4)
    print("Form Submitted.")
    # driver.find_element(By.XPATH, '//*[@id="root"]/div/div[2]/div[2]/div[1]/div/div/div/div/div/div[2]/div/div[2]/div/div/button').click()


def confirmMinting():
    print("10")
    time.sleep(30)
    driver.switch_to.window(driver.window_handles[-1])
    # // *[ @ id = "app-content"] / div / div[2] / div / div[4] / div[1]
    driver.find_element(
        By.XPATH, '//*[@id="app-content"]/div/div[2]/div/div[4]/div[1]').click()
    print("20")
    time.sleep(10)
    driver.find_element(
        By.XPATH, '//*[@id="app-content"]/div/div[2]/div/div[5]/footer/button[2]').click()
    print("30")
    time.sleep(10)
    driver.switch_to.window(driver.window_handles[-1])
    driver.find_element(
        By.XPATH, '//*[@id="app-content"]/div/div[2]/div/div[4]/div[1]').click()
    print("40")
    time.sleep(10)
    driver.find_element(
        By.XPATH, '//*[@id="app-content"]/div/div[2]/div/div[5]/footer/button[2]').click()
    time.sleep(5)


def reLogin():
    time.sleep(10)
    driver.find_element(
        By.XPATH, '/html/body/div[3]/div/div/div/div[1]/div/div/div/div/div/button').click()
    time.sleep(4)
    driver.find_element(By.XPATH,
                        '// *[ @ id = "root"] / div / div[2] / div[2] / div[1] / div / div / div[2] / div / div[1] / div / div / div / div[2] / div / div / div / div / button[1]').click()
    time.sleep(4)
    print("login123")
    driver.switch_to.window(driver.window_handles[-1])
    print("login")
    time.sleep(4)
    driver.find_element(
        By.XPATH, '//*[@id="app-content"]/div/div[2]/div/div[4]/footer/button[2]').click()
    print("heqqqqre")
    time.sleep(2)
    driver.find_element(
        By.XPATH, '//*[@id="app-content"]/div/div[2]/div/div[4]/footer/button[2]').click()
    print("hersssssse")


def goProfile(url,image_url):
    driver.switch_to.window(driver.window_handles[0])
    driver.find_element(By.XPATH,
                        '/html/body/div[3]/div/div/div/div[1]/div/div/div/div/div/div/div[3]/a/button').click()
    time.sleep(10)
    url = driver.current_url
    img_elem = driver.find_element(By.XPATH,
                                   '//*[@id="root"]/div/div[2]/div[2]/div[1]/div/div/div/div/div/div[1]/div[1]/div[1]/div[2]/div/img')
    image_url = img_elem.get_attribute('src')
    return url, image_url


def appendUserNft(username, url, image_url):
    # find user by username
    user = collection.find_one({'username': username})
    if user:
        if 'nfts' not in user:
            user['nfts'] = []  # Initialize the 'nfts' field to an empty list
        nft = {
            'url': url,
            'image': image_url,
        }
        user['nfts'].append(nft)

        collection.update_one({'username': username}, {
                              '$set': {'nfts': user['nfts']}})
        return True
    else:
        return False


username = sys.argv[1]
print(username)
driver.switch_to.window(driver.window_handles[0])
url = ""
image_url = ""
driver.maximize_window()
driver.get("chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#onboarding/import-with-recovery-phrase")
time.sleep(5)
checkInterface()
loginOpenSea()
time.sleep(5)
createNFT(username)
confirmMinting()
url, image_url = goProfile(url, image_url)
time.sleep(12)

success = appendUserNft(username, url, image_url)
if success:
    print('NFT updated successfully!')
else:
    print('User not found or NFT not found.')
