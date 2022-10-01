import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAuth0 } from "@auth0/auth0-react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export const TodoCard = () => {
    const [expanded, setExpanded] = React.useState(false);

    const submitTodo = () => {
        alert("submitted")
    };

    const { user } = useAuth0();

    if (!user) {
        return null;
    }

    return (
        <Card>

            <CardMedia
                component="img"
                height="194"
                image="https://img.freepik.com/premium-vector/3d-certificate-diploma-icon-with-stamp-ribbon-bow-isolated-background-white-clipboard-task-management-todo-check-list-work-project-plan-concept-3d-vector-render-pink-background_412828-1254.jpg"
                alt="Paella dish"
            />
            <CardContent>
                <TextField id="outlined-basic" label="Task Name" variant="outlined" fullWidth='true' />
                <br />
                <br />
                <TextField id="outlined-basic" label="Task Description" variant="outlined" fullWidth='true' />
                <br />
                <br />
                <Button variant="outlined" component="label" fullWidth='true'>
                    Upload
                    <input hidden accept="*" multiple type="file" />
                </Button>

                <br />
                <br />
                <Button variant='contained' fullWidth='true' size='large'>SUBMIT</Button>
            </CardContent>


        </Card>
    );
}
