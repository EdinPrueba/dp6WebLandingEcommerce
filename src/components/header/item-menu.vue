<template>
	<div
		class="item-menu"
		@click.stop="$emit('click-item', data)"
		@mouseenter="$emit('hover-item', data)"
	>
		<img
			v-if="showImage"
			:src="data.webImage"
			:class="[
				'img-menu',
				{ 'applying-filters': iconCategory },
				{ active: data.select && iconCategory },
			]"
			@error="handleImageError"
		/>
		<span
			class="item-text"
			:style="
				data.select
					? `color: white`
					: `color: ${globalColors.title};transition:all 200ms ease-in;`
			"
			>{{ data.title }}</span
		>
	</div>
</template>
<script>
function iconCategory() {
	const noIcon = process.env.NO_ICON_CATEGORY;
	return !(noIcon && noIcon === 'true');
}
export default {
	name: 'item-menu',
	computed: {
		iconCategory,
	},
	data() {
		return {
			showImage: true,
		};
	},
	methods: {
		handleImageError() {
			this.showImage = false;
		},
	},
	props: {
		data: {
			type: Object,
			default: () => {},
		},
	},
};
</script>
<style lang="scss" scoped>
.item-menu {
	align-items: center;
	display: flex;
}

.item-text {
	color: color(dark);
	font-family: font(bold);
	font-size: size(medium);
	margin-left: 12px;

	@media (max-width: 764px) {
		font-size: size(small);
	}
}

.applying-filters {
	filter: brightness(0) invert(0.28);
}

.img-menu {
	height: 27px;
	width: 27px;

	@media (max-width: 764px) {
		width: 24px;
	}
}

.active {
	filter: brightness(10);
}
</style>
