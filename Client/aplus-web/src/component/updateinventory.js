import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Navbar from './navbar';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { removeInventory, updateInventory, getInventoryDetails } from '../redux/InventoryActions';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { ToastContainer } from './dialogs/ToastContainer';
import { TOAST_ERROR, TOAST_SUCCESS } from '../config';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	seeMore : {
		marginTop : theme.spacing(3)
	},
	root : {
		flexGrow : 5

	},
	menuButton : {
		marginRight : theme.spacing(2)
	},
	title : {
		flexGrow                       : 1,
		display                        : 'none',
		[ theme.breakpoints.up('sm') ] : {
			display : 'block'
		}
	},
	search : {
		position        : 'relative',
		borderRadius    : theme.shape.borderRadius,
		backgroundColor : fade(theme.palette.common.white, 0.15),
		'&:hover'       : {
			backgroundColor : fade(theme.palette.common.white, 0.25)
		},
		marginLeft                     : 0,
		width                          : '100%',
		[ theme.breakpoints.up('sm') ] : {
			marginLeft : theme.spacing(1),
			width      : 'auto'
		}
	},
	searchIcon : {
		padding        : theme.spacing(0, 2),
		height         : '100%',
		position       : 'absolute',
		pointerEvents  : 'none',
		display        : 'flex',
		alignItems     : 'center',
		justifyContent : 'center'
	},
	paper : {
		padding       : theme.spacing(2),
		display       : 'flex',
		overflow      : 'auto',
		flexDirection : 'column'
	},
	inputRoot : {
		color : '#95a5a6'

	},

	inputInput : {
		padding                        : theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft                    : `calc(1em + ${ theme.spacing(4) }px)`,
		transition                     : theme.transitions.create('width'),
		width                          : '100%',
		[ theme.breakpoints.up('sm') ] : {
			width     : '12ch',
			'&:focus' : {
				width : '20ch'
			}
		}
	}

}));

const InventoryList = ( props ) => {

	const classes = useStyles();
	const [ open, setOpen ] = React.useState(false);

	const history = useHistory();

	const handleOpenInventory = () =>
	{
		setOpen(true);
	};

	const handleCloseInventory = () => {
		setOpen(false);
	};

	const removeInventory = (inventoryId) =>
	{
		console.log(inventoryId);
		props.removeInventory(inventoryId);
		props.getInventoryDetails();
		handleCloseInventory();
		ToastContainer(TOAST_SUCCESS, "Successfully Deleted")
	}

	const updateRouteInventory = (inventoryId) => {
		console.log(inventoryId);
		const path = 'tableInventory';
		history.push(path, inventoryId);
	}

	useEffect(() => {
		console.log('success');
		props.getInventoryDetails();

	}, [ 1 ]);

	return (
    <div>
        <Navbar/>
        <div className={ 'top-5pres' }>
            <Container fixed>
                <Grid item xs={ 12 }>
                    <Paper className={ classes.paper }>
                        <React.Fragment>
                            <div className={ classes.root }>
                                <AppBar color="primary" position="relative">
                                    <Toolbar>
                                        <IconButton color="inherit" href={ 'http://localhost:3000/addinventory' }>
                                            <Fab size="small" color="secondary" aria-label="add" className={ classes.margin }>
                                                <AddIcon />
                                            </Fab>
                                        </IconButton>
                                        <Typography className={ classes.title } variant="h6" noWrap>
                                            Inventory Details
                                        </Typography>
                                        <div className={ classes.search }>
                                            <div className={ classes.searchIcon }>
                                                <SearchIcon />
                                            </div>
                                            <InputBase
												placeholder="Search…"
												classes={ {
													root  : classes.inputRoot,
													input : classes.inputInput
												} }
												inputProps={ { 'aria-label': 'search' } }
											/>
                                        </div>
                                    </Toolbar>
                                </AppBar>
                            </div>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product Code</TableCell>
                                        <TableCell>Product Name</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Unit Price</TableCell>
                                        <TableCell>Supplier Name</TableCell>
                                        <TableCell>Supplier Email</TableCell>
                                        <TableCell>Edit</TableCell>
                                        <TableCell>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    { props.inventoryList.map((row) => (
                                        <TableRow key={ row.id }>
                                            <TableCell>{ row.productCode }</TableCell>
                                            <TableCell>{ row.productName }</TableCell>
                                            <TableCell>{ row.qty }</TableCell>
                                            <TableCell>{ row.unitPrice }</TableCell>
                                            <TableCell>{ row.supplireName }</TableCell>
                                            <TableCell>{ row.supplireEmail }</TableCell>
                                            <TableCell>{ <Button
												onClick={ () => updateRouteInventory(row) }
												variant="contained"
												color="primary"
												className={ classes.button }
												startIcon={ <EditIcon /> }
											>
                                            </Button>
											}</TableCell>
                                            <TableCell>{ <Button
												variant="contained"
												color="secondary"
												className={ classes.button }
												startIcon={ <DeleteIcon /> }
												onClick={ handleOpenInventory }
											>

                                            </Button>
											}</TableCell>
                                            <Dialog
                                            	open={ open }
                                            	onClose={ handleCloseInventory }
                                            	aria-labelledby="alert-dialog-title"
                                            	aria-describedby="alert-dialog-description">
                                                <DialogTitle id="alert-dialog-title">{'Are you sure you want delete this inventory?'}</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description"> </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={ removeInventory.bind(null, row.id) } color="primary">
                                                        Yes
                                                    </Button>
                                                    <Button onClick={ handleCloseInventory } color="primary" autoFocus>
                                                        No
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </TableRow>
									))
									}
                                </TableBody>
                            </Table>
                        </React.Fragment>
                    </Paper>
                </Grid>
            </Container>
        </div>
    </div>
	);
}

const mapStateToProps = (state) => ({
	inventoryList : state.inventory.inventoryList
})

export default connect(mapStateToProps, { removeInventory, updateInventory, getInventoryDetails })(InventoryList);
