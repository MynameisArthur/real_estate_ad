import React from 'react';
import Estate from '../Estate/Estate';
import {withRouter} from 'react-router-dom';

const EstatesPage = ({data}) => {
    return (
        <>
            {data &&
                data.map((item) => {
                    return <Estate key={item.id} item={item} />;
                })}
        </>
    );
};

export default withRouter(EstatesPage);
