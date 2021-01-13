const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });

const jwtDecode = require('jwt-decode');
const util = require('./util.js');

const cognitoidentity = new AWS.CognitoIdentity();
const identityPoolId = process.env.COGNITO_IDENTITY_POOL_ID;

exports.handler = async (event) => {
    try {
        let id_token = util.getIdToken(event.headers);

        let params = {
            IdentityPoolId: identityPoolId,
            Logins: {
                'accounts.google.com': id_token
            }
        };

        let data = await cognitoidentity.getId(params).promise();

        params = {
            IdentityId: data.IdentityId,
            Logins: {
                'accounts.google.com': id_token
            }
        };

        data = await cognitoidentity.getCredentialsForIdentity(params).promise();
        let decoded = jwtDecode(id_token);
        data.user_name = decoded.name;

        return {
            statusCode: 200,
            headers: util.getResponseHeaders(),
            body: JSON.stringify(data)
        };
    } catch (err) {
        console.log("Error", err);
        return {
            statusCode: err.statusCode ? err.statusCode : 500,
            headers: util.getResponseHeaders(),
            body: JSON.stringify({
                error: err.name ? err.name : "Exception",
                message: err.message ? err.message : "Unknown error"
            })
        };
    }
}