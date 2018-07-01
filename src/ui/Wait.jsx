import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import svg from '!svg-inline-loader!./outlines/wait.svg';
import SVGInline from 'react-svg-inline';

const StyledWait = styled(SVGInline)`
	display: flex;
	justify-content: center;
	margin-top: 10%;
`;

export const Wait = () => (
	<StyledWait
		svg={svg}
		width={'100'}
		height={'100'}
	/>
);

const StyledIcon = styled(SVGInline)`
	display: flex;
`;

const propTypes = {
	width:  PropTypes.string.isRequired,
	height: PropTypes.string.isRequired
};

const Icon = ({ width, height }) => (
	<Fragment>
		<StyledIcon
			svg={svg}
			width={width}
			height={height}
			fill={'#fff'}
		/>
	</Fragment>
);

Icon.propTypes = propTypes;

export const WaitIcon = Icon;

