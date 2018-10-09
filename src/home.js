import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import { Query, Mutation } from "react-apollo";
// import gql from "graphql-tag";
// import { ApolloProvider } from "react-apollo";
import { withApollo } from "react-apollo";
// const GET_User = gql`
//     query GetUser($alias: String!) {
//         getUser(alias: $alias) {
//             alias
//             name
//             season
//             mainColor
//             brain
//             mood
//         }
//     }
// `;
class Home extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
            
               
            </div>
        );
    }
}

export default withApollo(withRouter(Home));
