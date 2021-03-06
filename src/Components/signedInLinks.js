import React, { Component } from 'react';
import './../App.css';
import Popup from './signinpopup.js'
import SignIn from './signin.js'
import { BrowserRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';
import Media from 'react-media';
import { Section, bodyTextStyle } from './Section.js'
import styled, { css } from '@emotion/styled'
import Firebase, { FirebaseContext, withFirebase} from './../Firebase'
import menu from './../img/menu.svg'

const DesktopNav = styled.nav`
    font-family: 'Avenir Next', sans-serif;
    z-index: 1;
    position: fixed;
`;

const DesktopLogo = styled.a`
    font-family: 'Roboto', sans-serif;
    font-size: 2em;
    color: black;
    float: left;
    margin-left: 0.5%;
    margin-right: 2%;
    &:hover {
        color: grey;
    }
`;

const DesktopHeader = styled.header`
    width: 100%;
    height: 40px;
    position: fixed;
    background-color: lightcoral;
`;

const DesktopNavLink = styled.a`
    color: black;
    font-size: 1.2em;
    float: left;
    margin-left: 3%;
    margin-top: 10px;
    text-decoration: none;
    cursor: pointer;
    &:hover{
        color: grey;
    }
`;

const DesktopSignInLink = styled.a`
    color: black;
    font-size: 1.2em;
    float: right;
    margin-right: 4%;
    margin-top: 10px;
    text-decoration: none;
    cursor: pointer;
    &:hover{
        color: grey;
    }
`;

const DesktopDropdown = styled.div`
    position: fixed;
    float: left;
    margin-left: -2%;
    margin-top: 0.1%;
    padding: 1%;
    width: 100px;
    text-align: center;
    background-color: #eeeeee;
    opacity: 0.9;
	  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
`;

const DesktopDropdownLink = styled.a`
    text-align: center;
    color: black;
    font-weight: 400;
    font-size: 0.8em;
    &:hover {
        cursor: pointer;
        font-style: italic;
    }
`;

const HamburgerMenu = styled.img`
  width: 20px;
`;

const DesktopDashboard = styled.a`
    color: black;
    font-weight: 600;
    font-size: 1.2em;
    float: right;
    margin-right: 4%;
    margin-top: 10px;
    text-decoration: none;
    cursor: pointer;
    &:hover{
        color: grey;
    }
`;

const MobileDashboard = styled.a`
    color: black;
    font-size: 1.2em;
    float: right;
    margin-right: 10%;
    margin-top: 10px;
    text-decoration: none;
    cursor: pointer;
    &:hover{
        color: grey;
    }
`;

const DesktopDashDropdown = styled.div`
    position: fixed;
    float: left;
    margin-left: -1.3%;
    padding: 1%;
    width: 100px;
    text-align: center;
    background-color: #eeeeee;
    opacity: 0.9;
	  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
`;

class SignedInLinks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
            dashHidden: true
        };
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.firebase
            .doSignOut()
            .then(() => {
                this.setState({
                    user: null
                });
            window.location.href = "/";
            });
    };

    handleOpenCloseDropdown() {
        this.setState({
            hidden: !this.state.hidden,
        });
    };
    handleOpenCloseDashboard() {
        this.setState({
            dashHidden: !this.state.dashHidden,
        });
    };
    openPopup = () => {
        this.setState({
            isOpen: true
        });
    };

    closePopup = () => {
        this.setState({
            isOpen: false
        });
    };

    logout() {
      this.props.firebase
        .doSignOut()
        .then(() => {
          this.setState({
            user: null
          });
          this.props.history.push("/");
        });
    }

    render() {
        const { hidden } = this.state;
        const { dashHidden } = this.state;
        const { isOpen } = this.state;
        const SignedInHeaderDesktop = (
            <DesktopNav>
                <DesktopHeader>
                    <DesktopLogo href="/">bxr</DesktopLogo>
                    <DesktopNavLink href="/about">About</DesktopNavLink>
                    <DesktopNavLink onMouseOver={() => this.handleOpenCloseDropdown()} onMouseOut={() => this.handleOpenCloseDropdown()}>Benefits
                        <DesktopDropdown hidden={hidden}>
                            <DesktopDropdownLink href="/brands">For Brands</DesktopDropdownLink><br/><hr style={{border: '1px solid black'}}/>
                            <DesktopDropdownLink href="/hosts">For Hosts</DesktopDropdownLink><br/><hr style={{border: '1px solid black'}}/>
                            <DesktopDropdownLink href="/products">For Renters</DesktopDropdownLink><br/>
                        </DesktopDropdown>
                    </DesktopNavLink>
                    <DesktopNavLink href="/products"> Products </DesktopNavLink>
                    <DesktopDashboard onMouseOver={() => this.handleOpenCloseDashboard()} onMouseOut={() => this.handleOpenCloseDashboard()}>Dashboard
                        <DesktopDashDropdown hidden={dashHidden}>
                            <DesktopDropdownLink href="/profile">My Account</DesktopDropdownLink><br/><hr style={{border: '1px solid black'}}/>
                            <DesktopDropdownLink href="/myproducts">My Products</DesktopDropdownLink><br/><hr style={{border: '1px solid black'}}/>
                            <DesktopDropdownLink onClick={this.logout}>Sign Out</DesktopDropdownLink><br/>
                        </DesktopDashDropdown>
                    </DesktopDashboard>
                </DesktopHeader>
            </DesktopNav>
        );

        const SignedInHeaderMobile = (
          <DesktopNav>
              <DesktopHeader>
                  <DesktopLogo href="/">bxr</DesktopLogo>
                  <DesktopNavLink onMouseOver={() => this.handleOpenCloseDropdown()} onMouseOut={() => this.handleOpenCloseDropdown()}><HamburgerMenu src={menu} />
                      <DesktopDropdown hidden={hidden}>
                          <DesktopDropdownLink href="/brands">For Brands</DesktopDropdownLink><br/><hr style={{border: '1px solid black'}}/>
                          <DesktopDropdownLink href="/hosts">For Hosts</DesktopDropdownLink><br/><hr style={{border: '1px solid black'}}/>
                          <DesktopDropdownLink href="/profile">For Renters</DesktopDropdownLink><br/><hr style={{border: '1px solid black'}}/>
                          <DesktopDropdownLink href="/about">About</DesktopDropdownLink><br/><hr style={{border: '1px solid black'}}/>
                          <DesktopDropdownLink href="/products">Products</DesktopDropdownLink>
                      </DesktopDropdown>
                  </DesktopNavLink>
                  <MobileDashboard onMouseOver={() => this.handleOpenCloseDashboard()} onMouseOut={() => this.handleOpenCloseDashboard()}>Dashboard
                      <DesktopDashDropdown hidden={dashHidden}>
                          <DesktopDropdownLink href="/profile">My Account</DesktopDropdownLink><br/><hr style={{border: '1px solid black'}}/>
                          <DesktopDropdownLink href="/myproducts">My Products</DesktopDropdownLink><hr style={{border: '1px solid black'}}/>
                          <DesktopDropdownLink onClick={this.logout}>Sign Out</DesktopDropdownLink><br/>
                      </DesktopDashDropdown>
                  </MobileDashboard>
              </DesktopHeader>
          </DesktopNav>
        );

    return (
        <Media query={{ minWidth: 800 }}>
          {matches => (matches ? SignedInHeaderDesktop : SignedInHeaderMobile)}
        </Media>
    );
  }
}

export default withRouter(withFirebase(SignedInLinks));
