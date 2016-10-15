import React from 'react'
import ReactDOM from 'react-dom'

//USE () == AUTO RETURN
const Header = (props) => (
        <header>
            <h1>{props.title}</h1>
        </header>
)

const Content = (props) => (
    <section>
        <p>{props.description}</p>
        <Items items={props.items}/>
        <SearchForm />
    </section>
)

const SearchForm = () =>{
    return (
        <form>
            <input type="text" />
            <button type="submit">search</button>
        </form>
    )
}

const Items = (props) =>{
    console.log(props.items);
    return(
        <ul>
            {props.items.map(
                item => (<li>{item}</li>)
            )}
        </ul>    
//        <ul>   
//            <li>Item 1</li>
//            <li>Item 2</li>
//        </ul>
    )   
}

//USE {} == MANUAL RETURN
const App = () => {
        const appTitle = 'Title'
        const desc = 'Description'
        const items = [
            "John",
            "Bob",
            "Steve"
        ]

        return(
            <section className="css" id="someThing">
                <Header title = {appTitle}/>
                <Content description = {desc} items = {items}/>
            </section>
        )   
}

const AppWithoutDescription = () => (
    <Header title="No description here" />
)

//const App = () => {
//	return (
//        <header>
//            <div>My React App</div>
//        </header>
//    )
//}

const element = document.getElementById('app')
ReactDOM.render(<App/>,element)