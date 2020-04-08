import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import HouseTwoToneIcon from '@material-ui/icons/HouseTwoTone';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Copyright } from '@material-ui/icons';
import Navbar from './navbar';
import { GetSession } from '../services/sessionManagement';
import { decrypt } from '../services/EncryptionService';
import axios from 'axios';
import { ADD_BRANCH } from '../config';
import { SET_SESSION_EXPIRED } from '../redux/actionTypes';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	root : {
		height : '100vh'
	},
	image : {
		backgroundImage  : 'url(https://media-assets-05.thedrum.com/cache/images/thedrum-prod/s3-news-tmp-139705-531322819639--2x1--940.jpg)',
		backgroundRepeat : 'no-repeat',
		backgroundColor  :
			theme.palette.type === 'light' ? theme.palette.grey[ 50 ] : theme.palette.grey[ 900 ],
		backgroundSize     : 'cover',
		backgroundPosition : 'center'
	},
	paper : {
		margin        : theme.spacing(8, 4),
		display       : 'flex',
		flexDirection : 'column',
		alignItems    : 'center'
	},
	avatar : {
		margin          : theme.spacing(1),
		backgroundColor : theme.palette.info.main
	},
	form : {
		width     : '100%', // Fix IE 11 issue.
		marginTop : theme.spacing(5)
	},
	submit : {
		margin : theme.spacing(6, 0, 2)
	}
}));

export default function storeAdd() {

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const dispatch = useDispatch();
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const classes = useStyles();
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [ add, setadd ] = useState({ bName: '', orgName: '', location: '', tpNo: '', noofEmployees: '' });

	const onChange = (e) =>
	{
		e.persist();
		setadd({ ...add, [ e.target.name ]: e.target.value })
	}

	async function Insertbranch(){

			const localData = JSON.parse(GetSession());
			let token = localData.sessionData.token;
			token = decrypt(token);

			//console.log('ABC');
			const success = false;
			let resData;

			console.log(token);

			const userObj = {
				B_Name     : add.bName,
				Org_Name   : add.orgName,
				B_Location : add.location,
				B_Phone    : add.tpNo,
				B_Employee : add.noofEmployee
			}

			//API call
			await axios({
				method  : 'post',
				url     : ADD_BRANCH,
				headers : { Authorization: 'Bearer ' + token },
				data    : userObj
			})
				.then(function(response)
				{
					console.log('ok');
				})
				.catch(function(error)
				{
					if(error.response.status === 401){
						dispatch({
							type    : SET_SESSION_EXPIRED,
							payload : true
						});

					}
					throw error;
				});

	}

	return (
    <Grid container component="main" className={ classes.root }>
        <Navbar/>
        <CssBaseline />
        <Grid item xs={ false } sm={ 10 } md={ 7 } className={ classes.image } />
        <Grid item xs={ 12 } sm={ 10 } md={ 5 } component={ Paper } elevation={ 20 } square>
            <div className={ classes.paper }>
                <Avatar className={ classes.avatar }>
                    <HouseTwoToneIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Add a New Branch
                </Typography>
                <div className={ classes.form } >

                    <TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="bName"
							label="Branch Name"
							name="bName"
							autoComplete="bName"
							onChange={ onChange }
							value={ add.bName }

						/>
                    <TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="orgName"
						label="Organization Name"
						name="orgName"
						autoComplete="orgName"
						onChange={ onChange }
						value={ add.orgName }

					/>
                    <TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="location"
							label="Location"
							type="location"
							id="location"
							onChange={ onChange }
							value={ add.location }

						/>
                    <TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="tpNo"
							label="Phone No"
							type="tpNo"
							id="tpNo"
							onChange={ onChange }
							value={ add.tpNo }
					/>

                    <TextField
						variant="outlined"
						margin="normal"
						fullWidth
						name="noofEmployees"
						label="No of Employees"
						type="noofEmployees"
						id="noofEmployees"
						onChange={ onChange }
						value={ add.noofEmployees }
					/>

                    <Button
							type="submit"
							variant="contained"
							color="primary"
							className={ classes.submit }
							onClick={ Insertbranch }
						>
                        Add Branch
                    </Button>

                    <Box mt={ 8 }>
                        <Copyright />
                    </Box>
                </div>
            </div>
        </Grid>
    </Grid>
	);
}
