/* const a = {
    name: 'App',
    components: {
        HelloWorld,
    },
    data: () => ({
        a: 1212 as number,
        b: 'string' as string,
        c: { o: 1 },
    }),
    created() {
        this.a = 123
    },
}
 */
const a = {
    name: 'App',
    components: {
        HelloWorld,
    },
    data: function () {
        return {
            a: '12dsa12' as string,
            b: 'string' as string,
            c: { o: 1 },
        }
    },
    created() {
        this.a = 123
    },
}
