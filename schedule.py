#!/usr/bin/env	python
# -*- config:utf-8 -*-

'''
    @author Verri Andriawan < verri@tiduronline.com >
    Created at Oct 3st, 2014
'''

from BeautifulSoup import BeautifulSoup
import urllib2
import re
from sys import exit
from os import path, remove
from hashlib import md5
from json import dumps
from datetime import datetime
from time import sleep


    
def check_time(clocks):
    gtime = datetime.now().strftime("%I:%M:%S")
    if str(gtime) in clocks:
        return True
    return False
    

def check_current_sche():
    content = False
    locked = False
    while not locked:
        request = urllib2.Request("http://forum.mercubuana-yogya.ac.id/jadwal-kampus-2/")
        request.add_header("User-Agent", "TiduronlineBot @ tiduronline.com")
        resp = urllib2.urlopen(request)
        
        with open('.hash', "r") as hashsum:
            old_hash = hashsum.read()

        content = resp.fp._sock.recv()
        resp = None
        new_hash = md5(content).hexdigest();

        if str(new_hash) != str(old_hash):
            with open(".lock", "w") as lock:
                lock.write('locked')

            with open(".hash", "w") as hashsum:
                hashsum.write(new_hash)

            locked = True
            break

        del old_hash 
        del new_hash
        
        sleep(10)
    return content



def build_json(content):
    bhtml = BeautifulSoup(content)

    if not bhtml: 
        return false

    bhtml = bhtml.findAll('table')[1]
    bhtml = bhtml.findAll('td')
    datas = { "headers" : [], "datas" : [] }
    tmp_data = []
    j = 1

    for ind,i in enumerate(bhtml[0:]):
        if ind < 10: 
            head = re.findall(r'>([\w\ &|\.\/|-]+)<\/', str(i))[0]
            datas["headers"].append( head )
            head = None 
        else:
            data = re.findall(r'>([\w\ \s&;|\.\/|-]+)<\/', str(i))
            
            if(j < 11):
                if len(data) > 0:
                    data[0] = re.sub('&amp;','&', data[0].strip())
                    tmp_data.append(data[0])
                    
                else:
                    
                    tmp_data.append("")

            if( j > 9 ):
                datas['datas'].append(tmp_data)    
                j = 0
                tmp_data = []

            
            j += 1
            data = None
    datas['date'] = datetime.now().strftime("%d %B %Y")
    curr_time = datetime.now().strftime("%H") 
    one_half = int(curr_time) + 1
    datas['time'] = curr_time + ".00 - " + str(one_half) + ".30"

    
    with open('./www/get.json', "w") as fp:
        fp.write(dumps(datas))

    tmp_data = None
    bhtml = None
    datas = None

    return True




if __name__ == '__main__':
  
    if not path.isfile('.hash'): 
        with open('.hash', 'w') as fhash:
            fhash.write('') 

    clocks = [ "02:00:00","04:00:00","06:00:00","08:00:00","10:00:00","12:00:00" ]

    try:
        while True:
            if check_time(clocks):
                if path.isfile('.lock'):
                    remove('.lock')
                content = check_current_sche()

                if content:
                    build_json(content)

            sleep(1)
    except:
        print "Application closed"


