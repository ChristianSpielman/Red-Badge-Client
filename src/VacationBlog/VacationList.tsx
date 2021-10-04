import React from 'react';
import {withStyles, createStyles, WithStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import VacationEditModal from './VacationEditModal';

// import APIURL from '../helpers/enviroment';

interface VacationListProps extends WithStyles<typeof styles> {
    token: string;
    blogArray: any[],
    handleDelete: any,
}

interface BlogData {
    id: number,
    photo: string,
    title: string,
    date: string,
    description: string,
}

interface VacationListState {
    blogData: {},
    editOpen: boolean,
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
});

class VacationList extends React.Component<VacationListProps, VacationListState> { //these are the two interface from above
    constructor(props:VacationListProps){
        super(props)
        this.state = {
            blogData: [],
            editOpen: false,
        }
    }

    componentDidMount = () => {
    }

    handleOpen = (event: any, record: any) => {
        event.preventDefault();
        // this.setState({blogData: record})
        this.setState({blogData: record});
        this.setState({editOpen: true})
    }
    handleClose = () => {
        this.setState({editOpen: false})
    }

    render() {
        const {classes} =  this.props; //this is neccassary 
        return(
            <div className="wrapper">
                <br/>
                <hr/>
                <Typography component="h1" variant="h3" color="primary">Past Vacations:</Typography>
                <br/>
                <Grid container spacing={1}>
                {this.props.blogArray.map((record, i) => (
                    <Grid item xs={3} key={i}>
                        <Card className={classes.card} >
                            <CardContent>
                                <CardMedia
                                    component='img'
                                    height= "140"
                                    image= {record.photo}
                                />
                                <Typography variant="h5" component="h2" gutterBottom>
                                    {record.title}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    {record.date}
                                </Typography>
                                <Typography id="filled-multiline-static"
                                    variant="body2" component="p">
                                    {record.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={(e) =>this.handleOpen(e, record)}>Edit</Button>
                                <Button size="small" onClick={() => this.props.handleDelete(record.id)}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
                </Grid>
                {this.state.editOpen ? <VacationEditModal token={this.props.token} blogData={this.state.blogData} handleClose={this.handleClose} editOpen={this.state.editOpen}/> : "" }
            </div>
        );
    }
}

export default withStyles(styles)(VacationList)