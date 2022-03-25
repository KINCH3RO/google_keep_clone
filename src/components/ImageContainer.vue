<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: ['img', 'loading', 'deleteOption']
})
</script>

<template >
    <div class="w-full relative" v-if="img">
        <div
            v-if="loading"
            class="absolute w-full h-full flex flex-col justify-center bg-gray-900/40"
        >
            <div class="sk-chase mx-auto">
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
            </div>
        </div>
        <div class="w-full">
            <div v-if="deleteOption" class="group w-full h-full relative z-10 ">
                <button @click="$emit('deleteImage')"
                    class=" absolute  hover:bg-gray-900/10 transition-colors  z-10 block p-2 text-gray-300 bg-transparent border border-transparent outline-none rounded-md dark:text-white dark:bg-gray-800"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-trash"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                        />
                        <path
                            fill-rule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                    </svg>
                </button>
            </div>
            <img class="max-h-56 object-cover w-full rounded-sm" :src="img" />
        </div>
    </div>
</template>
<style scoped>
.sk-chase {
    width: 40px;
    height: 40px;
    position: relative;
    animation: sk-chase 2.5s infinite linear both;
}

.sk-chase-dot {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    animation: sk-chase-dot 2s infinite ease-in-out both;
}

.sk-chase-dot:before {
    content: "";
    display: block;
    width: 25%;
    height: 25%;
    background-color: #fff;
    border-radius: 100%;
    animation: sk-chase-dot-before 2s infinite ease-in-out both;
}

.sk-chase-dot:nth-child(1) {
    animation-delay: -1.1s;
}
.sk-chase-dot:nth-child(2) {
    animation-delay: -1s;
}
.sk-chase-dot:nth-child(3) {
    animation-delay: -0.9s;
}
.sk-chase-dot:nth-child(4) {
    animation-delay: -0.8s;
}
.sk-chase-dot:nth-child(5) {
    animation-delay: -0.7s;
}
.sk-chase-dot:nth-child(6) {
    animation-delay: -0.6s;
}
.sk-chase-dot:nth-child(1):before {
    animation-delay: -1.1s;
}
.sk-chase-dot:nth-child(2):before {
    animation-delay: -1s;
}
.sk-chase-dot:nth-child(3):before {
    animation-delay: -0.9s;
}
.sk-chase-dot:nth-child(4):before {
    animation-delay: -0.8s;
}
.sk-chase-dot:nth-child(5):before {
    animation-delay: -0.7s;
}
.sk-chase-dot:nth-child(6):before {
    animation-delay: -0.6s;
}

@keyframes sk-chase {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes sk-chase-dot {
    80%,
    100% {
        transform: rotate(360deg);
    }
}

@keyframes sk-chase-dot-before {
    50% {
        transform: scale(0.4);
    }
    100%,
    0% {
        transform: scale(1);
    }
}
</style>