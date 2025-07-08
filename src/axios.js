import axios from 'axios';
import helper from '@/shared/helper';

const aclInstance = axios.create({
	// baseURL: process.env.ACL_URL,
	baseURL: 'https://acl.casamarketapp.com/api',
});

const productsUrl = helper.getKeyStorage('PRODUCTS_URL') || '';
const productsInstance = axios.create({
	baseURL: productsUrl.endPoint,
});

const productsPublicInstance = axios.create({
	baseURL: productsUrl.endPoint,
	headers: {
		Authorization: `Bearer ${process.env.TOKEN}`,
	},
});

const salesUrl = helper.getKeyStorage('SALES_URL') || '';
const salesInstance = axios.create({
	baseURL: salesUrl.endPoint,
});

const httpsMaps = axios.create({
	baseURL: process.env.API_GOOGLE_MAPS,
});

const updateTransactionIntance = axios.create({
	baseURL: process.env.SALES_URL,
});

const salesPublicInstance = axios.create({
	baseURL: process.env.SALES_URL,
	headers: {
		Authorization: `Bearer ${process.env.TOKEN}`,
	},
});

const uploadInstance = axios.create({
	baseURL: process.env.UPLOAD_URL,
});

const documentNumberValidating = axios.create({
	baseURL: process.env.URL_VALID_DOCUMENT_NUMBER,
});

const http2Instance = axios.create({
	baseURL: process.env.SALES_URL_HTTP2,
});

const productsReadUrl = helper.getKeyStorage('PRODUCTS_REPORT') || '';
const productsReadReportPublic = axios.create({
	baseURL: productsReadUrl.endPoint,
	headers: {
		Authorization: `Bearer ${process.env.TOKEN}`,
	},
});

const salesReadUrl = helper.getKeyStorage('SALES_REPORT') || '';
const saleReadReportPublic = axios.create({
	baseURL: salesReadUrl.endPoint,
	headers: {
		Authorization: `Bearer ${process.env.TOKEN}`,
	},
});

const productsReadReport = axios.create({
	baseURL: productsReadUrl.endPoint,
});

const saleReadReport = axios.create({
	baseURL: salesReadUrl.endPoint,
});

export default function (Vue) {
	/* eslint-disable no-param-reassign */
	Vue.prototype.$httpProducts = productsInstance;
	Vue.prototype.$httpAcl = aclInstance;
	Vue.prototype.$httpSales = salesInstance;
	Vue.prototype.$httpSalesPublic = salesPublicInstance;
	Vue.prototype.$httpProductsPublic = productsPublicInstance;
	Vue.prototype.$httpUpLoad = uploadInstance;
	Vue.prototype.$httpDocumentNumberValidating = documentNumberValidating;
	Vue.prototype.$http2 = http2Instance;
	Vue.prototype.$httpUpdateTransaction = updateTransactionIntance;
	Vue.prototype.$httpProductsReadPublic = productsReadReportPublic;
	Vue.prototype.$httpSalesReadPublic = saleReadReportPublic;
	Vue.prototype.$httpProductsRead = productsReadReport;
	Vue.prototype.$httpSalesRead = saleReadReport;
	Vue.prototype.$httpMaps = httpsMaps;
}
