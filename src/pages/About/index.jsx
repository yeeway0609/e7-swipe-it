import { React, useState } from "react";
import "./index.css";
import main_picture from "@/img/團體照.webp";
import member1 from "@/img/member/01-黃政文.webp";
import member2 from "@/img/member/02-蘇奕幃.webp";
import member3 from "@/img/member/03-王三禾.webp";
import member4 from "@/img/member/04-阮紹銘.webp";
import member5 from "@/img/member/05-曾鈺蘋.webp";

export default function About() {
  const [memberIntroText, setMemberIntroText] = useState({name: "黃政文", role: "UI/UX設計師", email: "nodong3334@gmail.com", intro: ""});
  const memberData = [
    { name: "黃政文", role: "UI/UX設計師", email: "nodong3334@gmail.com", intro: "", img: member1 },
    { name: "蘇奕幃", role: "工程師", email: "yiwei.suuu@gmail.com", intro: "未來想當前端工程師，興趣是聽Kpop跟跑咖🤩", img: member2 },
    { name: "王三禾", role: "工程師", email: "wang3harry@gmail.com", intro: "我想變成一隻(海豚)在海裡游泳", img: member3 },
    { name: "阮紹銘", role: "工程師", email: "bend06b@gmail.com", intro: "我今天想翹課。", img: member4 },
    { name: "曾鈺蘋", role: "工程師", email: "E24103175@gs.ncku.edu.tw", intro: "希望未來可以每天生魚片吃到飽", img: member5 },
  ];

  const handleMemberIntroChange = (memberId) => {
    setMemberIntroText({
      name: memberData[memberId].name,
      role: memberData[memberId].role,
      email: memberData[memberId].email,
      intro: memberData[memberId].intro
    });
  };

  return (
    <div>
      <div className="intro-container">
        <div className="intro">
          <h1>Something About Us</h1>
          <p>我們是一支致力於信用卡企劃業務提案的軟體開發團隊，提供即時現有活動，並比較過去同等規模的活動的經濟規模等資訊。透過我們軟體的協助，能夠為企劃業務提供更具可行性和可靠性的建議，協助其提出更有競爭力的提案。</p>
        </div>
        <div className="people-images">
          <div className="gray_vector"></div>
          <img src={main_picture} alt="main_picture" />
        </div>
      </div>

      <div className="member-intro" >
        <div className="member-card-container">
          {memberData.map((member, index) => (
            <div className="member-container" key={index} onMouseEnter={() => handleMemberIntroChange(index)} >
              <img src={member.img} alt={member.name} />
            </div>
          ))}
        </div>
        <div className="right-side">
          <h3>{memberIntroText.name}</h3>
          <p>{memberIntroText.role}</p>
          <p>{memberIntroText.email}</p>
          <p>{memberIntroText.intro}</p>
        </div>
      </div>
    </div>
  );
}

