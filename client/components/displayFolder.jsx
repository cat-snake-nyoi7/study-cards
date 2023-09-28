import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';

const DisplayFolder = (props) => {
    return (

        <Card variant='outlined' className='singleFolder'>
            <CardContent>
                <Typography variant="h5" color="primary">{props.category}</Typography>
            </CardContent>
            <CardActions>
                <Button variant="soft" color="success">
                    <Link to={`/quiz/${props.category}`}>
                        Go To Quiz
                    </Link>
                </Button>

                <Button variant="soft" color="success">
                <Link to={`/editor/${props.category}`}>
                    Go To Editor
                </Link>
                </Button>
            </CardActions>
        </Card>
    )
}

export default DisplayFolder;
