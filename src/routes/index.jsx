import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router';

import { EnhanceMainPage } from 'pages/MainPage';
import { EnhancePaymentPage } from 'pages/PaymentPage';
import { NotFound } from 'pages/NotFound';

const routes = (
	<Fragment>
		<Switch>
			<Route exact path="/" component={EnhanceMainPage} />
			<Route path="/operator/:name" component={EnhancePaymentPage} />
			<Route component={NotFound} />
		</Switch>
	</Fragment>
);

export default routes;
