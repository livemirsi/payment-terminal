export const isObject = value => {

	return value && typeof value === 'object' && value.constructor === Object;

};

export const isNumber = value => {

	const checkValue = parseInt(value, 10);

	return typeof checkValue === 'number' &&
    isFinite(checkValue) &&
    Math.floor(checkValue) === checkValue;

};

