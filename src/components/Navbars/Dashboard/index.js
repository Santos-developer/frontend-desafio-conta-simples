import { Link } from "react-router-dom";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Toggle,
  ToggleLine,
  NavbarMenu,
  NavItem,
  NavLink,
  NavbarProfile,
  Icons,
  Wrapper,
  Content,
  Notification,
  NotificationDropDown,
  Picture,
  PictureDropdown,
  IconBadge
} from "./styles";

import { connect } from "react-redux";

import { ReactComponent as Logo } from "assets/images/logo-conta-simples.svg";

import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeUser } from "store/actions";

const RenderLinks = ({ onLinkClick, routes }) => {
  return routes.map((route, index) => {
    if (route.inNavbar) {
      return (
        <NavItem key={index}>
          <NavLink
            to={route.layout + route.path}
            onClick={onLinkClick}
          >
            {route.name}
          </NavLink>
        </NavItem>
      );
    } else {
      return false;
    }
  });
};

const DashboardNavbar = ({ routes, user, removeUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const onLinkClick = () => isOpen && setIsOpen(false);
  const signOut = () => {
    removeUser();
    window.localStorage.removeItem("token");
  };

  return (
    <Navbar>
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <Toggle onClick={toggle}>
        <ToggleLine />
        <ToggleLine />
        <ToggleLine />
      </Toggle>
      <NavbarMenu isOpen={isOpen}>
        <RenderLinks onLinkClick={onLinkClick} routes={routes} />
      </NavbarMenu>

      <NavbarProfile>
        <Icons>
          <Notification>
            {!!user.notifications.length && (
              <IconBadge>{user.notifications.length}</IconBadge>
            )}
            <FontAwesomeIcon size="1x" icon={faBell} />
            <NotificationDropDown>
              <ul>
                {user.notifications.map((notification, index) => (
                  <li key={index}>
                    <Link to="/">{notification.message}</Link>
                  </li>
                ))}
              </ul>
            </NotificationDropDown>
          </Notification>
        </Icons>
        <Wrapper>
          <Picture>
            <img src={user.picture} alt="..." />
            <PictureDropdown>
              <ul>
                <li onClick={signOut}>Sair</li>
              </ul>
            </PictureDropdown>
          </Picture>
          <Content>
            <h5>{user.name}</h5>
            <p>
              Conta <strong>{user.digit}</strong> Agéncia{" "}
              <strong>{user.agency}</strong>
            </p>
          </Content>
        </Wrapper>
      </NavbarProfile>
    </Navbar>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  removeUser: () => dispatch(removeUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardNavbar);
