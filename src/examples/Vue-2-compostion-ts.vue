<template>
    <li class="item">
        <span>{{ todo.value }}</span>
        <div class="item-buttons">
            <button class="remove-button" @click="removeTodo">Remove</button>
            <button class="done-button" @click="completeTodo">Done</button>
        </div>
    </li>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
interface TODO {
    id: string
    value: string
}
export default defineComponent({
    props: {
        todo: {
            required: true,
            type: Object as PropType<TODO>,
        },
        removeTodo: {
            required: true,
            type: Function as PropType<() => void>,
        },
        completeTodo: {
            required: true,
            type: Function as PropType<() => void>,
        },
    },
})
</script>
