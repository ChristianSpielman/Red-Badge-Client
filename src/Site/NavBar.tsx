import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Link, Switch, Route } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import BlogEntry from '../VacationBlog/BlogEntry';
import AllBlogs from './AllBlogs';

interface NavBarProps {
	clearToken: any,
	token: string,
	admin: boolean,
	// blogArray: any[],
	// classes: any,
}

interface NavBarState {
	//
}

const useStyles = makeStyles((theme: Theme) =>
createStyles({
	root: {
	flexGrow: 1,
	},
	menuButton: {
	marginRight: theme.spacing(2),
	},
	title: {
	flexGrow: 1,
	},
}),
);

const history = createBrowserHistory();

class NavBar extends React.Component<NavBarProps, NavBarState> {
	constructor(props:NavBarProps){
        super(props)
        this.state = {
        }
    }



render() {
	return (
		<div>
			<Router history={history}>
				<AppBar position="fixed">
					<Toolbar>
						<Typography variant="h6">Vacation Blog</Typography>
							<Button color="primary"><Link to='/allBlogs'>View All</Link></Button>
							<Button color="inherit"><Link to="/blogEntry">Create a Blog</Link></Button>
							<Button color="inherit" onClick={this.props.clearToken}><Link to=''>Logout</Link></Button>
					</Toolbar>
				</AppBar>
			<Switch>
				<Route exact path="/"><AllBlogs token={this.props.token}/></Route>
				<Route exact path="/allBlogs"><AllBlogs token={this.props.token}/></Route>
				<Route exact path="/blogEntry"><BlogEntry token={this.props.token} clearToken={this.props.clearToken} admin={this.props.admin} /></Route>
			</Switch>
			</Router>
		</div>
		);
	}
}

export default NavBar;