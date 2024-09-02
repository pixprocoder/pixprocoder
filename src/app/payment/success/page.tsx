"use client"
import React, {useContext} from 'react';
import {TransactionContext} from "@/src/providers/OtherProviders";

const SuccessPage = () => {
    const {transactionId} = useContext(TransactionContext)
    return (
        <div>
            <p className="text-white text-center">Success!</p>
            <p className="text-white text-center">Your Transaction id is <span className="text-green-400">{transactionId}</span></p>
        </div>
    );
};

export default SuccessPage;