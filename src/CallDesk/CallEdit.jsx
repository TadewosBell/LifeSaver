import React from 'react';
import SearchBar from './SeearchBar.jsx';
import SearchResults from './SearchResults';

const CallEdit = (props) => {
    const [query, setQuery] = React.useState("");
    const [counter, setCounter] = React.useState(0);
    if (props.counter != counter){
        setCounter(props.counter)
        setQuery("");
    }

    return (
        <div>
            <SearchBar onSearch={(input)=>{setQuery(input)}} counter={counter}/>
            <SearchResults query={query} editCall={props.editCall} counter={counter}/>
        </div>
    );
}

export default (CallEdit);