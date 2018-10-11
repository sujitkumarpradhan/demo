import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Link, Route, Switch } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import { BrowserRouter } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import FAQ from "./components/pages/FAQ";

const client = new ApolloClient({
    link: createHttpLink({
        uri:
            "https://hooj2wl4nvd7nfyxnyle2oq5lq.appsync-api.ap-northeast-1.amazonaws.com/graphql",
        headers: {
            "x-api-key": "da2-4sxquasixja6bf7on3nufyu4xi"
        }
    }),
    cache: new InMemoryCache()
});


ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path={"/home"} component={Home} />
                <Route path={"/about"} component={About} />
                <Route path={"/faq"} component={FAQ} />
               
            </Switch>
       
        </ApolloProvider>
    </BrowserRouter>,
    document.getElementById("root")
);
// registerServiceWorker();
