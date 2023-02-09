import React,{useState, useEffect} from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [input, setInput] = useState("")
  const [tabel, setTabel] = useState([]) 
  
  window.onload = (event) => {
    getListonload();
  };

  useEffect(()=>{
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify([]),
    };
    fetch('https://assets.breatheco.de/apis/fake/todos/user/todoso', opts)
      .then((resp) => {
        if (resp.status === 200) return resp;
      })
      .then((data) => {
        console.log("tried to create user")})
      .catch((error) => {
        console.error("There was an error", error);
      });    
  },[])

  useEffect(()=>{
    setTimeout(() => { 
      if(tabel.length!=0){
        console.log("did the fetch to put(either add or remove items)")
        fetchPut()
       }
      else{
        console.log("posted an item called add items")
        noItems();
      }
    }, 1000)
  },[tabel])

  const submit = (e) => {
  e.preventDefault()
  if(tabel.includes(input)){
    alert("already there")
    return;
  }
  else if(tabel.includes("add items")){
    setTabel([])
  }
  setTabel(e=>[...e, input])
  setInput("");
  }

  function fetchPut(){
  fetch('https://assets.breatheco.de/apis/fake/todos/user/todoso', {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tabel.map((item) => ({label: item, done:false})))
  })
    .then((resp) => {
      if (resp.status === 200) return resp;
    })
    .then((data) => {
      console.log(data, "fetchput")})
    .catch((error) => {
      console.error("There was an error", error);
    })   
  }
 
  function noItems(){
  fetch('https://assets.breatheco.de/apis/fake/todos/user/todoso', {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify([{label: "add items", done:false}])
  })
    .then((resp) => {
      if (resp.status === 200) return resp;
    })
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.error("There was an error", error);
    })   
  }

  function getListonload(){
  const opts = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };
  
  fetch('https://assets.breatheco.de/apis/fake/todos/user/todoso', opts)
    .then((resp) => {
      if (resp.status === 200) return resp.json();
    })
    .then((data) => {
      setTabel(data.map(item=>item.label))
      //console.log(data.map(x=>x.label), "get data");
    })
    .catch((error) => {
      console.error("There was an error", error);
    });
  
   }

 const remove = (itemToDelete)=>{
 // fetchDelete();
 //setDeleteList(tabel.filter(item => { return (item !== itemToDelete)}))
  setTabel(tabel.filter(item => { return (item !== itemToDelete)}))
  }

 function Generator() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 10; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
 
 const map = tabel?.map((item) => {
  if (item!="add items"){
  return(
   <React.Fragment key={Generator()}>
    <div className="gene">
      <li className="list-item">
        <span className="span">{item}</span><button className="button" onClick={()=>remove(item)}><IoIosCloseCircleOutline/></button>
      </li>
   </div>
   </React.Fragment>
    )}
  else{
    return ( 
      <React.Fragment key={Generator()}>
    <div className="gene">
      <li className="list-item">
        <span className="span">{item}</span>
      </li>
   </div>
   </React.Fragment>
    )
  }
  })

  const counter = ()=>{
    if (tabel.length==0){
      return("no more shit to do")
    }
    else if (tabel.length==1 && !tabel.includes("add items")){
      return(tabel.length + " item")
    }
    else if (tabel.includes("add items")){
      return("no more shit to do")
    }
    else{
      return(tabel.length + " items")
    }
  }


	return (
		<div className="main">
		<h1>My Shit-to-Do List</h1>
	   <div className="container col-s-12">
		  <form className="form" onSubmit={submit}>
			<input className="input" value={input} type="text" placeholder="enter todo" onChange={e=>setInput(e.target.value)}/>
		  </form>
		  <div className="contein">
			<div className="listContainer">
					<ul className="list-group">
					{map}
					</ul>
			</div>
		   <div className="counterCont">
			<li className="counter">{counter()}</li>
		   </div> 
		   </div>     
	   </div> 
	   </div> 
	);
}

export default Home;
