import React, { Component } from 'react';
import { BrowserRouter, browserHistory } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import routes from 'routes';
import { injectGlobal } from 'styled-components';

injectGlobal`
	body {
		margin: 0;
		padding: 0;
		background-color: #ededed;
		font-family: 'Open Sans', sans-serif;
		color: #202121;
		font-size: 14px;
	}
`;

class App extends Component {

	render() {

		return (
			<BrowserRouter history={browserHistory} forceRefresh={true} >
				{routes}
			</BrowserRouter>
		);

	}

}

export default hot(module)(App);
