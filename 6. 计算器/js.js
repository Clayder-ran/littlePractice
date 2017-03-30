// 定义数组，用于保存数据和计算符号；
var way_res = [];
var txt = document.getElementsByClassName("txt")[0];
var btns = document.getElementsByClassName("btn");
var btn_clicks = document.getElementsByClassName("btn_click");

for(var i=0;i<btns.length;i++){
    btns[i].addEventListener("click",function(){
        if( !isNaN(this.value) || this.value == "."){
            if (txt.value.indexOf(".") != -1) {
                if (this.value != ".") {
                    txt.value += this.value;
                }
            }
            else {
                txt.value += this.value;
            }
        }
        else{
            if (this.value != "=") {
                way_res[way_res.length] = txt.value;  //存原数据
                way_res[way_res.length] = this.value; //存符号（不是等号）
                txt.value = "";  //清屏
            }
            else{
                way_res[way_res.length] = txt.value; //继续保存数据
                console.log(way_res[0]+way_res[1]+way_res[2]);
                txt.value = eval(way_res.join(""));  //eval()计算*表达式*的值
                way_res = [];
            }
        }
    });
}

for(var i=0;i<btn_clicks.length;i++){
    btn_clicks[i].addEventListener("click",function(){
        if(this.value == "AC"){
            way_res = [];
            txt.value = "";
        }
        else {
            txt.value = txt.value.substr(0,txt.value.length-1);
        }
    });
}
