import React from 'react';
import {NavLink} from 'react-router-dom';

export const generatePageLinks = ({count, to,limit=10}) => {
    let num = Math.ceil(count / limit);
    let array = [];
    for (let i = 0; i < num; i++) {
        array.push(i + 1);
    }
    return array.map((item) => (
        <NavLink
            to={`/${to}/${item}`}
            className='pagination-item'
            key={`page-${item}`}
            activeClassName='selected'
        >
            {item}
        </NavLink>
    ));
};
