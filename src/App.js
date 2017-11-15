import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {columns} from './Columns';

class App extends Component {
    constructor () {
        super();
        this.state= {
            value: 'small',
            isFetching: false,
            data: [],
        };
    }

    //Shows the selected user on click.
    selectedUser () {
        if (this.state.user) {
            return (
                <p>
                    Выбран пользователь <b>{this.state.user.name}</b><br/>
                    Описание:<br/>
                    <textarea cols={50} rows={5} value={this.state.user.description}> </textarea><br/>
                    Адрес проживания: <b>{this.state.user.street}</b><br/>
                    Город: <b>{this.state.user.city}</b><br/>
                    Провинция/штат: <b>{this.state.user.state}</b><br/>
                    Индекс: <b>{this.state.user.zip}</b>
                </p>
            );
        } else {
            return (<p>Выберите пользователя</p>);
        }
    }

    //User chooses the data size (not seen after the choice).
    choosingData () {
        if (this.state.data.length < 1) {
            return (
                <div className="info">
                    <h3>Выберите объем данных для таблицы</h3>
                    <form onSubmit={this.fetchData.bind(this)}>
                        <select value={this.state.value} onChange={this.changeValue.bind(this)}>
                            <option value="small">Маленький</option>
                            <option value="large">Большой</option>
                        </select>
                        <button type="submit">Выбрать</button>
                    </form>
                    {this.handleLoading()}
                </div>
            )
        }
    }

    //Shows a loading message while data is being loaded from the server.
    handleLoading () {
        if (this.state.isFetching)
        {return (<p>Загрузка...</p>)}
    }

    //Changes the state of 'value' to handle small or large data size.
    changeValue(e) {
        this.setState( {value: e.target.value} );
    }

    //Fetches the data on form submit.
    fetchData(e) {
        e.preventDefault();
        this.setState( {isFetching: true} );
        const urlSmall='http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D',
        urlLarge='http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
        let url= this.state.value === 'small' ? urlSmall : urlLarge;
        return fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                } else {
                    return response.json();
                }})
            //Puts the fetched data in state, and isFetching back to false.
            .then(response => this.setState( {data: response, isFetching: false} ))
            .catch(err => console.warn(err));
    }

    render() {
        return (
            <div>
                {this.choosingData()}
                <h2 className="tableHeading">Таблица данных о пользователях</h2>
                <ReactTable
                    data={this.state.data}
                    columns={columns}
                    pageSizeOptions={[10, 25, 50]} //User can choose how many rows to display on page.
                    defaultSorted={[{id: 'id'}]} //Automatically sorts the 'Id' column.
                    filterable
                    //Filter is case-insensitive.
                    defaultFilterMethod={(filter, row) => {
                        return row[filter.id].toLowerCase().indexOf(filter.value.toLowerCase()) !==-1;
                    }}
                    getTrProps={(state, rowInfo) => {
                        return {
                            onClick: () => {
                                //Sets the clicked user to state.
                                this.setState({
                                    user: {
                                        name: `${rowInfo.row.firstName} ${rowInfo.row.lastName}`,
                                        description: `${rowInfo.row.description}`,
                                        street: `${rowInfo.row.streetAddress}`,
                                        city: `${rowInfo.row.city}`,
                                        state: `${rowInfo.row.state}`,
                                        zip: `${rowInfo.row.zip}`
                                    }
                                });
                            }}
                    }}
                />
                <div className="info">
                    {this.selectedUser()}
                </div>
            </div>
        );
    }
}

export default App;
