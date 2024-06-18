import React, { useContext } from 'react';
import { CheckboxSVGMap } from 'react-svg-map';
import Taiwan from '@svg-maps/taiwan.main';
import './style.sass';
import { EventFilterContext } from "@/context/EventFilterContext";

const TaiwanCitiesName = {
  "Taipei City": "台北市",
  "New Taipei City": "新北市",
  "Taoyuan City": "桃園市",
  "Taichung City": "台中市",
  "Tainan City": "台南市",
  "Kaohsiung City": "高雄市",
  "Keelung City": "基隆市",
  "Hsinchu City": "新竹市",
  "Chiayi City": "嘉義市",
  "Hsinchu County": "新竹縣",
  "Miaoli County": "苗栗縣",
  "Changhua County": "彰化縣",
  "Nantou County": "南投縣",
  "Yunlin County": "雲林縣",
  "Chiayi County": "嘉義縣",
  "Pingtung County": "屏東縣",
  "Yilan County": "宜蘭縣",
  "Hualien County": "花蓮縣",
  "Taitung County": "台東縣",
  "Penghu County": "澎湖縣",
};

export default function HeatMapComponent() {
  const { eventFilter, setEventFilter } = useContext(EventFilterContext);

  const handleLocationFocus = (event) => {
    const locationName = event.target.attributes.name.value;
    setEventFilter(prevFilter => ({
      ...prevFilter,
      location: TaiwanCitiesName[locationName]
    }));
  };

  const handleLocationBlur = () => {
    setEventFilter(prevFilter => ({
      ...prevFilter,
      location: ""
    }));
  };

  return (
    <div className='box'>
      <div className='mb-1 flex justify-between items-end'>
        <h2 className='text'>活動地區</h2>
        <span>目前選擇: {eventFilter.location || "不限"}</span>
      </div>
      <div className='map-container'>
        <CheckboxSVGMap
          map={Taiwan}
          onLocationFocus={handleLocationFocus}
          onLocationBlur={handleLocationBlur}
        />
      </div>
    </div>
  );
}