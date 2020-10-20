import React from 'react';
import Estate from '../Estate/Estate';
const EstatesPage = ({data}) => {
    return (
        <>
            {data &&
                data.map((item) => {
                return <Estate key={item.id} estate={item} />;
            })}
        </>
    )
}

export default EstatesPage;
