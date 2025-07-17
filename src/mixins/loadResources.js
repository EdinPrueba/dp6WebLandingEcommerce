async function created() {
	const domains = JSON.parse(localStorage.getItem(`${process.env.STORAGE_USER_KEY}::domains`));
	if (!domains) {
		await this.loadDomians();
	}
	await this.loadCommerceData();
	await this.loadResource();
}

async function loadCommerceData() {
	const requests = [
		this.$store.dispatch('LOAD_COMMERCE_INFO', this),
	];
	await Promise.all(requests);
}

async function loadResource() {
	const requests = [
		this.$store.dispatch('LOAD_BANNERS', this),
		this.$store.dispatch('LOAD_CATEGORIES', { context: this }),
		this.$store.dispatch('LOAD_PRODUCTS', { context: this }),
	];
	await Promise.all(requests);
}

export default {
	created,
	methods: {
		async loadDomians() {
			await this.$store.dispatch('LOAD_DOMAINS', { context: this });
			// const requests = [
			// ];
			// await Promise.all(requests);
		},
		loadCommerceData,
		loadResource,
	},
};
