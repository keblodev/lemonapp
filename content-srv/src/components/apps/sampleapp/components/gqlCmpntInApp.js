import { h, Component } from 'preact';

import {
    gql,
    graphql,
} from 'react-apollo';

// import AddChannel from './AddChannel';

const GqlinAppTestList = ({ data: {loading, error, childChannels }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  
  return (
    <div className="gqlinAppShellTestList">
        in app Lol in app
    <ul>
        { childChannels.map( ch => <li key={ch.id}>{ch.name}</li> ) }
    </ul>;        

    </div>
  );
};

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
)(GqlinAppTestList);