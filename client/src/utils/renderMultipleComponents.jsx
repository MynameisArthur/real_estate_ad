import React from 'react';

export const renderMultipleComponents = (Component, data) => {
    return (
        <>
            {data &&
                data
                    .slice((page - 1) * 5, match.params.page * 5)
                    .map((item) => {
                        return <Component key={item.id} estate={item} />;
                    })}
        </>
    );
};
