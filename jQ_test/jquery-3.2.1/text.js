


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
        var person =  {

          user: "admin", //账号
          password: "admin123456" //密码 
        };

    $.ajax({
    type: "post",
    url: "http://123.207.228.117/ExcellentCourses/admin/login",
    contentType: "application/json; charest=utf-8",
    data: JSON.stringify(person),
    dataType: "json",
    username: 'admin',
    password: "admin123456",
    success: function (data) {
        for(var i in data) {
            alert(data[i]);
        }
        
    },
    error: function (xhr, status, errorThrowm) {
        
    }
})

}