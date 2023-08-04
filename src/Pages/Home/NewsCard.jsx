import React from "react";

const NewsCard = ({data}) => {

    return (        
        <a href={data.link}>
            <div className="bg-[#D9D9D9] bg-opacity-20 px-[30px] md:px-[50px] py-[28px] rounded-[9px] mt-[36px]">
                <h1 className="text-[20px] text-center md:text-left md:text-[22px] md:leading-[24px] font-bold">
                    {data.news_name}
                    <hr/>
                    --{data.medium}
                </h1>
                <p className="mt-2.5 text-[16px] text-center md:text-left">
                    {data.body}
                </p>
                <div className="flex justify-end">
                    <a href={data.link}>
                        <p className="font-medium text-[20px] bg-none">Read More...</p>
                    </a>
                </div>
            </div>
        </a>
    );
};

export default NewsCard;