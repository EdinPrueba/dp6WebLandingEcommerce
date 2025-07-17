import axios from 'axios';
import helper from '@/shared/helper';
import {
	httpRequestInterceptor,
	httpResponseInterceptor,
	httpResponseSuccessInterceptor,
} from './interceptors';

/**
 * Aplica interceptores estándar a una instancia de Axios
 */
function applyInterceptors(instance) {
	instance.interceptors.request.use(httpRequestInterceptor);
	instance.interceptors.response.use(
		httpResponseSuccessInterceptor,
		httpResponseInterceptor
	);
	return instance;
}

/**
 * Crea una instancia Axios simple con una baseURL fija
 */
export function createFixedAxios(baseURL, headers = {}) {
	const instance = axios.create({ baseURL, headers });
	return applyInterceptors(instance);
}

/**
 * Crea una instancia Axios con baseURL obtenida dinámicamente (por ejemplo, desde localStorage)
 */
export function createDynamicAxios(storageKey, headers = {}) {
	const instance = axios.create({});

	// Interceptor para setear dinámicamente la baseURL antes de cada request
	instance.interceptors.request.use((config) => {
		const newConfig = { ...config };
		const storageValue = helper.getDomainDynamic(storageKey);
		if (storageValue && storageValue.endPoint) {
			newConfig.baseURL = storageValue.endPoint;
		}
		newConfig.headers = {
			...newConfig.headers,
			...headers,
		};
		return config;
	});

	return applyInterceptors(instance);
}
