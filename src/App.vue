<template>
  <div id="app">
    <section class="maim">
      <textarea v-model="content">
      </textarea>
    </section>
    <aside class="preview" v-html="notePreview">
    </aside>

  </div>
</template>

<script>
import marked from "marked"

export default {
  name: 'App',
  components: {
    
  },
  data(){
    return{
      content:"this is notebook"
    }
  },
  computed:{
    notePreview(){
      return marked(this.content)
    }
  },
  watch:{
      content:{
        handler(val,oldVal){
          console.log("new val:",val,"\noldVal:",oldVal)
          this.saveVal(val)
        }
    }
  },
  methods:{
    saveVal(val){
      localStorage.setItem("content",val)
    }
  },
  created(){
    this.content=localStorage.getItem("content")||"you can write in **markdown**"
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
