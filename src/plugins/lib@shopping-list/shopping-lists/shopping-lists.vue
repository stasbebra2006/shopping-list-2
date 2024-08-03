<template>
	<div>
		<h1>Lists</h1>

		<template v-if="!shoppingLists">
			<p>Loading data</p>
		</template>

		<template v-else-if="shoppingLists.error">
			An error occurred while loading the data: {{ shoppingLists.error }}
		</template>

		<template v-else>
			<div class="container">
				Quantity of the cards: {{ shoppingLists.length }}
			</div>
			<div v-for="list in shoppingLists" :key="list.id" class="card">
				<h2 class="card__name">{{ list.title }}</h2>
				<ul class="card__list">
					<li v-for="item in list.items" :key="item.id" class="card__item">
						<!-- {{ item.name }} - {{ item.value }} {{ item.unit }} - {{ item.is_checked ? 'Checked' : 'Unchecked' }}-->
						{{ item.name }}
					</li>
				</ul>
			</div>
		</template>
	</div>
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
			console.log(shoppingLists)
		} catch (error) {
			console.error('Error:', error)
			this.shoppingLists = { error }
		}
	}
}
</script>

<style scoped>
.container {
    padding: 20px; /* Add padding to the container to prevent overlap */
}

.card {
    position: relative;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card__name {
    position: absolute;
    top: 8px;
    left: 8px;
    margin: 0;
    font-size: 1.5em;
	color:#fff;
    background-color: rgba(255, 255, 255, 0.8); /* Ensure text is readable */
    padding: 4px 8px;
    border-radius: 4px;
}

.card__list {
    list-style-type: none;
    padding: 0;
    margin-top: 40px; /* Ensure list items don't overlap with the title */
}

.card__item {
    padding: 8px 0;
	font-size: 1.2em;
	color: #666;
}

.card__item:last-child {
    border-bottom: none;
}
</style>