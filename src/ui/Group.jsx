import styled from 'styled-components';

const Group = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	@media (max-width: 860px) {
		width: 100%;
		align-items: center;
		margin-bottom: 30px;
	}
`;

export default Group;
