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
	token: string;
}

interface IVacataionList {
	photo: string,
	title: string,
	date: string,
	descrtiption: string,
}
interface VacationListState {
	blogArray: Array<IVacataionList>,
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
			blogArray: [],
		}
		this.getData = this.getData.bind(this);
	}

	componentDidMount = () => {
		this.getData();
	};

	getData = () => {
		fetch(`${APIURL}/vacation/getAllBlogsByUser`,{
			method: 'GET',
			headers: new Headers({
				"Content-Type": "application/json",
				"Authorization": `Bearer ${this.props.token}`,
			}),
		})
		.then((res) => res.json())
		.then((data) => {
			// console.log('data', data);
			if(data) {
				this.setState({blogArray: data});
				// console.log('blogArray', this.state.blogArray);
			}
		})
		.catch(e => console.log(e))
	};

	render() {
		const {classes} =  this.props; //this is neccassary 
		return(
			<div>
				{/* {this.state.blogArray.map((record, i) => (
					<div>
						<p key={i}></p>
						<p>record.photo</p><br/>
						<p>record.title</p><br/>
						<p>record.date</p><br/>
						<p>record.description</p><br/>
					</div>
				))} */}
			</div>
		);
	}
}
  


export default withStyles(styles)(VacationList)