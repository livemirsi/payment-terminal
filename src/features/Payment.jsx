import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isObject, isNumber } from 'utils/helper';
import { compose, withProps } from 'recompose';
import { withRouter } from 'react-router';
import { requestToApi } from 'api';

import { Form, InputMask, Label, Notification, Button, Group, Image, WaitIcon, Help } from 'ui';

const propTypes = {};

class PaymentComponent extends Component {

	static propTypes = {
		operator:     PropTypes.object.isRequired,
		requestToApi: PropTypes.func.isRequired,
		history:      PropTypes.object.isRequired
	}

	state = {
		loading:       false,
		phone:         [],
		amount:        0,
		successAmount: false,
		successPhone:  false,
		error:         false
	}

	extractNumbers = mask => {

		return mask.reduce((acc, item) => {

			if (isObject(item) && isNumber(item.value)) {

				acc.push(item.value);

			}

			return acc;

		}, []);

	}

	validationPhone = mask => {

		const phone = this.extractNumbers(mask);

		this.setState({
			phone,
			successPhone: phone.length === 10 ? true : false
		});

	}

	validationAmount = mask => {

		const [one, second, third, fourth] = this.extractNumbers(mask);
		const amount = parseInt(`${one}${second}${third}${fourth}`, 10);
		this.setState({
			amount,
			successAmount: isNumber(amount) && amount >= 1 && amount <= 1000 ? true : false
		});

	}

	handlePay = () => {

		const { history } = this.props;
		const {
			phone, amount, successAmount, successPhone, loading
		} = this.state;

		if (successAmount && successPhone && !loading) {

			this.setState({ loading: true });
			requestToApi([() => ({
				point: 'pay',
				param: {
					phone,
					amount
				}
			})]).then(({ pay, error }) => {

				const { status } = pay;

				// error of request from api
				if (error) {

					this.setState({
						loading: false,
						error:   true
					});

				}

				// error from response server
				if (status === 'error') {

					this.setState({
						loading: false,
						error:   true
					});

				}

				if (status === 'success') {

					history.push('/');

				}

			});

		}

	}

	render() {

		const { operator } = this.props;
		const {
			successPhone, successAmount, loading, error
		} = this.state;

		const maskPhone = ['+', '7', ' ', '(', ' ', false, false, false, ' ', ')',
			' ', false, false, false,
			' ', false, false,
			' ', false, false];

		const maskRubls = [false, false, false, false, ' ', 'r', 'u', 'b', 'l', 's'];

		return (
			<Form>
				<Group>
					<Image src={operator.image} />
				</Group>
				<Group>
					<Label>Your phone:</Label>
					<InputMask
						value={'+7 ( '}
						startCursorPosition={4}
						validation={this.validationPhone}
						mask={maskPhone}
						success={successPhone}
						disabled={loading}
					/>
					<Help>
						example: +7 (931) 253 85 53
					</Help>
				</Group>
				<Group>
					<Label>Amount:</Label>
					<InputMask
						value={''}
						startCursorPosition={0}
						validation={this.validationAmount}
						mask={maskRubls}
						success={successAmount}
						disabled={loading}
					/>
					<Help>
						min 1 rubl and max 1000 rubl
					</Help>
				</Group>
				<Group>
					<Button
						disabled={!successPhone || !successAmount || loading}
						onClick={this.handlePay}
					>
						{loading ? <WaitIcon width={'60'}height={'60'} /> : 'pay'}
					</Button>
				</Group>
				{error && <Notification>
					Have error, please try later
				</Notification>}
			</Form>
		);

	}

}

PaymentComponent.propTypes = propTypes;

export const Payment = PaymentComponent;

export const EnhancePayment = compose(
	withProps({ requestToApi }),
	withRouter
)(PaymentComponent);
