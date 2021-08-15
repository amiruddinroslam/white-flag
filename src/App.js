import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import InfoIcon from '@material-ui/icons/Info'
import HomeIcon from '@material-ui/icons/Home'
import ContactSupportIcon from '@material-ui/icons/ContactSupport'

import Home from './views/Home/Home'
import About from './views/About/About'
import Instructions from './views/Instructions/Instructions'

const useStyles = makeStyles((theme) => ({
	root: {
	// height: '7vh',
	position : 'sticky',
	bottom : 0,
	zIndex : 20
	}
}))

function App() {
	const [menuValue, setMenuValue] = useState("home");

	const handleChange = (event, newValue) => {
		setMenuValue(newValue);
	};

	const classes = useStyles();

	return (
		<>
			{/* <h2 className="white-flag-logo">
			White Flag{" "}
			<span role="img" aria-label="white-flag">
				🏳
			</span>
			</h2> */}
			<Router>
			<Route exact path="/">
				<Switch>
				<Home />
				</Switch>
			</Route>
			<Route exact path="/about">
				<Switch>
				<About />
				</Switch>
			</Route>
			<Route exact path="/instructions">
				<Switch>
				<Instructions />
				</Switch>
			</Route>
			<BottomNavigation
				value={menuValue}
				onChange={handleChange}
				className={classes.root}
			>
				<BottomNavigationAction
				component={Link}
				to="/about"
				label="About"
				value="about"
				icon={<InfoIcon />}
				/>
				<BottomNavigationAction
				component={Link}
				to="/"
				label="Home"
				value="home"
				icon={<HomeIcon />}
				/>
				<BottomNavigationAction
				component={Link}
				to="/instructions"
				label="Instructions"
				value="instructions"
				icon={<ContactSupportIcon />}
				/>
			</BottomNavigation>
			</Router>
			{/* <Box display="flex" flexDirection="row-reverse">
			<Box style={{ padding: '0 10px' }}>
				<Typography variant="overline" display="block" gutterBottom>
				About
				</Typography>
			</Box>
			<Box style={{ padding: '0 10px' }}>
				<Typography variant="overline" display="block" gutterBottom>
				Contact
				</Typography>
			</Box>
			</Box> */}
			{/* <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
		</>
	);
}

export default App;
