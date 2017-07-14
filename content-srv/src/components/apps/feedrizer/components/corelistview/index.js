import { h, Component } from 'preact';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {
    gql,
    graphql,
} from 'react-apollo';

import style from './style';

import MDC from '../mdc';
const { Card, LayoutGrid, Textfield, Button, LinearProgress } = MDC;


class CoreListView extends Component {

	// gets called when this route is navigated to
	componentDidMount() {
		// every time we get remounted, increment a counter:
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({ data: {loading, error, childChannels }}) {
		if (loading) {
			return <LinearProgress indeterminate={true} accent={true} />;
		}
		if (error) {
			return <p>{error.message}</p>;
		}

		return (
			<div>
				<LayoutGrid>
					<LayoutGrid.Cell
						cols={6}
						tabletCols={8}
						phoneCols={8}
					>
						<Textfield />
					</LayoutGrid.Cell>
					<LayoutGrid.Cell
						cols={6}
						tabletCols={4}
						phoneCols={4}
					>
						<Button
							accent
							ripple
							raised>Search</Button>
					</LayoutGrid.Cell>
				</LayoutGrid>
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

export default graphql(
    childChannelsListQuery,
    // {
    //     options : {pollInterval: 5000}
    // }
)(CoreListView);
