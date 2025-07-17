<template>
	<div class="product-buy">
		<!-- <div class="container-btn-open" v-if="false">
			<p class="warehouse-null" v-if="openWarehouse">No hay tiendas disponibles</p>
			<button
				data-cy="see-available-warehouse"
				v-if="!openWarehouse && productTypeService"
				:class="[
					isLoading ? 'loading stores' : 'btn-stores',
				]"
				@click="$emit('open-dialog')"
			>Ver tiendas disponibles</button>
		</div> -->
		<div class="container-buttons">
			<quantityButton
				:is-edit-number="editNumber"
				:class="['continer-quantity-button', { loading: isLoading }]"
				@click="clickQuantity"
				@input="$emit('update-number', $event)"
				:number="number"
			/>
			<app-button-order
				active
				button-title="¡LO QUIERO!"
				:disabled-order="disabledOrder || disabledBuy"
				:class="[isLoading ? 'loading' : 'btn']"
				@click="$emit('add-to-car')"
			>
				<div>
					<image-check
						active
						active-color="white"
						class="image-btn"
						:inactive-color="globalColors.primary"
					/>
				</div>
			</app-button-order>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import quantityButton from '@/components/shared/buttons/quantity-button';
import appButtonOrder from '@/components/shared/buttons/app-button-order';
import imageCheck from '@/components/shared/icons/check-component';
import { getDeeper } from '@/shared/lib';

function clickQuantity(value) {
	this.$emit('click', value);
}

function productTypeService() {
	return getDeeper('typeInfo.code')(this.product) !== 'servicios';
}

export default {
	name: 'product-buy',
	components: {
		quantityButton,
		appButtonOrder,
		imageCheck,
	},
	computed: {
		...mapGetters('loading', ['isLoading']),
		productTypeService,
		editNumber() {
			if (this.product.priceList) {
				const array = Object.entries(this.product.priceList).map(
					([
						id,
						{
							price = 0,
							taxes = 0,
							discount = 0,
							unitPrice = 0,
							ranges = [],
							units = {},
						},
					]) => ({
						id,
						price,
						taxes,
						discount,
						unitPrice,
						ranges,
						units: Object.entries(units).map(([unitId, unit = {}]) => ({
							id: unitId,
							price: unit.price || 0,
							taxes: unit.taxes || 0,
							ranges: unit.ranges || [],
							discount: unit.discount || 0,
							unitPrice: unit.unitPrice || 0,
						})),
					}),
				);
				const priceList =
					array.find(obj => Number(obj.id) === this.unit.id) ||
					array
						.map(obj =>
							obj.units.find(unit => Number(unit.id) === this.unit.id),
						)
						.find(unit => unit);
				const validate = priceList || array[0];
				return Boolean(
					validate &&
						validate.ranges.length &&
						validate.ranges.some(range => range.to !== 0 || range.price !== 0),
				);
			}
			return false;
		},
	},
	methods: {
		clickQuantity,
	},
	props: {
		number: Number,
		openWarehouse: false,
		product: {
			required: true,
			type: Object,
		},
		disabledOrder: {
			type: Boolean,
			default: false,
		},
		disabledBuy: {
			type: Boolean,
			default: false,
		},
		unit: {
			default: () => {},
			type: Object,
		},
	},
};
</script>
<style lang="scss" scoped>
.product-buy {
	.btn {
		width: 197px;
	}

	.image-btn {
		margin-right: 12px;
	}

	.btn-stores {
		border-bottom: 1px solid color(dark);
		font-size: size(small);
		margin-bottom: 18px;

		@media screen and (max-width: 996px) {
			margin-bottom: 0px;
		}
	}

	.container-buttons {
		display: flex;

		@media screen and (max-width: 996px) {
			justify-content: center;
			padding: 0 5%;
		}
	}

	.continer-quantity-button {
		margin-right: 17px;
	}
}

.container-btn-open {
	@media screen and (max-width: 996px) {
		border: 1px solid color(border);
		padding: 15px;
		margin-bottom: 33px;
		text-align: center;
	}
}

.stores {
	margin-bottom: 10px;
}

.warehouse-null {
	color: #acaaaa;
	font-family: font(regular);
	font-size: 12px;
}
</style>
