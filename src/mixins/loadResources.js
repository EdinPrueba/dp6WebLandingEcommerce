function getDomainsFromStorage() {
	const item = localStorage.getItem(`${process.env.STORAGE_USER_KEY}::domains`);
	return item ? JSON.parse(item) : null;
}

async function created() {
	let domains = getDomainsFromStorage();
	if (!domains) {
		await this.loadDomians();
		domains = getDomainsFromStorage();

		if (domains) {
			window.location.reload();
			return;
		}
	}
	await this.loadCommerceData();
	await this.loadResource();
}

async function loadCommerceData() {
	const requests = [this.$store.dispatch('LOAD_COMMERCE_INFO', this)];
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
			const requests = [
				this.$store.dispatch('LOAD_DOMAINS', { context: this }),
			];
			await Promise.all(requests);
		},
		loadCommerceData,
		loadResource,
	},
};
