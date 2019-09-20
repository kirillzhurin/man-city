import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../hoc/AdminLayout';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import { firebasePlayers } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';

class AdminPlayers extends Component {
  state = {
    isLoading: true,
    players: []
  }

  async componentDidMount() {
    try {
      const snapshot = await firebasePlayers.once('value');
      const players = firebaseLooper(snapshot);
      this.setState({
        isLoading: false,
        players: reverseArray(players)
      });
    } catch (error) {
      
    }
  }
  
  renderPlayers = () => {
    return this.state.players.map((player, index) => (
      <TableRow key={index}>
        <TableCell>
          <Link to={`/admin/edit/player/${player.id}`}>
            {player.name}
          </Link>
        </TableCell>
        <TableCell>
          <Link to={`/admin/edit/player/${player.id}`}>
            {player.lastname}
          </Link>
        </TableCell>
        <TableCell>
          {player.number}
        </TableCell>
        <TableCell>
          {player.position}
        </TableCell>
      </TableRow>
    ))
  }

  render() {
    return (
      <AdminLayout>
       <div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First name</TableCell>
                  <TableCell>Last name</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Position</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  this.state.players ? 
                    this.renderPlayers()
                  : 
                    null
                }
              </TableBody>
            </Table>
          </Paper>
          <div className="admin_progress">
            {
              this.state.isLoading ? 
                <CircularProgress thikness={7} style={{color: '#98c5e9'}}/>
              : null
            }
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AdminPlayers;