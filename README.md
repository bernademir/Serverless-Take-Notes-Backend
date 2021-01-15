# Serverless Take Notes Backend

This project is a basic taking notes backend in Serverless Architecture built with serverless framework.<br>
It requires an AWS account and contains API Gateway, DynamoDB and AWS Lambda. It coded in the Visual Studio Code.<br>
<br>
For the creating a project with serverless framework you should do the command in below in the terminal;<br>
sls create -t aws-nodejs -p project_name<br>
npm init -y<br>
npm install --save aws-sdk library_name<br>
Commands are using for the creating a project that uses serverless framework addition to that it creates a serverless.yml file in our project.<br>
<br>
Integrating project to DynamoDb, first we should create a table in serverless.yml;<br>
provider:<br>
  .<br>
  .<br>
  environment:<br>
    NOTES_TABLE: ${self:service}-${opt:stage, self:provider.stage}<br>
    <br>
resources:<br>
  Resources:<br>
    NotesTable:<br>
      Type: AWS::DynamoDB::Table<br>
      DeletionPolicy: Retain<br>
      Properties:<br>
        .<br>
        . //Table attributes<br>
        .<br>
And then functions (lambda handlers) added in the serverless.yml file for the integrating with AWS Lambda.<br>
Fuctions have to integrate with dynamoDb table for the do this iamRoleStatements defined in the provider in serverless.yml file;<br>
provider:<br>
  .<br>
  .<br>
  iamRoleStatements:<br>
      - Effect: Allow<br>
        Action: <br>
          - dynamodb:Query<br>
          - dynamodb:PutItem<br>
          - dynamodb:DeleteItem<br>
        Resource: "arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self:provider.environment.NOTES_TABLE}"<br>
        
For the API Gateway integration in the functions section in serverless.yml, we have to defined cors headers. This provides the connection between project API and Lambda handler functions. Under functions and under cors section, defined origin and headers. For the identication we have to defined custom section in tge serverless.yml;<br>
custom;<br>
  allowedHeaders:<br>
    - Accept<br>
    - Content-Type<br>
    - Content-Length<br>
    - Authorization<br>
    - X-Amz-Date<br>
    - X-Api-Key<br>
    - X-Amz-Security-Token<br>
    - X-Amz-User-Agent<br>
    - app_user_id<br>
    - app_user_name<br>
    <br>
At the end all the required elements for AWS Serverless Architecture are defined by the serverless.yml.<br>
You can test the API locally with serverless offline command in terminal and you can send the delete, get, post, put, update requests from using Postman. It will do changes in the DynamoDb table locally.  
