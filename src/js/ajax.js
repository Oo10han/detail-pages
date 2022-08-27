let ajax = {
	get(url){
		let xhr = new XMLHttpRequest();
		xhr.open('get',url,true);
		xhr.send();
		return new Promise((resolve,reject) => {
			xhr.onreadystatechange = function(){
				if(xhr.readyState === 4){
					if(/^(2|3)/.test(xhr.status)){
						resolve(xhr.responseText);
					}else{
						reject();
					}
				}
			}
		})
	},
	post(url,data){
		let xhr = new XMLHttpRequest();
		xhr.open('post',url,true);
		xhr.setRequestHeader('Content-type','Application/x-www-form-urlencoded;charset=utf-8');
		xhr.send(data);
		return new Promise((resolve,reject) => {
			xhr.onreadystatechange = function(){
				if(xhr.readyState === 4){
					if(/^(2|3)/.test(xhr.status)){
						resolve(xhr.responseText);
					}else{
						reject();
					}
				}
			}
		})
	}
}