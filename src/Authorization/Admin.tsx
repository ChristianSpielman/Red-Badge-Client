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
    firstName: string,
    lastName: string,
    id: number,
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
            firstName: '',
            lastName: '',
            id: 0,
        }
    }

    componentDidMount = () => {
        this.getData();
    }

    handleOpen = (event: any, record: any) => {
        event.preventDefault();
        this.setState({id: record.id});
        this.setState({firstName: record.firstName});
        this.setState({lastName: record.lastName});
        this.setState({email: record.email});
        this.setState({editOpen: true})
    }

    handleUpdate = () => {
        fetch(`${APIURL}/users/update/${this.state.id}`,{
            method: 'PUT',
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                'Accept': 'application/json',
                "Authorization": `Bearer ${this.props.token}`,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            this.handleClose();
        })
        .catch(e => console.log(e))
    };

    handleClose = () => {
        this.setState({editOpen: false});
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
            this.setState({usersArray: data})
        })
        // .catch((err) => console.log(err));
    }

    deleteUser = (event: any, id: number) => {
        event.preventDefault();
        fetch(`${APIURL}/users/delete/${id}`,{
            method: 'DELETE',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.token}`,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            this.getData();
        })
        .catch(e => console.log(e))
    };

    // editUser = (id: number) =>{
    //     fetch(`${APIURL}/users/update/${id}`,{
    //         method: 'PUT',
    //         headers: new Headers({
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${this.props.token}`,
    //         }),
    //     })
    //     .then((res) => res.json())
    //     .then((data) => {
	// 		this.getData();
    //     })
    //     .catch(e => console.log(e))
    // }

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
                    component="span"m={1}>
                        <Button onClick={this.props.clearToken} variant="contained" color="primary">Logout</Button>
                </Box>
                <Container className="wrapper" component="main">
                    <CssBaseline />
                    <div className="divMain">
                        <Typography component="h1" variant="h3" color="primary">Admin Page</Typography>
                        <br/>
                        <TableContainer className={classes.tablecontainer}>
                            <Table className={classes.table} stickyHeader aria-label="sticky table">
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
                                            <TableCell ><Button variant="contained" color="primary" onClick={(e) => this.handleOpen(e, row)}>Edit</Button></TableCell>
                                            <TableCell ><Button variant="contained" color="secondary" onClick={(e) => this.deleteUser(e, row.id)}>Delete</Button></TableCell>
                                        </TableRow>
                                    ))
                                    //.sort here
                                 
                                    }
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
                    <DialogTitle id="alert-dialog-title">{"Edit User Details:"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            <Typography component="h1" variant="h5" color="primary">Log In :</Typography>
                                <form className={classes.form}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField 
                                                id="firstName" 
                                                required fullWidth 
                                                label="First Name" 
                                                name="firstName" 
                                                value={this.state.firstName}
                                                variant="standard" 
                                                onChange={this.handleChange}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField 
                                                id="lastName" 
                                                required fullWidth 
                                                label="Last Name" 
                                                name="lastName" 
                                                value={this.state.lastName}
                                                variant="standard" 
                                                onChange={this.handleChange}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <TextField 
                                                id="email" 
                                                required fullWidth 
                                                label="Email" 
                                                name="email" 
                                                value={this.state.email}
                                                variant="standard" 
                                                onChange={this.handleChange}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </form>
                            </DialogContentText> 
                        </DialogContent>
                    <DialogActions>
                        <Button  onClick={() => this.handleUpdate()} color="primary" variant="contained" autoFocus>Update</Button>
                        <Button onClick={this.handleClose} color="secondary" variant="contained" >Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(Admin)