import React from 'react';
import {withStyles, createStyles, WithStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
// import Box from '@material-ui/core/Box';
//Card
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
//
import APIURL from '../helpers/enviroment';



interface VacationListProps extends WithStyles<typeof styles> {
	clearToken: any;
	token: string;
	admin: boolean;

}


interface VacationListState {
	picture: string,
	title: string,
	date: string,
	description: string,
}


const styles = ({palette, spacing}: Theme) => createStyles({
	paper: {
		marginTop: spacing(8),
		display: "flex",
		flexDirection: 'column',
		alignItems: 'center',
	  },
	  avatar: {
		margin: spacing(1),
		backgroundColor: palette.primary.dark,
	  },
	  input: {
		  backgroundColor: 'white',
	  },
	  form: {
		width: '100%',
		marginTop: spacing(3),
	  },
	  submit: {
		margin: spacing(3, 0, 0),
	  },
});

class VacationList extends React.Component<VacationListProps, VacationListState> { //these are the two interface from above
	constructor(props:VacationListProps){
		super(props)
		const state = {
			picture: '',
			title: '',
			date: '',
			description: '',
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit = (event: any) => {
		event.preventDefault();
		fetch(`${APIURL}/vacation/edit`,{
			method: 'POST',
			body: JSON.stringify({
				picture: this.state.picture,
				title: this.state.title,
				date: this.state.date,
				description: this.state.description
			}),
			headers: new Headers({
				"Content-Type": "application/json"
			}),
		})
		.then((res) => res.json())
		// .then((data) => props.updateToken(data.sessionToken))
		.catch(e => console.log(e))
	};

	handlePictureChange = (event: any) => {
		event.preventDefault();
		this.setState({picture: event.target.value});
	};

	handleTitleChange = (event: any) => {
		event.preventDefault();
		this.setState({title: event.target.value});
	};

	handleDateChange = (event: any) => {
		event.preventDefault();
		this.setState({date: event.target.value});
	};

	handleDescriptionChange = (event: any) => {
		event.preventDefault();
		this.setState({description: event.target.value});
	};

	render() {
		const {classes} =  this.props; //this is neccassary 
		return(
			<div>
				<h1>Vacation List:</h1>
			</div>
		);
	}
}
  


export default withStyles(styles)(VacationList)