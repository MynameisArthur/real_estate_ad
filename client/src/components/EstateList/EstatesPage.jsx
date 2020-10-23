import React from 'react';
import Estate from '../Estate/Estate';
import {withRouter} from 'react-router-dom';

const EstatesPage = ({data, match}) => {
    const {page} = match.params;
    return (
        <>
            {data &&
                data
                    .slice((page - 1) * 5, match.params.page * 5)
                    .map((item) => {
                        return <Estate key={item.id} estate={item} />;
                    })}
        </>
    );
};

export default withRouter(EstatesPage);
