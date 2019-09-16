import React, { Component } from 'react';
import stripes from '../../../resources/images/stripes.png';
import { Tag } from '../../ui/misc';

class MeePlayers extends Component {
  state= {

  }

  render() {
    return (
      <div 
        className="home_meetplayers"
        style={{background: `#fff url(${stripes})`}}
      >
        <div className="container">
          <div className="home_meetplayers_wrapper">
            <div className="home_card_wrapper">
              card
            </div>
            <div className="home_text_wrapper">
              <div>
                <Tag bck="#0e1731" size="100px" color="#fff"
                  add={{
                    display: 'inline-block',
                    marginBottom: '20px'
                  }}
                >
                  Meet
                </Tag>
              </div>
              <div>
                <Tag bck="#0e1731" size="100px" color="#fff"
                  add={{
                    display: 'inline-block',
                    marginBottom: '20px'
                  }}
                >
                  The
                </Tag>
              </div>
              <div>
                <Tag bck="#0e1731" size="100px" color="#fff"
                  add={{
                    display: 'inline-block',
                    marginBottom: '20px'
                  }}
                >
                  Players
                </Tag>
              </div>
              <div>
                <Tag
                  bck="#fff"
                  size="27px"
                  color="#0e1731"
                  link={true}
                  linkTo="/team"
                  add={{
                    display: 'inline-block',
                    marginBottom: '27px',
                    border: '1px solid #0e1731'
                  }}
                >
                  Meet them here
                </Tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MeePlayers;