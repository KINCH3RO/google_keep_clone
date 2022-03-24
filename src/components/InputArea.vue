<script lang="ts">
import { defineComponent, onMounted } from "vue";
import ColorsDropDown from "./ColorsDropDown.vue";
import FirebaseService from '../services/firebase.service'
import { doc } from "firebase/firestore";
export default defineComponent({
    components: { ColorsDropDown },
    props: ['doc'],
    data() {

        return {
            title: '',
            choosedColor: "default",
            noteText: ' '

        }
    },
    methods: {
        chosenColorHandler(color: string) {
            this.choosedColor = color
        },
        getNoteColor() {
            if (this.choosedColor == 'default') {
                return 'bg-white dark:bg-gray-800'
            }

            let value = `bg-${this.choosedColor}-300 dark:bg-${this.choosedColor}-300`
            return value
        },
        saveNoteData({ target }: any) {
            this.noteText = target.innerHTML.replace(/<div>/g, "\n").replace(/<\/div>/g, "").replace(/<br>/g, "\n");


        },
        deleteNote() {
            let app = new FirebaseService()
            app.deleteDocument("notes",this.doc.id).then(data=>{
                  this.$emit('stateChanged')
            })
        },
        saveNote() {
            let app = new FirebaseService()
            if (this.doc) {
                app.updateData("notes", this.doc.id, this.$data).then(data => {
                    this.$emit('stateChanged')
                })
                return
            }

            app.addData("notes", this.$data).then(data => {
                this.title = ''
                this.choosedColor = 'default'
                this.noteText = ''
                let input: any = this.$refs.input
                input.innerHTML = "Take a note"
                


            })

        }
    },
    computed: {

    },
    mounted() {
        if (this.doc) {
            this.title = this.doc.title
            this.choosedColor = this.doc.color;
            let input: any = this.$refs.input
            input.innerHTML = this.doc.note
            this.noteText=this.doc.note
        }

    }

})
</script>

<template >
    <div class="max-w-3xl p-6 rounded-md shadow" :class="getNoteColor()">
        <div class="relative">
            <input
                v-model="title"
                type="text"
                placeholder="Title"
                class="mb-2 w-full text-xl font-semibold bg-transparent text-gray-900s dark:text-gray-300 border-none outline-none"
            />

            <div
                ref="input"
                @input="saveNoteData($event)"
                contenteditable="true"
                aria-label="Take a note…"
                class="break-words mb-10 w-full bg-transparent text-base font-semibold text-gray-600 dark:text-gray-400 border-none outline-none"
            >Take a note</div>

            <div class="flex justify-between">
                <ColorsDropDown @colorChosen="chosenColorHandler" />
                <div class="select-none">
                    <button
                        v-if="noteText.length > 0 && title.length > 0"
                        @click="saveNote"
                        class="bg-transparent hover:bg-gray-900/10 transition-colors text-gray-800 py-2 rounded-md px-5 font-semibold"
                    >Save</button>

                    <button
                        v-if="doc"
                        @click="deleteNote"
                        class="bg-transparent hover:bg-red-500 transition-colors text-gray-800 py-2 rounded-md px-5 font-semibold"
                    >Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>