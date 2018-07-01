import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { Link } from 'ui';

const propTypes = { history: PropTypes.object };

const BackComponent = ({ history }) => (
	<Link onClick={() => history.goBack()}>
	Back to list operators
	</Link>
);

BackComponent.propTypes = propTypes;

export const Back = BackComponent;

export const EnhanceBack = withRouter(BackComponent);
