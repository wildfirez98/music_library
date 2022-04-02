import { useState, useEffect } from 'react' // Importing React Hooks
import { useParams, useNavigate } from 'react-router-dom'    

const ArtistView = () => {
    const { id } = useParams() // Take the record id object and set to useParams
    const [ artistData, setArtistData ] = useState([]) // Declare a variable for our useState hook into an array. useState returns a pair of values. The current state and a function that updates it.
    const navigate = useNavigate()

    useEffect(() => {
        
        const API_URL = `http://localhost:4000/album/${id}`;
        const fetchData = async () => {
            const response = await fetch(API_URL);
            const { results } = await response.json();
            setArtistData(results);
        }
        fetchData();
    }, [id])

    const justAlbums = artistData.filter(entry => entry.collectionType === 'Album')

    const navButtons = () => (
        <div>
            <button onClick={() => navigate(-1)}>Back</button>
            |
            <button onClick={() => navigate('/')}>Home</button>
        </div>
    )

    return (
        <div>
            {artistData.length ? artistData[0].artistName : <h2>Loading ...</h2>}
            {navButtons()}
            <h2>The id passed was: {id}</h2>
            <p>Artist Data Goes Here!</p>
            {justAlbums.map((album, i) => (
                <div key={i}>
                    <p>{album.trackName}</p>
                </div>    
            ))}
        </div>
    )
}

export default ArtistView






