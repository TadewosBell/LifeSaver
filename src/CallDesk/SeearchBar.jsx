import React from 'react';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { getCalls } from "../Client/LifeSaverClient";
import { filterCalls } from "./SearchResults"

function renderInputComponent(inputProps) {
    const { classes, inputRef = () => { }, ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input,
                },
            }}
            {...other}
        />
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map(part => (
                    <span key={part.text + part.highlight} style={{ fontWeight: part.highlight ? 500 : 400 }}>
                        {part.text}
                    </span>
                ))}
            </div>
        </MenuItem>
    );
}

function getSuggestions(value, options) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : options.filter(suggestion => {
            const keep =
                count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

function getSuggestionValue(suggestion) {
    return suggestion.label;
}

const useStyles = makeStyles(theme => ({
    root: {
        height: 150,
        flexGrow: 1,
    },
    container: {
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {
        height: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export default function IntegrationAutosuggest(props) {

    //ASYNC LOGIC
    // const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = /*open &&*/ options.length === 0;


    // React.useEffect(() => {
    //     if (!open) {
    //         setOptions([]);
    //     }
    // }, [open]);


    //display logic
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [state, setState] = React.useState({
        popper: ''
    });

    const [stateSuggestions, setSuggestions] = React.useState([]);

    const handleSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value, options));
    };

    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const handleChange = name => (event, { newValue }) => {
        setState({
            ...state,
            [name]: newValue,
        });
    };

    //STUPID LOGIC
    //Forces a flush on every single database update
    const [counter, setCounter] = React.useState(0);
    if (props.counter != counter) {
        setCounter(props.counter)
        setState({
            ...state,
            "popper": ""
        });
        setSuggestions([]);
    }

    console.log(counter);
    //ASYNC STUFF
    React.useEffect(() => {
        let active = true;

        // if (!loading) {
        //     return undefined;
        // }

        (async () => {
            const response = await getCalls();

            const calls = filterCalls(response);
            const labels = calls.map(obj => obj.title);
            const labelSet = [...new Set(labels)];
            const toDisplay = labelSet.map(label => { return { label: label }; })
            console.log(toDisplay);

            //To negate multiple sessions if they exist due to multiple re-renders
            if (active) {
                setOptions(toDisplay);
                console.log("UPDATED OPTIONS")

            }
        })();

        return () => {
            active = false;
        };
    }, [counter]);

    const autosuggestProps = {
        renderInputComponent,
        suggestions: stateSuggestions,
        onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
        onSuggestionsClearRequested: handleSuggestionsClearRequested,
        getSuggestionValue,
        renderSuggestion,
    };

    return (
        <form className={classes.root} action="#" onSubmit={() => { props.onSearch(state.popper) }}>
            <Grid
                justify="space-between"
                container
                spacing={0}
            >
                <Grid item  xs={11}>


                    <Autosuggest
                        {...autosuggestProps}
                        inputProps={{
                            classes,
                            id: 'react-autosuggest-popper',
                            label: 'Search',
                            placeholder: 'Enter Title...',
                            value: state.popper,
                            onChange: handleChange('popper'),
                            inputRef: node => {
                                setAnchorEl(node);
                            },
                            InputLabelProps: {
                                shrink: true,
                            },
                        }}
                        theme={{
                            suggestionsList: classes.suggestionsList,
                            suggestion: classes.suggestion,
                        }}
                        renderSuggestionsContainer={options => (
                            <Popper anchorEl={anchorEl} open={Boolean(options.children)}>
                                <Paper
                                    square
                                    {...options.containerProps}
                                    style={{ width: anchorEl ? anchorEl.clientWidth : undefined }}
                                >
                                    {options.children}
                                </Paper>
                            </Popper>
                        )}
                    />
                </Grid>

                <Grid item xs>
                    <Button variant="contained" color="primary" className={classes.button} type="submit">
                        SEARCH
                    </Button>
                </Grid>
            </Grid>

        </form>
    );
}