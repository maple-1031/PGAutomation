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
            type:"POST",
            url:"/send",
            data: sendData,
            contentType: false,
            processData: false,
            success: function (data) {
                $("#order-edit").toggleClass("content-2")
                $(".order-overlay").fadeOut(300);
                $(".content-1").hide();
                $(".order-content-hidden").addClass("order-content");
                $(".order-content-hidden").removeClass("order-content-hidden");
                var result = JSON.parse(data.responseResult).result;
                console.log(result);
                for (let i = 0; i < result.length; i++) {
                    const element = result[i];
                    var imgWrapper = document.getElementsByClassName("order-element")[0];
                    var newImg = document.createElement("img");
                    console.log("../static/" + element);
                    newImg.setAttribute("src", "../static/" + element);
                    newImg.setAttribute("height", "80%");
                    imgWrapper.appendChild(newImg);
                }
            }
        });
        return false;
    });
});

$(function () {
    $(document).on("change", "#input-order-num", function () {
        console.log($("#input-order-num").val());
        var n = $("#input-order-num").val();
        for (let i = 0; i < n; i++) {
            console.log(i);
        }
    });
});