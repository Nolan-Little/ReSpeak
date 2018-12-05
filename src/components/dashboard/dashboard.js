import React, { Component } from 'react'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';


export default class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 className="text-center">Im a dashboard</h1>
        <SideNav
          onSelect={(selected) => {
            // Add your code here
          }}
        >
          <SideNav.Toggle />
          <SideNav.Nav>
            {
              this.props.collections.map((col) => {
                return (
                  <NavItem key={col.id} eventKey={col.title}>
                  <NavIcon>
                    <i className="fa fa-fw" style={{ fontSize: '1.75em' }} />
                  </NavIcon>
                  <NavText>
                    {col.title}
                  </NavText>
                </NavItem>
                )
              })

            }
          </SideNav.Nav>
        </SideNav>
      </React.Fragment>
    )
  }
}