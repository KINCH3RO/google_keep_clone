<script  lang="ts">
import { defineComponent } from 'vue';
import InputArea from '../components/InputArea.vue';
import Card from '../components/card.vue';
import { collection, onSnapshot } from "firebase/firestore";
import FirebaseService from '../services/firebase.service';


export default defineComponent({
  // type inference enabled
  data() {
    return {
      notes: null as any,
      selectedDoc: null as any
    }
  },
  mounted() {
    let app = new FirebaseService()
    // app.readDocuments('notes').then(data => {
    //   this.notes = data
    // })

    app.listenForChange((docs: any) => {
      this.notes = docs
    })


  },
  methods: {
    setSelectedDoc(doc: any) {


      this.selectedDoc = doc
    }
  },
  components: { InputArea, Card }
  , beforeUnmount() {
    let app = new FirebaseService()
    app.destroySubscriber()
  }
})

</script>
  
<template>
  <div>
    <Transition>
      <div v-if="selectedDoc" class="h-screen w-screen bg-gray-900/25 fixed z-40">
        <div @click="selectedDoc = null" class="w-full h-full fixed"></div>
        <div class="flex flex-col justify-center h-full">
          <InputArea @stateChanged="selectedDoc = null" :doc="selectedDoc" class="mx-auto w-[680px]" />
        </div>
      </div>
    </Transition>

    <div class="w-screen min-h-screen bg-gray-50 dark:bg-gray-900 px-10 py-4">
      <InputArea class="mb-12 mx-auto" />

      <div class="flex flex-wrap gap-4 mb-10">
        <Card
          @editNote="setSelectedDoc($event)"
          v-for=" doc in notes "
          :title="doc.title"
          :note="doc.noteText"
          :id="doc.id"
          :color="doc.choosedColor"
        />
      </div>
    </div>
  </div>
</template>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
