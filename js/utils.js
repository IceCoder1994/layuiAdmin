/**
 * 用于将$('form').serializeArray()获取的数组转换为对象
 */
window.formArray2Data=function(array=[]){
    var data={};
    for (var i = 0; i < array.length; i++) {
        data[array[i].name]=array[i].value;
    }
    return data;
};