import { useState } from 'react'
import './App.css'
import useFetchPelis from './useFetchPelis'
import iconopelis from './assets/iconopelis.png'
import lupa from './assets/iconolupa.png'

function App() {
  
  const token = 'b37ca258'
  const url1 = `https://www.omdbapi.com/?t=Toy+Story&apikey=${token}`

  const [url, setUrl] = useState(url1)

  function obtenerPeli() {
    var input = document.getElementById('busqueda');

    // Verificar si el input es null o undefined
    if (input) {
        var valor = input.value;
        
        var url2 = `https://www.omdbapi.com/?t=${valor}&apikey=${token}`
        setUrl(url2)
        
    } else {
        alert('Inserta una Película')
    }
  }

  function abrirModal() {
    var modal = document.getElementById("modalPeli")
    modal.showModal()
  }

  function cerrarModal () {
    var modal = document.getElementById("modalPeli")
    modal.close()
  }
  
  //Obtener Peli Por defecto
  const { data } = useFetchPelis(url)

  return (
    <>
      <div className='header'> 
        <div className='logo'>
          <img src={iconopelis} alt="" />
          <span>Busca Pelis</span> 
        </div>
        
        <div className='buscadorContent'>
          <img className='iconoBuscar' src={lupa} alt="" />
          <input type="text" id='busqueda' name='busqueda' placeholder='Buscar por nombre de película o Serie de TV' />
          <button type='button' className='btnBuscar' onClick={obtenerPeli}>Buscar</button>
        </div> 
      </div>

      <div className="contenidoPrincipal">
        {data?.map((peli) => (
          <div className="card" key={peli.Title}>
            <div className="titulo">
              {peli.Response == "True" ? 
                <h1>{peli.Title}</h1>
                :
                <h1>Peli No Encontrada</h1>  
              }
              
            </div>
            <div className='contenidoPelicula'>
              <div className="contenidoPoster">
              {peli.Poster != "N/A" ?
                <img src={peli.Poster} alt="" />
                :
                <h2> 🎬 Póster No Disponible</h2>  
              }
              
              </div>
              <div className="contenidoDatos">
              <div className='filaDato'>
                <h2>Título:</h2> <p>{peli.Title}</p>  
              </div>
              <div className='filaDato'>
                <h2>Año:</h2> <p>{peli.Year}</p>
              </div>
              <div className='filaDato'>
                <h2>Clasificación:</h2> <p>{peli.Rated}</p>
              </div>
              <div className='filaDato'>
                <h2>Duración:</h2> <p>{peli.Runtime}</p>
              </div>
              <div className='filaDato'>
                <h2>Género:</h2> <p>{peli.Genre}</p>
              </div>
              <div className='filaDato'>
                <h2>Director:</h2> <p>{peli.Director}</p>
              </div>
              <button className='btnPremiaciones' onClick={abrirModal}>Más info</button>
              </div>
            </div>

            <dialog id='modalPeli'>
              <div className='tituloModal'> <h2>{peli.Title}</h2></div>
              <div className='contenidoModal'>
                <div>
                  <h2>Fecha de lanzamiento</h2>
                  {peli.Released != "N/A" ?
                    <p>{peli.Released}</p>
                    :
                    <p>Info No Disponible</p>
                  }
                  
                </div>
                <div>
                  <h2>Calificación IMDB</h2>
                  {peli.imdbRating != "N/A" ?
                    <p>{peli.imdbRating}</p>
                    :
                    <p>Info No Disponible</p>
                  }
                  
                </div>
                <div>
                  <h2>Premios y Nominaciones</h2>
                  {peli.Awards != "N/A" ?
                    <p>{peli.Awards}</p>
                    :
                    <p>Info No Disponible</p>
                  }
                  
                </div>
                
                <button type='button' className='btnModal' onClick={cerrarModal}>Cerrar</button>
              </div>
            </dialog>   

          </div>
          
        ))}
      </div>      
    </>
  )
}

export default App
