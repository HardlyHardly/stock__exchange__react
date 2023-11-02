import React,  { useState, useEffect } from 'react'
import { Button, Menu, Typography, Avatar } from "antd";
import { Link, useHistory } from "react-router-dom";
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
import icon from '../assets/cryptocurrency.png';


const Navbar = () => {
  const [activeMenu, setActiveMenu ] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize)

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    screenSize < 786
      ? setActiveMenu(false)
      : setActiveMenu(true)
  }, [screenSize])

  const history = useHistory();

  const onSelectMenu = (item) => {
    history.push(item.key);
  }

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: "Home",
    },
    {
      key: "/cryptocurrencies",
      icon: <FundOutlined />,
      label: "Cryptocurrencies"
    },
    {
      key: "/exchanges",
      icon: <MoneyCollectOutlined />,
      label: "Exchanges"
    },
    {
      key: "/news",
      icon: <BulbOutlined />,
      label: "News"
    }
  ]

  return (
    <div className='nav-container'>
      <div className="logo-container">
        <Avatar src={icon} size='large' />
        <Typography.Title level={2} className="logo">
          <Link to="/">Cryptoverse</Link>
        </Typography.Title>
        <Button  className="menu-control-container" onClick={() => setActiveMenu(true)}>
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu theme="dark" items={menuItems} onClick={onSelectMenu} />
      )}
    </div>
  )
}

export default Navbar
