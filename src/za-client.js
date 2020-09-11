import React, { useState, useEffect } from 'react'
import Iframe from 'react-iframe'
import {    useParams ,useHistory,Link } from "react-router-dom";
import {Menu, Layout,Result, Button ,Badge} from 'antd';
import { RightOutlined, RollbackOutlined } from '@ant-design/icons';
import CardReport from './za-cardreport'



import 'antd/dist/antd.css';

import './index.css';

const {Sider, Content } = Layout;


export default function ZClient() {

    const [MenuList, SetMenuList] = useState([]);
    const [WidgetConfig, SetWidgetConfig] = useState(true);
    const [SelectedMenu, SelectMenu] = useState(true);
    const [CountMenu, SetCountMenu] = useState({});
    const [Complete, SetComplete] = useState(1);

    const widgetid = "1011";

    const [pubname, SetPubName] = useState([]);

    let { pubid } = useParams();

    let history = useHistory();

    useEffect(() => {
        console.log(pubid);
        $(document).ready(()=>{
        console.log("initization Called")
        ZAPPY.init().then((response) => {
                console.log("initization done")
                const GetAllConfig = {
                    reportName : "Widget_Config_Report"
                }
                ZAPPY.getAllRecords(GetAllConfig).then((response) => {
                    //console.log(response);

                    response.data.map((value,index) =>{
                    if(value.Widget_ID == widgetid)
                    {
                            SetWidgetConfig(JSON.parse(value.Config));
                    }
                    }
                )
                });

                //get pub name
                const GetPubName = {
                    reportName : "All_Pub_Details",
                    id : pubid
                }
                ZAPPY.getRecordById(GetPubName).then((response) => {
                    //console.log(response);                            
                    SetPubName(response.data.Pub);
                    // console.log(response.data.Pub);
                });
    
               
        })
    })
},[]);

    useEffect(() =>
    {
        var CountMenuNew ={};
        if(SelectedMenu == true && MenuList.length > 0)
        {
            async function test()
            {
               await console.log(MenuList)
               await SelectMenu(MenuList[0]);
               await MenuList.map((value, index) => {
                    if(value.count.show == true)
                    {
                        console.log("Datain");
                        const NotificationCount = {
                            reportName : value.count.report,
                            criteria : value.count.criteria,
                        }
                        ZAPPY.getAllRecords(NotificationCount).then((response) => {
                            CountMenuNew[index] = response.data.length;
                            SetCountMenu(CountMenuNew);  
                        })
                    }
                })
            }
            test();
        }
    }); 

    useEffect(() =>
    {
        console.log("serme")
        SetComplete(2);
    },[CountMenu]); 

    const handleClick = e => {    
        SelectMenu(e);
    }

    useEffect(() =>
    {
        if(WidgetConfig != true)
        {
            console.log("config tiggered")
            console.log(WidgetConfig)
            SetMenuList(WidgetConfig.menu)
            SelectMenu(WidgetConfig.menu[0])
            console.log(WidgetConfig)
        }
    },[WidgetConfig]);

    useEffect(() =>
    {
        if(SelectedMenu != true)
        {
            console.log("Slected Updated")
            console.log(SelectedMenu)
        }
    },[SelectedMenu]);

    const ConRender = (SelectedMenuv) =>
    {
     
        if(SelectedMenu != false)
        {
            if(SelectedMenu.type == "creator-component")
            {
                return(<Iframe height='100%' width='100%' frameborder='0' src={"https://app.zohocreator.com/"+SelectedMenu["link"]+"PubID="+pubid}></Iframe>)
            }
            else if(SelectedMenu.type == "widget-component")
            {
                if(SelectedMenu.component == "cardreport")
                {
                    return(<CardReport></CardReport>)
                }
                else
                {
                    return(<Result
                        status="404"
                        title="No Component"
                        subTitle="Sorry, please contact admin"
                        extra={<Button type="primary">Back Home</Button>}
                        />)
                }
            }
        }
       
    }


    
    return (
        <div>
        <div className="maincontainer">
            <Sider className="Sider" trigger={null} collapsible collapsed={false}>
                <div className="textmenu1" >
                    <Link to={"/"}><div className="menu-icon-div"><RollbackOutlined /></div></Link>
                    <div>{pubname}</div>
                </div>
                <div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
                        {
                                MenuList.map((value, index) => {
                                return (
                                    <Menu.Item key={index} onClick={() => handleClick(value)} >
                                        {value.name}
                                        <Badge count={CountMenu[index]} overflowCount={10} className="BadgeCustom" />
                                    </Menu.Item>
                                )
                        })}
                    </Menu>
                </div>
            </Sider>
            <Layout className="site-layout">
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        minHeight: 280,
                    }}>
                {ConRender(SelectedMenu)}
                </Content>
            </Layout>
        </div>
    </div>
    )
}

