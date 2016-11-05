import './app.css'

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
        const query = {
            pathname: '/detail',
            query: {
                id: movie.imdbID
            }
        }
    
        return (
            <li key={i}>
                <p><Link to={query}>{movie.Title}</Link></p>
            </li>
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

class MovieDetail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            movie : {
                Title : 'unknow'
            }
        }
        if(props.location.query.id){
            const id = props.location.query.id
            axios.get(`http://www.omdbapi.com/?i=${id}&plot=short&r=json`).then(response =>{
                const movie = response.data
                console.log(movie)
                this.setState({
                    movie : movie
                })
            })
        }
    }
    
    render(){
        return(
            <section>
                <h1>{this.state.movie.Title}</h1>
                <img src={this.state.movie.Poster}/>
            </section>
        )
    }
}

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