import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route} from 'react-router-dom';
import { getProducts } from './redux/actions';


function App() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)
  // useEffect(()=>{
  //   dispatch(getProducts())
  // },[dispatch])
      // onClick para el boton traerecetas 
    const onClick = (evento)=> {
        evento.preventDefault();
        dispatch(getProducts())
    }
    

  return (
    <div className="App">
      <h1> Funciono !!!!!</h1>
      <button onClick={(e)=>{onClick(e)}}> boton traedor </button> 
      {
        products.map( p => {
          return(<h2>{p.nombre}</h2>)
        })
      }
      <h2> PORFI QUE ANDE </h2> 
    </div>
  );
}

export default App;
