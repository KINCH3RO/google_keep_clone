<script lang="ts" >
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            isOpen: false
        }
    }
})
</script>
<template>
    <div class="relative">
        <!-- Dropdown toggle button -->
        <button
            @click="isOpen = !isOpen"
            class=" hover:bg-gray-900/10 transition-colors relative z-10 block p-2 text-gray-700 bg-transparent border border-transparent outline-none rounded-md dark:text-white dark:bg-gray-800"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-palette"
                viewBox="0 0 16 16"
            >
                <path
                    d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
                />
                <path
                    d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8zm-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7z"
                />
            </svg>
        </button>

        <!-- Dropdown menu -->
        <div
            v-show="isOpen"
            class="absolute left-0 z-20 w-max py-2 mt-2 bg-white rounded-md shadow-xl dark:bg-gray-800"
        >
            <div class="flex p-2 gap-1">
                <div  @click="$emit('colorChosen', 'default')"
                    class="h-8 w-8 rounded-full border-2 hover:border-black cursor-pointer flex justify-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        class="my-auto"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                        />
                    </svg>
                </div>

                <div
                    @click="$emit('colorChosen', 'green')"
                    class="h-8 w-8 rounded-full bg-green-300 border-2 hover:border-black cursor-pointer"
                ></div>
                <div
                    @click="$emit('colorChosen', 'yellow')"
                    class="h-8 w-8 rounded-full bg-yellow-300 border-2 hover:border-black cursor-pointer"
                ></div>
                <div
                    @click="$emit('colorChosen', 'blue')"
                    class="h-8 w-8 rounded-full bg-blue-300 border-2 hover:border-black cursor-pointer"
                ></div>
                <div
                    @click="$emit('colorChosen', 'red')"
                    class="h-8 w-8 rounded-full bg-red-300 border-2 hover:border-black cursor-pointer"
                ></div>
                <div
                    @click="$emit('colorChosen', 'lime')"
                    class="h-8 w-8 rounded-full bg-lime-300 border-2 hover:border-black cursor-pointer"
                ></div>
            </div>
        </div>
    </div>
</template>