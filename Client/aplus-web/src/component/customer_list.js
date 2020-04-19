
import React, { UseState, UseEffect } from 'react';
import { connect } from 'react-redux';
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
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core';
import { getcustomerDetails, removeCustomer } from '../redux/CustomerAction';

// Generate Order Data
function createData(id, FirstName, LastName, Email, nicnum,  PhoneNo, Update, Delete) {
	return { id, FirstName, LastName, Email, nicnum, PhoneNo, Update, Delete };
}

function preventDefault(event) {
	event.preventDefault();
}

function Copyright() {
	return (
    <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
            A Plus Web
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	seeMore : {
		marginTop : theme.spacing(3)
	},
	root : {
		flexGrow : 5

	},
	paper : {
		padding   : theme.spacing(2),
		textAlign : 'center',
		color     : '#95a5a6'
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

 const CustomerLlist = ( props ) => {
  const classes = UseStyles();

	const DeleteCustomer = (id) => {
		console.log(id);
		props.removecustomer(id);
		props.getcustomerDetails();
	}

	UseEffect(() => {
		console.log('Hi');
		props.getcustomerDetails();
	}, []);

	return (
    <React.Fragment>

        <div className={ classes.root }>
            <AppBar color="primary" position="relative">

                <Toolbar>

                    <Typography className={ classes.title } variant="h6" noWrap>
                        Customer Details
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
                    <TableCell>customet ID</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>nic</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { props.customerlist.map((row) => (
                    <TableRow key={ row.id }>
                        <TableCell>{ row.id }</TableCell>
                        <TableCell>{ row.fname }</TableCell>
                        <TableCell>{ row.lname }</TableCell>
                        <TableCell>{ row.email }</TableCell>
                        <TableCell>{ row.nicnum}</TableCell>
                        <TableCell>{ row.PhoneNo }</TableCell>
                        <TableCell>{
                            <Button href="http://localhost:3000/customerllist"
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
								tooltip = 'Click here to remove user'
								className={ classes.button }
								startIcon={ <DeleteIcon /> }
								onClick={ DeleteCustomer.bind(null, row.id) }
							>

                        </Button>
							} </TableCell>

                    </TableRow>
					))
					}
            </TableBody>
        </Table>
    </React.Fragment>

	);
}
const mapStateToProps = (state) => ({
	customerlist : state.customer.customerlist
})

export default connect(mapStateToProps, { removeCustomer, getcustomerDetails })(CustomerLlist);
import React from 'react';
import MaterialTable from 'material-table';

export default function customer_list() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ state, setState ] = React.useState({
    columns : [
      { title: 'Frist Name', field: 'fname' },
      { title: 'Last Name', field: 'lname' },
      { title: 'E-mail', field: 'email', type: 'email' },
      { title: 'ID Number', field: 'idnumber' },
      { title: 'Phone number', field: 'phone_number' },
      { title: 'No of Point', field: 'num_of_point' }
    
    ]
    
  });

  return (
      <MaterialTable
      title="Customer list"
      columns={ state.columns }
      data={ state.data }
      editable={ {
        onRowAdd : (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [ ...prevState.data ];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate : (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [ ...prevState.data ];
                  data[ data.indexOf(oldData) ] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete : (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [ ...prevState.data ];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          })
      } }
    />
  );
}
