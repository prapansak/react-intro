import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { SearchForm } from './searchForm'

import {
    Router,
    Route,
    Link,
    hashHistory,
    IndexRoute
} from 'react-router'

const MovieList = (props) => (
    <ul>
    {props.movies.map((movie, i) => {
        return (
            <li key={i}>{movie.Title}</li>
        )
    })}
    </ul>
)

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: []
        }
        if(props.location.query.s){
            this.onSearch(props.location.query.s)
        }
    }
    onSearch(query) {
        axios.get(`http://www.omdbapi.com/?s=${query}&plot=short&r=json`).then(response => {
            const movies = response.data.Search
            this.setState({
                    movies: movies
            })
        })
    }
    render(){
        return (
            <section>
                <h1>Movie Collection</h1>
                <SearchForm onSearchSubmit={this.onSearch.bind(this)} />
                <MovieList movies={this.state.movies} />
            </section>
        )
    } 
}

const batmanQuery = {
    pathname:'/search',
    query:{
        s:'batman'
    }
}

const adventureQuery = {
    pathname:'/search',
    query:{
        s:'batman'
    }
}

const Home = () =>(
    <section>
        <h1>HOME</h1>
        <ul>
            <li><Link to={batmanQuery}>Batman</Link></li>
            <li><Link to={adventureQuery}>Adventure</Link></li>
        </ul>
    </section>
)

const Nav = () => (
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/detail">Detail</Link></li>
        </ul>
    </nav>
)

const App = props => (
    <section>
        <Nav />
        {props.children}
    </section>
)

const MovieDetail = () =>(
    <h1>DETAIL</h1>
)

class Main extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Home} />
                    <Route path="search" component={Search} />
                    <Route path="detail" component={MovieDetail} />
                </Route>
            </Router>
        )
    }
}

ReactDOM.render(<Main/>, document.getElementById('app'))