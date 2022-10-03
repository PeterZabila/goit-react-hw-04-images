import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from "./SearchBar/SearchBar";
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { Notify } from 'notiflix';
import fetchResult from './Api/Api';


const URL = `https://pixabay.com/api/`;

export default function App () {
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    largeImageURL: '',
  });

useEffect(() => {
  async function getResponse() {
    setLoading( true );

    const response = await fetchResult(URL, searchQuery, page)
      .then(response => {
        if (results) {
          setLoading(false);
          setResults(results => [...results, ...response.hits]);
          return;
        }
        setResults(response.hits);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false)
      })
    return response;
  }
  if(searchQuery) {
    getResponse();
  }
   // eslint-disable-next-line react-hooks/exhaustive-deps
}, [page, searchQuery])


  
 const onSubmit = (query) => {
    if (query.trim() === '') {
      Notify.failure('Type search query');
      return;
    }
    
   if(query !== searchQuery) {
      setSearchQuery(query);
      setPage(1);
      setResults([]);
   }
  }

  const openModal = (largeImageURL) => {
    setShowModal(true);
    setModalContent({
      largeImageURL,
    });
  }

  const closeModal = () => {
    setShowModal(false);
    setModalContent({
      largeImageURL: '',
    })
  }

  const loadMore = () => {
    setPage(page => page + 1)
  }

    const isResults = Boolean(results.length);

    return (
      <>
        <div className="App">
          <SearchBar onSubmit={onSubmit}/>
        </div>
        <div className='Container'>
            {loading && <Loader/>}
            {isResults ? (<ImageGallery items={results} onClick={openModal} onMore={loadMore} key={page}/>) : (<p className='Message'>Please enter search key words</p>) }
            {showModal && <Modal onClose={closeModal}><img src={modalContent.largeImageURL.largeImageURL} max-width="600px" alt="" /></Modal>}
            {error && <p>Please try later...</p>}
         </div>
         <div className='Container'>
          {isResults && <Button onClick={loadMore}/>}
         </div>
     
      </>
    );
};