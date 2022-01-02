 $(document).on("click", "#pdf-upload-btn", function () {
    $("#pdf-upload-hidden").click();
});



$(function () {
    $("#pdf-upload-hidden").on("change", function () {
        var sendData = new FormData();
        sendData.append("input-file", $("#pdf-upload-hidden").prop("files")[0]);
        console.log(sendData.get("input-file"));
        // var sendData = JSON.stringify({"input-file": $("pdf-upload-hidden").val()});
        $.ajax({
            type: "POST",
            url: "/send",
            // data: sendData,
            data: { "aaa": "aaaaa" },
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data);
                $("#order-edit").toggleClass("content-2")
                $(".order-overlay").fadeOut(300);
                $(".content-1").hide();
                $(".order-content-hidden").addClass("order-content");
                $(".order-content-hidden").removeClass("order-content-hidden");
                result = JSON.parse(data.responseResult).result;
                aspectRatio = data.aspectRatio;
                document.getElementById("order-element-container").setAttribute("data-imgnum", result.length.toString())
                console.log(result);
                for (let i = 0; i < result.length; i++) {
                    const element = result[i];
                    imgWrapper = document.getElementsByClassName("order-element")[0];
                    var newImg = document.createElement("img");
                    console.log("../static/" + element);
                    newImg.setAttribute("src", "../static/" + element);
                    // newImg.setAttribute("height", "50%");
                    // newImg.setAttribute("width", "auto");
                    var ipp = 3;
                    imgWrapperHeight = $(imgWrapper).height()
                    var imgHeight = imgWrapperHeight * (1 / ipp - 0.01);
                    var imgWidth = imgHeight * aspectRatio;
                    newImg.setAttribute("style", `height:${imgHeight}px;width:${imgWidth}px;`)
                    imgWrapper.appendChild(newImg);
                }
            }
        });
        return false;
    });
});

$(function () {
    $(document).on("change", "#input-order-num", function () {
        var deleteElement = document.getElementsByClassName("order-element");
        deleteElement = Array.from(deleteElement);
        if (deleteElement.length > 0) {
            // deleteElement = deleteElement.slice(1);
            for (let i = 0; i < deleteElement.length; i++) {
                const element = deleteElement[i];
                element.remove();
            }
        }
        var n = $("#input-order-num").val();
        var elementWrapper = document.getElementById("order-element-container");
        var localResult = result.slice();
        for (let i = 0; i < n; i++) {
            var ipp = Math.ceil(result.length / n)//images per page
            var newImgWrapper = document.createElement("div");
            newImgWrapper.className = "order-element";
            console.log(ipp, localResult);
            for (let i = 0; i < ipp; i++) {
                if (localResult[0] != undefined) {
                    console.log(localResult[i]);
                    var newImgDiv = document.createElement("div");
                    var newImg = document.createElement("img");
                    newImgDiv.className = "img-pseudo";
                    newImg.setAttribute("src", "../static/" + localResult[0]);
                    var imgHeight = imgWrapperHeight * (1 / ipp - 0.01);
                    var imgWidth = imgHeight * aspectRatio;
                    newImg.setAttribute("style", `height:${imgHeight}px;width:${imgWidth}px;`)
                    localResult.shift();
                    newImgDiv.appendChild(newImg);
                    newImgWrapper.appendChild(newImgDiv);
                }
            }

            elementWrapper.appendChild(newImgWrapper)

        }
        var firstImgDiv = $(".order-element>div:first-child").get();
        firstImgDiv.forEach(element => {
            var movementBackIcon = document.createElement("div");
            movementBackIcon.className = "movement-back-icon";
            element.appendChild(movementBackIcon);
        });
        var lastImgDiv = $(".order-element>div:last-child").get();
        lastImgDiv.forEach(element => {
            var movementForwardIcon = document.createElement("div");
            movementForwardIcon.className = "movement-forward-icon";
            element.appendChild(movementForwardIcon);
        });
    });
});

$(function () {
    $(document).on("click", "#order-decision", function () {
        // console.log($(this).class());
        if ($(this).hasClass("blue-btn")) {
            $(this).html("変更");
            $("#input-order-num").attr("readonly", true);
            $(this).toggleClass("red-btn blue-btn");
        } else {
            $(this).html("決定");
            $("#input-order-num").attr("readonly", false);
            $(this).toggleClass("red-btn blue-btn");
        }
    })
})