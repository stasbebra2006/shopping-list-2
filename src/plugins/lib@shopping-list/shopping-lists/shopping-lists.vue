<template>
	<div class="shopping-lists">
		<div class="the-main-text">
			<h1>Lists</h1>
		</div>

		<template v-if="!shoppingLists">
			<div class="the-main-text">
				<p>Loading data</p>
			</div>
		</template>

		<template v-else-if="shoppingLists.error">
			<div class="the-main-text">
				<h2>
					An error occurred while loading the data: {{ shoppingLists.error }}
				</h2>
			</div>
		</template>

		<template v-else>
			<div class="quantity">
				<h2>
					Quantity of the cards: {{ shoppingLists.length }}
				</h2>
			</div>
			<div v-for="list in shoppingLists" :key="list.id" class="card">
				<h2 class="card__name">{{ list.title }}</h2>
				<ul class="card__list">
					<li v-for="item in list.items" :key="item.id" class="card__item">
						
						<span class="item-name">{{ item.name }}</span>
						<label class="item-details">
							{{item.value}} {{item.unit}}
							<input type="checkbox" v-model="item.is_checked" />
						</label>
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

<style>

body {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #21D4FD;
background-image: linear-gradient(57deg, #21D4FD 21%, #B721FF 100%);



}

.shopping-lists {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
	background: transparent;
}

.quantity	 {
    padding: 20px;
	user-select: none;
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
    color: #ffffff;
	background-image: radial-gradient( circle 382px at 50% 50.2%,  rgba(73,76,212,1) 0.1%, rgba(3,1,50,1) 100.2% );
    padding: 4px 8px;
    border-radius: 4px;
	user-select: none;
}

.card__list {
    list-style-type: none;
    padding: 0;
    margin-top: 40px;
}

.card__item {
    padding: 8px 0;
    font-size: 1.2em;
    color: #666;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.item-name {
    font-weight: bold;
    font-size: 1.2em;
	user-select: none;
}

.item-details {
    font-style: italic;
    color: #fff;
	background-image: linear-gradient( 93.2deg,  rgba(24,95,246,1) 14.4%, rgba(27,69,166,1) 90.8% );
    display: flex;
    align-items: center;
    font-size: 1.2em;
	padding: 4px 8px;
	border-radius: 4px;
	user-select: none;
}

.item-details input[type="checkbox"] {
    margin-left: 8px;
}

.the-main-text
{
	text-align: center;
	color: #fff;
	font-size: 2em;
	user-select: none;
}
</style>