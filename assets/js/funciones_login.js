// LOGIN HTTP REQUEST
		function verify_login(){
			var user = document.getElementById("inputUser").value;
			var pass = document.getElementById("inputPass").value;
			if (window.XMLHttpRequest){
				xmlHttp=new XMLHttpRequest();
			}
			else{ // for older IE 5/6
				xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			var url="verify_user.php?user=" + user + "&pass=" + pass;
			xmlHttp.open("GET",url,false);
			xmlHttp.send();
			var respond = xmlHttp.responseText;
			if(respond == "true"){
				var ajax = nuevoAjax();
				ajax.open("POST", "start.html",true);
				ajax.onreadystatechange=function() {
					if (ajax.readyState==4) {
						document.getElementById("content").innerHTML = ajax.responseText
					}
				}
				ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				ajax.send();
			}
			else{
			}
		}