import React from 'react';
import { mount } from 'enzyme';
import { InputMask } from 'ui/InputMask';
import { isObject } from 'utils/helper';

describe('test define type events', () => {

	const testMask = ['+', '7', ' ', '(', ' ', false, false, false, ' ', ')',
		' ', false, false, false,
		' ', false, false,
		' ', false, false];

	const wrapper = mount(
		<InputMask
			mask={testMask}
			value={'+7 ( '}
			startCursorPosition={5}
		/>
	);

	const pressNumber = (numbers, props) => {

		const currentProps = isObject(props) ? props : {};

		for (const number of numbers) {

			wrapper.simulate('keyDown', {
				key: number,
				...currentProps
			});
			wrapper.simulate('change');

		}

	};

	const pressButton = (count, props) => {

		const currentProps = isObject(props) ? props : {};

		for (let index = 0; index < count; index++) {

			wrapper.simulate('keyDown', { ...currentProps });
			wrapper.simulate('change');

		}

	};

	const compareResult = result => {

		const { mask, cursorPosition } = wrapper.find('Input').props();
		expect({
			mask,
			cursorPosition
		}).toEqual(result);

	};

	test('test write phone', () => {

		// const phone = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1];
		const result = {
			mask: [
				'+', '7', ' ', '(', ' ',
				{ value: 1 }, { value: 2 }, { value: 3 },
				' ', ')', ' ',
				{ value: 4 }, { value: 5 }, { value: 6 },
				' ',
				{ value: 7 }, { value: 8 },
				' ',
				{ value: 9 }, { value: 1 }],
			cursorPosition: 20
		};

		pressNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 1]);
		compareResult(result);

	});

	test('test remove text use backspace', () => {

		const result = {
			mask: [
				'+', '7', ' ', '(', ' ',
				false, false, false,
				' ', ')', ' ',
				false, false, false,
				' ',
				false, false,
				' ',
				false, false],
			cursorPosition: 5
		};

		pressButton(10, { keyCode: 8 });
		compareResult(result);

	});

	test('test remove text use delete', () => {

		const result = {
			mask: [
				'+', '7', ' ', '(', ' ',
				false, false, false,
				' ', ')', ' ',
				{ value: 4 }, { value: 5 }, false,
				' ',
				false, false,
				' ',
				false, false],
			cursorPosition: 5
		};

		pressButton(10, { keyCode: 8 });
		pressNumber([1, 2, 3, 4, 5]);
		pressButton(3, {
			keyCode: 46,
			target:  { selectionStart: 5 }
		});
		compareResult(result);

	});

	test('test write 3 symbol in empty space', () => {

		const result = {
			mask: [
				'+', '7', ' ', '(', ' ',
				{ value: 1 }, { value: 2 }, { value: 3 },
				' ', ')', ' ',
				{ value: 4 }, { value: 5 }, false,
				' ',
				false, false,
				' ',
				false, false],
			cursorPosition: 8
		};

		pressNumber([1, 2, 3]);
		compareResult(result);

		// remove all
		pressButton(10, {
			keyCode: 46,
			target:  { selectionStart: 5 }
		});

	});

	test('test press key with selection text', () => {

		const result = {
			mask: [
				'+', '7', ' ', '(', ' ',
				{ value: 1 }, { value: 2 }, { value: 3 },
				' ', ')', ' ',
				{ value: 9 }, false, false,
				' ',
				false, false,
				' ',
				false, false],
			cursorPosition: 12
		};

		pressNumber([1, 2, 3, 9]);
		pressButton(1, {
			key:           9,
			testSelection: 2,
			target:        { selectionStart: 11 }
		});
		compareResult(result);

	});

	test('highlight all text and press backspace ', () => {

		const result = {
			mask: [
				'+', '7', ' ', '(', ' ',
				false, false, false,
				' ', ')', ' ',
				false, false, false,
				' ',
				false, false,
				' ',
				false, false],
			cursorPosition: 5
		};

		pressNumber([7, 8, 9, 5, 6, 4]);
		pressButton(1, {
			keyCode:       8,
			target:        { selectionStart: 0 },
			testSelection: 20
		});
		compareResult(result);

	});

});
