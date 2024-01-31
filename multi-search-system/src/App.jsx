import { useEffect, useRef, useState } from 'react';
import './App.css';
import Pill from './components/Pill';

function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [selectedUserSet, setSelectedUserSet] = useState(new Set());

  const inputRef = useRef(null);
  

  useEffect(()=>{
    const fetchUsers = ()=>{
      if(searchTerm.trim() === ""){
        setSuggestions([]);
        return;
      }

      fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
        .then((res)=>res.json())
        .then((data)=>setSuggestions(data))
        .catch((error)=>console.log(error));

    }

    fetchUsers();
    // console.log(suggestions);
  }, [searchTerm])

  const handleSelectUser = (user)=>{
    setSelectedUsers([...selectedUsers, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearchTerm("");
    setSuggestions([]);

    inputRef.current.focus(); // To focus back on input after selection
  }

  // console.log(selectedUsers)

  const handleRemoveUser = (user)=>{
    const updatedUsers = selectedUsers.filter(
      (selectedUsers) => selectedUsers.id !== user.id
    );
    setSelectedUsers(updatedUsers);

    const updatedEmails = new Set(selectedUserSet);
    updatedEmails.delete(user.email);

    setSelectedUserSet(updatedEmails);
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Backspace' && e.target.value === "" && selectedUsers.length > 0){
      const lastUser = selectedUsers[selectedUsers.length - 1];
      handleRemoveUser(lastUser);
      setSuggestions([]);
    }

  }

  return (

    <div className="user-search-container">
      <div className='user-search-input'>

        {/* Pills */}

        {
          selectedUsers.map((user, index)=>{
            return <Pill 
                      key={user.email} 
                      image={user.image}
                      text={`${user.firstName} ${user.lastName}`}
                      onClick={()=>handleRemoveUser(user)}
                    />
          })
        }

        {/* Input with suggestions */}
        <div>
          <input 
            ref={inputRef}
            type="text" 
            value={searchTerm} 
            onChange={(e)=>setSearchTerm(e.target.value)}
            placeholder='Search For a User...'
            onKeyDown={handleKeyDown}
          />
          {/* Search Suggestions */}
          <ul className="suggestions-list">
            {suggestions?.users?.map((user, index)=>{
              return !selectedUserSet.has(user.email) ? (
                <li key={user.email} onClick={()=>{handleSelectUser(user)}}>
                  <img 
                    src={user.image} 
                    alt={`${user.firstName} ${user.lastName}`} 
                  />

                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </li>
                ) : <span></span> 
            })}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default App;
