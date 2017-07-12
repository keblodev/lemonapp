import { h, Component } from 'preact';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MDC from './components/mdc';
const {Toolbar, Button} = MDC;

import style from './style';

import GqlinAppTestList from './components/gqlCmpntInApp';

import * as AppComponentActions from './actions';

class FeedrizerApp extends Component {
    headerText = "this is feed";

	state = {
        headerString: 'this is feed'
	};

	// gets called when this route is navigated to
	componentDidMount() {
		// every time we get remounted, increment a counter:
		this.setState({ headerString: this.headerText });
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
	}
  
    ThatLol() {
        const numbers = [1,2];//props.numbers;
        const listItems = numbers.map((number) =>
            <li key={number.toString()}>
                {number}                 
            </li>
        );

        return (
            <ul>{listItems}</ul>
        );
    }

	someComponentAction() {
		this.props.actions.componentLevelTestAction("Some component action");
	}	

	// Note: `user` comes from the URL, courtesy of our router
	render({}, { headerString }) {
		return (
			<div class={style.profile}>
				<Toolbar className={style.header}>
					<Toolbar.Row>
						<Toolbar.Section align-start={true}>
							<Toolbar.Icon
								onClick={() => {
								this.drawer.MDComponent.open = true;
								}}
							>
								menu
							</Toolbar.Icon>
							<Toolbar.Title>LemonApp shell</Toolbar.Title>
						</Toolbar.Section>
					</Toolbar.Row>				
				</Toolbar>
				<button onCLick={::this.someComponentAction} />
				<div>Feed route mounted { headerString } lol.</div>
                <this.ThatLol > </this.ThatLol>
				<Button>ok?</Button>
				<GqlinAppTestList />
			</div>
		);
	}
}

function mapState(state) {
  return {  
	  someState: {4:5}
  };
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(AppComponentActions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(FeedrizerApp);