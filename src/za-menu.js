import React, { useState, useEffect } from 'react'
import Iframe from 'react-iframe'
import {Menu, Layout,Result, Button ,Badge} from 'antd';
import { RightOutlined } from '@ant-design/icons';
import CardReport from './za-cardreport'



import 'antd/dist/antd.css';

import './index.css';

const {Sider, Content } = Layout;


export default function ZMenu(props) {

    const [SelectedMenu, SelectMenu] = useState(true);
    const [CountMenu, SetCountMenu] = useState({});
    const [Complete, SetComplete] = useState(1);
    useEffect(() =>
    {
        var CountMenuNew ={};
        if(SelectedMenu == true && props.dataSetMenuList.length > 0)
        {
            async function test()
            {
               await console.log(props.dataSetMenuList)
               await SelectMenu(props.dataSetMenuList[0]);
               await props.dataSetMenuList.map((value, index) => {
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


    const ConRender = (SelectedMenuv) =>
    {
     
        if(SelectedMenu != false)
        {
            if(SelectedMenu.type == "creator-component")
            {
                return(<Iframe height='100%' width='100%' frameborder='0' src={"https://app.zohocreator.com/"+SelectedMenu["link"]}></Iframe>)
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
                <div className="textmenu" >{props.dataWidgetConfig.widgetname}</div>
                <div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
                        {
                                props.dataSetMenuList.map((value, index) => {
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

