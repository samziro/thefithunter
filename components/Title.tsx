import React from 'react';

interface TitleProps {
    heading: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ heading }) => {
    return (
        <div className='text-4xl font-bold my-4 text-center text-textSecondary'>
            <h1 className='font-heading'>{heading}</h1>
        </div>
    );
};

export default Title;
