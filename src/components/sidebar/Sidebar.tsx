import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';

import * as FaIcons from 'react-icons/fa' 

import { PagesData } from '../../pages/pagesconfig/PagesData';

// The bar on the top of the page
const Navbar = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    height: 3.5rem;
    background-color: #ddd;
    z-index: 9;
`

const MenuIconOpen = styled(Link)`
    display: flex;
    justify-content: start;
    font-size: 1.5rem;
    margin-left: 2rem;
    color: #000000;
    z-index: 9;
`

const MenuIconClose = styled(Link)`
    display: flex;
    justify-content: end;
    font-size: 1.5rem;
    margin-top: 0.75rem;
    margin-right: 1rem;
    color: #000000;
    z-index: 9;
`

// The side bar that opens on pressing burger menu
const SidebarMenu = styled.div<{close: boolean}>`
    width: 250px;
    height: 100vh;
    background-color: #ddd;
    position: fixed;
    top: 0;
    left: ${({ close }) => close ? '0' : '-100%'};
    transition: .6s;
    z-index: 9;
    padding-left: 10px;
    padding-right: 10px;
`

const MenuItems = styled.li`
    list-style: none;
    margin-top: 0.5rem;
    width: 94%;
    padding: 0.5rem 3% 0.25rem;
    border-radius: 0.2rem;
    cursor: pointer;
    &:hover {
        background: #eaeced;
    }
    &.active {
        background-color: #dbe4f3;
    }
`;

const MenuItemLinks = styled(Link)`
    text-decoration: none;
    color: #000000;
`

const Sidebar: React.FunctionComponent = () => {
    const [close, setClose] = useState(false)
    const showSidebar = () => setClose(!close)
    return (
        <>
            <Navbar>
                <MenuIconOpen to="#" onClick={showSidebar}>
                    <FaIcons.FaBars />
                </MenuIconOpen>
            </Navbar>

            <SidebarMenu close={close}>
                <MenuIconClose to="#" onClick={showSidebar}>
                    <FaIcons.FaTimes />
                </MenuIconClose>

                {PagesData.map((item, index) => {
                    return (
                        <MenuItems key={index}>
                            <MenuItemLinks to={item.path}>
                                {item.icon}
                                <span style={{marginLeft: '16px'}}>{item.title}</span>
                            </MenuItemLinks>
                        </MenuItems>
                    )
                })}
            </SidebarMenu>
        </>
    )
}

export default Sidebar