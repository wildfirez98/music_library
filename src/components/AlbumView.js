import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const AlbumView = () => {
    const { id } = useParams()
    const [ albumData, setAlbumData ] = useState([]) // Data into useState as an array
    const navigate = useNavigate()


    useEffect(() => {
        const API_URL = `http://localhost:4000/song/${id}`;
        const fetchData = async () => {
            const response = await fetch(API_URL);
            const { results } = await response.json();
            setAlbumData(results);
        }
        fetchData();
    }, [id])
    
    const justSongs = albumData.filter(entry => entry.wrapperType === 'track')

    const navButtons = () => (
        <div>
            <button onClick={() => navigate(-1)}>Back</button>
            |
            <button onClick={() => navigate('/')}>Home</button>
        </div>
    )

    return (
        <div>
            {albumData.length ? albumData[0].collectionName : <h2>Loading ...</h2>}
            {navButtons()}
            <h2>The id passed was: {id}</h2>
            <p>Album Data Goes Here!</p>
            {justSongs.map((song, i) => (
                <div key={i}>
                    <p>{song.trackName}</p>
                </div>    
            ))}
        </div>
    )
}

export default AlbumView
