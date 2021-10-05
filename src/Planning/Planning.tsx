import React from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import APIURL from '../helpers/enviroment';
import PlanningList from '../Planning/PlanningList';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';

interface PlanningProps extends WithStyles<typeof styles> {
    clearToken: any;
    token: string;
    admin: boolean;
}

interface IBlogList {
    photo: string,
    title: string,
    date: string,
    toDo: string,
}

interface PlanningState {
    photo: string,
    title: string,
    date: string,
    toDo: string,
    selectedDate: Date,
    planArray: IBlogList[],
    token: string,
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

class BlogEntry extends React.Component<PlanningProps, PlanningState> { //these are the two interface from above
    constructor(props: PlanningProps){
        super(props)
        this.state = {
            photo: '',
            title: '',
            date: '',
            toDo: '',
            selectedDate: new Date(),
            planArray: [],
            token: this.props.token,
            message: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = () => {
        this.getData();
    }

    getData = () => {
        fetch(`${APIURL}/planning/getAllPlansByUser`,{
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.token}`,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            this.setState({planArray: data})
        })
        .catch((err) => console.log(err));
    }

    handleDelete = (id: number) => {
        fetch(`${APIURL}/planning/delete/${id}`,{
            method: 'DELETE',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.state.token}`,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            this.getData();
        })
        .catch(e => console.log(e))
    };

    handleSubmit = (event: any) => {
        event.preventDefault();
        fetch(`${APIURL}/planning/create`,{
            method: 'POST',
            body: JSON.stringify({
                photo: this.state.photo,
                title: this.state.title,
                date: this.state.date,
                toDo: this.state.toDo
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.token}`,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            event.target.reset();
            this.getData();
            this.setState({message: `Successfully Created A Plan`})
            setTimeout(() => this.setState({message: ``}), 3000)
        })
        .catch(e => console.log(e))
    };

    handleChange = (event: any) => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState(Object.assign(this.state, {[name]: value}));
    };

    render() {
        const {classes} = this.props;
        return(
            <div className="wrapper">
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h3" color="primary">Plan Your Next Vacation!</Typography>
                        <br />
                        {this.state.message ? <Alert severity="success">{this.state.message}</Alert> : ''}
                        <form className={classes.form} onSubmit={this.handleSubmit}>
                            <Grid container spacing={2}>
                            <Grid item xs={12} >
                                    <TextField 
                                    className={classes.input} 
                                    onChange={this.handleChange} 
                                    autoComplete="photo" 
                                    name="photo" 
                                    variant="standard" 
                                    required fullWidth 
                                    id="photo" 
                                    label="Photo" 
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
                                    autoComplete="toDO" 
                                    name="toDo" 
                                    variant="standard" 
                                    fullWidth 
                                    id="toDO" 
                                    label="To Do" 
                                    autoFocus />
                                </Grid>
                            </Grid>
                            <Box textAlign='center'>
                                <Button 
                                    className={classes.submit} 
                                    type="submit"  
                                    variant='contained' 
                                    color="primary">Post Plan
                                </Button>
                            </Box>
                        </form>
                    </div>
                </Container>
                <PlanningList getData={this.getData} token={this.props.token} planArray={this.state.planArray} handleDelete={this.handleDelete}/>
            </div>
        );
    }
}

export default withStyles(styles)(BlogEntry)