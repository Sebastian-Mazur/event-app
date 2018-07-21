<template>
	<div id="app">
		<v-app>
			<Navigator />
			<v-content>
				<v-container>
					<router-view/>
				</v-container>
			</v-content>
			<Footer />
		</v-app>
	</div>
</template>

<script>
import Navigator from "./components/Navigator.vue";
import Footer from "./components/Footer.vue";

export default {
    name: "App",
    components: {
        Navigator,
        Footer
    }
};
</script>

<style>
.input-group.input-group--error .input-group__messages {
    color: none;
}
</style>