import React from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import APIURL from '../helpers/enviroment';
import VacationList from '../VacationBlog/VacationList';
import Alert from '@material-ui/lab/Alert';
// import NavBar from '../Site/NavBar';

interface BlogEntryProps extends WithStyles<typeof styles> {
    clearToken: any;
    token: string;
    admin: boolean;
}

interface IBlogList {
    photo: string,
    title: string,
    date: string,
    descrtiption: string,
}

interface BlogEntryState {
    photo: string,
    title: string,
    date: string,
    description: string,
    selectedDate: Date,
    blogArray: IBlogList[],
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

class BlogEntry extends React.Component<BlogEntryProps, BlogEntryState> { //these are the two interface from above
    constructor(props: BlogEntryProps){
        super(props)
        this.state = {
            photo: '',
            title: '',
            date: '',
            description: '',
            selectedDate: new Date(),
            blogArray: [],
            token: this.props.token,
            message: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = () => {
        this.getData();
    }

    getData = () => {
        fetch(`${APIURL}/vacation/getAllBlogsByUser`,{
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.token}`,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log('Data: ', data);
            this.setState({blogArray: data})
        })
        .catch((err) => console.log(err));
    }

    handleDelete = (id: number) => {
        console.log(id);
        fetch(`${APIURL}/vacation/delete/${id}`,{
            method: 'DELETE',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.state.token}`,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            this.getData();
        })
        .catch(e => console.log(e))
    };



    handleSubmit = (event: any) => {
        console.log(this.state.date)
        event.preventDefault();
        fetch(`${APIURL}/vacation/create`,{
            method: 'POST',
            body: JSON.stringify({
                photo: this.state.photo,
                title: this.state.title,
                date: this.state.date,
                description: this.state.description
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.token}`,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log('Response Data: ', data);
            event.target.reset();
            this.getData();
            this.setState({message: `Successfully Created Vacation`})
            setTimeout(() => this.setState({message: ``}), 3000)
        })
        .catch((e) => {
            console.log(e)

        })
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
                {/* <NavBar /> */}
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h3" color="primary">Create A Vacation Blog!</Typography>
                        <br />
                        {/* <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                        </Avatar> */}
                        {this.state.message ? <Alert severity="success">{this.state.message}</Alert> : ''}
                        {/* <Typography component="h1" variant="h4" color="primary">Vacation Details:</Typography> */}
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
                                    name="description" 
                                    variant="standard" 
                                    fullWidth 
                                    id="description" 
                                    label="Description" 
                                    autoFocus />
                                </Grid>
                            </Grid>
                            <Button 
                            style={{backgroundColor: "lightblue"}} 
                            className={classes.submit} 
                            type="submit" 
                            fullWidth 
                            variant='outlined' 
                            color="primary">Post Blog</Button>
                        </form>
                    </div>
                </Container>
                <VacationList getData={this.getData} token={this.props.token} blogArray={this.state.blogArray} handleDelete={this.handleDelete}/>
            </div>
        );
    }
}

export default withStyles(styles)(BlogEntry)