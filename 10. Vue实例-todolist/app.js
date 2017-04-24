// 存取localStorage数据

var store = {
   save(key,value){
      localStorage.setItem(key,JSON.stringify(value));
   },
   fetch(key){
      return JSON.parse(localStorage.getItem(key)) || [];
   }
};

var list = store.fetch("myPlan");


var vm = new Vue({
    el: ".main",
    data: {
        list: list,
        todo: "",
        edtorTodos: "",  //
        beforeTitle:"",  //正在编辑的数据
        visibility: "all",  //对数据筛选
    },
    watch:{
      list:{
         handler:function(){
            store.save("myPlan",this.list);
         },
         deep: true,  //开启深度监控
      },
   },
    computed: {  //计算属性,直接加入方法名字
      noCheckedLength: function(){
         return  this.list.filter(function(item){
            return !item.isChecked;
         }).length;
      },
      filteredList: function(){
         var filter = {
            all:function(list){
               return list;
            },
            finished:function(list){
               return list.filter(function(item){
                  return item.isChecked;
               });
            },
            unfinished:function(){
               return list.filter(function(item){
                  return !item.isChecked;
               });
            },
         };
         return filter[this.visibility]?filter[this.visibility](list):list;
      }
   },
    methods: {
        addToDo: function() {
            this.list.push({
                title: this.todo,
                isChecked: false,
            });

        },
        edtorTodo: function(todo) {
         //   console.log(todo);
            this.edtorTodos = todo;
            this.beforeTitle = todo.title;
        },
        deleteTodo: function(todo) {
            var index = this.list.indexOf(todo);
            this.list.splice(index, 1);
        },
        edtorTodoed: function() {
            this.edtorTodos = "";
        },
        cancelTodo:function(todo){
           todo.title = this.beforeTitle;
           this.edtorTodos = "";
        }
    },
    directives: { //自定义指令
        "focus": {
            update: function(el, binding) {
               //  console.log(el);
                if (binding.value) {
                    el.focus();
                }
            }
        },
    },
});


function watchHashChange(){
   var hash = window.location.hash.slice(1);
   vm.visibility = hash;
}
window.addEventListener("hashchange",watchHashChange);
