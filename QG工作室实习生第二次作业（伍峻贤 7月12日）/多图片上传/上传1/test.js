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

           
            fileJson.push(newFile);
        }



    }

    function pushImg(fileJson) {

        if (isEmpty(fileJson)) {
            alert("没有图片上传");
            return;
        }

        

        var  fileList = file.files;
        logIn();
        for (var j = 0, newFile; newFile = fileList[j]; j++) {
            
            formData.append('file', newFile);
            formData.append("teacherName", "ghg");
            formData.append("teacherId", 7);
            $.ajax({
                type: "post",
                url: "http://123.207.228.117/ExcellentCourses/teacher/update",
                contentType: false,
                processData: false,
                cache: false,
                data: formData,
                dataType: "json",
                async: false,
                xhrFields: {
                    withCredentials: true
                },
                // username: 'admin',
                // password: "admin123456",
                success: function(data) {
                    alert("上传成功");
                    formData = new FormData();

                },
                error: function(xhr, status, errorThrowm) {
                    alert("错误" + status + "错误抛出：" + errorThrowm);
                }
            });


        }


    }
}
