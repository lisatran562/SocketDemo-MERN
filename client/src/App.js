import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import React, {useState, useEffect} from 'react';


function App() {
  const [socket] = useState(() => io (":8000"))
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const onChangeHandler = e => {
    setInput(e.target.value);
  }

  const onSubmitHandler = e => {
    e.preventDefault();
    socket.emit('chat', input)
  }  

  useEffect(() => { 
    console.log("Is this thing on??");
    socket.on('post chat', msg => {
      setMessages(prevmsgs => {return [msg,...prevmsgs]})
    })
    return () => socket.disconnect(true);
  }, [socket]);
  return (
    <div className="App">
      <form onSubmit={onSubmitHandler}>
        <input type="text" name="msg" autoComplete="off" onChange={onChangeHandler}/>
        <input type="submit" value="Submit"/>
      </form>
      {
        messages.map((item, i) => {
          return <h4 key={i}>{item}</h4>
          // return <p><img key={i} src={item} alt="picture"/></p>
        })
      }
    </div>
  );
}

export default App;
