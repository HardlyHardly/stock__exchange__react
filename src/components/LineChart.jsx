import React from 'react';
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import { CategoryScale, Chart as  ChartJS, LineElement, LinearScale, PointElement } from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

const { Title } = Typography;

const LineChart = ({coinHistory, currentPrice, coinName}) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for(let i = 0; i < coinHistory?.data?.history?.length; i ++){
    const item = coinHistory?.data?.history[i];
    coinPrice.push(item?.price);
    const [curPriceDate, curPriceTime ] = new Date(Date.now() - item?.timestamp + 20 * 24 * 60 * 60 * 1000 - 8 * 60 * 60 * 1000 - 17 * 60 * 1000).toISOString().split("T")
    coinTimestamp.push([curPriceDate, curPriceTime.split('.')[0]]);
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundCollor: "#0071bd",
        borderColor: "#0071bd"
      },
    ],
  };

  const options =  {
    scales: {
      x: {
        beginAtZero: true
      }
    }
  }
  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart</Title>
        <Col className="price-container">
          <Title level={5} className="price-change" style={coinHistory?.data?.change > 0 ? {color: "green"} : {color: "red"}}>{coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
      <Line data={data} options={options} />

    </>
  )
}

export default LineChart
