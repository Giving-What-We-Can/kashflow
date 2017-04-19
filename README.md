# Kashflow

A wrapper for the Kashflow SOAP/WSDL API, using [node-soap](https://github.com/vpulim/node-soap)

Simplifies the process of creating a Kashflow client by adding Authentication to each call. Methods return Promises.

## Installation

```
$ npm install --save kashflow
```

## Usage

The library returns a `Promise` which resolves with a `kashflow` client object, which has Kashflow methods as its properties.

See the docs for [available Kashflow methods](https://www.kashflow.com/developers/soap-api/).


```js
const Kashflow = require('kashflow')
const { KASHFLOW_USERNAME, KASHFLOW_API_PASSWORD } = process.env
// Set up the client
Kashflow(KASHFLOW_USERNAME, KASHFLOW_API_PASSWORD).then(kashflow => {
    // call methods on the client
    return kashflow.GetInvoiceById({
        InvoiceID: '12345'
    })
    .then(res => {
        console.log(res.GetInvoiceByIdResult)
    })
})

```

## Testing

You'll need to create a `.env` file in your project root as follows

```
KASHFLOW_USERNAME=<Your Username>
KASHFLOW_API_PASSWORD=<Your Password>
```

Then

```
npm test
```