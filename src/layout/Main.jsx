import { useState, useEffect } from "react"
import { Movies } from "../components/Movies"
import { Preloader } from "../components/Preloader"
import { Search } from "../components/Search"

const Main = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState (true)

    const searchMovies = (str, type='all') => {
        setLoading(true)
        fetch(
            `https://www.omdbapi.com/?apikey=6e22be8b&s=${str}${type !== 'all' ? `&type=${type}`: ''}`
        )
            .then((response) => response.json())
            .then ((data) => 
                setMovies(data.Search),
                setLoading(false)
            )
            .catch((err) => {
                console.error(err)
                setLoading(false)
            })
    }

    useEffect (() => {
        fetch('https://www.omdbapi.com/?apikey=6e22be8b&s=avengers')
            .then(response => response.json())
            .then ((data) => 
                setMovies(data.Search),
                setLoading(false)
            )
            .catch((err) => {
                console.error(err)
                setLoading(false)
            })
    }, [])
    return <main className="continer contant">
        <Search searchMovies={searchMovies} />
        {loading ? <Preloader/> : <Movies movies={movies}/>}
    </main>
}

export {Main}