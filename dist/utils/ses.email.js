"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const aws_sdk_1 = require("aws-sdk");
const sendEmail = async (sender, recipient, otp) => {
    // config.update({
    //     region: "eu-north-1",
    //     accessKeyId: "AKIAYS2NSOQKKDLZ72AV",
    //     secretAccessKey: "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",
    // })
    const ses = new aws_sdk_1.SES({
        apiVersion: "2010-12-01",
        region: "eu-north-1",
        credentials: {
            accessKeyId: "AKIAYS2NSOQKKDLZ72AV",
            secretAccessKey: "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",
        }
    });
    const params = {
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
    };
    ses.sendEmail(params, (err, data) => {
        if (err)
            console.log(err, err.stack);
        else
            console.log(data);
    });
};
exports.sendEmail = sendEmail;
