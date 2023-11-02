import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import { useGetCryptosQuery,  } from '../services/cryptoApi';



import { Loader } from "./index";

const { Text, Title } = Typography;
const { Panel } = Collapse; 

const Exchanges = () => {
  const { data: cryptosList, isFetching} = useGetCryptosQuery(100);

  if(isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col span={8}>Exchanges</Col>
        <Col span={8}>24h Trade Volume</Col>
        <Col span={8}>Change</Col>
      </Row>
      <Row>
        {cryptosList?.data?.coins.map((exchange, index) => (
          <Col span={24} key={index}>
            <Collapse >
              <Panel 
                key={exchange.uuid}
                showArrow={false}
                header={(
                  <Row key={exchange.uuid}>
                    <Col span={8}>
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={8}>${millify(exchange?.["24hVolume"])}</Col>
                    <Col span={8}>{millify(exchange.change)}%</Col>
                  </Row>
                  )}
              >
                <>
                    <Row>
                      <Col span={8}>
                        <Title level={3}>Price: {millify(+exchange.price)} USD</Title> 
                      </Col>
                      <Col span={8}>
                        <Title level={3}>Market Capitalization: {millify(+exchange.marketCap)} USD</Title> 
                      </Col>
                      <Col span={8}>
                      <Title level={3} className="show-more"><a href={exchange.coinrankingUrl} className="link">More Info</a> </Title>
                      </Col>
                    </Row>
                  </>
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Exchanges
