import React from 'react';
import {withStyles, createStyles, WithStyles, Theme} from '@material-ui/core/styles';//need this
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
// import Link from '@material-ui/core/Link';
// import Box from '@material-ui/core/Box';
import APIURL from '../helpers/enviroment';
import { Email } from '@material-ui/icons';

interface RegisterProps extends WithStyles<typeof styles> {
	updateToken: any;
	clearToken: any;
}

interface RegisterState {
	firstName: string,
	lastName: string,
	email: string,
	password: string,
}
//styles is neccassary, based on what I add from material ui (button, form, card etc) this is where i will change CSS values
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
						//it is important to have the React.
class Register extends React.Component<RegisterProps, RegisterState> { //these are the two interface from above
    constructor(props:RegisterProps){
        super(props)
        const state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    // componentDidMount = () => {
    //     console.log(this.state.firstName);
    // }

    handleSubmit = (event: any) => {
        event.preventDefault();
        fetch(`${APIURL}/users/register`,{
            method: 'POST',
			body: JSON.stringify({
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				email: this.state.email,
				password: this.state.password
			}),
			headers: new Headers({
				"Content-Type": "application/json"
			}),
        })
        .then((res) => res.json())
        .then((data) => this.props.updateToken(data.sessionToken, data.user.admin))
        .catch(e => console.log(e))
    };

    handleFirstNameChange = (event: any) => {
        event.preventDefault();
        this.setState({firstName: event.target.value});
    };

    handleLastNameChange = (event: any) => {
        event.preventDefault();
        this.setState({lastName: event.target.value});
    };

    handleEmailChange = (event: any) => {
        event.preventDefault();
        this.setState({email: event.target.value});
    };

    handlePasswordChange = (event: any) => {
        event.preventDefault();
        this.setState({password: event.target.value});
    };

    render() {
        const {classes} =  this.props; //this is neccassary 
        return(
            <Container component="main" maxWidth="sm">
				<CssBaseline />
				<div className={classes.paper}>
					<Typography component="h1" variant="h5"><code>Welcome to My Travel Blog</code></Typography>
					<br />
					{/* <Avatar className={classes.avatar}>
							<LockOutlinedIcon />
					</Avatar> */}
					<Typography component="h1" variant="h5">Sign Up :</Typography>
					<form className={classes.form} onSubmit={this.handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField className={classes.input} onChange={this.handleFirstNameChange} autoComplete="fname" name="firstName" variant="outlined" required fullWidth id="firstName" label="First Name" autoFocus />
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField className={classes.input} onChange={this.handleLastNameChange} autoComplete="lname" name="lastName" variant="outlined" required fullWidth id="lastName" label="Last Name" autoFocus />
							</Grid>
							<Grid item xs={12} >
								<TextField className={classes.input} onChange={this.handleEmailChange} autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email" autoFocus />
							</Grid>
							<Grid item xs={12} >
								<TextField className={classes.input} onChange={this.handlePasswordChange} autoComplete="password" name="password" variant="outlined" required fullWidth id="password" label="Password" autoFocus />
							</Grid>
						</Grid>
						<Button style={{backgroundColor: "lightblue"}} className={classes.submit} type="submit" fullWidth variant='outlined' color="primary">Register</Button>
					</form>
				</div>
			</Container>
        );
    }
}

export default withStyles(styles)(Register) //all of this is neccassary