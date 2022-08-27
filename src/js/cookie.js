let $ = {
    cookie(key,value,json = {}){
        let str = encodeURIComponent(key) + '=' + encodeURIComponent(value);
        //有效期
        if(!isNaN(json.expires)){
            let date = new Date();
            date.setDate(date.getDate() + json.expires);
            str += ';expires=' + date;
        }
        //路径
        if(json.path){
            str += ';path=' + json.path;
        }
        document.cookie = str;
    },
    getCookie(key){
        let arr = document.cookie.split('; ');
        for(let i = 0,len = arr.length;i < len;i ++){
            let list = arr[i].split('=');
            if(encodeURIComponent(key) === list[0]){
                return decodeURIComponent(list[1]);
            }
        }
    },
    removeCookie(key,json = {}){
        console.log(json);
        if(json.path){
            document.cookie = encodeURIComponent(key) + '=;expires=' + new Date(0) + ';path=' + json.path;
        }else{
            document.cookie = encodeURIComponent(key) + '=;expires=' + new Date(0);
        }
    },
    convertStrToObj(str){
        if(!str){
            return {};
        }
        return JSON.parse(str);
    }
}