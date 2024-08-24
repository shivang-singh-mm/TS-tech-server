import { SES, AWSError, config } from "aws-sdk";
import { SendEmailRequest, SendEmailResponse } from 'aws-sdk/clients/ses';

export const sendEmail = async (sender: any, recipient: any, otp: any) => {
    // config.update({
    //     region: "eu-north-1",
    //     accessKeyId: "AKIAYS2NSOQKKDLZ72AV",
    //     secretAccessKey: "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",
    // })
    const ses = new SES({
        apiVersion: "2010-12-01",
        region: "eu-north-1",
        credentials: {
            accessKeyId: "AKIAYS2NSOQKKDLZ72AV",
            secretAccessKey: "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",
        }
    });

    const params: any = {
        Source: "shivangsingh2240@gmail.com",
        Destination: {
            ToAddresses: ["shivangbrikbond@gmail.com"]
        },
        Message: {
            Subject: {
                Data: 'Sending Otp',
                Charset: 'utf-8'
            },
            Body: {
                Text: {
                    Data: `Your OTP is ${otp}`,
                    Charset: 'utf-8'
                },
                // Html: {
                //     Data: html,
                //     Charset: 'utf-8'
                // }
            }
        }
    }

    ses.sendEmail(params, (err: AWSError, data: SendEmailResponse) => {
        if (err) console.log(err, err.stack);
        else console.log(data);
    });
}