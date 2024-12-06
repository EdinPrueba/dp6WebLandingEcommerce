<template>
	<div class="filters-category">
		<div
			class="section-filter-row"
			:style="`border-color:${globalColors.primary}`"
			@click="showFilter"
		>
			<div class="content-filter-title">
				<button-image :data="iconFilter"></button-image>
				<p class="title-section" :style="`color: ${globalColors.primary}`">
					Filtros
				</p>
			</div>
			<div class="simple-svg-container">
				<simple-svg
					filepath="/static/img/arrow-left.svg"
					:fill="globalColors.primary"
					width="11"
					class="icon"
					:class="{ 'rotate-icon': false }"
				/>
			</div>
		</div>
		<div class="dynamic-filters" v-if="show">
			<div v-for="c in characteristics" :key="c.id" class="filter-section">
				<h3>
					{{ c.name }}
				</h3>
				<label v-for="feature in c.features" :key="feature.id">
					<input
						type="checkbox"
						:value="feature.name"
						v-model="selectedFeatures"
					/>
					{{ feature.name }}
				</label>
			</div>
		</div>
		<!-- <div class="content-filter mt-4" v-if="contentFilters"> -->
		<!-- <p class="text-price">Precio</p> -->
		<!-- <v-layout row>
				<v-flex shrink class="input-number-price-min">
				<v-text-field
					class="mt-0"
					hide-details
					single-line
					type="number"
				></v-text-field>
				</v-flex>
				<v-flex class="pl-3">
				<v-range-slider
					:step="1">
							</v-range-slider>
				</v-flex>
				<v-flex shrink class="input-number-price-max">
							<v-text-field
								class="mt-0 number"
								hide-details
								single-line
								type="number"
							></v-text-field>
				</v-flex>
			</v-layout>
		  	<div class="content-number">
				<p class="number-filter">{{getCurrencySymbol}} {{filters.priceMin}}</p>
				<p class="number-filter">{{getCurrencySymbol}} {{filters.priceMax}}</p>
			</div> -->
		<!-- <app-input
			class="field"
			type="text"
			v-model="filters.price" /> -->
		<!-- <v-layout
				mt-2
				mb-2
				v-for="(attr, indexAttr) in attributes"
				:key="indexAttr"
			>
				<app-select
					returnObject
					item-text="name"
					class="input-filter"
					:placeholder="attr.name"
					:items="attr.attributeDetail"
					v-model="filters[attr.name]"
					@input="setAttributes($event, attr)"
				/>
			</v-layout>
		</div> -->
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import appInput from '@/components/shared/inputs/app-input';
import appSelect from '@/components/shared/inputs/app-select';
import buttonImage from '@/components/shared/buttons/app-button-image';

function closeCategory() {
	this.closeFilters = true;
	this.contentFilters = true;
	this.openUp = false;
}

function openFilters() {
	this.closeFilters = false;
	this.contentFilters = false;
	this.openUp = true;
}

function setAttributes(detail, attr) {
	const { code } = detail;
	const { name: attrName } = attr;
	this.filters[attrName] = code;
	this.$emit('attributes', this.filters);
}

function resetAttributes(newValue) {
	if (newValue) {
		const keys = Object.keys(this.filters);
		keys.forEach((k) => {
			this.filters[k] = '';
		});
	}
}

function data() {
	return {
		filters: {},
		arrowUp: {
			image:
				'https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/arrow-down-sign-to-navigate.svg',
			name: 'up',
			height: 15,
		},
		arrowDown: {
			image:
				'https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/up-arrow.svg',
			name: 'down',
			height: 15,
		},
		iconFilter: {
			image: '/static/img/icons/filter-category-red.svg',
			name: 'icon-filter',
			height: 21,
		},
		closeFilters: true,
		contentFilters: true,
		openUp: false,
		show: true,
		selectedFeatures: [],
	};
}

export default {
	name: 'filters-category',
	computed: {
		...mapGetters(['getCurrencySymbol', 'token']),
	},
	components: {
		appInput,
		appSelect,
		buttonImage,
	},
	data,
	methods: {
		closeCategory,
		openFilters,
		setAttributes,
		showFilter() {
			this.show = !this.show;
		},
	},
	props: {
		attributes: {
			type: Array,
			required: true,
		},
		resetAttributes: {
			type: Boolean,
			required: true,
		},
		characteristics: {
			type: Array,
			required: true,
		},
	},
	watch: {
		resetAttributes,
		selectedFeatures(newValue) {
			const result = newValue.join(', ');
			this.$emit('on-features', result);
		},
	},
};
</script>

<style lang="scss" scoped>
.filters-category {
	border-top: 1px solid color(border);
	padding-top: 40px;
	padding-bottom: 30px;
}

.title-section {
	font-family: font(bold);
	font-size: size(xlarge);
	margin: 0 0 0 11px;
}

.text-price {
	color: color(base);
	font-family: font(regular);
	font-size: size(medium);
	margin: 19px 0 0 0;
}

.section-filter-row {
	align-items: center;
	border-bottom: 3px solid;
	display: flex;
	justify-content: space-between;
	padding: 0 20px 15px 20px;
	width: 100%;
}

.input-price {
	background-color: color(white);
	border: solid 1px color(border);
	border-radius: 4px;
	color: color(base);
	font-family: font(regular);
	font-size: 12px;
	height: 24px;
	margin-top: 9px;
	padding-left: 10px;
	width: 92px;
}

.input-filter {
	width: 100%;
}

.number {
	position: relative;
	right: 20px;
}

.number-filter {
	color: color(base);
	font-family: font(regular);
	font-size: size(small);
}

.content-number {
	display: flex;
	justify-content: space-between;
	width: 78%;
}

.input-number-price-min {
	width: 75px;
}

.input-number-price-max {
	width: 20px;
}

.content-filter {
	padding: 0 30px;
}

.icon-filter {
	height: 21px;
}

.content-filter-title {
	display: flex;
}

.icon {
	transform: rotateZ(270deg);

	&.rotate-icon {
		transform: rotateZ(450deg);
	}
}
.simple-svg-container {
	width: 1rem;
}

.dynamic-filters {
	font-family: Arial, sans-serif;
	background-color: #f9f9f9; /* Fondo claro para los filtros */
	border: 1px solid #ddd; /* Bordes sutiles */
	border-radius: 8px;
	padding: 15px;
	max-width: 300px;
}

.filter-section {
	margin-bottom: 20px; /* Espaciado entre secciones */
}

.filter-section h3 {
	font-size: 16px; /* Tamaño de letra adecuado */
	font-weight: bold;
	color: #333; /* Color oscuro para el texto */
	margin-bottom: 10px; /* Separación con las opciones */
}

label {
	display: flex;
	align-items: center; /* Alinea el checkbox con el texto */
	margin-bottom: 8px; /* Espaciado entre opciones */
	cursor: pointer; /* Indica interactividad */
}

input[type='checkbox'] {
	margin-right: 8px; /* Espaciado entre el checkbox y el texto */
	width: 16px; /* Ajusta el tamaño del checkbox */
	height: 16px;
	accent-color: #007bff; /* Cambia el color del checkbox cuando está activo */
}

label:hover {
	background-color: #f0f0f0; /* Fondo al pasar el ratón */
	border-radius: 4px;
}

.dynamic-filters button {
	display: block;
	margin: 20px auto 0; /* Centra el botón */
	background-color: #007bff; /* Color del botón */
	color: white;
	border: none;
	padding: 10px 20px;
	border-radius: 5px;
	font-size: 14px;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

.dynamic-filters button:hover {
	background-color: #0056b3; /* Color más oscuro al pasar el ratón */
}
</style>
