import { compose, lifecycle, branch, renderComponent } from 'recompose';

import { Wait } from 'ui';
import { requestToApi } from 'api';

export function withEnhance ({ Component, getFromApi }) {

	const hocs = [];

	getFromApi && getFromApi.length && hocs.push(lifecycle({
		state: { loading: true },
		componentDidMount() {

			requestToApi(getFromApi, this.props).then(data => {

				this.setState({
					loading: false,
					...data
				});

			});

		}
	}));

	hocs.push(branch(
		({ loading }) => loading,
		renderComponent(Wait)
	));

	const enhance = compose(
		...hocs
	);

	return enhance(Component);

}

