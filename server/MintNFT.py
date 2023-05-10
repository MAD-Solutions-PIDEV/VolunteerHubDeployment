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
from selenium.webdriver.support import expected_conditions as EC

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
    all_windows = driver.window_handles
    meta_mask_window = None
    for window in all_windows:
        if window != current_window:
            driver.switch_to.window(window)
    driver.switch_to.window(window)

def firstForm():
    print("Create new acount...")
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
    print("Enter secret keys :)")
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
    print("Login Rarible...")
    driver.get("https://rarible.com/create/erc-721")
    time.sleep(15)
    print(driver.title)
    checksignin= driver.find_element(
        By.XPATH,
        '//*[@id="root"]/div/div[2]/div[2]/div[1]/div/div/div[2]/div/div[1]/div/div/div/div[2]/div/div/div/div/button[1]')  
    if checksignin:
        driver.find_element(By.XPATH, '//*[@id="root"]/div/div[2]/div[2]/div[1]/div/div/div[2]/div/div[1]/div/div/div/div[2]/div/div/div/div/button[1]').click()    
    else:
        loginOpenSea()
        print("Login Rarible: Problem locating connect button ")
    time.sleep(20)
    
    driver.switch_to.window(driver.window_handles[-1])
    print("Login Rarible: Connect with MetaMask ")
    driver.find_element(By.XPATH,
                        '//*[@id="app-content"]/div/div[2]/div/div[3]/div[2]/button[2]').click()
    time.sleep(4)
    driver.find_element(By.XPATH,
                        '// *[ @ id = "app-content"] / div / div[2] / div / div[2] / div[2] / div[2] / footer / button[2]').click()
    time.sleep(6)
    print("Login Rarible: Sign with MetaMask ")
    signVerif = driver.switch_to.window(driver.window_handles[-1])
    print(signVerif)
    if signVerif:
        print("Login Rarible: sign1:")
        driver.switch_to.window(driver.window_handles[-1])
    else:
        print("Login Rarible: sign2")
        driver.switch_to.window(driver.window_handles[-1])
        print("Login Rarible: sign3")
        time.sleep(40)
    # driver.find_element(By.XPATH, '//*[@id="app-content"]/div/div[2]/div/div[4]/footer/button[2]').click()
    print("Login Rarible: Sign Approved!")
    time.sleep(10)
    signVerif = driver.switch_to.window(driver.window_handles[-1])
    print(signVerif)
    if signVerif:
        driver.switch_to.window(driver.window_handles[-1])
    else:
        driver.switch_to.window(driver.window_handles[-1])
    driver.find_element(By.XPATH,
                        '//*[@id="app-content"]/div/div[2]/div/div[4]/footer/button[2]').click()
    time.sleep(2)
    print("Login Rarible: Connected!")

def createNFT(username):
    print("Create NFT: Load inputs!")
    time.sleep(10)
    file_path = os.path.abspath(os.path.join(
        os.path.dirname(__file__), 'uploads', 'nft', 'image.jpg'))
    amount = "0.01"
    name = "Special NFT for our member ", username
    description = "On behalf of the Volunteer Hub team,\n I would like to congratulate ", username, " you on being selected as the winner of our recent NFT.\n Your enthusiasm and dedication to volunteering have been inspiring, and we are thrilled to have you as a part of our community.\nYour participation in Volunteer Hub has not only helped us achieve our mission of connecting volunteers with meaningful opportunities, but it has also made a positive impact on the lives of those in need.\n We hope that your experience with Volunteer Hub has been fulfilling and that you continue to find opportunities that are meaningful to you.\nWe also invite you to share your experience with others and encourage them to join Volunteer Hub.\n By doing so, you can help us create a stronger community of volunteers and make an even greater impact on the world around us.\nVisit us on : https://volunteerhub-eo7t.onrender.com/"
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
    time.sleep(4)
    driver.find_element(By.XPATH,
                        '//*[@id="root"]/div/div[2]/div[2]/div[1]/div/div/div/div/div/div[2]/div/div[1]/div[9]/div[2]/div/div/input').send_keys(
        name)
    time.sleep(2)
    driver.find_element(By.XPATH,
                        '//*[@id="root"]/div/div[2]/div[2]/div[1]/div/div/div/div/div/div[2]/div/div[1]/div[10]/div[2]/div/div/textarea').send_keys(
        description)
    print(driver.page_source)
    button = driver.find_element(By.XPATH, '//*[@ id="root"]/div/div/div[2]/div[1]/div/div/div/div/div/div[2]/div[1]/div[2]/div/div/button')
    print("Create NFT: Submit attempt!")
    driver.execute_script("arguments[0].click();", button)
    time.sleep(4)
    print("Create NFT: Form Submitted!")

def confirmMinting():
    print("Confirm Minting NFT: Form Submitted!")
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


def goProfile(url, image_url):
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
    print("VolunteerHub NFT: Assign NFT to User ")
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