function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined") {
        if (typeof arguments.callee.activeXString != "string") {
            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
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

var xhr = createXHR();   

window.onload = function() {
        var person =  
        {
          user: "admin", //账号
          password: "admin123456" //密码 
        };
    xhr.open("post", "http://123.207.228.117/ExcellentCourses/admin/login", true);
    
    xhr.onreadystatechange = function () {
               
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300)  || xhr.status == 304) {
                alert("Request was successful: " + xhr.responseText);
            } else {
                alert("Request was unsuccessful: " + xhr.status);
                alert("Request was successful: " + xhr.responseText);
                
            }
        }
    };
    
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(person));
}