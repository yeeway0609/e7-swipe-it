import React from 'react';
import { CheckboxSVGMap } from 'react-svg-map';
import Taiwan from '@svg-maps/taiwan.main';
import './index.css';

class HeatMapComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props); // => 如果前面兩個參數忘記加，這裡會無法存取
    console.log('Title created');
  }

  render() {
    return (
      <div className='box'>
        <p className='text'>活動地區</p>
        <CheckboxSVGMap map={Taiwan}/>
      </div>
      
    );
  }
}


export default HeatMapComponent;