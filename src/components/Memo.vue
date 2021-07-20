<template>
  <div class="flex flex-wrap justify-center">
    <div class="my-7 relative">
      <div
        class="
          bg-blue-500
          shadow-memo
          h-full
          w-full
          rounded-br-xl
          absolute
          -top-4
          -left-4
        "
      ></div>
      <div
        class="
          bg-blue-300
          shadow-memo
          h-full
          w-full
          rounded-br-xl
          absolute
          -top-2
          -left-2
        "
      ></div>
      <div
        class="
          bg-memoYellow-500
          shadow-memo
          min-h-96
          w-96
          rounded-br-xl
          relative
          z-10
          flex
          flex-col
          content-between
        "
      >
        <div class="flex items-center justify-between  h-8" v-show="todos.length">
          <div class="relative w-20 cursor-pointer flex-none">
            <input
              id="toggle-all"
              type="checkbox"
              v-model="isToggle"
              class=" h-auto absolute top-0 bottom-0 my-auto	mx-0 toggle-all opacity-0	 appearance-none cursor-pointer" 
            />
            <!-- opacity-0  appearance-none -->
            <label 
              for="toggle-all"
              class="flex items-center cursor-pointer	"
            >
              <div v-show="todos.length" :class="{'bg-toggle': isToggle}" class="bg-label bg-center bg-no-repeat bg-cover h-8 w-8"></div>
            </label>
          </div>
          <div class="w-56 text-sm">
            <ul >
              <li class="inline px-1">
                <a class="text-gray-400" href="#/all" :class="{ 'text-green-800': visibility === 'all' }" @click="setVisibility('all')">All</a>
              </li>
              <li class="inline px-1">
                <a class="text-gray-400" href="#/active" :class="{'text-green-800': visibility === 'active'}" @click="setVisibility('active')">Active</a>
              </li>
              <li class="inline px-1">
                <a class="text-gray-400" href="#/completed" :class="{'text-green-800': visibility === 'completed'}" @click="setVisibility('completed')">Completed</a>
              </li>
            </ul>
          </div>
          <div class="w-32 text-sm text-gray-500 cursor-pointer">
            <div v-if="todos.filter((todo) => todo.completed).length" @click="removeCompleted">Clear completed</div>
          </div>
        </div>
        <!-- <div class="bg-toggle bg-center bg-no-repeat  bg-cover w-8 h-8"></div> -->
        <!-- <img alt="Vue logo" src="./assets/label.svg" /> -->
        <div class="w-full h-1 bg-green-500"></div>
        <div class="flex-grow py-20 text-yellow-600 text-xl"  v-if="!todos.length">
           事情都做完囉 ٩(๑❛ᴗ❛๑)۶ ~~~~~
        </div>
        <ul class="flex-grow " v-if="todos.length">
          <li
            v-for="(todo,index) in filteredTodos"
            :key="todo.id"
            class="group py-2 border-b-2 border-dashed border-green-500	"
            :class="{'bg-yellow-100	': todo.id === currentEditTodo.id}"
          >
            <div class="relative w-full group " :class="{'bg-red': todo.id === currentEditTodo.id}">
              <input class="h-8 w-8 absolute left-0 opacity-0	 appearance-none cursor-pointer" type="checkbox" v-model="todo.completed" v-show="todo.id !== currentEditTodo.id " />
              <label for="" class="flex items-center cursor-pointer"  >
                <div v-if="todo.id !== currentEditTodo.id " :class="{'bg-toggle': todo.completed}"  class="bg-label bg-center bg-no-repeat bg-cover h-8 w-8 "></div>
                <div
                  @dblclick="editTodo(todo)"
                  v-show="todo.id !== currentEditTodo.id "
                  class="w-full text-left"
                  :class="{'line-through': todo.completed}" >{{index+1}}.{{todo.title}}</div>
                <input
                  @keyup.esc="cancelEdit"
                  @keyup.enter="doneEdit"
                  @blur="doneEdit"
                  v-show="todo.id === currentEditTodo.id "
                  v-model="currentEditTodo.title"
                  class="w-full h-8 bg-transparent pl-10 focus:outline-none"
                />
              </label>
              <div
                @click="removeTodo(todo)"
                v-show="todo.id !== currentEditTodo.id "
                class="h-8 w-8 absolute right-0 top-0 bottom-0 opacity-0 cursor-pointer transition-all	 group-hover:opacity-100">
                  x
              </div>
            </div>
          </li>
          <div v-show="remaining" class="text-gray-400 text-right pr-2 ">
              {{pluralize}}
          </div>
        </ul>
        <div class="flex-none">
          <input class="bg-transparent w-full pl-8 py-1 focus:outline-none	focus:bg-yellow-100" v-model="newTodo"  @keyup.enter="addTodo" type="text" placeholder="+ 需要做什麼？">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = "vue-todolist";

const todosFilters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.completed),
  completed: (todos) => todos.filter((todo) => todo.completed)
};

export default {
  name: "Memo",
  data () {
    return {
      isToggle: true,
      visibility: "all",
      newTodo: '',
      todos: [],
      currentEditTodo:{},
    }
  },
  methods: {
    addTodo() {
      console.log("addTodo");
      //如果沒有資料，就離開函式
      const title = this.newTodo && this.newTodo.trim();
      if (!title) {
        return;
      }

      //  把 newTodo 放到 todos
      this.todos.push({
        id: uuidv4(),
        title,
        completed: false
      });
      //newTodo 的內容清空
      this.newTodo = "";
    },
    removeTodo(todo) {
      this.todos = this.todos.filter(_todo => _todo.id !== todo.id)
    },
    editTodo(todo){
      this.currentEditTodo = {...todo};
    },
    cancelEdit(){
      this.currentEditTodo = {};
    },
    doneEdit(){
      this.todos = this.todos.map(todo => {
        if(todo.id === this.currentEditTodo.id){
          return{
            ...this.currentEditTodo
          }
        }else{
          return todo;
        }
      }).filter(todo => todo.title.trim())

      this.currentEditTodo = {};
    },
    removeCompleted() {
      this.todos = todosFilters.active(this.todos);
    },
    setVisibility(visibility) {
      this.visibility = visibility;
    },
    saveStorage() {
      localStorage.setItem(STORAGE_KEY,JSON.stringify(this.todos))
    },
  },
  computed: {
    filteredTodos() {
      return todosFilters[this.visibility](this.todos);
    },
    remaining() {
      return todosFilters.active(this.todos).length;
    },
    pluralize() {
      const n = todosFilters.active(this.todos).length;
      return n === 1 ? `${n}item left` : `${n}items left`;
    },
  },

  watch: {
    todos: {
      handler: function(){
        console.log('todos changed');
        this.saveStorage();
      },
      deep: true,
    }
  },
  created() {
   this.todos = JSON.parse(localStorage.getItem(STORAGE_KEY))|| [{"id":"0ae9b8b5-ad94-4c34-99d2-92909116e7e2","title":"demo","completed":false}]
  },
  props: {
    msg: String,
    // isToggle: {
    //   type: Boolean,
    //   default: true
    // }
  },
};
</script>