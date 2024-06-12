import { useState, useEffect } from "react"
 

export default function useFetchPelis(url) {
  const [data, setData] = useState(null)
  //Fetch para buscar una pelicula
  const getPelis = async() => {
    await fetch(url)
      .then((response) => response.json())
      .then(function (data){
        let arrayData = []
        arrayData.push(data)
        localStorage.setItem("pelis", JSON.stringify(arrayData))
        setData(arrayData)
        console.log(arrayData)
      })
      .catch((error) => {
        console.log(error)
        let pelis = JSON.parse(localStorage.getItem("pelis"))
        setData(pelis)
      })
  }

  useEffect( () => {
    getPelis()
 }, [url])

  return {data}
}