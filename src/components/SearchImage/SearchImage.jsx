import Button from "components/Button";
import ImageGallery from "components/ImageGallery";
import Modal from "components/Modal";
import Searchbar from "components/Searchbar";
import { Oval } from 'react-loader-spinner'
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const { Component } = require("react");


export default class SearchImage extends Component  {
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
    
    componentDidUpdate(prevProp, prevState) {   
        const { name, page } = this.state
        
        if (name !== prevState.name || page > prevState.page) {
            this.setState({ loader: 'loading' })
            
            setTimeout(() => {
            fetch(`https://pixabay.com/api/?q=${name}&page=${page}&key=28563998-94f39fcb3f5d6102eda4d8ddd&image_type=photo&orientation=horizontal&per_page=10`)
            .then(data => data.json())
            .then(hits => this.setState({
                totalHits: hits.totalHits,
                urlImage: [...this.state.urlImage, ...hits.hits],
            }))
            .catch(error => this.setState({error: error.message}))
            .finally(this.setState({ loader: 'load' }))
        }, 1000);
        }
        

        if (this.state.totalHits === 0) {
            toast.error("No result!", {
                autoClose: 2000
            })
        }
        
        if (this.state.error !== '') {
            toast.error(`${this.state.error}`, {
                autoClose: 2000
            })
        }
    }

    onSubmit = (data) => {
        if (data === '') {
            toast.info("Enter name!", {
                autoClose: 2000
            })
            return
        }
    
        this.setState({
            name: data,
            loader: 'loading',
            totalHits: null,
            urlImage: [] ,
        }) 
    }
    
    onClickLoadMore = () => {
        this.setState(prevPage => ({
            page: prevPage.page + 1
        }))
        
    } 

    onClickGalleryItem = (id) => {
        fetch(`https://pixabay.com/api/?key=28563998-94f39fcb3f5d6102eda4d8ddd&id=${id}`)
            .then(data => data.json())
            .then(data => this.setState({
                modalUrl: data.hits,
                modal: true,
            }))
        
    }

    closeModal = () => {
        this.setState({
            modal: false,
            modalUrl: [],
        })
    }

    

    render() {
        const { onSubmit, onClickGalleryItem, onClickLoadMore, closeModal } = this
        const {loader, urlImage, totalHits, modal, modalUrl } = this.state
        return (
            <>
                <Searchbar onSubmit={onSubmit} />
                <ImageGallery onClickGalleryItem={onClickGalleryItem} url={urlImage} />
                {loader === 'loading' &&
                    <Oval color="#00BFFF" height={80} width={80} />}
                {totalHits > 10 && <Button func={onClickLoadMore} />}
            
                {modal && <Modal closeModal={closeModal} url={modalUrl} />}
                <ToastContainer />
                
        </>
        )
    }
}
