import React,{ useState, useEffect } from 'react';
import { Card,Input,Typography,Row, Col  } from 'antd';
import {HashRouter as Router,Switch,Route,Link} from "react-router-dom";
import { AudioOutlined,MailOutlined,PhoneOutlined,HomeOutlined } from '@ant-design/icons';
import "./cardreport-styles.css"

const { Search } = Input;
const { Paragraph } = Typography;

export default function CardReport() {

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );
  


  const [Pubdetails, SetPubdetails] = useState([]);
  useEffect(() => {
    $(document).ready(()=>{
        const GetAllPubDetailsConfig = {
            reportName : "All_Pub_Details"
        }
        ZAPPY.getAllRecords(GetAllPubDetailsConfig).then((response) => {
            // console.log(response)
            SetPubdetails(response.data)
        }
        );
    })
  },[]);

  

  function handleChange(e) {
    // console.log(e.target.value);
    const searchvar = e.target.value;
    const searchCriteria = { 
      reportName : "All_Pub_Details", 
      criteria : '(Pub.contains("'+searchvar+'"))'
    }
    

    ZAPPY.getAllRecords(searchCriteria).then((response) => {
      if (response.code == 3000) {
        SetPubdetails(response.data)
      }
      else{
        SetPubdetails([])
        console.log(response);
      }
      }
    )
    .catch(function(error)
            {
        console.log("error");
        SetPubdetails([])
	        }); 
  }

  return (
    <div className="mainreport" >
      <div className="site-card-border-less-wrapper">
        <Row >
          <Col md={6} >
            <Search placeholder="search pub" onChange={handleChange}  enterButton />
            </Col>
        </Row>
        <Row gutter={[8, 16]}>
            {
              Pubdetails.map((value, index) => {
                  return(
                    <Col span={6} key={index} >
                      <Link to={"/pub/"+value.ID}>
                      <Card title={value.Pub + " - "+value.Pub_Code} bordered={false} style={{ width: 300 }}>
                      <p><MailOutlined />{value.Email}</p>
                      <p><PhoneOutlined />{value.Phone_Number}</p>
                      <Paragraph ellipsis={{ rows: 3, expandable: false }}><HomeOutlined />{value.Address.display_value}</Paragraph>
                    </Card>
                    </Link>
                  </Col>
                  )
                })
            }
        </Row>
      </div>
    </div>
  )
}

