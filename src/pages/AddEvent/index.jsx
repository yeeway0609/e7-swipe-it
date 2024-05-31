import "./style.sass";
import React, { useState } from "react";

export default function AddEvent() {
  const [Id, setId] = useState(''); // Id
  const [ActivityName, setActivityName] = useState(''); // 活動名稱
  const [startDate, setStartDate] = useState(''); // 起始日
  const [endDate, setEndDate] = useState(''); // 結束日
  const [selectedCity, setSelectedCity] = useState(''); // 活動地點
  const [selectedActivity, setSelectedActivity] = useState(''); // 活動類型
  const [Related_events_id, setRelated_events_id] = useState(''); // Related_events_id
  const [News_trend, setNews_trend] = useState(''); // News_trend
  const [Top5_products, setTop5_products] = useState(''); // Top5_products
  const [isSubmitted, setIsSubmitted] = useState(false); // 新增此狀態來追蹤是否已提交

  const handleSubmit = async () => {
    const eventData = {
      id: Id,
      name: ActivityName,
      location: selectedCity,
      type: selectedActivity,
      start_date: startDate,
      end_date: endDate,
      related_events_id: Related_events_id,
      news_trend: News_trend,
      top5_products: Top5_products
    };

    try {
      const response = await fetch('http://luffy.ee.ncku.edu.tw:4445/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      });

      if (response.ok) {
        console.log('數據提交成功');
        setIsSubmitted(true); // 設置 isSubmitted 為 true
      } else {
        console.error('數據提交失敗');
      }
    } catch (error) {
      console.error('發送請求時出現錯誤', error);
    }
  };

  const handleActivityNameChange = (event) => {
    setActivityName(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleRelated_events_idChange = (event) => {
    setRelated_events_id(event.target.value);
  };

  const handleNews_trendChange = (event) => {
    setNews_trend(event.target.value);
  };

  const handleTop5_productsChange = (event) => {
    setTop5_products(event.target.value);
  };

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const activityTypes = ["", "工商展覽(B2B)", "工商展覽(B2C)", "藝文展覽", "藝文表演", "演唱會(大型)", "演唱會(小型)", "音樂祭"];
  const relatedActivities = {
    "工商展覽(B2B)": ["半導體展", "螺絲展", "電腦展"],
    "工商展覽(B2C)": ["家具展", "汽車展", "機車展"],
    "藝文展覽": ["黃色小鴨", "紅球計畫", "極度日常"],
    "藝文表演": ["M3 DAMM", "把我娶回家", "草草戲劇節"],
    "演唱會(大型)": ["告五人演唱會", "宇宙人演唱會"],
    "演唱會(小型)": ["迷路人演唱會"],
    "音樂祭": ["共生音樂節", "S2O潑水音樂節", "台灣祭", "浮現祭", "大港開唱"],
  };

  const [relatedActivity, setRelatedActivity] = useState([]);
  const [clickedRelativeButtons, setClickedRelativeButtons] = useState([]);

  const handleActivityChange = (event) => {
    const selectedType = event.target.value;
    setSelectedActivity(selectedType);
    setRelatedActivity(relatedActivities[selectedType] || []);
    setClickedRelativeButtons([]);
  };

  const handleRelativeButtonClick = (idx) => {
    const isClicked = clickedRelativeButtons.includes(idx);
    if (isClicked) {
      setClickedRelativeButtons(clickedRelativeButtons.filter(buttonIdx => buttonIdx !== idx));
    } else {
      setClickedRelativeButtons([...clickedRelativeButtons, idx]);
    }
  };

  return (
    <div className="add-activity">
      <div className="gray-vector">
        <div className="form-insert">
          <h1>活動匯入</h1>
          <div className="form">
            <div className="left-form">
              <div className="container">
                <h2>id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                <input
                  type="number"
                  id="id"
                  value={Id}
                  onChange={handleIdChange}
                  autoComplete="off"
                />
              </div>
              <div className="container" id="container-1">
                <h2>活動名稱&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                <input
                  type="text"
                  id="activity-name"
                  value={ActivityName}
                  onChange={handleActivityNameChange}
                />
              </div>
              <div className="container">
                <h2>活動時間</h2>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;起&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <input
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
              </div>
              <div className="container" id="endDay">
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;訖&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <input
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </div>
              <div className="container">
                <h2>活動地點</h2><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;縣市&nbsp;&nbsp;</p>
                <select id="city" className="selectList" value={selectedCity} onChange={handleCityChange}>
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
                <h2>活動類型</h2><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <select id="activity" className="selectList" value={selectedActivity} onChange={handleActivityChange}>
                  {activityTypes.map((type, idx) => (
                    <option key={idx} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="container" id="similar-activity">
                <h2>相似活動</h2>
                {relatedActivity.length > 0 && (
                  <div>
                    <ul className="related-activity-grid">
                      {relatedActivity.map((activity, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleRelativeButtonClick(idx)}
                          className={clickedRelativeButtons.includes(idx) ? "clicked" : ""}
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
                <h2>related_events_id&nbsp;&nbsp;&nbsp;</h2>
                <textarea
                  id="related_events_id"
                  value={Related_events_id}
                  onChange={handleRelated_events_idChange}
                />
              </div>
              <div className="container">
                <h2>news_trend&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                <textarea
                  id="news_trend"
                  value={News_trend}
                  onChange={handleNews_trendChange}
                />
              </div>
              <div className="container">
                <h2>top5_products&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                <textarea
                  id="top5_products"
                  value={Top5_products}
                  onChange={handleTop5_productsChange}
                />
              </div>
              <div className="submit-section">
                <div>{isSubmitted ? (<p>已提交</p>) : (<button className="submit-button" onClick={handleSubmit}>提交</button>)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
