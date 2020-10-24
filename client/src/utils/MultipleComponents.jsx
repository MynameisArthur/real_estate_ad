import React from 'react';

const MultipleComponents = ({WrappedComponent, data, page}) => {
    return (
        <>
            {data &&
                data
                    .slice((page - 1) * 5, page * 5)
                    .map((item) => (
                        <WrappedComponent key={item._id} item={item} />
                    ))}
        </>
    );
};

export default MultipleComponents;
