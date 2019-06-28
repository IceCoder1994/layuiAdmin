var uploadDialogHtml = `
<div class="upload-image-list">
        <input type="file" id="ice-multi-upload-file" style="display: none;" onchange="multiImageUpload.onFileUpload()">
        <div class="addDiv" onclick="javascript:$('#ice-multi-upload-file').click()">
        <img src="../image/add.png">
    </div>
    </div>`;

var multiImageUpload = {
    files: [],
    selector:'',
    init: function (selector) {
        this.selector=selector;
        $(selector).css("display", 'none');
        $(selector).after(uploadDialogHtml);
        return this;
    },
    deleteImg: function (index) {
        this.files.splice(index, 1);
        $(this.selector).val(this.files);
        $(`.upload-image-list .item`)[index].className = "delItem";
    },
    onFileUpload: function () {
        this.files.push($('#ice-multi-upload-file')[0].files[0]);
        $(this.selector).val(this.files);
        console.log($(this.selector));
        var reads = new FileReader();
        reads.readAsDataURL($('#ice-multi-upload-file')[0].files[0]);
        $('#ice-multi-upload-file').val('');
        reads.onload = function () {
            if ($('.upload-image-list .item:last').length > 0) {
                $('.upload-image-list .item:last').after(`<div class="item">
                    <img class="image" src="${this.result}"/>
                    <img src="../image/delete.png" class="delete" onclick="multiImageUpload.deleteImg(multiImageUpload.files.length-1)">
                </div>`);
            } else {
                $('.upload-image-list .addDiv').before(`<div class="item">
                    <img class="image" src="${this.result}"/>
                    <img src="../image/delete.png" class="delete" onclick="multiImageUpload.deleteImg(multiImageUpload.files.length-1)">
                </div>`);
            }
        };
    },
};

