import React, {useState} from "react";
import './filter.css'
import {useDispatch} from "react-redux";
import {fetchFilterDataTable} from "../../store/tableDataSlice";

export function Filter() {
    const [inputState, setInputState] = useState('');
    const [valueFieldTable, setValueFieldTable] = useState(null);
    const [translateValueFieldTable, setTranslateValueFieldTable] = useState(null);
    const [searchTerms, setSearchTerms] = useState(null);
    const [translateTerms, setTranslateSearchTerms] = useState(null);

    const dispatch = useDispatch();

    const handleClickTableItem = (value, translateValue) => {
        setValueFieldTable(value);
        setTranslateValueFieldTable(translateValue);
    }

    const handleClickTerm = (value, translateValue) => {
        setSearchTerms(value);
        setTranslateSearchTerms(translateValue);
    }

    const handleInputChange = (e) => {
        setInputState(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputState === '') return;
        const inputValue = (isNaN(Number(inputState))) ? inputState : Number(inputState);
        const requestObject = {
            field: valueFieldTable,
            term: searchTerms,
            filterValue: inputValue,
        }

        dispatch(fetchFilterDataTable(requestObject));
        setInputState('');
        setValueFieldTable(null);
        setTranslateValueFieldTable(null);
        setSearchTerms(null);
        setTranslateSearchTerms(null);
    }

    return (
        <div className={'Filter mt-3'}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                <div className="container-fluid">
                    <p className="navbar-brand" >Фильтр поиска</p>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                        <ul className="navbar-nav ms-5">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink"
                                   role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {(translateValueFieldTable) ? translateValueFieldTable : 'Выберите поле таблицы'}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark"
                                    aria-labelledby="navbarDarkDropdownMenuLink">
                                    <li><p className="dropdown-item" onClick={() => handleClickTableItem('name', 'Название')}>Название</p></li>
                                    <li><p className="dropdown-item" onClick={() => handleClickTableItem('mount', 'Количество')}>Количество</p></li>
                                    <li><p className="dropdown-item" onClick={() => handleClickTableItem('distance', 'Расстояние')}>Расстояние</p></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink"
                                   role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {(translateTerms) ? translateTerms : 'Выберите условие для поиска'}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark"
                                    aria-labelledby="navbarDarkDropdownMenuLink">
                                    <li><p className="dropdown-item" onClick={() => handleClickTerm('>', 'Больше')}>Больше&nbsp;&nbsp;&nbsp;  &gt;</p></li>
                                    <li><p className="dropdown-item" onClick={() => handleClickTerm('<', 'Меньше')}>Меньше&nbsp;&nbsp;&nbsp;  &lt;</p></li>
                                    <li><p className="dropdown-item" onClick={() => handleClickTerm('=', 'Равно')}>Равно&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   &#61;</p></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        className="form-control-sm me-5 border-0"
                        type="text"
                        value={inputState}
                        placeholder={"значение для фильтрации..."}
                        onChange={handleInputChange} />
                </form>
            </nav>
        </div>
    )
}