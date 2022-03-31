async function submitDocument() {
	const fileInput = document.querySelector("#input-file");
	const id_user = fromSession("user").id_user;

	console.log(fileInput.files[0]);

	const formdata = new FormData();

	formdata.append("id_user", id_user);
	formdata.append("document", fileInput.files[0]);

	console.log(formdata.values);

	const res = await fetch("/submit-doc", {
		method: "POST",
		headers: {
			"Content-Type": "multipart/form-data",
		},
		body: formdata,
	});

	const json = await res.json();

	if (json.success) {
		createToast("toast", "success", "check_circle", "Success", json.message);
		showToast("toast");

		const a = document.querySelector("#securedElement");
		a.src = json.filePath;
	} else {
		createToast("toast", "error", "error", "Error", json.message);
		showToast("toast");
	}
}
