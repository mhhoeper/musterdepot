import React from 'react'
import * as FaIcons from 'react-icons/fa'  // see https://react-icons.github.io/react-icons/icons?name=fa

// The different pages
import MyResponsiveGrid from "../../MyResponsiveGrid";
import MobileDepot from "../../pages/MobileDepot";
import ConfigureDesktop from "../../pages/configuredesktop/ConfigureDesktop";
import SettingsPanel from "../../SettingsPanel";

export const PagesData = [
    {
        path: '/',
        title: 'Example',
        icon: <FaIcons.FaDesktop />,
        content: <MyResponsiveGrid />
    },
    {
        path: '/configuredesktop',
        title: 'Desktop Ansicht',
        icon: <FaIcons.FaDesktop />,
        content: <ConfigureDesktop />
    },    
    {
        path: '/newdesktop',
        level: 2,
        title: 'Neuer Desktop',
        icon: <FaIcons.FaPlus />,
        content: <div />
    },
    {
        path: '/mobildepot',
        title: 'Mobile Depot',
        icon: <FaIcons.FaDollarSign />,
        content: <MobileDepot />
    },
    {
        path: '/settings',
        title: 'Settings',
        icon: <FaIcons.FaRegSun />,
        content: <SettingsPanel />
    }
]