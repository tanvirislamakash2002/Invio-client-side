"use client"
import React, { useEffect } from 'react';

const ShopError = ({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) => {
    useEffect(() => {
        console.error(error);
    })
    return (
        <div>
            This is an Error page
            <button onClick={() => unstable_retry()}>reset</button>
        </div>
    );
};

export default ShopError;