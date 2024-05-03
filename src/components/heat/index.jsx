import React from 'react';
import { SVGMap } from 'react-svg-map';
import Taiwan from '@svg-maps/taiwan';
import './index.css';

const HeatMapComponent = () => {
    const [selectedLocation, setSelectedLocation] = React.useState([]);

    const handleLocationClick = (event) => {
        setSelectedLocation([event.target.attributes.name.value]);
    };

    return (
            <SVGMap 
                map={Taiwan} 
                onLocationClick={handleLocationClick}
                locationClassName={(location, index) => {
                    // 根據不同的區域數據設定不同的 CSS 類別
                    if (selectedLocation.includes(location.name)) {
                        return 'svg-map__location svg-map__location--selected';
                    } else {
                        return 'svg-map__location';
                    }
                }}
            />

    );
};

export default HeatMapComponent;