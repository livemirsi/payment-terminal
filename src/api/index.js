import fakeData from './fakeData';
import { isObject } from 'utils/helper';

const randomPause = (min, max) => Math.random() * (max - min) + min;

/**
 *
 * @description - do request to server
 * @param {string | object} data -  data for request
 * @return {object}
 */

function getDataFromPoint (data) {

	const point = isObject(data) ? data.point : data;
	const param = isObject(data) ? data.param : false;

	return new Promise((resolve, reject) => {

		setTimeout(() => {

			if (point === 'operators') {

				resolve({
					name:   'operators',
					values: fakeData[point]
				});

			}

			if (point === 'pay') {

				// generate random error
				if (Math.random() >= 0.5) {

					resolve({
						name:   'pay',
						values: fakeData[point]
					});

				} else {

					resolve({
						name:   'pay',
						values: { status: 'error' }
					});

				}

			}

			if (point === 'operator') {

				const [operator] = fakeData.operators.filter(item => item.name === param);
				resolve({
					name:   'operator',
					values: operator
				});

			}

			reject(new Error('unknown point on server'));

		}, randomPause(1000, 2000));

	});

}

/**
 *
 * @description - generate poin as string
 * @param {string | function} point - making string or object data for request
 * @param {object} props -  props from component
 * @return {string | object}
 */

export function generatePoint (point, props) {

	if (typeof point === 'string') {

		return point;

	}

	if (typeof point === 'function') {

		const data = point(props);

		return isObject(data) ? data : `${data.point}/${data.param}`;

	}

	throw new Error('unknown type of point');

}

/**
 *
 * @description - do request to Api
 * @param {array} points - element of array is string or function
 * @param {object} props -  props from component
 * @return {promise}
 */

export function requestToApi (points, props) {

	const requests = points.map(point => getDataFromPoint(generatePoint(point, props)));

	return Promise.all(requests)
		.then(responce => {

			const data = responce.reduce((acc, item) => {

				const { name, values } = item;
				acc[name] = values;

				return acc;

			}, {});

			return data;

		})
		.catch(error => ({ error }));

}
