export const columns=[{
    Header: 'Id',
    accessor: 'id',
    filterMethod: (filter, row) => {
        return row[filter.id]===Number(filter.value);
    }
}, {
    Header: 'First Name',
    accessor: 'firstName'
}, {
    Header: 'Last Name',
    accessor: 'lastName'
}, {
    Header: 'Email',
    accessor: 'email'
}, {
    Header: 'Phone',
    accessor: 'phone'
}, {
    id: 'streetAddress',
    Header: 'Street Address',
    accessor: d => d.address.streetAddress
}, {
    id: 'city',
    Header: 'City',
    accessor: d => d.address.city
}, {
    id: 'state',
    Header: 'State',
    accessor: d => d.address.state
}, {
    id: 'zip',
    Header: 'Zip',
    accessor: d => d.address.zip
}, {
    Header: 'Description',
    accessor: 'description'
}
];