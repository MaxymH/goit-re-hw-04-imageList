import { useState } from 'react'
import s from './searchBar.module.css'
import PropTypes from 'prop-types';



const Searchbar = ({onSubmit}) => {
    const [searchbar, setSearchbar] = useState('')

    const handleChange = (e) => {
        setSearchbar(e.target.value)
    }

    const onSubmitForm = e => {
        e.preventDefault()
        onSubmit(searchbar)
        setSearchbar('')

    }

    return (
            <header className={s.searchbar}>
            <form
                className={s.searchForm}
                onSubmit={onSubmitForm}
            >
                    <button type="submit" className={s.button} >
                        <span className={s.button_label}>Search</span>
                    </button>

                    <input
                        name='searchbar'
                    value={searchbar}
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

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}


export default Searchbar;