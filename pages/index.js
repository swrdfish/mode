import React from 'react'
import ReactDom from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Head from 'next/head'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import { initStore, toggleDrawer} from '../store'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import injectTapEventPlugin from 'react-tap-event-plugin'


// Make sure react-tap-event-plugin only gets injected once
// Needed for material-ui
if (!process.tapEventInjected) {
  injectTapEventPlugin()
  process.tapEventInjected = true
}


class App extends React.Component {
	render () {
		const { drawer_open, toggleDrawer } = this.props
		const hello = this.onToggleDrawer

		return (
			<div>
				<Head>
					<title>Mode \ For the trend setters</title>
					<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"></link>
					<link rel="stylesheet" href="/static/css/main.css" />
				</Head>
				<MuiThemeProvider>
					<div>
						<AppBar 
							title="Mode"
							iconClassNameRight="muidocs-icon-navigation-expand-more"
							onLeftIconButtonTouchTap={toggleDrawer}
						/>
						<h1>{drawer_open}</h1>
						<Drawer open={drawer_open}
								docked={false}
								onRequestChange={(open) => toggleDrawer()}
						>
							<MenuItem>Home</MenuItem>
							<MenuItem>Blog</MenuItem>
							<MenuItem>About</MenuItem>
						</Drawer>
					</div>
				</MuiThemeProvider>
			</div>
		)
	}

	onToggleDrawer () {
		console.log(this)
	}
}


const mapStateToProps = ({ drawer_open }) => ({ drawer_open })

const mapDispatchToProps = (dispatch) => {
	return {
		toggleDrawer: bindActionCreators(toggleDrawer, dispatch)
	}
}

const ReduxApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default withRedux(initStore)(ReduxApp)