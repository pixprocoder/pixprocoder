"use client"
import React, {useContext} from 'react';
import {TransactionContext} from "@/src/providers/OtherProviders";
import {Button} from "@/src/components/ui/button";
import Link from "next/link";

const SuccessPage = () => {
    const {transactionId} = useContext(TransactionContext)
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <p className="text-white text-center">Success!</p>
            <p className="text-white text-center my-2">Your Transaction id is <span className="text-green-400">{transactionId}</span></p>
            <Button className="text-purple-500" variant="link"><Link href="/">Back to Home</Link></Button>
        </div>
    );
};

export default SuccessPage;