import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  table : {
    minWidth : 650
  }
});

export default function request() {
  const classes = useStyles()

  return (
      <TableContainer component={ Paper }>
          <Table className={ classes.table } aria-label="simple table">
              <TableHead>
                  <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="right">firstName</TableCell>
                      <TableCell align="right">lastName</TableCell>
                      <TableCell align="right">email</TableCell>
                      <TableCell align="right">Address</TableCell>
                      
                  </TableRow>
                  <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="right">firstName</TableCell>
                      <TableCell align="right">lastName</TableCell>
                      <TableCell align="right">email</TableCell>
                      <TableCell align="right">Address</TableCell>
                      <Button
            type="submit"
          
            variant="contained"
            color="primary"
            className={ classes.submit }
          >
         EDIT
                      </Button>
                  </TableRow>
              </TableHead>
             
          </Table>
      </TableContainer>
  );
}