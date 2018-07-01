import { compose, withHandlers, withState, flattenProp, lifecycle } from 'recompose';

import Input from './Input';
import { isObject, isNumber } from 'utils/helper';

const handleKeyDown = event => {

	const { keyCode, key } = event;
	const { selectionStart:cursorPosition } = event.target;

	const selection = window.getSelection ?
		window.getSelection().toString().length :
		event.testSelection;
	const selectionLength = selection ? selection : false;

	const checkNumber = isNumber(key) ? {
		type:  'new',
		value: parseInt(key, 10)
	} : false;
	const checkBackspace = keyCode === 8 ? { type: 'backspace' } : false;
	const checkDelete = keyCode === 46 ? { type: 'delete' } : false;
	const checkNothing = { type: 'nothing' };

	const defineType = checkNumber || checkBackspace || checkDelete || checkNothing;

	return {
		...defineType,
		cursorPosition,
		selectionLength
	};

};

const handleChange = ({ dataChanged, mask, startCursorPosition }) => {

	const { type, value, selectionLength } = dataChanged;
	let { cursorPosition } = dataChanged;

	// just remove text
	if (selectionLength) {

		for (let index = cursorPosition; index < cursorPosition + selectionLength; index++) {

			if (isObject(mask[index])) {

				mask[index] = false;

			}

		}

	}

	if (type === 'new') {

		for (let index = cursorPosition; index < mask.length; index++) {

			if (!mask[index] || isObject(mask[index])) {

				mask[index] = { value };
				cursorPosition = index + 1;

				break;

			}

		}

	}

	if (!selectionLength && type === 'delete') {

		for (let index = cursorPosition; index < mask.length; index++) {

			if (isObject(mask[index])) {

				mask[index] = false;

				break;

			}

		}

	}

	if (!selectionLength && type === 'backspace') {

		for (let index = cursorPosition; index >= 0; index--) {

			if (isObject(mask[index])) {

				mask[index] = false;
				cursorPosition = index;

				break;

			}

		}

	}

	// correct cursor
	cursorPosition = cursorPosition ? cursorPosition : startCursorPosition;

	// make string value
	const { string } = mask.reduce((acc, item) => {

		if (isObject(item)) {

			acc.string += item.value;

		}

		if (item && !isObject(item)) {

			acc.string += item;

		}

		if (!item) {

			acc.string += ' ';

		}

		return acc;

	}, { string: '' });

	return {
		value: string,
		cursorPosition,
		mask
	};

};

const EnhanceInput = compose(
	withState('mask', 'setMask', props => ({
		...props,
		cursorPosition: 0
	})),
	flattenProp('mask'),
	withHandlers(() => {

		// ref link for change cursor position
		let input = null;
		// object is stored data about how to change text in input(create in onKeyDown)
		let dataChanged = false;

		return {
			innerRef:  () => ref => (input = ref),
			setCursor: () => value => input.setSelectionRange(value, value),
			onKeyDown: () => event => {

				dataChanged = handleKeyDown(event);

			},
			onChange: ({
				mask, startCursorPosition, setMask, validation
			}) => () => {

				const newState = handleChange({
					dataChanged,
					mask,
					startCursorPosition
				});

				dataChanged = false;

				newState && setMask(newState);
				validation && newState && validation(newState.mask);

			}
		};

	}),
	lifecycle({ componentDidUpdate() {

		this.props.setCursor(this.props.cursorPosition);

	} })
)(Input);

export const InputMask = EnhanceInput;
