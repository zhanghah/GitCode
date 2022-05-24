import hashlib

class getSign():

    def md5(self, str):
        m = hashlib.md5()
        m.update(str)
        return m.hexdigest()

    def getKey(self):
        key = 'bs:(cijz0Yyx@Tk6"C*Jo>!P2v8npZm]~&G%^<1A'
        # key = 'bs:(cijz0Yyx@Tk6"C*Jo>!P2v8npZm]~&G%^<1A'
        return key

    def Sign(self,data):
        workList = []
        list = []
        for data_data,value in data.items():
            if str(value).strip() != '':
                dict2 = '{}_{}'.format(data_data,value)
                md5Str = self.md5(str(dict2).encode('utf-8'))
                workList.append([data_data,md5Str])

        workList = dict(workList)
        workList2 = sorted(workList.items(),key=lambda kv:(kv[1],kv[0]))

        for i in workList2:
            str_night1 = '='.join(i)
            list.append(str_night1)
        str_night2 = '&'.join(list)

        key = self.getKey()
        superKey = key+str_night2+key
        sign = self.md5(superKey.encode('utf-8'))
        # print(sign)
        return sign