# Serverless Take Notes Backend

This project is a basic taking notes backend in Serverless Architecture built with serverless framework.\n 
It requires an AWS account and contains API Gateway, DynamoDB and AWS Lambda. It coded in the Visual Studio Code.

For the creating a project with serverless framework you should do the command in below in the terminal;
sls create -t aws-nodejs -p project_name
npm init -y
npm install --save aws-sdk library_name
Commands are using for the creating a project that uses serverless framework addition to that it creates a serverless.yml file in our project.

Integrating project to DynamoDb, first we should create a table in serverless.yml;
provider:
  .
  .
  environment:
    NOTES_TABLE: ${self:service}-${opt:stage, self:provider.stage}
    
resources:
  Resources:
    NotesTable:
      Type: AWS::DynamoDB::Table
      DeletionPolicy: Retain
      Properties:
        .
        . //Table attributes
        .
And then functions (lambda handlers) added in the serverless.yml file for the integrating with AWS Lambda.
Fuctions have to integrate with dynamoDb table for the do this iamRoleStatements defined in the provider in serverless.yml file;
provider:
  .
  .
  iamRoleStatements:
      - Effect: Allow
        Action: 
          - dynamodb:Query
          - dynamodb:PutItem
          - dynamodb:DeleteItem
        Resource: "arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self:provider.environment.NOTES_TABLE}"
        
For the API Gateway integration in the functions section in serverless.yml, we have to defined cors headers. This provides the connection between project API and Lambda handler functions. Under functions and under cors section, defined origin and headers. For the identication we have to defined custom section in tge serverless.yml;
custom;
  allowedHeaders:
    - Accept
    - Content-Type
    - Content-Length
    - Authorization
    - X-Amz-Date
    - X-Api-Key
    - X-Amz-Security-Token
    - X-Amz-User-Agent
    - app_user_id
    - app_user_name
    
At the end all the required elements for AWS Serverless Architecture are defined by the serverless.yml.
You can test the API locally with serverless offline command in terminal and you can send the delete, get, post, put, update requests from using Postman. It will do changes in the DynamoDb table locally.  
