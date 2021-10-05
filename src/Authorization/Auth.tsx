import React from 'react';
import {withStyles, createStyles, WithStyles, Theme} from '@material-ui/core/styles';
import LogIn from "./LogIn";
import Register from "./Register";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box'


interface AuthProps extends WithStyles<typeof styles> {
    updateToken: any;
    clearToken: any;
}

interface AuthState {
    loginToggle: boolean,
    buttonLabel: string,
}

const styles = ({palette, spacing}: Theme) => createStyles({
    submit: {
        margin: spacing(3, 0, 2),
    },
});

class Auth extends React.Component<AuthProps, AuthState> {
    constructor(props:AuthProps){
        super(props)
        this.state = {
            loginToggle: false,
            buttonLabel: "Register",
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle = (event: any) => {
        event.preventDefault();
        this.setState({loginToggle: !this.state.loginToggle})
        if (this.state.buttonLabel === "Register") {
            this.setState({buttonLabel: "Log In"});
        } else {
            this.setState({buttonLabel: "Register"});
        };
    };

    render() {
        const {classes} = this.props;
        return(
            <Container component="main" maxWidth="sm">
                <Box textAlign='center'>
                    {this.state.loginToggle ? <Register updateToken={this.props.updateToken} clearToken={this.props.clearToken}/> : <LogIn updateToken={this.props.updateToken} clearToken={this.props.clearToken}/>}
                    <Button onClick={this.toggle} className={classes.submit}  type="submit" variant='contained' color="primary">{this.state.buttonLabel}</Button>
                </Box>
            </Container>
        );
    }
}
export default withStyles(styles)(Auth)