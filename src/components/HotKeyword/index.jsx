import { React } from "react";

export default function HotKeyword() {
  return (
    <div className="w-[334px] mb-3 p-5 rounded-[20px] border-black border-[1px]">
      <h3 className="text-Red text-xl font-bold">新聞熱搜</h3>
      <span className="text-[#4A4A4A] text-lg">演唱會</span>
      <div className="mb-3 w-full">
        <div className="w-full h-1 rounded-t-lg bg-[#F9A060]"></div>
        <div className="py-1 bg-[#F2F2F2] flex">
          <div className="ml-4 w-[150px]">1.啤酒</div>
          <div>4.滿島光</div>
        </div>
        <div className="py-1 bg-[#E1E1E1] flex">
          <div className="ml-4 w-[150px]">2.周邊商品</div>
          <div>5.台灣祭</div>
        </div>
        <div className="py-1 bg-[#F2F2F2] flex rounded-b-lg">
          <div className="ml-4 w-[150px]">3.草東沒有派對</div>
          <div>6.熟食</div>
        </div>
      </div>
      <span className="mt-3 text-[#4A4A4A] text-lg">科技展覽</span>
      <div className="w-full">
        <div className="w-full h-1 rounded-t-lg bg-[#3D8B00]"></div>
        <div className="py-1 bg-[#F2F2F2] flex">
          <div className="ml-4 w-[150px]">1.NVIDIA</div>
          <div>4.蘇媽</div>
        </div>
        <div className="py-1 bg-[#E1E1E1] flex">
          <div className="ml-4 w-[150px]">2.黃仁勳</div>
          <div>5.Apple</div>
        </div>
        <div className="py-1 bg-[#F2F2F2] flex rounded-b-lg">
          <div className="ml-4 w-[150px]">3.COMPUTEX</div>
          <div>6.WWDC</div>
        </div>
      </div>
    </div>
  );
}
