import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './title';

function preventDefault(event) {
	event.preventDefault();
}

const useStyles = makeStyles({
	depositContext : {
		flex : 1
	}
});

export default function Card4() {
	const classes = useStyles();
	return (
    <React.Fragment>
        <Title>Zero Stock Products</Title>
        <Typography component="p" variant="h4">
            01
        </Typography>
    </React.Fragment>
	);
}
