"use server"

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";
import { use } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY ;

export const tokenProvider = async()=>{
    const user  = await currentUser();
    if(!user) throw new Error('User not logged in');
    if(!apiKey) throw new Error('NO API KEY');
    if(!apiSecret) throw new Error('NO API Secret');

    const client = new StreamClient(apiKey,apiSecret);

    const exp = Math.round(new Date().getTime()/1000)+60*60;
    const issue = Math.floor(Date.now()/1000)-60;
    const token = client.generateUserToken({user_id: user.id , exp: exp ,iat: issue});
    return token;
}