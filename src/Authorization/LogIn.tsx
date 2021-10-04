import React from 'react';
import {withStyles, createStyles, WithStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import APIURL from '../helpers/enviroment';
import Box from '@material-ui/core/Box'
// import APIURL from '../helpers/enviroment';


interface LogInProps extends WithStyles<typeof styles> {
    updateToken: any;
    clearToken: any;
}

interface LogInState {
    email: string,
    password: string,
    message: string,
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

class LogIn extends React.Component<LogInProps, LogInState> {
    constructor(props:LogInProps){
        super(props)
        this.state = {
            email: '',
            password: '',
            message: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        fetch(`${APIURL}/users/login`,{
            method: 'POST',
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            }),
            headers: new Headers({
                "Content-Type": "application/json"
            }),
        })
        .then((res) => res.json())
        // .then((data) => console.log(data))
        .then((data) => this.props.updateToken(data.sessionToken, data.user.admin))
        //add error message (email or password incorrect)
        .catch((e) => {
            console.log(e)
            this.setState({message: `Email or Password Incorrect` })
        });
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
        const {classes} =  this.props;
        return(
            <div>
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5" color="primary">Welcome to My Travel Blog</Typography>
                    <br />
                    {/* <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                    </Avatar> */}
                    <Typography component="h1" variant="h5" color="primary">Log In :</Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField className={classes.input} onChange={this.handleEmailChange} autoComplete="email" name="email" variant="standard" required fullWidth id="email" label="Email" autoFocus />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField className={classes.input} onChange={this.handlePasswordChange} autoComplete="password" type="password" name="password" variant="standard" required fullWidth id="password" label="Password" autoFocus />
                            </Grid>
                        </Grid>
                        <Box >
                        <Button size="small" style={{backgroundColor: "lightblue"}} className={classes.submit} type="submit" fullWidth variant='outlined' color="primary">Log In</Button>
                        </Box>
                    </form>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(LogIn)