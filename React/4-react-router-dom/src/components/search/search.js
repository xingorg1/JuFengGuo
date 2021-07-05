import React from 'react';
import { 
	NavLink
} from 'react-router-dom'

function Search() {
  return (
    <div className="search-box">
      <input type="text" placeholder="[林大厨]林述巍提问" />
      <button>提问</button>
    </div>
  );
}

export default Search;
