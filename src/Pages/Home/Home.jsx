import React, {useEffect, useState} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useHistory} from "react-router-dom";
import axios from "axios";
import NewsCard from "./NewsCard";
import {GET_ALL_ARTICLES_URL} from "../../Constants/constants";
import './Home.css'
import HomeAppBar from "../../Layout/HomeAppBar";
import { Link } from 'react-router-dom'
import PublicFooter from "../../Layout/PublicFooter";

export default function Home() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [

            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [allNewsArticles, setAllNewsArticles] = useState([]);


    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const {data} = await axios.get(GET_ALL_ARTICLES_URL);
                setAllNewsArticles(data);
                setLoading(false);
                console.log("LOADING IS FALSEEEEE")

            } catch (err) {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <div>
            {/* ❤️‍🔥 Header */}
            <HomeAppBar/>
            
            <div style={{backgroundImage: `url(/assets/home-hero-art.png)`}} className="min-h-[720px] md:min-h-[870px] bg-[#003358] bg-cover bg-no-repeat">
                <div className="container mx-auto text-white pt-[100px] px-4 md:py-0 md:pt-[220px]">
                    <div className="">
                    <p className="text-sm md:text-xl leading-6">Product Growth Solution in A Single Platform.</p>
                    <p className="text-[26px] text-center md:text-left md:text-[52px] font-bold  md:leading-[63px] mt-2.5">AI Powered Salesbook <br/>& Inventory <br/>Management</p>
                    <p className="text-[16px] text-center md:text-left md:text-[30px] font-bold md:leading-[37px] text-[#B38B00] mt-2.5">High Quality Custom Sales Software for <br/>your business.</p>
                    <div className="flex justify-center md:justify-start">
                        <button className="bg-[#B38B00] font-bold text-[30px] py-[6px] px-[14px] rounded-[17px] mt-[36px]">Get Started</button>
                    </div>
                    </div>
                </div>
            </div>

            {/* ❤️‍🔥 Second Section */}
            <div className="h-[1600px] md:h-[622px] shadow-lg px-4 md:px-0 bg-[#B38B00] bg-no-repeat bg-contain bg-right"  style={{backgroundImage: `url(/assets/home-second-art.png)`}} >

            <div className="container mx-auto relative -top-[180px]">
                 {/* ❤️‍🔥 Image grid */}
                 <div className="grid grid-cols-3 gap-10 md:gap-0">
                    <div className="div col-span-3 md:col-span-1 flex justify-center">
                        <img style={{boxShadow: '0px 4px 4px 4px rgba(0, 0, 0, 0.25)'}} src="/assets/cart-img-1.png" alt="" className="h-[356px] w-[264px] border-[14px] border-[#B38B00] rounded-[22px]"/>
                    </div>
                    <div className="div col-span-3 md:col-span-1 flex justify-center">
                        <img style={{boxShadow: '0px 4px 4px 4px rgba(0, 0, 0, 0.25)'}} src="/assets/cart-img-2.png" alt="" className="h-[356px] w-[264px] border-[14px] border-[#B38B00] rounded-[22px]"/>
                    </div>
                    <div className="div col-span-3 md:col-span-1 flex justify-center">
                        <img style={{boxShadow: '0px 4px 4px 4px rgba(0, 0, 0, 0.25)'}} src="/assets/cart-img-3.png" alt="" className="h-[356px] w-[264px] border-[14px] border-[#B38B00] rounded-[22px]"/>
                    </div>
                </div>

                <div className="mt-[36px]">
                    <p className="text-[18px] md:text-[40px] md:leading-[49px] font-bold text-white text-center md:text-left">We are the solution for Sales<br/> Tracking problems</p>
                    <p className="text-[16px] text-center md:text-left md:text-[22px] text-white mt-[22px]">SalesLine Electronic Salesbook and Inventory management Solution eliminate paper-based processes in organizations' sales and inventory management, it manages sales and expenditure information and allows administrators to make well-informed managerial decisions, thereby automating bookkeeping processes</p>
                    <div className="flex justify-center md:justify-start">
                        <Link to="/contact-us">
                            <button className="bg-[#003358] shadow-lg text-white font-bold text-[30px] py-[6px] px-[14px] rounded-[17px] mt-[36px]">Contact Us</button>
                        </Link>
                    </div>
                </div>
            </div>
            </div>

            {/* ❤️‍🔥 Third Section */}
            <div className="min-h-[1600px] pb-[200px] md:min-h-[1285px] md:pb-[64px] bg-[#003358] bg-no-repeat bg-cover bg-right" style={{backgroundImage: `url(/assets/home-3rd-art.png)`}}>
                <div className="container mx-auto grid grid-cols-10 gap-10 h-full">
                    <div className="px-4 md:px-0 relative -top-12 col-span-10 md:col-span-5 flex flex-col md:flex-row justify-center">
                        <img src="/assets/home-3rd-img.png" className="md:h-[825px] md:w-[530px]" alt="" />
                    </div>

                    {/* Content */}
                    <div className="text-white col-span-10 md:col-span-5">
                        <h2 className="px-4 md:px-0 text-[22px] md:text-[40px] font-bold md:leading-[49px] mt-[50px]">Features</h2>
                        <ol className="px-4 md:px-0 text-[16px] md:text-[20px] md:leading-[24px] font-bold grid gap-4 md:gap-8 mt-10">
                            <li>01. Inventory Management</li>
                            <li>02. Customer Management</li>
                            <li>03. Retail Accounting</li>
                            <li>04. Suitable for businesses of all sizes</li>
                            <li>05. Simple, Powerful & Affordable</li>
                            <li>06. Report Generation</li>
                            <li>07. Contact Management</li>
                            <li>08. Income and Expense Management</li>
                            <li>09. Product Information management</li>
                        </ol>

                        <div className="px-4 md:px-0 grid grid-cols-2 gap-[21px] mt-[42px] text-white">
                            <div style={{boxShadow: 'box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}} className="col-span-2 md:col-span-1 px-3 pt-5 pb-11 bg-[#B38B00] rounded-[25px]">
                                <h4 className="text-[22px] font-bold leading-[24px] text-center">Inventory Management</h4>
                                <p className="text-justify text-[18px] mt-5">Inventory management helps companies identify which and how much stock to order at what time. It tracks inventory from purchase to the sale of goods. The practice identifies and responds to trends to ensure there's always enough stock to fulfill customer orders and proper warning of a shortage.</p>
                            </div>
                            <div style={{boxShadow: 'box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}} className="col-span-2 md:col-span-1 px-3 pt-5 pb-11 bg-[#B38B00] rounded-[25px]">
                                <h4 className="text-[22px] font-bold leading-[24px] text-center">Retail Accounting</h4>
                                <p className="text-justify text-[18px] mt-5">Retail accounting isn't a special kind of accounting process or system, but rather an inventory valuation technique often used by retailers. It differs from “cost accounting” for inventory in that it values inventory based on the selling price rather than the acquisition price.</p>
                            </div>
                            <div style={{boxShadow: 'box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}} className="col-span-2 md:col-span-1 px-3 pt-5 pb-11 bg-[#B38B00] rounded-[25px]">
                                <h4 className="text-[22px] font-bold leading-[24px] text-center">Report Generation</h4>
                                <p className="text-justify text-[18px] mt-5">The process in which reports are made by using a tool for users related to business is called report generation, This serve as a way for your business to get a minute by minute status of your business</p>
                            </div>
                            <div style={{boxShadow: 'box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}} className="col-span-2 md:col-span-1 px-3 pt-5 pb-11 bg-[#B38B00] rounded-[25px]">
                                <h4 className="text-[22px] font-bold leading-[24px] text-center">Income and Expense Management</h4>
                                <p className="text-justify text-[18px] mt-5">Budget tracking, income and expense management are main functions for this application. Effective cashflow management is critical to business survival. It is therefore important to reduce the time gap between expenditure and receipt of income</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ❤️‍🔥 News Section */}
            <div className="min-h-[622px] px-4 md:px-0 pb-[123px] text-white bg-[#B38B00] bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(/assets/home-4th-news-art.png)`}}>
                <div className="container mx-auto">
                    <h1 className="text-[40px] md:text-[64px] md:leading-[78px] font-black relative -top-8">In The News</h1>
                    
                    <div className="bg-[#D9D9D9] bg-opacity-20 px-[30px] md:px-[50px] py-[28px] rounded-[9px]">
                        <h1 className="text-[20px] text-center md:text-left md:text-[22px] md:leading-[24px] font-bold">SalesLine Revolutionising Businesses With LLM Powered Chatbots</h1>
                        <p className="mt-2.5 text-[16px] text-center md:text-left">SalesLine Technology Enterprises and partner company Techline Communications, an indigenous information technology (IT) firm, has added an innovative solution that will help corporate organizations in customer relations and engagement. Known as LLM Powered Chatbot Building Service powered by ChatGPT. This solution is harnessing the potential of machine learning algorithms, natural language processing, and artificial intelligence, this solution empowers businesses to unlock the full potential of their data and revolutionize their operations</p>
                        <div className="flex justify-end">
                            <p className="font-medium text-[20px] bg-none">Read More...</p>
                        </div>
                    </div>

                    <div className="bg-[#D9D9D9] bg-opacity-20 px-[30px] md:px-[50px] py-[28px] rounded-[9px] mt-[36px]">
                        <h1 className="text-[20px] text-center md:text-left md:text-[22px] md:leading-[24px] font-bold">SalesLine Revolutionising Businesses With LLM Powered Chatbots</h1>
                        <p className="mt-2.5 text-[16px] text-center md:text-left">SalesLine Technology Enterprises and partner company Techline Communications, an indigenous information technology (IT) firm, has added an innovative solution that will help corporate organizations in customer relations and engagement. Known as LLM Powered Chatbot Building Service powered by ChatGPT. This solution is harnessing the potential of machine learning algorithms, natural language processing, and artificial intelligence, this solution empowers businesses to unlock the full potential of their data and revolutionize their operations</p>
                        <div className="flex justify-end">
                            <p className="font-medium text-[20px] bg-none">Read More...</p>
                        </div>
                    </div>
                </div>
            </div>

            <PublicFooter/>
        </div>
    );
}
