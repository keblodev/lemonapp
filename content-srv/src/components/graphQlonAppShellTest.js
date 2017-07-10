import { h, Component } from 'preact';

import {
    gql,
    graphql,
} from 'react-apollo';

// import AddChannel from './AddChannel';

const GqlAppShellTestList = ({ data: {loading, error, channels }}) => {
  console.log('Heyoo! loading?' + loading + ' | Objects: ' + channels)
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="gqlAppShellTestList">
        Lol
    <ul>
        { channels.map( ch => <li key={ch.id}>{ch.name}</li> ) }
    </ul>;        
      {/*<AddChannel /> 
      { channels.map( ch => 
        <div key={ch.id} className={'channel ' + (ch.id < 0 ? 'optimistic' : '')}>{ch.name}</div> ) 
      }*/}
    </div>
  );
};

export const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`;

export default graphql(
    channelsListQuery,
    // {
    //     options : {pollInterval: 10000}
    // }
)(GqlAppShellTestList);