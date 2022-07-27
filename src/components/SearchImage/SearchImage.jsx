import Button from "components/Button";
import ImageGallery from "components/ImageGallery";
import Modal from "components/Modal";
import Searchbar from "components/Searchbar";
import { Oval } from 'react-loader-spinner'
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { query } from "components/Api/pixabay";

import {  useEffect, useState } from 'react'

const SearchImage = () => {

    
    const [state, setState] = useState({
    urlImage: [],
    loader: false,
    error: null,
    totalHits:0,
    });
    
    const [modal, setModal] = useState({
        modal: false,
        modalUrl: [],
    })
    const [name, setName] = useState('')
    const [page, setPage] = useState(1)
    
    useEffect(() => {
        
        const fetch = async () => {
            if (!name) {
                return
            }

            setState(state => ({
                ...state,
                loader: 'loading',
                error: '',
            }))
            try {
                const { totalHits, hits } = await query(name, page);
                setState(prevPage => ({
                    ...prevPage,
                    loader: 'load',
                    urlImage: [...prevPage.urlImage, ...hits],
                    totalHits: totalHits,
                }))

            
            } catch (error) {
                setState(state => ({ ...state, loader: 'load', error: error.message }));
            }
        }
        
            fetch()
        }, [name, page])

    const onSubmit = (data) => {
        if (data === '') {
            toast.info("Enter name!", {
                autoClose: 2000
            })
            return
        }
        setName(data)
        setState({
            urlImage: [], loader: false, error:"",totalHits:null,
        }) 
    }

    const onClickGalleryItem = (id) => {
        const image = state.urlImage.find(f => f.id === Number(id))
        if (image) {
            setModal({
                modalUrl: image,
                modal: true,
            })
        }
    }

    const closeModal = () => {
        setModal({
            modal: false,
            modalUrl: [],
        })
    }
    const { urlImage, loader } = state
    const  { modalUrl} = modal
    return (
            <>
            <Searchbar
                onSubmit={onSubmit}
            />
            <ImageGallery
                onClickGalleryItem={onClickGalleryItem}
                image={urlImage}
            />
                {loader === 'loading' &&
                <Oval
                    color="#00BFFF"
                    height={80}
                    width={80} 
                    />}
            {state.totalHits > 10 &&
                <Button
                func={() => { setPage(page + 1) }}
                />}
            {
                modal.modal
                &&
                <Modal
                    closeModal={closeModal}
                >
                    <img src={modalUrl.largeImageURL}
                        alt={modalUrl.tags} />
                </Modal>}
            
                <ToastContainer />
                
        </>
        )
}


export default SearchImage