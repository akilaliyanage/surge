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
import { createNewTodo } from '../services/api.service';
import MuiAlert from '@mui/material/Alert';

import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
import UploadImageToS3 from '../services/UploadImageToS3';

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
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [alert, setAlert] = React.useState('Todo saved successfully!');
    const [alertSev, setAlertSev] = React.useState('success');
    const [open, setOpen] = React.useState(false);

    const { user } = useAuth0();
    const { getAccessTokenSilently } = useAuth0();

    const handleSubmit = async () => {

        const accessToken = await getAccessTokenSilently();

        const body = {
            "name": name,
            "description": description,
            "createdBy": user.name,
            "date": new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
            "status": "todo"
        }

        const { data, error } = await createNewTodo(accessToken, body)

        if (data) {
            console.log(data);
            setAlert("Todo saved successfully!!")
            handleClick()
        } else {
            setAlert("Error occured while saving the todo, Please try again later!!")
            setAlertSev("error")
            handleClick()
        }


        console.log(name, description);
    }

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="large"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );


    if (!user) {
        return null;
    }

    return (
        <>
            <Card>

                <CardMedia
                    component="img"
                    height="194"
                    image="https://img.freepik.com/premium-vector/3d-certificate-diploma-icon-with-stamp-ribbon-bow-isolated-background-white-clipboard-task-management-todo-check-list-work-project-plan-concept-3d-vector-render-pink-background_412828-1254.jpg"
                    alt="Paella dish"
                />
                <CardContent>
                    <TextField id="outlined-basic" label="Task Name" variant="outlined" fullWidth='true' name="name" onChange={e => setName(e.target.value)} />
                    <br />
                    <br />
                    <TextField id="outlined-basic" label="Task Description" variant="outlined" fullWidth='true' name="description" onChange={e => setExpanded(e.target.value)} />
                    <br />
                    <br />
                    <Button variant="outlined" component="label" fullWidth='true'>
                        Upload
                        <input hidden accept="*" multiple type="file" />
                    </Button>

                    <br />
                    <br />
                    <Button variant='contained' fullWidth='true' size='large' onClick={handleSubmit}>SUBMIT</Button>
                </CardContent>


            </Card>

            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Todo saved successfully!!"
                action={action}

            >
                <Alert onClose={handleClose} severity={alertSev} sx={{ width: '100%' }}>
                    {alert}
                </Alert>
            </Snackbar>
        </>
    );
}
