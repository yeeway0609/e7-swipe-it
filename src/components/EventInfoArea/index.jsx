import { React, useState } from "react";
import "./index.css";

export default function EventInfoArea() {
  const relativeEvents = ["S2O潑水音樂節", "台灣祭", "浮現祭", "共生音樂節"];

  return (
    <section className="activity_info_section">
      <div className="activity_info_section_left">
        <div className="activity_intro">
          <h3>大港開唱</h3>
          <p>大港開唱（Megaport Festival）由台北「野台開唱」主辦團隊在2006年創立，是每年在高雄舉辦的音樂節慶，邀請許多人生閱歷豐富的知名業界前輩演出，也會與新一代的樂團或藝人合作演出，交融出世代之間的化學效應，近年逐漸成為台灣最具指標性的大型戶外音樂祭活動之一。</p>
        </div>
        <div className="ai_signal">
          ai 訊號
        </div>
      </div>
      <div className="activity_info_section_right">
        <div className="relative_events">
          <h3>相似活動</h3>
          {relativeEvents.map((event, id) => {
            return <button key={id}>{event}</button>;
          })}
        </div>
        <div className="history_records">
          <h3>歷史紀錄</h3>
        </div>
      </div>
    </section>
  );
}
