window.onload = function() {
    var button = document.getElementById("button"),
        showImg = document.getElementById("showImg"),
        file = document.getElementById("file"),
        fileJson = new Array(),
        formData = new FormData();

    file.onchange = function() {
        ShowImg();
    }
    button.onclick = function() {
        pushImg(fileJson);
    }

    function ShowImg() {
        var file = document.getElementById("file"),
            fileList = file.files;
        for (var i = 0; i < fileList.length; i++) {
            var img = document.createElement("img");

            img.style.width = '150px';
            img.style.height = '180px';
            img.src = window.URL.createObjectURL(fileList[i]);
            showImg.appendChild(img);
            
           
        }
        fileList = file.files;
         // 遍历图片文件列表，插入到表单数据中
            for (var j = 0, newFile; newFile = fileList[j]; j++) {
                // 文件名称，文件对象
                
                formData.append(newFile.name, newFile);
                fileJson.push(newFile);
            }

        fileList = null;

    }

    function pushImg(fileJson) {
        var xhr = createXHR();
        if (isEmpty(fileJson)) {
            alert("没有图片上传");
            return ; 
        }

        xhr.onreadystatechange = function() {

            if (xhr.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    alert("Request was successful: " + xhr.responseText);
                    formData = new FormData();
                } else {
                    alert("Request was unsuccessful: " + xhr.status);


                }
            }
        };
        logIn();
        
        xhr.open("post", "http://123.207.228.117/ExcellentCourses/teacher/update", false);
        xhr.setRequestHeader('Content-Type', 'form-data');
        xhr.withCredentials = true
        // for (var i = 0; i < fileJson.lehgth; i++) {
        //     formData.append(fileJson[i].name, fileJson[i]);
            formData.append("teacherName", "ghg");
            formData.append("teacherId", 7);

            xhr.send(formData);
        
        // }
        
      
    }
}

