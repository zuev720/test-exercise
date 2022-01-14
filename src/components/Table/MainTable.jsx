import React, {useEffect, useState} from "react";
import {TableBody} from "./TableBody";
import {useDispatch} from "react-redux";
import {fetchDataTable, sortTable} from "../../store/tableDataSlice";
import './table.css'

export function MainTable() {
    const [sortValue, setSortValue] = useState({field: null, status: ''});

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDataTable());
    }, [dispatch]);

    const requestSort = (field) => {
        let status = 'up';
        if (sortValue.field === field && sortValue.status === 'up') {
            status = 'down';
        }
        if (sortValue.field === field && sortValue.status === 'down') {
            status = '';
        }
        setSortValue({ field, status });
        dispatch(sortTable({field, status}));
    }

    const getClassName = (name) => {
        let className = 'headerTableButton';
        if (sortValue.field === name && sortValue.status === 'up') className += ' up';
        if (sortValue.field === name && sortValue.status === 'down') className += ' down';
        return className;
    }

    return (
        <table className="table mt-5">
            <thead>
            <tr>
                <th>Дата</th>
                <th>
                    <button className={getClassName('name')} onClick={() => requestSort('name')}>Название</button>
                </th>
                <th>
                    <button className={getClassName('mount')} onClick={() => requestSort('mount')}>Количество</button>
                </th>
                <th>
                    <button className={getClassName('distance')} onClick={() => requestSort('distance')}>Расстояние</button>
                </th>
            </tr>
            </thead>
            <TableBody />
        </table>
    )
}