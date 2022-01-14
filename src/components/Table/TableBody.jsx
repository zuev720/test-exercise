import React from "react";
import {useSelector} from "react-redux";

export function TableBody() {
    const objects = useSelector((state) => state.data);

    const Tr = (props) => {
        return (
            <tr>
                <td>{props.date}</td>
                <td>{props.name}</td>
                <td>{props.mount} шт.</td>
                <td>{props.distance} км</td>
            </tr>
        )
    }

    return (
        <tbody>
        {objects.map((elem) => <Tr key={elem.id} {...elem}/>)}
        </tbody>
    )
}