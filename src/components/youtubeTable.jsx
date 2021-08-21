import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

const YoutubeTable = ({data, onFetchData, onFilteredChange, loading }) => {
    return (
        <div>
            <ReactTable style={{color: 'black', backgroundColor: 'white'}}
                data={data.response ? data.response.videos : []}
                filterable
                pages={data.response ? data.response.totalPages : 0}
                columns={[
                    {
                        id: 'title',
                        Header: "Title",
                        accessor: "title",
                        Filter: ({filter, onChange}) => (
                            <input
                                placeholder="Search by Video Title"
                                value={filter ? filter.value : ''}
                                onChange={event => onChange(event.target.value)}
                            />
                        ),
                    },
                    {
                        id: 'description',
                        Header: "Description",
                        accessor: 'description',
                        filterable: true,
                        Filter: ({filter, onChange}) => (
                            <input
                                placeholder="Search by Video Description"
                                value={filter ? filter.value : ''}
                                onChange={event => onChange(event.target.value)}
                            />
                        ),
                    },
                    {
                        id: 'thumbnail',
                        Header: "Thumbnail",
                        accessor: 'thumbnail',
                        filterable: false,
                        Cell: (row) => {
                            return (
                                <div>
                                    <img
                                        src={row.row.thumbnail}
                                        height='100px'
                                        width='auto'
                                    />
                                </div>
                            );
                        },
                    },
                    {
                        id: 'pub_datetime',
                        Header: "Published At",
                        accessor: 'pub_datetime',
                        filterable: false,
                    },

                ]}
                defaultPageSize={5}
                className="-striped -highlight"
                loading={loading}
                showPagination={true}
                showPaginationTop={false}
                showPaginationBottom={true}
                pageSizeOptions={[5,10]}
                sortable={true}
                manual // this would indicate that server side pagination has been enabled
                onFetchData={(state,instance) => onFetchData(state,instance)}
                onFilteredChange={onFilteredChange}
            />
        </div>
    )
}

export default YoutubeTable;
