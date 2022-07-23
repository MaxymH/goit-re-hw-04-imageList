import Button from "components/Button";
import ImageGallery from "components/ImageGallery";
import Modal from "components/Modal";
import Searchbar from "components/Searchbar";
import { Oval } from 'react-loader-spinner'
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { query } from "components/Api/pixabay";

import { Component, useEffect, useState } from 'react'

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
    const [totalHits, setTotalHits] = useState(null)
    
    useEffect(() => {
        
        const fetch = async () => {
            if (!name) {
                return
            }

            setState({
                ...state,
                loader: 'loading',
                error: '',
            })
            try {
                const { totalHits, hits } = await query(name, page);
                setState(s => ({
                    ...s,
                    loader: 'load',
                    urlImage: [...s.urlImage, ...hits],
                    totalHits: totalHits,
                }))
                
                if (state.totalHits === 0) {
                    toast.error("No result!", {
                        autoClose: 2000
                    })
                }

            
            } catch (error) {
                setState({ ...state, loader: 'load', error: error.message });
            }
        }
            fetch()
        },[name, page])

    const onSubmit = (data) => {
        if (data === '') {
            toast.info("Enter name!", {
                autoClose: 2000
            })
            return
        }
        setName(data)
        setTotalHits(null)
        setState({
            urlImage: [], loader: false, error:"",
        }) 
    }

    const onClickLoadMore = () => {
        setPage(s => ({
            page: s + 1
        }))
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
                    func={onClickLoadMore}
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



 class SearchImages extends Component  {
    state = {
        modal: false,
        name: '',
        urlImage: [],
        loader: false,
        page: 1,
        error: '',
        totalHits: null,
        modalUrl: [],
    }
    

    // async componentDidUpdate(prevProp, prevState) {
    // const { name, page} = this.state;
    
    //     if (name !== prevState.name || page > prevState.page) {
    //         this.setState({ loader: 'loading' })
    
            
      

    //         try {
    //             const { totalHits, hits } = await query(name, page);
    //             this.setState(prevPage =>({
    //                 totalHits: totalHits,
    //                 urlImage: [...prevPage.urlImage, ...hits],
    //             }))

    //             if (totalHits === 0) {
    //         toast.error("No result!", {
    //             autoClose: 2000
    //             })
    //         }
    //         } catch (error) {
    //             this.setState({ error: error.message });
    //         } finally {
    //             this.setState({ loader: 'load' })     
    //         }
    //     }
        
    // }

    // onSubmit = (data) => {
    //     if (data === '') {
    //         toast.info("Enter name!", {
    //             autoClose: 2000
    //         })
    //         return
    //     }
    
    //     this.setState({
    //         name: data,
    //         totalHits: null,
    //         urlImage: [] ,
    //     }) 
    // }
    
    // onClickLoadMore = () => {
    //     this.setState(prevPage => ({
    //         page: prevPage.page + 1
    //     }))
        
    // } 

    // onClickGalleryItem = (id) => {
    //     const { urlImage } = this.state
    //     const image = urlImage.find(f => f.id === Number(id))
    //     if (image) {
    //         this.setState({
    //             modalUrl: image,
    //             modal: true,
    //         })
    //     }
    // }

    closeModal = () => {
        this.setState({
            modal: false,
            modalUrl: [],
        })
    }

    

    render() {
        const { onSubmit, onClickGalleryItem, onClickLoadMore, closeModal } = this
        const {loader, urlImage, totalHits, modal } = this.state
        return (
            <>
                <Searchbar onSubmit={onSubmit} />
                <ImageGallery onClickGalleryItem={onClickGalleryItem} image={urlImage} />
                {loader === 'loading' &&
                    <Oval color="#00BFFF" height={80} width={80} />}
                {totalHits > 10 && <Button func={onClickLoadMore} />}
            
                {modal &&
                    <Modal closeModal={closeModal}>
                    <img src={this.state.modalUrl.largeImageURL} alt={this.state.modalUrl.tags} />
                </Modal>}
                <ToastContainer />
                
        </>
        )
    }
}
export default SearchImage