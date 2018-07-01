import React from 'react';
import { Page, Title } from 'ui';

import { EnhanceBack } from 'features/Back';

const NotFoundComponent = () => (
	<Page>
		<Title>Page not foun</Title>
		<EnhanceBack />
	</Page>
);

export const NotFound = NotFoundComponent;
