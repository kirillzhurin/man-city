import React, { Component } from 'react';
import Fade from 'react-reveal';
import PlayerCard from '../ui/PlayerCard';
import { firebase, firebasePlayers } from '../../firebase';
import { firebaseLooper } from '../ui/misc';
import { Promise } from 'core-js';

import stripes from '../../resources/images/stripes.png';

class Team extends Component {

  state = {
    loading: true,
    players: []

  }

  async componentDidMount() {
    const snapshot = await firebasePlayers.once('value');
    const players = firebaseLooper(snapshot);
    
    const promises = [];
    for(let key in players) {
      promises.push(
        new Promise(async (resolve, reject) => {
          try {
            const url = await firebase.storage().ref('players').child(players[key].image).getDownloadURL();
            players[key].url = url;
            resolve(url);  
          } catch (error) {
            reject('');
          }
        })
      )
    }
    await Promise.all(promises);
    this.setState({
      players,
      loading: false
    });
  }

  showPlayerByCategory = category => (
    this.state.players ?
      this.state.players.map((player, index) => {
        return player.position === category ?
          <Fade left delay={index * 20} key={index}>
            <div className="item">
              <PlayerCard number={player.number} name={player.name} lastname={player.lastname} bck={player.url} />
            </div>
          </Fade>
        : null
      })
    : null
  )

  render() {
    return (
      <div className="the_team_container"
        style={{
          background: `url(${stripes}) repeat`
        }}
      >
        {
          !this.state.loading ?
            <div>
              <div className="team_category_wrapper">
                <div className="title">Keepers</div>
                <div className="team_cards">
                  {this.showPlayerByCategory('Keeper')}
                </div>
              </div>
              <div className="team_category_wrapper">
                <div className="title">Defence</div>
                <div className="team_cards">
                  {this.showPlayerByCategory('Defence')}
                </div>
              </div>
              <div className="team_category_wrapper">
                <div className="title">Midfield</div>
                <div className="team_cards">
                  {this.showPlayerByCategory('Midfield')}
                </div>
              </div>
              <div className="team_category_wrapper">
                <div className="title">Strikers</div>
                <div className="team_cards">
                  {this.showPlayerByCategory('Striker')}
                </div>
              </div>
            </div>
          : null
        }
      </div>
    );
  }
}

export default Team;