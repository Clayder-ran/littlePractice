
const parent = document.getElementById("main");  //大盒子
const boxs = parent.getElementsByClassName("box");  //每个小盒子

window.onload = function(){

    // 定义插入的数据，实际应该ajax获取
    var data = {
        position : [
            {"src":"image1.jpg"},
            {"src":"image2.jpg"},
            {"src":"github地址.png"},
            {"src":"bd_logo1.png"},
            {"src":"loginlogo-聚合数据.png"},
            {"src":"Hello webpack!.png"},
        ]
    }

    // 检测是否需要插入元素
    window.addEventListener("scroll",function(){
        if (test()) {
            // 插入操作
            for(var i in data.position){
                parent.innerHTML = (parent.innerHTML + `<div class="box"><div class="pic"><img src="././pic/${data.position[i].src}" alt=""></div></div>`)
                waterfall();
            }
        }
    });

    // 排列最初的元素
    waterfall();
};

// 排列小box位置
function waterfall(){
    //盒子宽度  列数
    var boxW = boxs[0].offsetWidth;
    var cols =Math.floor(document.documentElement.clientWidth/boxW);

    //给main元素设置宽度
    parent.style = "width:"+boxW*cols+"px;margin:0 auto";

    var hArr = [];
    for(var i=0;i<boxs.length;i++){
        if (i < cols) {
            hArr.push(boxs[i].offsetHeight);
        }
        else {
            //每一次放图片的最小高度  此高度的列索引
            var minTop = Math.min.apply(null,hArr);
            var minIndex = findMinIndex(hArr,minTop);

            boxs[i].style.position = "absolute";
            boxs[i].style.left = minIndex*boxW + "px";
            boxs[i].style.top = minTop + "px";

            hArr[minIndex] += boxs[i].offsetHeight;
        }
    }

}

// 找到数组中最小的索引
function findMinIndex(arr,val){
    for (var i = 0; i < arr.length; i++) {
        if (arr[i]===val) {
            return i;
        }
    }
}

// 检测是否应该载入新数据；（定义：最后一个元素出现就引用）
function test(){
    var small = boxs[boxs.length-1].offsetTop;
    var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
    var pageHeight = document.body.offsetHeight||document.documentElement.offsetHeight;
    return (small<=scrollTop+pageHeight)?true:false;
}


//  //等于getElementsByClassName
// function getByClass(parent,clsName){
//     var boxArr=[];  //存储获取到的class为box的元素
//     var oElements = parent.getElementsByTagName("*");
//     for (var i = 0; i < oElements.length; i++) {
//         if (oElements[i].className==clsName) {
//             boxArr.push(oElements[i]);
//         }
//     }
//     return boxArr;
// }
