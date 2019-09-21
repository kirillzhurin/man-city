import React, { Component } from 'react';

import { firebaseMatches } from '../../firebase';
import { firebaseLooper, reverseArray } from '../ui/misc';
import LeagueTable from './LeagueTable';
import MatchesList from './MatchesList';

class Matches extends Component {

  state = {
    loading: true,
    matches: [],
    filterMatches: [],
    playedFilter: 'All',
    resultFilter: 'All',
  }

  async componentDidMount() {
    const snapshot = await firebaseMatches.once('value');
    const matches = firebaseLooper(snapshot)
    this.setState({
      loading: false,
      matches: reverseArray(matches),
      filterMatches: reverseArray(matches)
    })
  }

  showPlayed = (played) => {
    let list = this.state.matches;
    
    if (played !== 'All') {
      list = this.state.matches.filter(match => match.final === played);
    } 
      
    this.setState({
      filterMatches: list,
      playedFilter: played,
      resultFilter: 'All'
    })
  }

  showResult = (result) => {
    let list = this.state.matches;
    
    if (result !== 'All') {
      list = this.state.matches.filter(match => match.result === result);
    } 
      
    this.setState({
      filterMatches: list,
      resultFilter: result,
      playedFilter: 'All'
    })
  }

  isActiveFilter = (filter, isValue) => {
    if ( filter === isValue) {
      return 'active'
    }

    return '';
  }

  render() {
    const state = this.state;
    return (
      <div className="the_matches_container">
        <div className="the_matches_wrapper">
          <div className="left">
            <div className="match_filters">
              <div className="match_filters_box">
                <div className="tag">Show Match</div>
                <div className="cont">
                  <div className={`option  ${this.isActiveFilter(state.playedFilter, 'All')}`} onClick={this.showPlayed.bind(null, 'All')}>All</div>
                  <div className={`option ${this.isActiveFilter(state.playedFilter, 'Yes')}`} onClick={this.showPlayed.bind(null, 'Yes')}>Played</div>
                  <div className={`option ${this.isActiveFilter(state.playedFilter, 'No')}`} onClick={this.showPlayed.bind(null, 'No')}>Not played</div>
                </div>
              </div>
              <div className="match_filters_box">
                <div className="tag">Result Game</div>
                <div className="cont">
                  <div className={`option  ${this.isActiveFilter(state.resultFilter, 'All')}`} onClick={this.showResult.bind(null, 'All')}>All</div>
                  <div className={`option ${this.isActiveFilter(state.resultFilter, 'W')}`} onClick={this.showResult.bind(null, 'W')}>W</div>
                  <div className={`option ${this.isActiveFilter(state.resultFilter, 'L')}`} onClick={this.showResult.bind(null, 'L')}>L</div>
                  <div className={`option ${this.isActiveFilter(state.resultFilter, 'D')}`} onClick={this.showResult.bind(null, 'D')}>D</div>
                </div>
              </div>
              
            </div>
            <MatchesList matches={state.filterMatches} />
          </div>
          <div className="right">
            <LeagueTable />
          </div>
        </div>
      </div>
    );
  }
}

export default Matches;