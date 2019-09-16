import React from 'react';
import Zoom from 'react-reveal/Zoom';
import jersey from '../../../resources/images/jersey.jpg';

const PromotionAnimation = () => {
  return (
    <div className="promotion_animation">
      <Zoom>
        <div className="left">
            <span>Win a</span>
            <span>Jersey</span>
        </div>
      </Zoom>
      <div className="right">
        <Zoom>
          <div style={{ background: `url(${jersey}) no-repeat`}}></div>
        </Zoom>
      </div>
    </div>
  );
};

export default PromotionAnimation;