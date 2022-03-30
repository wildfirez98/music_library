import React, { useState, useRef } from 'react'
import Gallery from './components/Gallery';
import SearchBar from './components/SearchBar';
import { DataContext } from './context/DataContext.js'
import { SearchContext } from './context/SearchContext';
import ArtistView from './components/ArtistView';
import AlbumView from './components/AlbumView';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../src/App.css';
import banner from '../src/images/music_banner.jpg'


const App = () => {
  
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState([])
  let searchInput = useRef('')

  const API_URL = 'https://itunes.apple.com/search?term='

  const handleSearch = (e, term) => {
    e.preventDefault()
    const fetchData = async () => {
        document.title = `${term} Music`
        const response = await fetch(API_URL + term)
        const resData = await response.json()
        if (resData.results.length > 0) {
            return setData(resData.results)
        } else {
            return setMessage('Not Found.')
        }
    }
    fetchData()
}
  return (
      <div className="App">
          <img src={banner} alt="Music banner" height={400} width={500} /><br></br> Photo by <a href="https://unsplash.com/@mohammadmetri?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Mohammad Metri</a> on <a href="https://unsplash.com/s/photos/music?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a><br/>
          {message}
            <Router>
                <Routes>
                    <Route path="/" element={
                            <React.Fragment> 
                                <SearchContext.Provider value={{term: searchInput, handleSearch: handleSearch}}>
                                    <SearchBar />     
                                </SearchContext.Provider>
                                <DataContext.Provider value={data}> 
                                        <Gallery />
                                </DataContext.Provider>
                            </React.Fragment>
                        } />
                    <Route path="/album/:id" element={<AlbumView />} />
                    <Route path="/artist/:id" element={<ArtistView />} />
                </Routes>  
            </Router>
      </div>
  )
}          

export default App
