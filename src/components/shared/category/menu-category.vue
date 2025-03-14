<template>
	<div class="wrapper-big-category">
		<div class="wrapper-list-category">
			<div class="filters-category">
				<div
					@click="showCategory"
					class="section-filter-row"
					:style="`border-color: ${globalColors.primary}`"
				>
					<div class="content-filter-title">
						<p class="title-section" :style="`color: ${globalColors.primary}`">
							Categorías
						</p>
					</div>
					<div class="simple-svg-container">
						<simple-svg
							filepath="/static/img/arrow-left.svg"
							:fill="globalColors.primary"
							width="11"
							class="icon-c"
							:class="{ 'rotate-icon-c': showC }"
						/>
					</div>
				</div>
				<div v-if="showC" class="category-list">
					<list-category
						v-for="category in categories"
						:key="category.id"
						:data="category"
						:breadcrumbs="breadcrumbs"
						@change-category="changeCategory"
						@open-category="openCategory"
					/>
				</div>
			</div>

			<filters-category
				:reset-attributes="resetAttributes"
				:attributes="attributes"
				:features="features"
				@on-features="onFeatures"
				@attributes="setAtributes"
			></filters-category>
			<div class="wrapper-btns py-3">
				<app-button
					action="Cerrar"
					class="btn-modal mr-2"
					:active="false"
					:border="globalColors.primary"
					@click="$emit('close')"
				/>
				<!-- <app-button
					action="Filtrar"
					class="btn-modal"
					:background="globalColors.secondary"
				/> -->
			</div>
		</div>
		<button class="btn-menu-category" @click="$emit('toggle')">
			<simple-svg
				filepath="/static/img/arrow-left.svg"
				:fill="globalColors.primary"
				width="11"
				class="icon"
				:class="{ 'rotate-icon': toggle }"
			/>
		</button>
	</div>
</template>

<script>
import filtersCategory from '@/components/shared/category/filters-category';
import listCategory from '@/components/shared/category/list-category';
import appButton from '@/components/shared/buttons/app-button';

function filterCategory() {
	this.$emit('filter', this.categories);
}

function changeCategory(dataCategory) {
	this.$emit('change-category', dataCategory);
}

function openCategory(id) {
	this.$emit('open-category', id);
}

function setAtributes(attr) {
	this.$emit('attribute-selected', attr);
}

function data() {
	return {
		close: true,
		showC: false,
	};
}

export default {
	data,
	name: 'menu-category',
	components: {
		appButton,
		filtersCategory,
		listCategory,
	},
	methods: {
		changeCategory,
		filterCategory,
		openCategory,
		setAtributes,
		onFeatures(value) {
			this.$emit('on-features', value);
		},
		showCategory() {
			this.showC = !this.showC;
		},
	},
	props: {
		attributes: {
			type: Array,
			default: () => [],
		},
		categories: {
			type: Array,
			default: () => [],
		},
		titleCategory: {
			type: String,
			default: '',
		},
		breadcrumbs: {
			data: {
				type: Array,
				default: () => [],
			},
		},
		resetAttributes: {
			type: Boolean,
			required: true,
		},
		toggle: {
			type: Boolean,
			required: true,
		},
		features: {
			type: Array,
			default: () => [],
		},
	},
};
</script>

<style lang="scss" scoped>
.wrapper-big-category {
	display: flex;
	height: 100%;
	position: relative;

	@media (min-width: 1440px) {
		max-height: 840px;
		overflow-y: auto;
	}

	@media (max-width: 1440px) {
		max-height: 1150px;
		overflow-y: auto;
	}

	@media (max-width: 986px) {
		border-right: none;
	}
}

.btn-menu-category {
	position: relative;
	width: 30px;

	.toggle {
		position: absolute;
		left: 8px;
		top: 30%;
		transform: rotate(180deg);
	}

	@media (max-width: 986px) {
		display: none;
	}
}

.wrapper-list-category {
	border-right: 1px solid color(border);
	overflow-x: scroll;
	padding-right: 20px;
	width: 300px;

	@media (max-width: 986px) {
		border-right: none;
		max-width: none;
		padding-right: 0;
		width: 100%;
	}
}

.wrapper-btns {
	border-top: 1px solid color(border);
	display: none;
	justify-content: center;

	.btn-modal {
		width: 40%;
	}

	@media (max-width: 986px) {
		display: flex;
	}
}

.icon {
	transform: rotateZ(0deg);

	&.rotate-icon {
		transform: rotateZ(180deg);
	}
}

.icon-c {
	transform: rotateZ(270deg);

	&.rotate-icon-c {
		transform: rotateZ(450deg);
	}
}

.filters-category {
	border-top: 1px solid var(--color-border);
	padding-top: 20px;
	padding-bottom: 30px;

	.section-filter-row {
		align-items: center;
		border-bottom: 3px solid;
		display: flex;
		justify-content: space-between;
		padding: 0 20px 15px 20px;
		width: 100%;
		cursor: pointer;
	}
	
	.content-filter-title {
		display: flex;
		align-items: center;

		.title-section {
			font-family: font(bold);
			font-size: size(xlarge);
			margin: 0 0 0 11px;
		}
	}

	.simple-svg-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.category-list {
		padding-top: 15px;
	}
}

.icon {
	transition: transform 0.3s ease;
}
</style>
