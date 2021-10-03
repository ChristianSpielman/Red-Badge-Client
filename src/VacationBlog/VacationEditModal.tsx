import React from 'react';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import APIURL from '../helpers/enviroment';


interface VacationEditModalProps extends WithStyles<typeof styles> {
    handleUpdate: any,
    // mode: boolean,
    blogData: {},
}

// interface BlogData {
//  id: number,
//  photo: string,
//     title: string,
//     date: string,
//     description: string,
// }

interface VacationEditModalState {
    editOpen: boolean,
    id: number,
    photo: string,
    title: string,
    date: string,
    description: string,
}

const styles = ({palette, spacing}: Theme) => createStyles({
    media: {
        paddingTop: '56.25%', // 16:9,
        marginTop:'30',
    },
    card: {
        margin: spacing(1),
        maxWidth: 400,
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
    input: {
        backgroundColor: 'white',
    },
    form: {
      width: '100%',
      marginTop: spacing(3),
    },
});

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     modal: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     paper: {
//       backgroundColor: theme.palette.background.paper,
//       border: '2px solid #000',
//       boxShadow: theme.shadows[5],
//       padding: theme.spacing(2, 4, 3),
//     },
//   }),
// );

class VacationEditModal extends React.Component<VacationEditModalProps, VacationEditModalState> {
    constructor(props: VacationEditModalProps){
        super(props)
        this.state = {
            editOpen: true,
            id: 0,
            photo: '',
            title: '',
            date: '',
            description: '',
        }
    }

    handleClose = () => {
        this.setState({editOpen: false})
    }

    handleChange = (event: any) => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState(Object.assign(this.state, {[name]: value}));
    };

    componentDidMount = () => {
        console.log("blogData",this.props.blogData)
        // this.setState({id: this.props.blogData.id})
    }

    render(){
        const {classes} = this.props;
        return (
            <div>
                <Dialog
                    open={this.state.editOpen}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Edit Vacation Details:"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        
                    <Card className={classes.card} >
                        <CardContent>
                            <CardMedia
                                component='img'
                                height= "140"
                                // image= { }
                            />
                            {/* <Typography component="h1" variant="h5">Vacation Details :</Typography> */}
                            <form className={classes.form} onSubmit={this.props.handleUpdate}>
                                <Grid container>
                                    <Grid item xs={12} >
                                        <TextField 
                                        className={classes.input} 
                                        onChange={this.handleChange} 
                                        autoComplete="picture" 
                                        name="picture" 
                                        variant="standard" 
                                        required fullWidth 
                                        id="picture" 
                                        label="Picture" 
                                        autoFocus />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField 
                                        className={classes.input} 
                                        onChange={this.handleChange} 
                                        autoComplete="title" 
                                        name="title" 
                                        variant="standard" 
                                        required fullWidth 
                                        id="title" 
                                        label="Title" 
                                        autoFocus />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField 
                                            name="date"
                                            id="date"
                                            label="Date"
                                            type="date"
                                            onChange={this.handleChange}
                                            // className={classes.textField}
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}/>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextField 
                                        className={classes.input} 
                                        onChange={this.handleChange} 
                                        multiline rows={10} 
                                        autoComplete="description" 
                                        name="discription" 
                                        variant="standard" 
                                        fullWidth 
                                        id="description" 
                                        label="Description" 
                                        autoFocus />
                                    </Grid>
                                </Grid>
                                </form>
                        </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => this.props.handleUpdate()}>Update</Button>
                            </CardActions>
                        </Card>
                
                    </DialogContentText> 
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Close
                    </Button>
                    <Button  color="primary" autoFocus>
                        Update
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
        }
    }

export default withStyles(styles)(VacationEditModal);