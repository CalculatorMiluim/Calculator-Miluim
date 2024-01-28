# Calculator Miluim

## Description

Calculator-Miluim is a web application designed to retrieve all the benefits that reservists in the IDF are entitled to. These benefits can come from the government or other institutions.

## Features

The back-end implements a single API, which takes a `ReservistProfile` as input and returns a list of all the benefits the reservist is entitled to.

There are three types of benefits:

- **Automatic Grants**: These are usually issued by BituahLeumi or Mofet, and are automatically deposited into the reservist's bank account.
- **Grants**: These are usually issued by other institutions like universities or financing funds and typically require filling out a form to receive the grant.
- **Vouchers**: These are vouchers with a monetary value that can be spent on a specific cause (e.g., a vacation voucher).

## Adding a New Benefit

To add a new benefit, you should first decide which type of benefit it is. Then, create a new object that inherits from the specific benefit type and implement its logic (there are plenty of examples in the benefits package). The last step is to add its import in `benefits_calculator.import_all_grants()` so the calculator will be aware of it.

## Installation

To deploy the back-end, you should run the relevant GitHub action located [here](https://github.com/CalculatorMiluim/Calculator-Miluim/actions).

## List of Benefits

Here is a [link](https://netapp-my.sharepoint.com/:x:/r/personal/eladb_netapp_com/_layouts/15/doc.aspx?sourcedoc=%7B627219b6-7730-4019-b0d6-51ac20ec5c94%7D&action=edit) to the list of benefits that we want our app to support. Some of them are already implemented, while others are not yet. Keep in mind that this is an ongoing list that should be updated every once in a while.
