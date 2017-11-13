import React, {Component} from 'react';

export default class Form extends Component {
    render () {
        return (
            <div>
                <h3>Поиск по таблице</h3>
                <form>
                    <input type="text" placeholder="Введите текст" />
                    <button type="submit">Найти</button>
                </form><br/>
            </div>
        )
    }
}