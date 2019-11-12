import React from 'react';
import SearchBar from './SeearchBar.jsx';
import SearchResults from './SearchResults';

const CallEdit = (props) => {
    const [query, setQuery] = React.useState("");

    return (
        <div>
            <SearchBar onSearch={(input)=>{setQuery(input)}} />
            <SearchResults query={query} editCall={props.editCall}/>
        </div>
    );
}

export default (CallEdit);