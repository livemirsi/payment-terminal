import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { List, Item, Label, Image } from 'ui';

const propTypes = {
	operators: PropTypes.array.isRequired,
	history:   PropTypes.object
};

const OperatorComponent = ({ operators, history }) => (
	<List>
		{operators.map(({ id, name, image }) => (
			<Item
				key={id}
				onClick={() => history.push(`/operator/${name}`)}
			>
				<Image src={image} />
				<Label>{name}</Label>
			</Item>
		))}
	</List>
);

OperatorComponent.propTypes = propTypes;

export const Operators = OperatorComponent;

export const EnhanceOperators = withRouter(OperatorComponent);
