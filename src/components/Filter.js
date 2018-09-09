import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';


const Filter = (props) => {

    const theme = createMuiTheme({
        palette: {
          primary: {main: '#ff9100'}
        },
    }); 

    const types = ["drawing", "installation", "sculpture", "sound", "video", "watercolor"];

    const filters = types.map((type)=>{
        return(
            <FormControlLabel
                key={`${type}`}
                labelPlacement={`start`}
                control={
                <Switch
                    style={{height: `35px`}}
                    color='primary'
                    onChange={(e)=>props.filter(e)}
                    value={`${type}`}
                />
                }
                label={`${type.toUpperCase()}`}
            />
        )
    });

    return (
        <MuiThemeProvider theme={theme}>
            <input 
                id="filterToggle" 
                type="checkbox"
                name="filterOpen"
                checked={props.filterOpen}
                onChange={props.handleFilter}/>
            <label htmlFor="filterToggle">
                <div className="filter-toggler"></div>
            </label>
            <FormControl 
                id="filterForm"
                component="fieldset"
            >
                <FormGroup>
                    {filters}
                </FormGroup>
            </FormControl>
        </MuiThemeProvider>
    );
};

export default Filter;