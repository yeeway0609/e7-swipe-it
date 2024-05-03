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
            <CheckboxSVGMap map={Taiwan}/>
        );
    }
  }
  

export default HeatMapComponent