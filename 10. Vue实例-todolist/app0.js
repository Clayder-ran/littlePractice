var list = [
    // {
    //     title:"吃饭",
    // },
    // {
    //     title:"打豆豆",
    // }
];


new Vue({
    el:".main",
    data:{
        list:list,
        todo:"",
    },
    methods:{
        addToDo:function(ev){
            // if (ev.keyCode ===13) {
            //     // 判断按键,可用`.enter`修饰符代替
            // }
            this.list.push({
                title:this.todo,
            });
        },
        show:function(){
            console.log(this.todo);
        },
    },
});
