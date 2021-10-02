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
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

//
import APIURL from '../helpers/enviroment';

interface VacationListProps extends WithStyles<typeof styles> {
	token: string;
	// blogArray: any[],
}

interface IVacataionList {
	photo: string,
	title: string,
	date: string,
	descrtiption: string,
}
interface VacationListState {
	testArray: any[]
}


const styles = ({palette, spacing}: Theme) => createStyles({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

class VacationList extends React.Component<VacationListProps, VacationListState> { //these are the two interface from above
	constructor(props:VacationListProps){
		super(props)
		const state = {
			testArray: [
				{id: 4, photo: 'https://images.unsplash.com/photo-1518638150340-f7…8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2067&q=80', title: 'Chichén Itzá, Mérida, Mexico', date: '2021-07-01', description: 'Mexico!'},
				{id: 5, photo: 'https://images.unsplash.com/photo-1486299267070-83…8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2071&q=80', title: 'Big Ben, London', date: '2021-08-01', description: 'London'},
				{id: 6, photo: 'https://images.unsplash.com/photo-1547981609-4b6bf…8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80', title: 'Forbidden City, Beijing, China', date: '2020-03-01', description: 'China'},
				{id: 7, photo: 'https://images.unsplash.com/photo-1545569341-9eb8b…8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80', title: 'Kiyozumi Dera, Kyoto, Japan', date: '2020-12-01', description: 'Japan'},
				{id: 8, photo: 'https://images.unsplash.com/photo-1558963287-892bc…8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1932&q=80', title: 'Dunluce Castle, Northern Ireland', date: '2020-05-01', description: 'Ireland'},
				{id: 9, photo: 'https://images.unsplash.com/photo-1544085311-11a02…8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1932&q=80', title: 'Bryggen, Bergen, Norway', date: '2020-12-17', description: 'Norway'},
				{id: 10, photo: 'https://images.unsplash.com/photo-1544085311-11a02…8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1932&q=80', title: 'Bryggen, Bergen, Norway', date: '2020-12-17', description: 'Norway'},
			]
		}
	}

	componentDidMount = () => {
		console.log(this.state.testArray);
		
	}

	render() {
		const {classes} =  this.props; //this is neccassary 
		return(
			<div>
				<h1>Past Vacations:</h1>
				 {/* <Card className={classes.root}>
					<CardContent>
						<Typography className={classes.title} color="textSecondary" gutterBottom>
						Word of the Day
						</Typography>
						<Typography variant="h5" component="h2" gutterBottom>
						benevolent
						</Typography>
						<Typography className={classes.pos} color="textSecondary">
						adjective
						</Typography>
						<Typography variant="body2" component="p">
						Description
						<br />
						{'"a benevolent smile"'}
						</Typography>
					</CardContent>
					<CardActions>
						<Button size="small">Learn More</Button>
					</CardActions>
					</Card> */}
				{/* {this.state.testArray.map((record, i) => (
					<div>
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