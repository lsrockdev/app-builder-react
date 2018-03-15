import React from 'react'
import { NavLink } from 'react-router-dom'
import './styles.scss'

const helpButton = (props) => (
        <button className="helpButton">
          <NavLink to={props.link}>?</NavLink>
        </button>
      );

export default helpButton;
