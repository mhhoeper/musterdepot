// Taken from https://dev.to/jealousgx/build-a-responsive-sidebar-with-react-and-styled-components-4e9e
// in order to upgrade own simple sidebar

import React, { useState } from "react";

import {
  Children,
  SidebarContainer,
  SidebarWrapper,
  SidebarLogoWrapper,
  SidebarLogo,
  SidebarBrand,
  SidebarToggler,
} from "./SidebarStyles";

import { SidebarItems } from "./SidebarItems";

const MOBILE_VIEW = window.innerWidth < 468;

interface ISidebar2Props {
    children: any;
}

export default function Sidebar2(props: ISidebar2Props) {
  const [displaySidebar, setDisplaySidebar] = useState( (!MOBILE_VIEW) as boolean);

  const handleSidebarDisplay = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (window.innerWidth > 468) {
      setDisplaySidebar(!displaySidebar);
    } else {
      setDisplaySidebar(false);
    }
  };

  return (
    <React.Fragment>
      <SidebarContainer displaySidebar={displaySidebar}>
        <SidebarWrapper>
          <SidebarLogoWrapper displaySidebar={displaySidebar}>
            <SidebarLogo href="#">
              <span className="app-brand-logo demo">
                o
              </span>
              <SidebarBrand
                displaySidebar={displaySidebar}
                className="app__brand__text"
              >
                Frest
              </SidebarBrand>
            </SidebarLogo>
            <SidebarToggler
              displaySidebar={displaySidebar}
              onClick={handleSidebarDisplay}
            >
              <div className="outer__circle">
                <div className="inner__circle" />
              </div>
            </SidebarToggler>
          </SidebarLogoWrapper>
          <SidebarItems displaySidebar={displaySidebar} />
        </SidebarWrapper>
      </SidebarContainer>
      <Children displaySidebar={displaySidebar}>{props.children}</Children>
    </React.Fragment>
  );
}