import { Component } from 'react'
import s from './searchBar.module.css'
import PropTypes from 'prop-types';

class Searchbar extends Component{
    state = {
        inputValue: '',
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            inputValue: value.toLowerCase(),
        })
    }


    onSubmitForm = (e) => {
        e.preventDefault()
        const value = this.state.inputValue;
        const { onSubmit} = this.props
        onSubmit(value)
        this.setState({
            inputValue: '',
        })
        e.target.children[1].value = ''
       
    }
    render() {
        const {onSubmitForm, handleChange} = this
        return (
            <header className={s.searchbar}>
                <form  className={s.searchForm} onSubmit={onSubmitForm}>
                    <button type="submit" className={s.button} >
                        <span className={s.button_label}>Search</span>
                    </button>

                    <input
                        onChange={handleChange}
                        className={s.input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        )
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}


export default Searchbar;