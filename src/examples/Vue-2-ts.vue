<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
        <pre>{{ a }}</pre>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default Vue.extend({
    name: 'App',
    components: {
        HelloWorld,
    },
    data: () => ({
        a: '1gfh2dsa12' as string,
        b: { a: 2 as number },
        c: 1 as number,
        d: { a: 'dsadsa' } as CustomType,
        SOME_CONST,
    }),
    created() {
        this.a = 123
    },
})
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
