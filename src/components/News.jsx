import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from 'moment/moment';

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Creptocurrency");
  const { data: cryptoNews } = useGetCryptoNewsQuery({newsCategory: newsCategory, count: simplified ? 6 : 12})
  const { data: cryptosList } = useGetCryptosQuery(100);

  if(!cryptoNews?.value) return <Loader />;

  const demoImage = "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

  return (
    <Row gutter={[ 24, 24 ]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, {children}) => children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Creptocurrency">Creptocurrency</Option>
            {cryptosList?.data?.coins.map(({name}, index) => <Option key={index} value={name}>{name}</Option>)}
          </Select>
        </Col>
      )}
      {cryptoNews?.value.map(({url, name, image, description, provider, datePublished}, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          <Card hoverable className="news-card">
            <a href={url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{name}</Title>
                <img style={{maxWidth: "200px", maxHeight: "100px"}}  src={image?.thumbnail?.contentUrl || demoImage } alt="news" />
              </div>
              <p>
                {description > 100 
                  ? `${description.substring(0, 100)}...`
                  : description
                }
              </p>
              <div className="provider-container">
                <div>
                  <Avatar src={provider[0]?.image?.thumbnail?.contentUrl || demoImage } alt="news" />
                  <Text className="provider-name">{provider[0]?.name}</Text>
                </div>
                  <Text>{moment(datePublished).startOf("ss").fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News
