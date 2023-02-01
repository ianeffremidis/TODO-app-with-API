import React,{useState} from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [input, setInput] = useState("")
 const [tabel, setTabel] = useState([])
 const submit = (e) => {
  e.preventDefault()
  if(tabel.includes(input)){
    alert("already there")
    return;
  }
  setTabel(e=>[...e, input])
  setInput("")
 }

 const remove = (itemToDelete)=>{
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

 const map = tabel.map((item) => {return(
   <React.Fragment key={Generator()}>
    <div className="gene">
      <li className="list-item">
        <span className="span">{item}</span><button className="button" onClick={()=>remove(item)}><IoIosCloseCircleOutline/></button>
      </li>
    </div>
   </React.Fragment>
   
    )})

  const counter = ()=>{
    if (tabel.length==0){
      return("no more shit to do")
    }
    else if (tabel.length==1){
      return(tabel.length + " item")
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
};

export default Home;
