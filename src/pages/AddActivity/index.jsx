import "./style.sass";
import {React,useState } from "react";
import SinopacLogo from "@/img/永豐Logo.webp";

export default function AddActivity() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const [selectedCity, setSelectedCity] = useState('');
    
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    };
  const activityTypes = ["", "工商展覽(B2B)", "工商展覽(B2C)", "藝文展覽", "藝文表演", "演唱會(大型)", "演唱會(小型)","音樂祭"];
  const relatedActivities = {
    "工商展覽(B2B)": ["半導體展", "螺絲展", "電腦展"],
    "工商展覽(B2C)": ["家具展", "汽車展", "機車展"],
    "藝文展覽": ["黃色小鴨", "紅球計畫", "極度日常"],
    "藝文表演": ["M3 DAMM", "把我娶回家", "草草戲劇節"],
    "演唱會(大型)": ["告五人演唱會", "宇宙人演唱會"],
    "演唱會(小型)": ["迷路人演唱會"],
    "音樂祭": ["共生音樂節","S2O潑水音樂節","台灣祭","浮現祭","大港開唱"],
  };
  
  const [selectedActivity, setSelectedActivity] = useState('');
  const [relatedActivity, setRelatedActivity] = useState([]);
    
  const handleActivityChange = (event) => {
    const selectedType = event.target.value;
    setSelectedActivity(selectedType);
    setRelatedActivity(relatedActivities[selectedType] || []);
    setClickedRelativeButtons([]);
    };

  const [clickedRelativeButtons, setClickedRelativeButtons] = useState([]);
  const handleRelativeButtonClick = (idx) => {
  const isClicked = clickedRelativeButtons.includes(idx);
  if (isClicked) {
    setClickedRelativeButtons(clickedRelativeButtons.filter(buttonIdx => buttonIdx !== idx));
  } else {
    setClickedRelativeButtons([...clickedRelativeButtons, idx]);
  }
  };

  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = () => {
    setIsSubmitted(true);
  }

  return (
       <div className="add-activity">
        <div className="gray-vector">
          <div className="form-insert">
              <h2>活動匯入</h2>
              <div className="form">
                <div className="left-form">
                  <div className="container" id="container-1">
                    <h1>活動名稱 </h1>
                    <input type="text" id="activity-name"></input>
                  </div>
                    <div className="container">
                    <h1>開始日期</h1>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;起&nbsp;&nbsp;</p>
                      <input
                        type="date"
                        value={startDate}
                        onChange={handleStartDateChange}
                      />
                    </div>
                    <div className="container" id="endDay">
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;訖&nbsp;&nbsp;</p>
                      <input
                        type="date"
                        value={endDate}
                        onChange={handleEndDateChange}
                      />
                    </div>
                    <div className="container">
                      <h1>活動地點</h1><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;縣市&nbsp;&nbsp;</p>
                      <select id="city" value={selectedCity} onChange={handleCityChange}>
                        <option value=""></option>
                        <optgroup label="直轄市">
                        <option value="臺北市">臺北市</option>
                        <option value="新北市">新北市</option>
                        <option value="桃園市">桃園市</option>
                        <option value="臺中市">臺中市</option>
                        <option value="臺南市">臺南市</option>
                        <option value="高雄市">高雄市</option>
                      </optgroup>
                      <optgroup label="縣">
                        <option value="新竹縣">新竹縣</option>
                        <option value="苗栗縣">苗栗縣</option>
                        <option value="彰化縣">彰化縣</option>
                        <option value="南投縣">南投縣</option>
                        <option value="雲林縣">雲林縣</option>
                        <option value="嘉義縣">嘉義縣</option>
                        <option value="屏東縣">屏東縣</option>
                        <option value="宜蘭縣">宜蘭縣</option>
                        <option value="花蓮縣">花蓮縣</option>
                        <option value="臺東縣">臺東縣</option>
                      </optgroup>
                      <optgroup label="市">
                        <option value="基隆市">基隆市</option>
                        <option value="新竹市">新竹市</option>
                        <option value="嘉義市">嘉義市</option>
                      </optgroup>
                      </select>
                    </div>
                    <div className="container">
                      <h1>活動類型</h1><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                      <select id="activity" value={selectedActivity} onChange={handleActivityChange}>
                      {activityTypes.map((type, idx) => (
                      <option key={idx} value={type}>{type}</option>
                      ))}
                      </select>
                    </div>
                    <div className="container" id="similar-activity">
                    <h1>相似活動</h1>
                    {relatedActivity.length > 0 && (
                      <div>
                        <ul className="related-activity-grid">
                          {relatedActivity.map((activity, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleRelativeButtonClick(idx)}
                              className={clickedRelativeButtons.includes(idx) ? 'clicked' : ''}
                            >
                              {activity}
                            </button>
                          ))}
                        </ul>
                      </div>
                    )}
                    </div>
                </div>
                

                <div className="right-form">
                  <div className="container">
                    <h1>可能專案  </h1>
                  <textarea type="text" id="possible-activity-name"></textarea>
                  </div>
                  <div className="container">
                    <h1>備註&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
                  <textarea type="text" id="notes"></textarea>
                  </div>
                  <div className="container">
                    <h1>資料來源</h1>
                    <textarea  type="text" id="source"></textarea >
                  </div>
                  <div className="submit-section">
                    <div>{isSubmitted ? (<p>已提交</p>) : (<button className="submit-button" onClick={handleSubmit}>提交</button> )}</div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <img src={SinopacLogo} alt="SinopacLogo" />
      </div>
  );
}
