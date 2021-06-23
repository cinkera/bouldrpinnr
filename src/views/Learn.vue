<template>
    <div class="wrapper">
        <svg-map :map="Usa" />
    </div>
</template>

<script>
    import { SvgMap } from "vue-svg-map";
    import Usa from "@svg-maps/usa";
export default {
    name: 'learn',
    data() {
		return {
			Usa,
            error: null, 
            loading: false
		};
	},
    components: {
        SvgMap
    },
    methods: {

    },
    created() {

    }
}
</script>

<style src="vue-svg-map/dist/index.css">
.wrapper {
    width: 100vh;
    height: 100vh;
}
</style>

