import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import NodeGroup from 'react-move/NodeGroup';

class MatchesList extends Component {
  state = {
    matchesList: []
  }

  static getDerivedStateFromProps(props, state) {
    return state = {
      matchesList: props.matches
    }
  }

  renderMatches = () => (
    this.state.matchesList ?
      <NodeGroup
        data={this.state.matchesList}
        keyAccessor={data => data.id}
        start={() => ({
          opacity: 0,
          x: -200
        })}
        enter={(data, index) => ({
          opacity: [1],
          x: [0],
          timing: { duration: 500, delay: index * 50, ease: easePolyOut }
        })}

        update={(data, index) => ({
          opacity: [1],
          x: [0],
          timing: { duration: 500, delay: index * 50, ease: easePolyOut }

        })}

        leave={(data, index) => ({
          opacity: [0],
          x: [-200],
          timing: { duration: 500, delay: index * 50, ease: easePolyOut }
        })}
      >
        {(nodes) => (
          <div>
            {nodes.map(({key, data, state: { x, opacity }}) => (
              <div 
                key={key}
                className="match_box_big"
                style={{
                  opacity,
                  transform: `translate(${x}px)`
                }}
              >
                <div className="block_wraper">
                  <div className="block">
                    <div 
                      className="icon" 
                      style={{background: `url(/images/team_icons/${data.localThmb}.png)`}}></div>
                    <div className="team">{data.local}</div>
                    <div className="result">{data.resultLocal}</div>
                  </div>
                  <div className="block">
                    <div 
                      className="icon" 
                      style={{background: `url(/images/team_icons/${data.awayThmb}.png)`}}></div>
                    <div className="team">{data.away}</div>
                    <div className="result">{data.resultAway}</div>
                  </div>
                </div>
                <div className="block_wraper nfo">
                  <div><strong>Date:</strong> {data.date}</div>
                  <div><strong>Stadium:</strong> {data.stadium}</div>
                  <div><strong>Referee:</strong> {data.referee}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </NodeGroup>
    : null
  )

  render() {
    return (
      <div>
        {this.renderMatches()}
      </div>
    );
  }
}

export default MatchesList;