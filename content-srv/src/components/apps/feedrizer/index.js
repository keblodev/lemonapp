import { h, Component } from 'preact';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MDC from './components/mdc';
const {Toolbar, Button, Elevation} = MDC;

import style from './style';

import CoreListView from './components/corelistview';

import * as AppComponentActions from './actions';

class FeedrizerApp extends Component {
    headerText = "this is feed";

	state = {
        headerString: 'this is feed'
	};

	componentDidMount() {
	}

	componentWillUnmount() {
	}

	someComponentAction() {
		this.props.actions.componentLevelTestAction("Some component action");
	}

	// Note: `user` comes from the URL, courtesy of our router
	render() {
		return (
			<div class={style.frListBase}>
				<CoreListView />
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