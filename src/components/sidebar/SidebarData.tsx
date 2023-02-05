import React from 'react'
import * as FaIcons from 'react-icons/fa'  // see https://react-icons.github.io/react-icons/icons?name=fa

export const SidebarData = [
    {
        title: 'Desktop Ansicht',
        path: '/musterdepot',
        icon: <FaIcons.FaDesktop />
    },
    {
        title: 'Mobile Depot',
        path: '/musterdepot/mobiledepot',
        icon: <FaIcons.FaDollarSign />
    },
    {
        title: 'Settings',
        path: '/musterdepot/settings',
        icon: <FaIcons.FaRegSun />
    },
]