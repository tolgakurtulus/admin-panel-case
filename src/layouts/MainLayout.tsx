// Ana layout bileşeni (sidebar + header + content) - Main layout component (sidebar + header + content)
import { Layout, Menu, Button, theme, Drawer, Grid } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, SunOutlined, MoonOutlined } from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "@/theme/useTheme";

const { Header, Content, Sider } = Layout;
const { useToken } = theme;
const { useBreakpoint } = Grid;

export function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, toggleTheme } = useTheme();
  const { token } = useToken();
  const screens = useBreakpoint();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = !screens.lg; // Mobil kontrolü - Detects mobile screen

  // Menü tanımları - Navigation menu items
  const menuItems = [
    { key: "/", label: "Users", onClick: () => navigate("/") },
    { key: "/products", label: "Products", onClick: () => navigate("/products") },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!isMobile && (
        <Sider
          collapsible
          collapsed={collapsed}
          trigger={null}
          width={220}
          style={{
            background: token.colorBgContainer,
          }}>
          <div
            style={{
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              color: token.colorTextHeading,
            }}>
            {collapsed ? "AP" : "Admin Panel"}
          </div>

          <Menu theme={mode === "dark" ? "dark" : "light"} mode='inline' selectedKeys={[location.pathname]} items={menuItems} />
        </Sider>
      )}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement='left'
        width={220}
        bodyStyle={{
          padding: 0,
          background: token.colorBgContainer,
        }}>
        <Menu theme={mode === "dark" ? "dark" : "light"} mode='inline' selectedKeys={[location.pathname]} items={menuItems} onClick={() => setDrawerOpen(false)} />
      </Drawer>
      <Layout>
        <Header
          style={{
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: token.colorBgContainer,
          }}>
          <Button
            type='text'
            icon={isMobile ? <MenuUnfoldOutlined /> : collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => (isMobile ? setDrawerOpen(true) : setCollapsed(!collapsed))}
          />
          <Button type='text' onClick={toggleTheme} icon={mode === "dark" ? <SunOutlined style={{ color: "#fadb14" }} /> : <MoonOutlined style={{ color: "#1677ff" }} />} />
        </Header>
        <Content
          style={{
            padding: isMobile ? 12 : 24,
            background: token.colorBgLayout,
          }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
