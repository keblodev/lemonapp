import { h, Component } from 'preact';
import { withRouter } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    gql,
    graphql,
	compose
} from 'react-apollo';

import style from './style';

import MDC from '../mdc';
const { Card, LayoutGrid, Textfield, Button, LinearProgress } = MDC;

import { getAuth } from '../../reducers'

import CoreAuth from './coreauth';
import CoreSearch from './coresearch';

import AppActions from '../../actions';
import { AuthStates, AppIds } from '../../statics/constants/Auth';

class CoreListView extends Component {

	// Note: `user` comes from the URL, courtesy of our router
	render({
		data: {loading, error, childChannels },
		auth,
	}) {
		if (loading) {
			return <LinearProgress indeterminate={true} accent={true} />;
		}
		if (error) {
			return <p>{error.message}</p>;
		}

		const styleTop = `
			align-items: center;
			display: flex;
			flex-direction: column-reverse;
			`;

		const SearchBar = ({auth}) => {

			return (
				<LayoutGrid>
					<LayoutGrid.Cell
						cols={3}
						tabletCols={3}
						phoneCols={3}
						style={styleTop}
					>
						<CoreSearch />
						<CoreAuth 
							auth={auth}
						/>
					</LayoutGrid.Cell>
				</LayoutGrid>
		)};

		return (
			<div>
				<SearchBar
					auth={auth}
				/>
				<LayoutGrid>
					<ReactCSSTransitionGroup
					transitionName={ {
						enter: style.feedCardCellEnter,
						enterActive: style.feedCardCellActive,
						leave: style.feedCardCellLeave,
						leaveActive: style.feedCardCellLeaveActive,
						appear: style.feedCardCellAppear,
						appearActive: style.feedCardCellAppearActive
					} }
						transitionLeaveTimeout={300}
						transitionEnterTimeout={300}
						transitionAppear={true}
						transitionAppearTimeout={300}
					>
						{ childChannels.map( ch =>

							<LayoutGrid.Cell
								key={ch.id}
								cols={6}
								tabletCols={8}
								phoneCols={12}
								className={style.mdcLayoutGridCell}>
								<Card
								className={style.mdCard}
								>
									<Card.Primary>
										<Card.Title>{ch.name}</Card.Title>
										<Card.Subtitle>id:{ch.id}</Card.Subtitle>
									</Card.Primary>
									<Card.SupportingText>
										{ch.name}
									</Card.SupportingText>
									<Card.Actions>
										<Card.Action>Action</Card.Action>
									</Card.Actions>
								</Card>
							</LayoutGrid.Cell>
						)}
					</ReactCSSTransitionGroup>
				</LayoutGrid>
			</div>
		);
	}
}

export const childChannelsListQuery = gql`
  query ChildChannelsListQuery {
    childChannels {
      id
      name
    }
  }
`;

const mapState = (state, ownProps) => {
	//ownProps are coming from router
	//TODO: do a selector in reducer
	return {auth: getAuth(state)};
};

const mapDispatch = dispatch => ({
	actions: bindActionCreators(AppActions, dispatch)
});

export default
//object composition rulles 🤓
withRouter(
	connect(mapState, mapDispatch)(
		compose(
			graphql(
			childChannelsListQuery,
			// {
			//     options : {pollInterval: 5000}
			// }
			),		
		)
		(CoreListView)
	)
);
