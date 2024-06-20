import { React } from "react";

export default function NewsTrend() {
  const newsList = [
    {type: "生活/", date: "2024/06/21", text: "樂迷必收！<span class=\"text-red-600\">台灣啤酒</span>攜手大港開唱推出限量聯名款"},
    {type: "娛樂/", date: "2024/06/21", text: "2024大港開唱盛大登場，女神<span class=\"text-red-600\">滿島光</span>也要來！"},
    {type: "娛樂/", date: "2024/06/21", text: "演唱會吸客！高雄連假前3天<span class=\"text-red-600\">訂房率</span>77％"},
    {type: "娛樂/", date: "2024/06/21", text: "2024大港開唱盛大登場，女神<span class=\"text-red-600\">滿島光</span>也要來！"},
    {type: "娛樂/", date: "2024/06/21", text: "演唱會吸客！高雄連假前3天<span class=\"text-red-600\">訂房率</span>77％"},
  ];
  return (
    <div className="w-[334px] p-4 rounded-[20px] border-black border-[1px] flex flex-col gap-2">
      <h3 className="text-Red text-xl font-bold">熱門關鍵字</h3>
      {newsList.map((news, idx) => {
        return (
          <div className="p-2 rounded-xl border-black border-[1px]" key={idx}>
            <div className="flex justify-between">
              <div className="text-lg">{news.type}</div>
              <div>{news.date}</div>
            </div>
            <div className="text-xs" dangerouslySetInnerHTML={{__html: news.text}}></div>
          </div>
        );
      })}
    </div>
  );
}
