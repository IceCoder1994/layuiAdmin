var uploadDialogHtml = `
<div class="upload-image-list">
        <input type="file" class="ice-multi-upload-file" style="display: none;">
        <div class="addDiv">
        <img src="../image/add.png">
    </div>
    </div>`;

var MultiImageUpload = {
    files: [],
    selector:'',
    init: function (selector) {
        var context=this;
        this.selector=selector;
        $(selector).css("display", 'none');
        $(selector).after(uploadDialogHtml);
        $(selector).next().find('.ice-multi-upload-file').change(function () {
            context.onFileUpload();
        });
        $(selector).next().find('.addDiv').click(function () {
            $(this).siblings('.ice-multi-upload-file').click();
        });
        return this;
    },
    deleteImg: function (index) {
        var context=this;
        this.files.splice(index, 1);
        console.log(index);
        $(this.selector).val(this.files);
        // $(`.upload-image-list .item`)[index].className = "delItem";
         $(this.selector).next().children('.item')[index].className = "delItem";
        $(this.selector).next().find('.item .delete').each(function (index,item) {
            $(item).unbind('click').click(function () {
                context.deleteImg(index)
            });
        });
    },
    onFileUpload: function () {
        // this.files.push($('#ice-multi-upload-file')[0].files[0]);
        this.files.push($(this.selector).next().find('.ice-multi-upload-file')[0].files[0]);
        $(this.selector).val(this.files);
        var reads = new FileReader();
        console.log($(this.selector).next().find('.ice-multi-upload-file')[0].files);
        reads.readAsDataURL($(this.selector).next().find('.ice-multi-upload-file')[0].files[0]);
        $(this.selector).next().find('.ice-multi-upload-file').val('');
        var context=this;
        reads.onload = function () {
            if ( $(context.selector).next().children('.item:last').length > 0) {
                $(context.selector).next().children('.item:last').after(`<div class="item">
                    <img class="image" src="${this.result}"/>
                    <img src="../image/delete.png" class="delete">
                </div>`);
            } else {
                $(context.selector).next().children('.addDiv').before(`<div class="item">
                    <img class="image" src="${this.result}"/>
                    <img src="../image/delete.png" class="delete">
                </div>`);
            }

            // $(context.selector).next().find('.delete').unbind('click').click(function () {
            //     context.deleteImg(context.files.length-1)
            // })
            console.log($(context.selector).next().find('.item .delete'));
            $(context.selector).next().find('.item .delete').each(function (index,item) {
                $(item).unbind('click').click(function () {
                    context.deleteImg(index)
                });
            });
        };
    },
};

