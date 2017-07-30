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
    
    xhrLogIn.onreadystatechange = function() {

        if (xhrLogIn.readyState == 4) {
            if ((xhrLogIn.status >= 200 && xhrLogIn.status < 300) || xhrLogIn.status == 304) {

                return JSON.parse(xhrLogIn.responseText).status;
            } else {

                alert("Request was unsuccessful: " + xhrLogIn.status);
            }
        }
    };
    xhrLogIn.withCredentials = true;
    xhrLogIn.setRequestHeader('Content-Type', 'application/json');
    xhrLogIn.send(JSON.stringify(person));


}

// $(function() {
   
//     var button = document.getElementById("button"),
//         showImg = document.getElementById("showImg"),
//         file = document.getElementById("file"),
//         formData = new FormData();

//     button.onclick = function() {
//         logIn();
//         formData.append('file', file.files[0]);
//         formData.append("teacherName", "ghg");
//         formData.append("teacherId", 7);
//         $.ajax({
//             type: 'post',
//             url: 'http://123.207.228.117/ExcellentCourses/teacher/update',
//             contentType: false,
//             processData: false,
//             cache: false,
//             data: formData,
//             dataType: "json",
//             success: function(data) {
//                 for (var i in data) {
//                     alert(data[i]);
//                 }
//             },
//            error: function(xhr, status, errorThrowm) {
//                 alert("错误" + status + "错误抛出：" + errorThrowm);
//             },
//             xhrFields: {
//                 withCredentials: true
//             }
//         });
//     }
// })
function isEmpty(obj) {
    // 本身为空直接返回true
    if (obj == null) return true;

    // 然后可以根据长度判断，在低版本的ie浏览器中无法这样判断。
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    //最后通过属性长度判断。
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}