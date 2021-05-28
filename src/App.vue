<template>
  <div id="app">
    <aside class="side-bar">
      <button class="add-note" v-bind:title="notes.length" @click="addNote">addNote</button>
      <div class="toolbar">
      <div v-for="note of notes" v-bind:key="note.id" @click="selectNote(note)">
        {{note.title}}
      </div>
      </div>
    </aside>
    <template v-if="selectedId">
      <section class="maim">
        <textarea v-model="selectedNote.content">
        </textarea>
      </section>
      <aside class="preview" v-html="notePreview">
      </aside>
    </template>

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
      content:"this is notebook",
      notes:[],
      selectedId:null
    }
  },
  computed:{
    notePreview(){
      return this.selectedNote ? marked(this.selectedNote.content):" "
    },
    selectedNote(){
      return this.notes.find(a=> {
        return a.id===this.selectedId
      })
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
    },
    addNote(){
      const time=Date.now()
      const note={
        id:String(time),
        title:'New note'+(this.notes.length+1),
        content:"**Hi**,welcome!!",
        created:time,
        favorite:false
      }
      this.notes.push(note)
    },
    selectNote(note){
      this.selectedId=note.id
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
  text-align: center;
  
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: stretch;
  
  
}
.side-bar{
  background-color: rgb(248, 248, 248);
  height: 100%;
  flex-grow: .2;
  max-width: 100px;
}
.main{
  flex-grow: 0.4;
  background-color: aqua;
}
.preview{
  flex-grow: 0.4;
  background-color:blue;
}
html,body{
  height: 100%;
  padding: 0px;
  margin: 0px;
}
</style>
