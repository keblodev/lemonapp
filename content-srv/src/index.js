// import 'lie';
// import 'isomorphic-fetch';
import { h, render } from 'preact';

import './style/critical.less';

import './style';

import { configureStore } from './store/configureStore-ENV_TARGET';
import { history } from './store/configureStore-ENV_TARGET';

// import casual from 'casual-browserify';

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo';

/* to mock on client -> uncomment this

import { 
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'graphql-tools';

import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import { typeDefs } from './schema';

const schema = makeExecutableSchema({ typeDefs });

const mocks = {
		Channel: () => ({ name: "from local-mock -> " + casual.name }),  
		ChildChannel: () => ({ name: "from local-mock -> " + casual.name })
}

addMockFunctionsToSchema({
	schema, 
	mocks	
});

const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });

const client = new ApolloClient({
  networkInterface: mockNetworkInterface

});

*/

const networkInterface = createNetworkInterface({ 
  uri: 'https://localhost:4000/graphql',
});

networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 500)
  }
}]);

const client = new ApolloClient({
  networkInterface,
});

const store = configureStore();

let root;

function init() {
	const Root = require('./containers/Root-ENV_TARGET').default;
	root = render(
		<div>
			<ApolloProvider 
			client={client}
			store={store}>
				<Root
					store={ store }
					history = { history }/>
			</ApolloProvider>
      	</div>
	, document.body, root);
}

init();

if (module.hot) {
	module.hot.accept('./containers/Root-ENV_TARGET', () => requestAnimationFrame( () => {
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
