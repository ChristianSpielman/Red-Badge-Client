import React from 'react';
import {withStyles, createStyles, WithStyles, Theme} from '@material-ui/core/styles';//need this
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
// import APIURL from '../helpers/enviroment';

interface AdminProps extends WithStyles<typeof styles> {
    clearToken: any;
}

interface AdminState {
    users: any[],
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

class Admin extends React.Component<AdminProps, AdminState> { //these are the two interface from above
    constructor(props:AdminProps){
        super(props)
        this.state = {
            users: [],
        }
    }
    render() {
        const {classes} = this.props;
        return(
            <Container component="main" maxWidth="sm">
                <Button onClick={this.props.clearToken} color="primary">Logout</Button>
                <CssBaseline />
                <div className="divMain">
                    <Typography component="h1" variant="h5">Admin Page</Typography>
                </div>
            </Container>
        )
    }
}

export default withStyles(styles)(Admin)