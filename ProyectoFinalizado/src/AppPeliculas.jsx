import React from 'react'
import { useState } from 'react'

export const AppPeliculas = () => {

    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const apiKey = '4c98023a650faf0b97d86f5f9b82d104'
    const [Busqueda, setBusqueda] = useState('')
    const [Pelicula, setPelicula] = useState([])

    const handlePelicula = (e) => {
        setBusqueda(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchPeliculas()
    }

    const fetchPeliculas = async () => {
        try {
            const response = await fetch(`${urlBase}?query=${Busqueda}&api_key=${apiKey}`)
            const data = await response.json()
            setPelicula(data.results)
        } catch (error) {

        }
    }

    return (
        <div className='container'>
            <h1 className='title'>Buscador de peliculas</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Ingrese una pelicula'
                    value={Busqueda}
                    onChange={handlePelicula}

                />
                <button type='submit' className='search-button'>Buscar</button>
            </form>

            <div className='movie-list'>
                {Pelicula.map((pelicula) => (
                    <div key={pelicula.id} className='movie-card'>
                        <img 
                            src={pelicula.poster_path 
                                ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`
                                : 'https://via.placeholder.com/500x750?text=No+Image'} 
                            alt={pelicula.title} 
                        />
                        <h2>{pelicula.title}</h2>
                        <p><strong>Descripción:</strong> {pelicula.overview || 'Descripción no disponible.'}</p>
                        <p><strong>Fecha de estreno:</strong> {pelicula.release_date || 'No disponible'}</p>
                        <p><strong>Idioma original:</strong> {pelicula.original_language.toUpperCase()}</p>
                        <p><strong>Calificación promedio:</strong> ⭐ {pelicula.vote_average}</p>
                        <p><strong>Número de votos:</strong> {pelicula.vote_count}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
