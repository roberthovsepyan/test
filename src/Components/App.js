import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Form from './Form';
import {columns} from './Columns';

const urlSmall='http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
const urlLarge='http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';

class App extends Component {
    constructor () {
        super();
        this.state= {
            search: '',
            value: 'small',
            isFetching: false,
            loading: 'Загрузка...'
        };
    }
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
        }
        return (<p>Выберите пользователя</p>);
    }
    fetchedData () {
        if (!this.state.data) {
            return (
                <div>
                    <h3>Выберите объем данных для таблицы</h3>
                        <form onSubmit={this.fetchData.bind(this)}>
                            <select value={this.state.value} onChange={this.handleChange.bind(this)}>
                              <option value="small">Маленький</option>
                              <option value="large">Большой</option>
                            </select>
                            <button type="submit">Выбрать</button>
                        </form>
                </div>
            )
        }
    }
    handleLoading () {
        if (this.state.fetching)
        {return (<p>{this.state.loading}</p>)}
    }
    handleChange(e) {
        this.setState({value: e.target.value});

    }
    fetchData(e) {
        e.preventDefault();
        this.setState({fetching: true});
        let url='';
        if (this.state.value==='small') {url=urlSmall;}
        else {url=urlLarge;}
        return fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();})
            .then(response => this.setState({data: response, isFetching: false}))
            .catch(err => console.warn(err));
    }
    render() {
        return (
            <div>
                {this.fetchedData()}
                {this.handleLoading()}
                <Form />
                <ReactTable
                    data={this.state.data}
                    columns={columns}
                    pageSizeOptions={[10, 25, 50]}
                    defaultSorted={[{id: 'id'}]}
                    getTrProps={(state, rowInfo) => {
                        return {
                            onClick: () => {
                                this.setState({
                                user: {
                                    name: `${rowInfo.row.firstName} ${rowInfo.row.lastName}`,
                                    description: `${rowInfo.row.description}`,
                                    street: `${rowInfo.row.streetAddress}`,
                                    city: `${rowInfo.row.city}`,
                                    state: `${rowInfo.row.state}`,
                                    zip: `${rowInfo.row.zip}`
                                }
                            })
                        }}
                    }}
                />
                <div>
                    {this.selectedUser()}
                </div>
            </div>
        );
    }
}

export default App;
