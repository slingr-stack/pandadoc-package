/**
 * This flow step will send generic request.
 *
 * @param {object} inputs
 */
step.createDocumentFromPdfPandadoc = function (inputs) {


    var inputs = {
        fileName: inputs.fileName || "",
        recipients: inputs.recipients || [],
        fields: inputs.fields || [],
        fileId: inputs.fileId.id || inputs.fileId || ""
    };


    var aux = inputs.recipients.map(recipient => {
            return {
                email: recipient
            }
        });


    return endpoint.documents.post(inputs.fileId, {
        name: inputs.fileName,
        recipients: aux,
        fields: inputs.fields,
        metadata: {
            test: true
        }
    });

}

/*
,
		{
			"type": "flowStep",
			"namespace": "steps",
			"path": "/flowSteps/createDocumentFromPdfPandadoc"
		},
		{
			"type": "flowStep",
			"namespace": "steps",
			"path": "/flowSteps/downloadDocumentPandadoc"
		},
		{
			"type": "flowStep",
			"namespace": "steps",
			"path": "/flowSteps/listDocumentsPandadoc"
		},
		{
			"type": "flowStep",
			"namespace": "steps",
			"path": "/flowSteps/sendDocumentPandadoc"
		}
 */