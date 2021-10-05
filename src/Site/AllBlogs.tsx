import React from 'react';
import APIURL from '../helpers/enviroment';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import {withStyles, createStyles, WithStyles, Theme} from '@material-ui/core/styles';

interface AllBlogsProps extends WithStyles<typeof styles> {
    token: string,
    blogArray?: any[],
}

interface AllBlogsState {
    blogArray: any[],
}

const styles = ({palette, spacing}: Theme) => createStyles({
    media: {
        paddingTop: '56.25%',
        marginTop:'30',
    },
    card: {
		margin: spacing(1),
		maxWidth: 600,
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
});

class AllBlogs extends React.Component<AllBlogsProps, AllBlogsState> {
    constructor(props:AllBlogsProps){
        super(props)
        this.state = {
            blogArray: [],

        }
    }

    componentDidMount = () => {
        this.getData();
    }
    
    getData = () => {
        fetch(`${APIURL}/vacation/getAllBlogs`,{
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.token}`,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            this.setState({blogArray: data})
        })
        .catch((err) => console.log(err));
    }

    render() {
        const {classes} =  this.props;
        return(
            <div className="wrapper">
                <Typography variant="h3" color="primary">View all User Created Blogs</Typography>
                <hr/>
                <br/>
                <Container fixed maxWidth="xl">
                    <Grid container spacing={1}>
                    {this.state.blogArray.map((record, i) => (
                        <Grid item xs={4} key={i}>
                            <Card className={classes.card} >
                                <CardContent>
                                    <CardMedia
                                        component='img'
                                        height= "250"
                                        image= {record.photo}
                                    />
                                    <Typography variant="h5" component="h2" gutterBottom>
                                        {record.title}
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        {record.date}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {record.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                    </Grid>  
                </Container>;
            </div>
        )
    }
}

export default withStyles(styles)(AllBlogs);