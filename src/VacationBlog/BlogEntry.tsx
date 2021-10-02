import React from 'react';
import {withStyles, createStyles, WithStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
// import Box from '@material-ui/core/Box';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtls from '@date-io/date-fns';
import VacationList from '../VacationBlog/VacationList';

import APIURL from '../helpers/enviroment';

interface BlogEntryProps extends WithStyles<typeof styles> {
	clearToken: any;
	token: string;
	admin: boolean;

}

interface BlogEntryState {
	photo: string,
	title: string,
	date: string,
	description: string,
	selectedDate: Date,
	blogArray: any[],
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

class BlogEntry extends React.Component<BlogEntryProps, BlogEntryState> { //these are the two interface from above
    constructor(props:BlogEntryProps){
        super(props)
        const state = {
			photo: '',
			title: '',
			date: '',
			description: '',
			selectedDate: new Date(),
			blogArray: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

	async componentDidMount(){
		const response = await fetch(`${APIURL}/vacation/getAllBlogsByUser`,{
			method: 'GET',
			headers: new Headers({
				"Content-Type": "application/json",
				"Authorization": `Bearer ${this.props.token}`,
			}),
		});
		const json = await response.json();
		if(json){
			this.setState({blogArray: json});
			console.log("blogArray",this.state.blogArray);
		}
	}

	//delete & update function
	handleDelete = () => {
		fetch(`${APIURL}/vacation/delte`,{
			method: 'DELETE',
			headers: new Headers({
				"Content-Type": "application/json",
				"Authorization": `Bearer ${this.props.token}`,
			}),
		})
		.then((res) => res.json())
		.then(() => {
				//
		})
		.catch(e => console.log(e))
	};

	handleUpdate = () => {
		fetch(`${APIURL}/vacation/update`,{
			method: 'PUT',
			body: JSON.stringify({
				photo: this.state.photo,
				title: this.state.title,
				date: this.state.date,
				description: this.state.description
			}),
			headers: new Headers({
				"Content-Type": "application/json",
				"Authorization": `Bearer ${this.props.token}`,
			}),
		})
		.then((res) => res.json())
		.then(() => {
			//
		})
		.catch(e => console.log(e))
	};





	// componentDidMount = () => {
	// 	console.log("blogArray",this.state.blogArray);
	// 	this.getData()
	// }

	// getData = () => {
	// 	fetch(`${APIURL}/vacation/getAllBlogsByUser`,{
	// 		method: 'GET',
	// 		headers: new Headers({
	// 			"Content-Type": "application/json",
	// 			"Authorization": `Bearer ${this.props.token}`,
	// 		}),
	// 	})
	// 	.then((res) => res.json())
	// 	.then((data) => 
	// 		this.setState({blogArray: data})
	// 	)
	// 	.catch((err) => console.log(err))
	// };

    handleSubmit = (event: any) => {
        event.preventDefault();
        fetch(`${APIURL}/vacation/create`,{
            method: 'POST',
			body: JSON.stringify({
				photo: this.state.photo,
				title: this.state.title,
				date: this.state.date,
				description: this.state.description
			}),
			headers: new Headers({
				"Content-Type": "application/json",
				"Authorization": `Bearer ${this.props.token}`,
			}),
        })
        .then((res) => res.json())
		.then(() => {
			this.setState({photo: ''});
			this.setState({title: ''});
			this.setState({date: ''});
			this.setState({description: ''});
		})
        // .then((data) => props.updateToken(data.sessionToken))
        .catch(e => console.log(e))
    };

    handlePictureChange = (event: any) => {
        event.preventDefault();
        this.setState({photo: event.target.value});
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
            <Container component="main" maxWidth="sm">
				<Button onClick={this.props.clearToken} style={{backgroundColor: "lightblue"}} className={classes.submit} type="submit" fullWidth variant='outlined' color="primary">Logout</Button>
				<CssBaseline />
				<div className={classes.paper}>
					<Typography component="h1" variant="h5" color="primary">Create A Vacation Blog!</Typography>
					<br />
					{/* <Avatar className={classes.avatar}>
							<LockOutlinedIcon />
					</Avatar> */}
					<Typography component="h1" variant="h5">Vacation Details :</Typography>
					<form className={classes.form} onSubmit={this.handleSubmit}>
						<Grid container spacing={2}>
                        <Grid item xs={12} >
								<TextField className={classes.input} onChange={this.handlePictureChange} autoComplete="picture" name="picture" variant="standard" required fullWidth id="picture" label="Picture" autoFocus />
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField className={classes.input} onChange={this.handleTitleChange} autoComplete="title" name="title" variant="standard" required fullWidth id="title" label="Title" autoFocus />
							</Grid>
							<Grid item xs={12} sm={6}>
									<TextField 
										id="date"
										label="Date"
										type="date"
										onChange={this.handleDateChange}
										defaultValue="2021-01-1"
										// className={classes.textField}
										fullWidth
										InputLabelProps={{
										shrink: true,
										}}
									/>
							</Grid>
							<Grid item xs={12} >
								<TextField className={classes.input} onChange={this.handleDescriptionChange} multiline rows={10} autoComplete="description" name="discription" variant="standard" required fullWidth id="description" label="Description" autoFocus />
							</Grid>
						</Grid>
						<Button style={{backgroundColor: "lightblue"}} className={classes.submit} type="submit" fullWidth variant='outlined' color="primary">Post Blog</Button>
					</form>
				</div>
				{/* {console.log(this.state.blogArray)} */}
				{/* <VacationList token={this.props.token} blogArray={this.state.blogArray} /> */}
				<VacationList token={this.props.token} />
			</Container>
        );
    }
}


export default withStyles(styles)(BlogEntry)