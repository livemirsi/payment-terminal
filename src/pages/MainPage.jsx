import React from 'react';
import PropTypes from 'prop-types';

import { Page, Title } from 'ui';
import { EnhanceOperators } from 'features/Operators';
import { withEnhance } from 'pages/Enhancer';

const propTypes = { operators: PropTypes.array.isRequired };

const MainComponent = ({ operators }) => {

	return (
		<Page>
			<Title>Select your mobile operator</Title>
			<EnhanceOperators operators={operators} />
		</Page>
	);

};

MainComponent.propTypes = propTypes;

export const MainPage = MainComponent;

export const EnhanceMainPage = withEnhance({
	Component:  MainComponent,
	getFromApi: ['operators']
});
