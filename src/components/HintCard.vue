<template>
    <v-card class="hint" height="50" width="500">
        {{this.hint}}
    </v-card>
</template>

<script>
    export default {
        name: "HintCard",
        props: ['hint'],
        mounted() {
            console.log('\n\nhintCard mounted, this.hint: ', this.hint);
        },
        data () {
            return {
                
            }
        }
    }
</script>

<style scoped>
.hint {
    padding: 5px;
    margin: 2px auto;
}
</style>
