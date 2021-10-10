import React, { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { ChevronDoubleLeft } from 'react-bootstrap-icons';
import { useCookies } from 'react-cookie';
import './Sidebar.scss'
import DefaultAvatar from '../../asset/default-avatar.png';
import { FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '../..//store/hooks';
import { setSidebarStatus } from '../../store/slices/uiSlice';

const SideBar: FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const [cookies, setCookie] = useCookies(['user']);
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');

  let isLoggedIn = cookies.hasOwnProperty('user');

  useEffect(() => {
    // if the user is logged in
    if (isLoggedIn) {
      setName(cookies.user.name);
      setPicture(cookies.user.picture);
    }
  })

  let toggleMenu = () => {
    dispatch(setSidebarStatus(false));
  }

  return (
    <div className='sidebar'>
      {/* Close Button */}
      <div className='sidebar-close'>
        <ChevronDoubleLeft className='sidebar-close-icon' onClick={toggleMenu} />
      </div>

      {/* Profile Icon and Name */}
      <div className='sidebar-profile'>
        <img src={picture ? picture : DefaultAvatar} />
        <p>
          {name ? name : 'Anonymous Peter'}
        </p>
      </div>

      {/* Links */}
      <div className='sidebar-links'>
        <ul>
          <li><NavLink to='/search/courses' activeClassName='sidebar-active'>
            <div>
              <Icon name='list alternate outline' />
            </div>
            Catalogue
          </NavLink></li>
          {/* <li><NavLink to='/schedule' activeClassName='sidebar-active'>
          <div> 
            <Icon name='clock outline' />
          </div>
          Schedule of Classes
        </NavLink></li> */}
          {/* <li><NavLink to='/zotistics' activeClassName='sidebar-active'>
          <div> 
            <Icon name='chart bar outline' />
          </div>
          Zotistics
        </NavLink></li> */}
          {/* <li><NavLink to='/antalmanac' activeClassName='sidebar-active'>
          <div> 
            <Icon name='calendar outline' />
          </div>
          AntAlmanac
        </NavLink></li> */}
          <li><NavLink to='/roadmap' activeClassName='sidebar-active'>
            <div>
              <Icon name='map outline' />
            </div>
            Peter's Roadmap
          </NavLink></li>
          {/* <li><NavLink to='/reviews' activeClassName='sidebar-active'>
          <div> 
            <Icon name='thumbs up outline'/>
          </div>
          Reviews
        </NavLink></li> */}
        </ul>
      </div>

      {/* Login/Logout */}
      <div className='sidebar-login'>
        {isLoggedIn && <Button variant='light'>
          <FaSignOutAlt className='sidebar-login-icon' />
          <a href='/users/logout'>
            Log Out
          </a>
        </Button>}
        {!isLoggedIn && <Button variant='light'>
          <FaSignInAlt className='sidebar-login-icon' />
          <a href='/users/auth/google'>
            Log In
          </a>
        </Button>}
      </div>
    </div>
  )
}

export default SideBar;