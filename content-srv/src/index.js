// import 'lie';
// import 'isomorphic-fetch';
import { h, render } from 'preact';

import './style';

import { configureStore } from './store/configureStore';
import { history } from './store/configureStore';

const store = configureStore();

let root;
function init() {
	const Root = require('./containers/Root').default;
	root = render(
		<div>
        	<Root
          		store={ store }
				history = { history }/>
      	</div>
	, document.body, root);
}

init();

if (module.hot) {
	module.hot.accept('./containers/Root', () => requestAnimationFrame( () => {
		flushLogs();
		init();
	}));

	// optional: mute HMR/WDS logs
	let log = console.log,
		logs = [];
	console.log = (t, ...args) => {
		if (typeof t==='string' && t.match(/^\[(HMR|WDS)\]/)) {
			if (t.match(/(up to date|err)/i)) logs.push(t.replace(/^.*?\]\s*/m,''), ...args);
		}
		else {
			log.call(console, t, ...args);
		}
	};
	let flushLogs = () => console.log(`%c🚀 ${logs.splice(0,logs.length).join(' ')}`, 'color:#888;');
}
