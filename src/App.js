import logo from './logo.svg';
import './App.css';
import {Button, Grid, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import { getVideoData } from "./services/index";
import YoutubeTable from "./components/youtubeTable";
import _ from 'lodash';

function App() {

    const [data,setData] = useState({});
    const [loader, setLoader] = useState(false);
    let filtering = false;
    const onFetchData = (state,instance) => {
        console.log(state)
        filtering=false;
        let variables = {
            page: state.page,
            size: state.pageSize

        };
        if(state.filtered && state.filtered.length > 0){
            state.filtered.forEach((filter) => {
                variables[filter.id] = filter.value
            })
        }
        if(state.sorted && state.sorted.length > 0){
            variables.orderBy = state.sorted[0].id;
            if(!state.sorted[0].desc)
                variables.direction = "ASC";
            else
                variables.direction = "DESC"
        }
        setLoader(true);
        getVideoData(variables).then((data) => {
            console.log(data);
            setData(data);
            setLoader(false);
        })
        console.log(variables);
    }
    const onFilteredChange = (column, value) => {
        filtering = true; // when the filter changes, that means someone is typing
    }

    const fetchDataWithDebounce = _.debounce(onFetchData, 1500);

    const fetchStrategy = (tableState,instance) => {
        if(filtering) {
            return fetchDataWithDebounce(tableState,instance)
        } else {
            return onFetchData(tableState,instance);
        }
    }
    return (
        <div className="App">
          <div>
              <Grid container style={{padding: 50}}>
                  <Grid item >
                      <img height='48px' width='auto' src="https://fampay.in/assets/images/icons/common/headerWhiteLogoIcon.svg"/>
                  </Grid>
                  <Grid item>
                      <Typography variant='h3' style={{ color: 'white', fontWeight: 'bolder'}}>
                         | FamTube
                      </Typography>
                  </Grid>
                  <Grid item xs={12} style={{paddingTop: 50}}>

                      <YoutubeTable
                          data={data}
                          onFetchData={fetchStrategy}
                          onFilteredChange={onFilteredChange}
                          loading={loader}
                          // filtered={filtered}
                          // setFiltered={setFiltered}
                      />
                  </Grid>
              </Grid>

          </div>
        </div>
      );
}

export default App;
