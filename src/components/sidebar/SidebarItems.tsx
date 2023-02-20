import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ItemsList,
  ItemContainer,
  ItemWrapper,
  ItemName,
} from "./SidebarStyles";

import * as FaIcons from 'react-icons/fa' 

const SIDEBAR_DATA = [
    {
      id: 1,
      name: "dashboards",
      path: "dashboards",
      icon: <FaIcons.FaAccusoft />,
    },
    {
      id: 2,
      name: "layouts",
      path: "layouts",
      icon: <FaIcons.FaLayerGroup />,
    },
    {
      id: 3,
      name: "calendar",
      path: "calendar",
      icon: <FaIcons.FaCalendar />,
    },
    {
      id: 4,
      name: "invoice",
      path: "invoice",
      icon: <FaIcons.FaFileInvoiceDollar />,
    },
    {
      id: 5,
      name: "users",
      path: "users",
      icon: <FaIcons.FaUser />,
    },
    {
      id: 6,
      name: "roles & permissions",
      path: "roles",
      icon: <FaIcons.FaCriticalRole />,
    },
    {
      id: 7,
      name: "pages",
      path: "pages",
      icon: <FaIcons.FaPager />,
    },
    {
      id: 8,
      name: "authentication",
      path: "authentication",
      icon: <FaIcons.FaCertificate />,
    },
    {
      id: 9,
      name: "wizard examples",
      path: "wizard",
      icon: <FaIcons.FaHatWizard />,
    },
    {
      id: 10,
      name: "modal examples",
      path: "modal",
      icon: <FaIcons.FaMoon />,
    },
  ];

interface ISidebarItemsProps {
    displaySidebar: boolean;
}

export const SidebarItems = (props: ISidebarItemsProps) => {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <ItemsList>
      {SIDEBAR_DATA.map((itemData, index) => (
        <ItemContainer
          key={index}
          onClick={() => setActiveItem(itemData.id)}
          className={itemData.id === activeItem ? "active" : ""}
        >
          <Link to={itemData.path}>
            <ItemWrapper>
              {itemData.icon}
              <ItemName displaySidebar={props.displaySidebar}>
                {itemData.name}
              </ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
      ))}
    </ItemsList>
  );
};

export default SidebarItems;