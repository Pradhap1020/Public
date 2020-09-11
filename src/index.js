import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import {HashRouter as Router,Switch,Route,Link} from "react-router-dom";
import ZHeader from './za-header'
import ZMenu from './za-menu'
import ZClient from './za-client'

import './index.css';
import 'antd/dist/antd.css';

const widgetid = "1012";

export default function App() {
    const [Notification, SetNotification] = useState([]);
    const [Tickets, SetTickets] = useState([]);
    const [MenuList, SetMenuList] = useState([]);
    const [logo, Setlogo] = useState([]);
    const [WidgetConfig, SetWidgetConfig] = useState(true);
    const [SelectedMenu, SelectMenu] = useState(true);
    useEffect(() => {
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
        
                    const GetAllNotificationsConfig = {
                        reportName : "Organisation_Notifications",
                        criteria : "(Status == \"Open\")"
                    }
                    ZAPPY.getAllRecords(GetAllNotificationsConfig).then((response) => {
                        //console.log(response.data)
                        SetNotification(response.data)
                    });
            })
        })
    },[]);


    useEffect(() =>
    {
        if(WidgetConfig != true)
        {
            console.log("config tiggered")
            console.log(WidgetConfig)
            SetMenuList(WidgetConfig.menu)
            SelectMenu(WidgetConfig.menu[0])
            SetTickets(WidgetConfig.Tickets)
            Setlogo(WidgetConfig.header.logo)
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

    return (
        <div>
            <ZHeader datalogo={logo} dataTicket={Tickets} dataNotification={Notification} ></ZHeader>
            <Router>
                
                    <Switch>
                        <Route path="/pub/:pubid">
                            <ZClient />
                        </Route>
                        <Route path="/" >
                            <ZMenu dataWidgetConfig={WidgetConfig} dataSetMenuList={MenuList} dataSelectMenu={SelectedMenu}></ZMenu>
                        </Route>

                    </Switch>
                
            </Router>
            
        </div>
    )
}



ReactDOM.render
(<App />,
document.getElementById('root'));

