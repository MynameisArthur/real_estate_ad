import React from 'react';
import Estate from '../Estate/Estate';
import {withRouter} from 'react-router-dom';
import MultipleComponents from '../../utils/MultipleComponents';

const UserEstatesPage = ({data, match}) => {
    const {page} = match.params;
    return (
        <>
            <MultipleComponents
                WrappedComponent={Estate}
                data={data}
                page={page}
            />
        </>
    );
};

export default withRouter(UserEstatesPage);
