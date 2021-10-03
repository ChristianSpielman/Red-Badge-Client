import React from 'react';
import {withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import APIURL from '../helpers/enviroment';

interface AdminProps extends WithStyles<typeof styles> {
    clearToken: any;
    token: string,
}

interface AdminState {
    usersArray: any[],
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
      table: {
        minWidth: 650,
      },
      tablecontainer: {
        maxHeight: 500,
        overflowY: 'scroll',
    },
});

class Admin extends React.Component<AdminProps, AdminState> { //these are the two interface from above
    constructor(props:AdminProps){
        super(props)
        this.state = {
            usersArray: [],
        }
    }

    componentDidMount = () => {
        this.getData();
    }

    getData = () => {
        fetch(`${APIURL}/users/getAllUsers`,{
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.token}`,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log('Data: ', data);
            this.setState({usersArray: data})
        })
        .catch((err) => console.log(err));
    }

    render() {
        const {classes} = this.props;
        return(
            <div>
            <Container component="main">
                <Button onClick={this.props.clearToken} color="primary">Logout</Button>
                <CssBaseline />
                <div className="divMain">
                    <Typography component="h1" variant="h5">Admin Page</Typography>
                    <TableContainer className={classes.tablecontainer}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell align="right">Last Name</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.usersArray.map((row, i) => (
                                    <TableRow key={i}>
                                        
                                        <TableCell >{row.firstName}</TableCell>
                                        <TableCell >{row.lastName}</TableCell>
                                        <TableCell >{row.email}</TableCell>
                                        <TableCell ><Button>Delete</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Container>
            </div>
        )
    }
}

export default withStyles(styles)(Admin)