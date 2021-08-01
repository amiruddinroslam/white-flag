import React from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ClearIcon from '@material-ui/icons/Clear'
import Divider from '@material-ui/core/Divider'
import Geolocate from '../Geolocate/Geolocate'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  grid: {
    padding: '10px 20px',
  },
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

export default function Search({ panTo }) {
  const classes = useStyles()
  const {
    ready,
    value,
    suggestions: {
      status,
      data
    },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => 3.139003,
        lng: () => 101.686852
      },
      radius: 1000 * 1000
    }
  })

  const handleInput = (e) => {
    setValue(e.target.value);
  };
  const handleSelect =
    ({ description }) =>
      () => {
        setValue(description, false);
        clearSuggestions();

        getGeocode({ address: description })
          .then((results) => getLatLng(results[0]))
          .then(({ lat, lng }) => {
            panTo({ lat, lng });
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
      };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <Paper style={{ cursor: 'pointer' }}>
          <Grid container className={classes.grid} alignItems="center" onClick={handleSelect(suggestion)}>
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              <span key={place_id}>
                {main_text}
              </span>
              <Typography variant="body2" color="textSecondary">
                {secondary_text}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      );
    });

  return (
    <div className="search">
      <Paper component="form" className={classes.root}>
        <InputBase
          variant="outlined"
          style={{ width: 400 }}
          label="Search a location"
          value={value}
          onChange={handleInput}
          disabled={!ready}
          className={classes.input}
          placeholder="Search a location"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton className={classes.iconButton} aria-label="search">
          {value ? <ClearIcon onClick={() => setValue('')} /> : <SearchIcon />}
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <Geolocate panTo={panTo} />
      </Paper>
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  )
}
