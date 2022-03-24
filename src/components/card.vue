<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: ['id', "title", "note", "color"],
    computed: {
        getNoteColor() {
            if (this.color == 'default') {
                return 'bg-white dark:bg-gray-800'
            }

            let value = `bg-${this.color}-300 dark:bg-${this.color}-300`
            return value
        }
    }
})
</script>
<template>
    <div
        @click="$emit('editNote', $props)"
        class="w-64 overflow-hidden rounded-lg shadow-md cursor-pointer hover:opacity-80 transition-opacity"
        :class="getNoteColor"
    >
        <div class="p-6">
            <div>
                <div
                    class="truncate block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-200 transform dark:text-white hover:text-gray-600 hover:underline"
                >{{ title }}</div>
                <p class="mt-2 break-words text-sm text-gray-600 dark:text-gray-400">{{ note }}</p>
            </div>
        </div>
    </div>
</template>