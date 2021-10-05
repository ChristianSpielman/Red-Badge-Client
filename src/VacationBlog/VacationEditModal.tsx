import React from 'react';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import APIURL from '../helpers/enviroment';

interface VacationEditModalProps extends WithStyles<typeof styles> {
    blogData: any,
    handleClose: any,
    editOpen: boolean,
    token: string,
}

interface VacationEditModalState {
    editOpen: boolean,
    id: number,
    photo: string,
    title: string,
    date: string,
    description: string,
    update: any,
}

const styles = ({palette, spacing}: Theme) => createStyles({
    media: {
        paddingTop: '56.25%',
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

class VacationEditModal extends React.Component<VacationEditModalProps, VacationEditModalState> {
    constructor(props: VacationEditModalProps){
        super(props)
        this.state = {
            editOpen: true,
            id: props.blogData.id,
            photo: props.blogData.photo,
            title: props.blogData.title,
            date: props.blogData.date,
            description: props.blogData.description,
            update: {},
        }
    }

    handleUpdate = () => {
        fetch(`${APIURL}/vacation/update/${this.state.id}`,{
            method: 'PUT',
            body: JSON.stringify({
                photo: this.state.photo,
                title: this.state.title,
                date: this.state.date,
                description: this.state.description
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                'Accept': 'application/json',
                "Authorization": `Bearer ${this.props.token}`,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            this.props.handleClose();
        })
        .catch(e => console.log(e))
    };

    handleChange = (event: any) => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState(Object.assign(this.state, {[name]: value}));
    };

    render(){
        const {classes} = this.props;
        return (
            <div>
                <Dialog
                    open={this.props.editOpen}
                    onClose={this.props.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"Edit Vacation Details:"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <Card className={classes.card} >
                                    <CardContent>
                                        <CardMedia
                                            component='img'
                                            height= "140"
                                            image= {this.state.photo}
                                        />
                                        <form className={classes.form} onSubmit={this.handleUpdate}>
                                            <FormControl>
                                            <Grid container>
                                                <Grid item xs={12} >
                                                    <TextField 
                                                        id="photo" 
                                                        required fullWidth
                                                        label="Photo" 
                                                        name="photo" 
                                                        value={this.state.photo}
                                                        variant="standard" 
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }} 
                                                        onChange={this.handleChange} 
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField 
                                                        id="title" 
                                                        required fullWidth 
                                                        label="Title" 
                                                        name="title" 
                                                        value={this.state.title}
                                                        variant="standard" 
                                                        onChange={this.handleChange} 
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }} 
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField 
                                                        id="date"
                                                        required fullWidth
                                                        label="Date"
                                                        name="date"
                                                        value={this.state.date}
                                                        type="date"
                                                        onChange={this.handleChange}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} >
                                                    <TextField 
                                                        id="description" 
                                                        required fullWidth 
                                                        label="Description" 
                                                        name="description" 
                                                        value={this.state.description}
                                                        variant="standard" 
                                                        onChange={this.handleChange} 
                                                        multiline rows={10} 
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            </FormControl>
                                            </form>
                                    </CardContent>
                                </Card>
                            </DialogContentText> 
                        </DialogContent>
                    <DialogActions>
                        <Button onClick={(e) => this.props.handleClose(e)} color="primary">
                            Close
                        </Button>
                        <Button  type="submit" onClick={() => this.handleUpdate()} color="primary" autoFocus>
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(VacationEditModal);