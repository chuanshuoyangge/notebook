<template>
  <div id="app">
    <aside class="side-bar">
      <button class="add-note" v-bind:title="notes.length+'notes created'" @click="addNote">addNote</button>
      <div class="toolbar">
      <div v-for="note of sortedNotes" v-bind:key="note.id" @click="selectNote(note)" v-bind:class="{active:(note===selectedNote)}">
        {{note.title}}
        <span @click="favoritenote(note)" :class="{favorite:note.favorite}">☆</span>
      </div>
      </div>
    </aside>
    <template v-if="selectedId">
      <section class="maim">
        <textarea v-model="selectedNote.content">
        </textarea>
        <span>{{selectedNote.created|date}}</span>
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
      notes:JSON.parse(localStorage.getItem("notes"))||[],
      selectedId:JSON.parse(localStorage.getItem("selectedId"))||null
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
    },
    sortedNotes(){
      return this.notes.slice().sort((a,b) => a.favorite === b.favorite ? 0 : ( b.favorite==true ? 1 : -1 ) )
    }
  },
  watch:{
      notes:{
        handler(val){
          this.saveVal(val,"notes");
          console.log("notes has been saved")
        },
        deep:true
    },
    selectedId:{
      handler(val){
        this.saveVal(val,"selectedId")
        console.log(val)
      }
    }
  },
  methods:{
    saveVal(val,name){
      let a = JSON.stringify(val);
      localStorage.setItem(name,a)
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
    },
    favoritenote(note){
      note.favorite = !note.favorite;
    }
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
.active{
  background-color: blue;
}
.favorite{
  background-color: red;
}
html,body{
  height: 100%;
  padding: 0px;
  margin: 0px;
}
</style>
