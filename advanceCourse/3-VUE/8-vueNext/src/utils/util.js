export const wls = {
    /* localStorage 封装 */
    ls: window.localStorage,
    getItem(key) {
        try {
            let key1 = key && this.ls.getItem(key);
            if (key1) {
                return JSON.parse(key1);
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    },
    setItem(key, val) {
        this.ls.setItem(key, JSON.stringify(val));
    },
    removeItem(key) {
        this.ls.removeItem(key);
    },
    keys() {
        return this.ls.keys();
    },
    clear() {
        this.ls.clear();
    }
}

export const md5ID = () => {
    let ramdomStr = Math.random().toString(16)
    return new Date().getTime() + ramdomStr.substr(ramdomStr.length - 6)
}

export const zeroFill = (str = '') => {
  str += ''
  const rst = '00' + str
  return rst.substr(str.length)
}

export const timeDeal = () => {
  let time = new Date();
  let year = time.getFullYear()
  let month = zeroFill(time.getMonth() + 1)
  let day = zeroFill(time.getDate())
  let hour = zeroFill(time.getHours())
  let min = zeroFill(time.getMinutes())
  let sec = zeroFill(time.getSeconds())
  return `${year}年${month}月${day}日 ${hour}:${min}:${sec}`
}
