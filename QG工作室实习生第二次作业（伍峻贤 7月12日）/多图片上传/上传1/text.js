function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined") {
        if (typeof arguments.callee.activeXString != "string") {
            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
                i, len;
            for (i = 0, len = versions.length; i < len; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguements.callee.activeXString = version[i];
                    break;
                } catch (ex) {
                    //跳过
                }
            }
        }

        return new ActiveXObject(arguements.callee.activeXString);
    } else {
        throw new Error("nNo XHR object available.");
    }
}



function logIn() {
    var xhrLogIn = createXHR();
    var person = {
        user: "admin", //账号
        password: "admin123456" //密码 
    };

    xhrLogIn.open("post", "http://123.207.228.117/ExcellentCourses/admin/login", false);
    xhrLogIn.withCredentials = true;
    xhrLogIn.onreadystatechange = function() {

        if (xhrLogIn.readyState == 4) {
            if ((xhrLogIn.status >= 200 && xhrLogIn.status < 300) || xhrLogIn.status == 304) {
                alert(xhrLogIn.getAllResponseHeaders());

                return JSON.parse(xhrLogIn.responseText).status;
            } else {

                alert("Request was unsuccessful: " + xhrLogIn.status);
            }
        }
    };

    xhrLogIn.setRequestHeader('Content-Type', 'application/json');
    xhrLogIn.send(JSON.stringify(person));


}


function isEmpty(obj) {

    // 检验 undefined 和 null
    if (!obj && obj !== 0 && obj !== '') {　　　　　　　　　　
        return true;
    }

    if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) {　　
        return true;　
    }

    if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) {　　　
        return true;　　
    }　　
    return false;
}



