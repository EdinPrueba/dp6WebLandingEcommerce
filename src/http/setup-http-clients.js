import {
	createFixedAxios,
	createDynamicAxios
} from './http-factory';

export default function setupHttpClients(Vue) {
	const UPLOAD_URL = process.env.UPLOAD_URL;
	const URL_VALID_DOCUMENT_NUMBER = process.env.URL_VALID_DOCUMENT_NUMBER;
	const SALES_URL_HTTP2 = process.env.SALES_URL_HTTP2;
	const SALES_URL = process.env.SALES_URL;
	const API_GOOGLE_MAPS = process.env.API_GOOGLE_MAPS;
	const TOKEN = process.env.TOKEN;

	const headers = { Authorization: `Bearer ${TOKEN}` };
	/* eslint-disable no-param-reassign */
	Vue.prototype.$httpAcl = createFixedAxios('https://acl.casamarketapp.com/api');

	Vue.prototype.$httpUpLoad = createFixedAxios(UPLOAD_URL);
	Vue.prototype.$httpDocumentNumberValidating = createFixedAxios(URL_VALID_DOCUMENT_NUMBER);
	Vue.prototype.$http2 = createFixedAxios(SALES_URL_HTTP2);
	Vue.prototype.$httpUpdateTransaction = createFixedAxios(SALES_URL);
	Vue.prototype.$httpMaps = createFixedAxios(API_GOOGLE_MAPS);
	Vue.prototype.$httpSalesPublic = createFixedAxios(SALES_URL, headers);

	// DINAMICOS - CONSULTAN AL LOCAL STORAGE
	Vue.prototype.$httpProductsPublic = createDynamicAxios('PRODUCTS_URL', headers);
	Vue.prototype.$httpProductsReadPublic = createDynamicAxios('PRODUCTS_REPORT', headers);
	Vue.prototype.$httpSalesReadPublic = createDynamicAxios('SALES_REPORT', headers);

	Vue.prototype.$httpProducts = createDynamicAxios('PRODUCTS_URL');
	Vue.prototype.$httpSales = createDynamicAxios('SALES_URL');
	Vue.prototype.$httpProductsRead = createDynamicAxios('PRODUCTS_REPORT');
	Vue.prototype.$httpSalesRead = createDynamicAxios('SALES_REPORT');
}

