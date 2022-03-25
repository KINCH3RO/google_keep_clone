<script lang="ts">
import { defineComponent, onMounted } from "vue";
import ColorsDropDown from "./ColorsDropDown.vue";
import FirebaseService from '../services/firebase.service'
import { doc } from "firebase/firestore";
import ImageContainer from "./ImageContainer.vue";
export default defineComponent({
    components: { ColorsDropDown, ImageContainer },
    props: ['doc'],
    data() {

        return {
            title: '',
            choosedColor: "default",
            noteText: ' ',
            img: "",
            imgLoading: false,
            imgPath: ""

        }
    },
    methods: {
        uploadFile(event: any) {
            let file = event.target.files[0]
            let app = FirebaseService.getInstance()

            this.readImg(file)
            if (file) {
                this.imgLoading = true
                app.uploadFile(file).then(snapshot => {
                    this.imgLoading = false
                    this.imgPath = snapshot.metadata.fullPath

                }).catch(err => {
                    this.imgLoading = false
                    this.img = ''
                })
            }

        },
        chosenColorHandler(color: string) {
            this.choosedColor = color
        },
        openFileInput() {
            let fileInputElement: any = this.$refs.fileInput
            fileInputElement.click()
        },
        readImg(file: File) {
            let fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                this.img = fileReader.result as any
            }

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
            let app = FirebaseService.getInstance()

            app.deleteDocument("notes", this.doc.id).then(data => {
                this.$emit('stateChanged')
            })
        },
        saveNote() {
            let app = FirebaseService.getInstance();
            let saveObject = {...this.$data};
            delete saveObject["imgLoading"];
            delete saveObject["img"]
            
            
            if (this.doc) {
                app.updateData("notes", this.doc.id, saveObject).then(data => {
                    this.$emit('stateChanged')
                })
                return
            }

            app.addData("notes", saveObject).then(data => {
                this.title = ''
                this.choosedColor = 'default'
                this.noteText = ''
                this.img=''
                this.imgPath=''
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
            this.noteText = this.doc.note
           this.img=this.doc.imgSrc

        }

    }

})
</script>

<template >
    <div class="max-w-3xl p-6 rounded-md shadow" :class="getNoteColor()">
        <ImageContainer @deleteImage="img='',imgPath=''" :deleteOption="true"  class="mb-4" :img="img" :loading="imgLoading" />
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
                <div class="flex">
                    <ColorsDropDown @colorChosen="chosenColorHandler" />
                    <input ref="fileInput" class="hidden" type="file" @change="uploadFile" />
                    <button
                        @click="openFileInput()"
                        class="hover:bg-gray-900/10 transition-colors relative z-10 block p-2 text-gray-700 bg-transparent border border-transparent outline-none rounded-md dark:text-white dark:bg-gray-800"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-card-image"
                            viewBox="0 0 16 16"
                        >
                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                            <path
                                d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"
                            />
                        </svg>
                    </button>
                </div>

                <div class="select-none">
                    <button
                        v-if="noteText.length > 0 && title.length > 0 && !imgLoading"
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