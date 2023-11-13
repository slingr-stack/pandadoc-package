<table class="table" style="margin-top: 10px">
    <thead>
    <tr>
        <th>Title</th>
        <th>Last Updated</th>
        <th>Summary</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>PandaDoc package</td>
        <td>November 13, 2023</td>
        <td>Detailed description of the API of the PandaDoc package.</td>
    </tr>
    </tbody>
</table>

# Overview

The PandaDoc package has the following features:
 
- Authorization and generation of OAuth tokens
- Automatic refresh of tokens when they expire
- Access to the whole REST API
- Uploading and downloading of files integrated with Slingr's features

Please make sure you take a look at the documentation from PandaDoc as features are based on its API:

- [API Reference](https://developers.pandadoc.com/v1/reference)

## Quick start

Once you configured the package and authorized the package, you can create a new document from a template like this:

```js
var res = pkg.pandadoc.api.documents.post({
  name: 'Test document 1',
  template_uuid: 'JkVkR9jrKKBKdRe2z3fMqU',
  recipients: [  
    {  
      email: 'user@test.com',
      first_name: 'User',
      last_name: 'Test'
    }
  ],
  fields: {  
    name: {  
      value: "test name"
    }
  },
  metadata: {  
    test: true
  }
});
log(JSON.stringify(res));
```

Or you can also create a document from a PDF file you have stored in a SLINGR app:

```js
var record = sys.data.findOne('contracts', {number: 4});
var res = pandadoc.documents.post(record.field('file').id(), {
  name: 'Test document 1',
  recipients: [  
    {  
      email: 'user@test.com',
      first_name: 'User',
      last_name: 'Test'
    }
  ],
  fields: {  
    name: {  
      value: "test name"
    }
  },
  metadata: {  
    test: true
  }
});
log(JSON.stringify(res));
```

## Configuration

Before configuring the package, you will need to create an application in PandaDoc:

https://app.pandadoc.com/developers/

Once you have your application, you will be able to configure the package.

### Client ID

The client ID of the PandaDoc application. This field needs to be entered before clicking on `Request token`.

### Client Secret

The client secret of the PandaDoc application. This field needs to be entered before clicking on `Request token`.

### Access token

To get this token, you need to click on the button `Request token`.
Once you complete the authorization process,
this field will be set.

### Refresh token

To get this token, you need to click on the button `Request token`. 
Once you complete the authorization process,
this field will be set.

### API Key

This field is optional. If you put a key here, all requests to the API will be authenticated with this key. This is not recommended for production environments.

### Webhooks shared key

This field is optional. If you put a key here, webhooks will be validated according to this key.

At the moment, this package was created shared keys was only available for the webhook integrations in the main
PandaDoc application and wasn't available for webhooks defined in applications created by external developers. So if
you don't want users to set up the webhook integrations by themselves, you should leave this field empty and be
aware that there won't be validations on incoming webhooks.

### Webhook URL

This is the URL you should configure in the webhook of your PandaDoc application or users would need to configure
in the webhook integration.


# Javascript API

The Javascript API of the pandadoc package has two pieces:

- **HTTP requests**
- **Flow steps**

## HTTP requests
You can make `GET`,`POST` requests to the [pandadoc API](https://api.pandadoc.com) like this:
```javascript
var response = pkg.pandadoc.api.get('/templates')
var response = pkg.pandadoc.api.post('/documents/:documentId/session', body)
var response = pkg.pandadoc.api.post('/documents/:documentId/session')
```

Please take a look at the documentation of the [HTTP service](https://github.com/slingr-stack/http-service)
for more information about generic requests.

## Shortcuts

Instead of having to use the generic HTTP methods, you can (and should) make use of the helpers provided in the package:
<details>
    <summary>Click here to see all the helpers</summary>

<br>

---
* API URL: '/documents'
* HTTP Method: 'POST'
```javascript
pkg.pandadoc.api.documents.post(body)
```
---
* API URL: '/documents/:documentId/download'
* HTTP Method: 'GET'
```javascript
pkg.pandadoc.api.documents.download.get(documentId)
```
---
* API URL: '/documents/:documentId/session'
* HTTP Method: 'POST'
```javascript
pkg.pandadoc.api.documents.session.post(documentId, body)
```
---

</details>

## Flow Step

As an alternative option to using scripts, you can make use of Flows and Flow Steps specifically created for the package
<details>
    <summary>Click here to see the Flow Steps</summary>

<br>

### Generic Flow Step

Generic flow step for full use of the entire package and its services.

<h3>Inputs</h3>

<table>
    <thead>
    <tr>
        <th>Label</th>
        <th>Type</th>
        <th>Required</th>
        <th>Default</th>
        <th>Visibility</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>URL (Method)</td>
        <td>choice</td>
        <td>yes</td>
        <td> - </td>
        <td>Always</td>
        <td>
            This is the http method to be used against the package. <br>
            Possible values are: <br>
            <i><strong>GET,POST</strong></i>
        </td>
    </tr>
    <tr>
        <td>URL (Path)</td>
        <td>choice</td>
        <td>yes</td>
        <td> - </td>
        <td>Always</td>
        <td>
            The url to which this package will send the request. This is the exact service to which the http request will be made. <br>
            Possible values are: <br>
            <i><strong>/documents<br>/documents/{documentId}<br>/documents/{documentId}/details<br>/documents/{documentId}/download<br>/templates<br>/templates/{templateId}/details<br>/documents<br>/documents/{fileId}<br>/documents/{documentId}/send<br>/documents/{documentId}/session<br></strong></i>
        </td>
    </tr>
    <tr>
        <td>Headers</td>
        <td>keyValue</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            Used when you want to have a custom http header for the request.
        </td>
    </tr>
    <tr>
        <td>Query Params</td>
        <td>keyValue</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            Used when you want to have a custom query params for the http call.
        </td>
    </tr>
    <tr>
        <td>Body</td>
        <td>json</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            A payload of data can be sent to the server in the body of the request.
        </td>
    </tr>
    <tr>
        <td>Override Settings</td>
        <td>boolean</td>
        <td>no</td>
        <td> false </td>
        <td>Always</td>
        <td></td>
    </tr>
    <tr>
        <td>Follow Redirect</td>
        <td>boolean</td>
        <td>no</td>
        <td> false </td>
        <td> overrideSettings </td>
        <td>Indicates that the resource has to be downloaded into a file instead of returning it in the response.</td>
    </tr>
    <tr>
        <td>Download</td>
        <td>boolean</td>
        <td>no</td>
        <td> false </td>
        <td> overrideSettings </td>
        <td>If true the method won't return until the file has been downloaded, and it will return all the information of the file.</td>
    </tr>
    <tr>
        <td>File name</td>
        <td>text</td>
        <td>no</td>
        <td></td>
        <td> overrideSettings </td>
        <td>If provided, the file will be stored with this name. If empty the file name will be calculated from the URL.</td>
    </tr>
    <tr>
        <td>Full response</td>
        <td> boolean </td>
        <td>no</td>
        <td> false </td>
        <td> overrideSettings </td>
        <td>Include extended information about response</td>
    </tr>
    <tr>
        <td>Connection Timeout</td>
        <td> number </td>
        <td>no</td>
        <td> 5000 </td>
        <td> overrideSettings </td>
        <td>Connect a timeout interval, in milliseconds (0 = infinity).</td>
    </tr>
    <tr>
        <td>Read Timeout</td>
        <td> number </td>
        <td>no</td>
        <td> 60000 </td>
        <td> overrideSettings </td>
        <td>Read a timeout interval, in milliseconds (0 = infinity).</td>
    </tr>
    </tbody>
</table>

<h3>Outputs</h3>

<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>response</td>
        <td>object</td>
        <td>
            Object resulting from the response to the package call.
        </td>
    </tr>
    </tbody>
</table>


</details>

For more information about how shortcuts or flow steps work, and how they are generated,
take a look at the [slingr-helpgen tool](https://github.com/slingr-stack/slingr-helpgen).

## Additional Flow Step


<details>
    <summary>Click here to see the Customs Flow Steps</summary>

<br>


### Create Document From Pdf

Create a pandadoc document from a pdf file.

<table>
    <thead>
    <tr>
        <th>Label</th>
        <th>Type</th>
        <th>Required</th>
        <th>Default</th>
        <th>Visibility</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>File id</td>
        <td>text</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            The id provided by record of the file to create the PDF.
        </td>
    </tr>
    <tr>
        <td>File Name</td>
        <td>text</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            The name with which the file is created in Pandadoc.
        </td>
    </tr>
    <tr>
        <td>Recipients</td>
        <td>Multiple texts</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            Add a recipient to view or sign your document.
        </td>
    </tr>
    <tr>
        <td>Fields</td>
        <td>keyValue</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            You may pass a list of fields/values to pre-fill fields used in a template.
        </td>
    </tr>
    </tbody>
</table>

<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>response</td>
        <td>object</td>
        <td>
            Object resulting from the response to the package call.
        </td>
    </tr>
    </tbody>
</table>

### Download Document

Download a pandadoc document.

<table>
    <thead>
    <tr>
        <th>Label</th>
        <th>Type</th>
        <th>Required</th>
        <th>Default</th>
        <th>Visibility</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>File id</td>
        <td>text</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            The id provided by Pandadoc Service.
        </td>
    </tr>
    <tr>
        <td>File Name</td>
        <td>text</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            If provided, the file will be stored with this name.
        </td>
    </tr>
    </tbody>
</table>

<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>response</td>
        <td>object</td>
        <td>
            Object resulting from the response to the package call.
        </td>
    </tr>
    </tbody>
</table>

### List Documents

List all documents on your pandadoc account.

<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>response</td>
        <td>object</td>
        <td>
            Object resulting from the response to the package call.
        </td>
    </tr>
    </tbody>
</table>

### Send Document

Move a document to send status and send an optional email.

<table>
    <thead>
    <tr>
        <th>Label</th>
        <th>Type</th>
        <th>Required</th>
        <th>Default</th>
        <th>Visibility</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>File id</td>
        <td>text</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            The id provided by Pandadoc Service.
        </td>
    </tr>
    <tr>
        <td>Subject</td>
        <td>text/email</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            Value that will be used as the email subject.
        </td>
    </tr>
    <tr>
        <td>Message</td>
        <td>text</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            A message which will be sent by email with a link to a document to sign.
        </td>
    </tr>
    <tr>
        <td>Silent</td>
        <td>boolean</td>
        <td>no</td>
        <td> false </td>
        <td>Always</td>
        <td>
            Disables sent, viewed, comment and completed email notifications for document recipients and the document sender. By default, notification emails are sent for specific actions. If set as true, it won't affect "Approve document" email notification sent to the Approver.
        </td>
    </tr>
    </tbody>
</table>

<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>response</td>
        <td>object</td>
        <td>
            Object resulting from the response to the package call.
        </td>
    </tr>
    </tbody>
</table>


</details>

## Dependencies
* HTTP Service (Latest Version)

# About SLINGR

SLINGR is a low-code rapid application development platform that accelerates development, with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

# License

This package is licensed under the Apache License 2.0. See the `LICENSE` file for more details.
