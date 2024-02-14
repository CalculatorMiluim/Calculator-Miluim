# Calculator Miluim - 

## Description

Calculator-Miluim is a web application designed to retrieve all the benefits that reservists in the IDF are entitled to. These benefits can come from the government or other institutions.

# Back-end Explanation

## Quick Overview

The back-end implements a single API, which takes a `ReservistProfile` as input and returns a list of all the benefits the reservist is entitled to.

There are three types of benefits:

- **Automatic Grants**: These are usually issued by BituahLeumi or Mofet, and are automatically deposited into the reservist's bank account.
- **Grants**: These are usually issued by other institutions like universities or financing funds and typically require filling out a form to receive the grant.
- **Vouchers**: These are vouchers with a monetary value that can be spent on a specific cause (e.g., a vacation voucher).

## Adding a New Benefit

To add a new benefit, you should first decide which type of benefit it is. Then, create a new object that inherits from the specific benefit type and implement its logic (there are plenty of examples in the benefits package). The last step is to add its import in `benefits_calculator.import_all_benefits()` so the calculator will be aware of it.

## Installation

Our application's back-end is architected using AWS Lambda functions, which are exposed via an HTTP-based interface enabled by AWS API Gateway. The Mangum library is utilized to transform the API response into a Lambda function entity. Additionally, FastAPI framework is enlisted for robust and efficient API management.

Whenever a back-end deployment action is triggered, it generates a new image from the code and substitutes it as the Lambda function.

To deploy the back-end as a Lambda function, execute the relevant GitHub action located [here](https://github.com/CalculatorMiluim/Calculator-Miluim/actions).

You can monitor the back-end logs for both Production and Staging environments using this [link](https://il-central-1.console.aws.amazon.com/cloudwatch/home?region=il-central-1#logsV2:log-groups). Note that you'll need an AWS IAM user account with the appropriate permissions to access the logs.

To manage the API Gateway, you can use this [link](https://il-central-1.console.aws.amazon.com/lambda/home?region=il-central-1#/functions). Again, an AWS IAM user account with the necessary permissions is required to manage the API Gateway.

## List of Benefits

Here is a [link](https://netapp-my.sharepoint.com/:x:/r/personal/eladb_netapp_com/_layouts/15/doc.aspx?sourcedoc=%7B627219b6-7730-4019-b0d6-51ac20ec5c94%7D&action=edit) to the list of benefits that we want our app to support. Some of them are already implemented, while others are not yet. Keep in mind that this is an ongoing list that should be updated every once in a while.




## Development

To run locally:

Vite/React:

  `npm run dev`

Backend/Pyton:

- install packages using `./venv.sh` in back-end folder
- run using `python -m uvicorn app.server:app --reload` or use an IDE to debug


To set the api url for development:
create a .env file with the following example:

`VITE_BASE_URL=http://localhost:8000`