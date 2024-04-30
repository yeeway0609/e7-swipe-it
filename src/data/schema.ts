type EventType = "工商展覽(B2B)" | "工商展覽(B2C)" | "藝文展覽" | "藝文表演" | "演唱會(大型)" | "演唱會(小型)" | "運動賽事" | "市集" | "音樂祭" | "其他";
type City = "台北市" | "新北市" | "桃園市" | "台中市" | "台南市" | "高雄市" | "基隆市" | "新竹市" | "嘉義市" | "新竹縣" | "苗栗縣" | "彰化縣" | "南投縣" | "雲林縣" | "嘉義縣" | "屏東縣" | "宜蘭縣" | "花蓮縣" | "台東縣" | "澎湖縣" | "金門縣" | "連江縣";

interface Event {
  id: number;
  name: string; // 活動名稱
  intro: string; // 活動簡介
  location: City; // 活動地點
  startDate: Date; // 開始日期
  endDate: Date; // 結束日期
  eventType: EventType ; // 活動類型
  relatedEventsId: number[];
}