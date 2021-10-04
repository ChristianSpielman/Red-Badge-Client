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
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import Paper from '@material-ui/core/Paper';
import APIURL from '../helpers/enviroment';

interface AdminProps extends WithStyles<typeof styles> {
    clearToken: any;
    token: string,
}

interface AdminState {
    usersArray: any[],
    editOpen: boolean,
    email: string,
    password: string,
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
            editOpen: false,
            email: '',
            password: '',
        }
    }

    componentDidMount = () => {
        this.getData();
    }

    handleOpen = (event: any) => {
        event.preventDefault();
        this.setState({editOpen: true})
    }

    handleClose = () => {
        this.setState({editOpen: false})
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

    deleteUser = (id: number) => {
		console.log(id);
        fetch(`${APIURL}/users/delete/${id}`,{
            method: 'DELETE',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.token}`,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
			console.log(data);
			this.getData();
        })
        .catch(e => console.log(e))
    };

    editUser = (id: number) =>{
        fetch(`${APIURL}/users/update/${id}`,{
            method: 'PUT',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.token}`,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
			console.log(data);
			this.getData();
        })
        .catch(e => console.log(e))
    }

    handleChange = (event: any) => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState(Object.assign(this.state, {[name]: value}));
    };


    render() {
        const {classes} = this.props;
        return(
            <div>
                <Box
                    component="span"
                    m={1}>
            <Button onClick={this.props.clearToken} variant="contained" color="primary">Logout</Button>
            </Box>
                <Container className="wrapper" component="main">
                    <CssBaseline />
                    <div className="divMain">
                        <Typography component="h1" variant="h3" color="primary">Admin Page</Typography>
                        <br/>
                        <TableContainer className={classes.tablecontainer}>
                            <Table className={classes.table} stickyHeader aria-label="sticky table">{/*sticky header*/}
                                <TableHead>
                                    <TableRow>
                                        <TableCell ><Typography variant="h4" color="primary">First Name </Typography></TableCell>
                                        <TableCell ><Typography variant="h4" color="primary">Last Name</Typography></TableCell>
                                        <TableCell ><Typography variant="h4" color="primary">Email</Typography></TableCell>
                                        <TableCell ></TableCell>
                                        <TableCell ></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.usersArray.filter(row => !row.admin).map((row, i) => (
                                        <TableRow key={i}>
                                            
                                            <TableCell ><Typography variant="h6" color="primary">{row.firstName}</Typography></TableCell>
                                            <TableCell ><Typography variant="h6" color="primary">{row.lastName}</Typography></TableCell>
                                            <TableCell ><Typography variant="h6" color="primary">{row.email}</Typography></TableCell>
                                            <TableCell ><Button variant="contained" color="primary" onClick={(e) => this.handleOpen(e)}>Edit</Button></TableCell>
                                            <TableCell ><Button variant="contained" color="secondary" onClick={() => this.deleteUser(row.id)}>Delete</Button></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Container>
                    <Dialog
                    open={this.state.editOpen}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"Edit Vacation Details:"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">

                            <Typography component="h1" variant="h5" color="primary">Log In :</Typography>
                                <form className={classes.form}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField className={classes.input} onChange={this.handleChange} autoComplete="fname" name="firstName" variant="standard" required fullWidth id="firstName" label="First Name" autoFocus />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField className={classes.input} onChange={this.handleChange} autoComplete="lname" name="lastName" variant="standard" required fullWidth id="lastName" label="Last Name" autoFocus />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <TextField className={classes.input} onChange={this.handleChange} autoComplete="password" type="password" name="password" variant="standard" required fullWidth id="password" label="Password" autoFocus />
                                        </Grid>
                                    </Grid>
                                </form>

                            </DialogContentText> 
                        </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Close</Button>
                        <Button  color="primary" autoFocus>Update</Button>
                    </DialogActions>
                </Dialog>
                            
                {/*modal grab inputs from register form*/}
        </div>
        )
    }
}

export default withStyles(styles)(Admin)