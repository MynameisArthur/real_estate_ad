import React from 'react';
import {withRouter} from 'react-router-dom';
import UserOffer from './UserOffer';
import MultipleComponents from '../../utils/MultipleComponents';

const OffersPage = ({data, match}) => {
    const {page} = match.params;
    return (
        <>
            {
                <MultipleComponents
                    WrappedComponent={UserOffer}
                    data={data}
                    page={page}
                />
            }
        </>
    );
};

export default withRouter(OffersPage);
