import React, { useState, useEffect } from 'react'
import { Avatar, List, Badge, Layout, notification ,Drawer, Modal, Button } from 'antd';
import { MailOutlined, NotificationOutlined } from '@ant-design/icons';
import Iframe from 'react-iframe'

import 'antd/dist/antd.css';

import './index.css';

const { Header } = Layout;

export default function ZHeader(props){

    const [visible, setVisible] = useState(false);
   
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    const [visiblem, setvisiblem] = useState(false);

    const showDrawerm = () => {
        setvisiblem(true);
    };
    const onClosem = () => {
        setvisiblem(false);
    };

    const [countvar, setCount] = useState(0);

    const Notify = (Description,Name,index) => {
        const bottomRight = "bottomRight"
        notification.open({
            message: <div className="noti-title"><Avatar src="https://image.flaticon.com/icons/svg/847/847969.svg" /><div className="noti-title-test">  {Name}  </div></div>,
            description:
                <List>
                    <List.Item key={index}>
                        <List.Item.Meta
                            description={Description}
                        />
                    </List.Item>
                </List>,
            bottomRight,
        });
    };

    function EventRead (RecdID) {
        console.log(RecdID);
        const formData = {
            "data":{
                "Notifications":RecdID
                }
        }
        var config = {        
            formName : "Notification_Event_Listener", 
            data : formData 
        }
        ZAPPY.addRecord(config).then((response) => {   
          console.log(response)
        }
      );

      props.dataNotification.map((value,index) =>{
        if(value.ID == RecdID)
        {
           props.dataNotification.splice(index,1);
           setCount(countvar + 1);
           console.log(props.dataNotification);
        }
        })

      };

    return (
        <div>
            <Header theme="light" className="site-layout-background" >
                <div className="Notification">
                    <a className="badgec" onClick={showDrawer}  >
                        <Badge count={props.dataNotification.length}>
                            <NotificationOutlined style={{ fontSize: '20px' }} />
                        </Badge>
                    </a>
                </div>
                <img className="logo" height="40px" src={props.datalogo}></img>
            </Header>
            <Drawer
                title="Notification"
                width="350"
                placement="right"
                closable={true}
                onClose={onClose}
                visible={visible}
            >
                <List>
                    {
                        props.dataNotification.map((Value,index) => {
                            return(
                            <List.Item key={index+1}>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar src="https://image.flaticon.com/icons/svg/847/847969.svg" />
                                    }
                                    title={<a href="">{Value.Client.display_value}</a>}
                                    description={Value.Description}
                                />
                                <div className="read-butn" onClick={() => {EventRead(Value.ID)}}>Read</div>
                            </List.Item>
                            )
                        })
                    }
                </List>
            </Drawer>
            <Drawer
                title="Tickets"
                width="900"
                pas
                placement="right"
                closable={true}
                onClose={onClosem}
                visible={visiblem}
            >
             <Iframe height='100%' width='100%' frameborder='0' src={"https://app.zohocreator.com/zappyworks/pub-hub/report-embed/All_Tickets"}></Iframe>
            </Drawer>
        </div>
    )
}

