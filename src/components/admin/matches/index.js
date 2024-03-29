import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import  AdminLayout from '../../../hoc/AdminLayout';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import { firebaseMatches } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';


class AdminMatches extends Component {
  state = {
    isLoading: true,
    matches: []
  }

  async componentDidMount() {
    try {
      const snapshot = await firebaseMatches.once('value');
      const matches = firebaseLooper(snapshot);
      this.setState({
        isLoading: false,
        matches: reverseArray(matches)
      });
    } catch (error) {
      
    }
  }

  renderMatches = () => {
    return this.state.matches.map((match, index) => (
      <TableRow key={index}>
        <TableCell>{match.date}</TableCell>
        <TableCell>
          <Link to={`/admin/edit/match/${match.id}`}>
            {match.away} <strong>-</strong> {match.local}
          </Link>
        </TableCell>
        <TableCell>
          {match.resultAway} <strong>-</strong> {match.resultLocal}
        </TableCell>
        <TableCell>
          { match.final === 'Yes' ? 
              <span className="matches_tag_red">Final</span>
            :
              <span className="matches_tag_green">Not played yet</span>
          }
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
                  <TableCell>Date</TableCell>
                  <TableCell>Match</TableCell>
                  <TableCell>Result</TableCell>
                  <TableCell>Final</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  this.state.matches ? 
                    this.renderMatches()
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

export default AdminMatches;