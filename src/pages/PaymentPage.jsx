import React from 'react';
import PropTypes from 'prop-types';

import { Title, Page } from 'ui';
import { EnhancePayment } from 'features/Payment';
import { EnhanceBack } from 'features/Back';
import { withEnhance } from 'pages/Enhancer';

const propTypes = { operator: PropTypes.object.isRequired };

const PaymentComponent = ({ operator }) => {

	return (
		<Page>
			<Title>Payment on {operator.name}</Title>
			<EnhancePayment
				operator={operator}
			/>
			<EnhanceBack />
		</Page>
	);

};

PaymentComponent.propTypes = propTypes;

export const PaymentPage = PaymentComponent;

export const EnhancePaymentPage = withEnhance({
	Component:  PaymentComponent,
	getFromApi: [({ match }) => ({
		point: 'operator',
		param: match.params.name
	})]
});

