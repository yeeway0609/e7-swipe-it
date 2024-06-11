import React from 'react';
import { CheckboxSVGMap } from 'react-svg-map';
import Taiwan from '@svg-maps/taiwan.main';
import './style.sass';

class HeatMapComponent extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props); // => 如果前面兩個參數忘記加，這裡會無法存取
  }

  render() {
    return (
      <div className='box'>
        <h2 className='text'>活動地區</h2>
        <div className='map-container'>
          <CheckboxSVGMap map={Taiwan}/>
        </div>
      </div>

    );
  }
}


export default HeatMapComponent;