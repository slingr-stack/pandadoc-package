# Javascript API

The Javascript API of the pandadoc package has three pieces:

- **HTTP requests**: These allow making regular HTTP requests.
- **Shortcuts**: These are helpers to make HTTP request to the API in a more convenient way.
- **Additional Helpers**: These helpers provide additional features that facilitate or improves the package usage in SLINGR.

## HTTP requests
You can make `GET`,`POST` requests to the [pandadoc API](API_URL_HERE) like this:
```javascript
var response = pkg.pandadoc.functions.get('/templates')
var response = pkg.pandadoc.functions.post('/documents/:documentId/session', body)
var response = pkg.pandadoc.functions.post('/documents/:documentId/session')
```

Please take a look at the documentation of the [HTTP service](https://github.com/slingr-stack/http-service)
for more information about generic requests.

## Shortcuts

Instead of having to use the generic HTTP methods, you can (and should) make use of the helpers provided in the package:
<details>
    <summary>Click here to see all the helpers</summary>

<br>

* API URL: '/documents'
* HTTP Method: 'GET'
```javascript
pkg.pandadoc.functions.documents.get()
```
---
* API URL: '/documents'
* HTTP Method: 'POST'
```javascript
pkg.pandadoc.functions.documents.post(body)
```
---
* API URL: '/documents/:documentId'
* HTTP Method: 'GET'
```javascript
pkg.pandadoc.functions.documents.get()
```
---
* API URL: '/documents/:fileId'
* HTTP Method: 'POST'
```javascript
pkg.pandadoc.functions.documents.post(body)
```
---
* API URL: '/documents/:documentId/details'
* HTTP Method: 'GET'
```javascript
pkg.pandadoc.functions.documents.details.get(documentId)
```
---
* API URL: '/documents/:documentId/download'
* HTTP Method: 'GET'
```javascript
pkg.pandadoc.functions.documents.download.get(documentId)
```
---
* API URL: '/documents/:documentId/send'
* HTTP Method: 'POST'
```javascript
pkg.pandadoc.functions.documents.send.post(documentId, body)
```
---
* API URL: '/documents/:documentId/session'
* HTTP Method: 'POST'
```javascript
pkg.pandadoc.functions.documents.session.post(documentId, body)
```
---
* API URL: '/templates'
* HTTP Method: 'GET'
```javascript
pkg.pandadoc.functions.templates.get()
```
---
* API URL: '/templates/:templateId/details'
* HTTP Method: 'GET'
```javascript
pkg.pandadoc.functions.templates.details.get(templateId)
```
---

</details>

