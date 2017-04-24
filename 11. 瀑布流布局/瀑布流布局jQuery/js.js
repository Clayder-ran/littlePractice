var hArr = [];
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
};

function waterfall(){
    var w = $("#main>div").eq(0).outerWidth();
    var cols = Math.floor($(window).width()/w);
    $("#main").width(w*cols).css("margin","0 auto");


    $("#main>div").each(function(index,value){
        var h = $(value).outerHeight();
        if (index<cols) {
            console.log("xpru");
            hArr[index] = h;
        }else {
            var minH = Math.min.apply(null,hArr);
            // $.inArray获取某一值的索引
            var minIndex = $.inArray(minH,hArr);

            $(value).css({
                "position" : "absolute",
                "top" : minH + "px",
                "left" : w*minIndex + "px"
            });
            hArr[minIndex] += $(value).outerHeight();
        }
    });
}

function test(){
    var scrollTop = $(window).scrollTop();
    var pageHeight = $(window).height();
    var small = Math.min.apply(null,hArr);

    return (small<=scrollTop+pageHeight)?true:false;
}

$(function(){
    $(window).on("scroll",function(){
        if (test()) {
            for (var i = 0; i < data.position.length; i++) {
                var oBox = $("<div>").attr("class","box").appendTo($("#main"));
                var oPic = $("<div>").attr("class","pic").appendTo(oBox);
                $("<img>").attr("src","././pic/"+data.position[i].src).appendTo(oPic);

                waterfall();
            }
        }
    });
    waterfall();
});
