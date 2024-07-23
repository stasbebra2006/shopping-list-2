<template>
	<h1>Lists</h1>

	<template v-if="!shoppingLists">
		<p>Načítavam dáta</p>
	</template>

	<template v-else-if="shoppingLists.error">
		Pri načítaní dát nastala chyba: {{ shoppingLists.error }}
	</template>

	<template v-else>
		Počet položiek v zozname: {{ shoppingLists.length }}
	</template>
</template>



<script>
import axios from 'axios'

export default {
	data() {
		return {
			shoppingLists: null
		}
	},

	async mounted() {
		try {
			const { data: { data: shoppingLists} } = await axios.get('/api/v1/shopping-lists')
			this.shoppingLists = shoppingLists
		} catch (error) {
			console.error('Error:', error)
			this.shoppingLists = { error }
		}
	}
}
</script>