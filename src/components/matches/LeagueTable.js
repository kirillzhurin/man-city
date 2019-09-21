import React, { Component } from 'react';
import { firebaseDB } from '../../firebase';
import { firebaseLooper } from '../ui/misc';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const style = {
  cell: {
    padding: '15px',
    borderBottom: '1px solid #fff',
    color: '#fff',
    textAlign: 'center'
  }
}

class LeagueTable extends Component {

  state = {
    positions: []
  }

  async componentDidMount() {
    try {
      const snapshot = await firebaseDB.ref('positions').once('value');
      const positions = firebaseLooper(snapshot);

      this.setState({
        positions
      })
    } catch (error) {
      
    }
  }


  renderTeamPositions = (positions) => (
    positions ?
      positions.map((position, index) => (
        <TableRow key={index}>
          <TableCell style={style.cell}>{index + 1}</TableCell>
          <TableCell style={style.cell}>{position.team}</TableCell>
          <TableCell numeric="true" style={style.cell}>{position.w}</TableCell>
          <TableCell numeric="true" style={style.cell}>{position.d}</TableCell>
          <TableCell numeric="true" style={style.cell}>{position.l}</TableCell>
          <TableCell numeric="true" style={style.cell}>{position.pts}</TableCell>
        </TableRow>
      ))
      : null
  )

  render() {
    return (
      <div className="league_table_wrapper">
        <div className="title">
          LeagueTable
        </div>
        <div style={{background: '#98c6e9'}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={style.cell}>Pos</TableCell>
                <TableCell style={style.cell}>Team</TableCell>
                <TableCell style={style.cell}>W</TableCell>
                <TableCell style={style.cell}>L</TableCell>
                <TableCell style={style.cell}>D</TableCell>
                <TableCell style={style.cell}>Pts</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.renderTeamPositions(this.state.positions)}
            </TableBody>
          </Table>
        </div>

      </div>
    );
  }
}

export default LeagueTable;