import React from "react";

const NewsCard = ({data}) => {

    return (
        <div className="mb-5 ">
            <div className="shadow-md border-4 rounded-xl border-white bg-[#625038] min-h-[500px] pt-[90px] px-[57px]">
                <a target="_blank" href={data.link}><h3
                    className="text-center text-white font-[Roboto] font-bold text-[20px] leading-[30px]">
                    {data.news_name}
                </h3></a>
                <a target="_blank" href={data.link}>
                    <div className="font-[Roboto] text-[20px] leading-[30px] mt-[17px] text-white text-center">
                        {data.body}
                        <hr/>
                        --{data.medium}
                    </div>
                </a>
                <div className="font-[Roboto] text-[20px] leading-[30px] mt-[17px] text-white text-center"><a
                    target="_blank" href={data.link}>Find Out More >></a></div>
            </div>
        </div>
    );
};

export default NewsCard;