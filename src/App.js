
import Cards from "./components/Cards/Cards.jsx"
import Nav from "./components/Nav/Nav.jsx"
import {useEffect, useState} from "react"
import style from "./App.module.css";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom"
import About from "./components/About/About.jsx";
import Detail from "./components/Detail/Detail.jsx";
import Form from "./components/Form/Form.jsx";


function App () {
 //! HOOKS
  const [characters, setCharacters] = useState([]);
  const {pathname} = useLocation()
  const [access, setAccess] = useState (false)
  const navigate = useNavigate()

  useEffect(() => {
    !access && navigate("/")
  }, [access])

  //!CREDENCIALES FAKE
  const username = "jimemena91@mail.com"
  const password = "jime123"

//!EVENT HANDLERS
  const onSearch = (id) => {
    const URL_BASE = "https://be-a-rym.up.railway.app/api"
    const KEY = "a33abc004357.c3f47b84d92b722b62e4"

    if (characters.find((char) => char.id === id)) {      
      return alert("Personaje repetido")
    }
    fetch(`${URL_BASE}/character/${id}?key=${KEY}`)
    .then(response=>response.json())
    .then(data=>{
      if(data.name) {
        setCharacters((oldChars) => [...oldChars, data]);
        //setCharacters([...characters, data]);
      }else{
        alert("No hay personajes con ese ID")
      }
    })
  }

  const onClose = (id) => {
    setCharacters(characters.filter((char) => char.id !== id))
  }
 const login =(userData) =>{
  if(userData.username===username && userData.password===password){
    setAccess(true)
    navigate("/home")
  }else{
    alert("Credenciales incorrectas")
  } 
 }
  
  //! RENDER 
return (
  <div>
     {pathname !== "/" && <Nav onSearch={onSearch}/>}     
    <Routes>
      <Route path= "/" element={<Form login={login}/>} />
       <Route path="/home" 
        element={<Cards characters={characters} onClose = {onClose} />}/>
      <Route path= "/about"
      element={<About/>}/>
      <Route path="/detail/:detailId" element={<Detail />} />

    </Routes>
  </div>
  )
}

export default App
