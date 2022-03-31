async function submitDocument() {
	const form = document.querySelector(".my-form");
	const formdata = new FormData(form);

	const { id_user } = JSON.parse(fromSession("user"));
	formdata.append("id_user", id_user);

	if (!formdata.get("id_user") || !formdata.get("document").name) {
		createToast("toast", "error", "error", "Error", "Missing parameters");
		showToast("toast");
		return;
	}

	const res = await fetch("/submit-doc", {
		method: "POST",
		body: formdata,
	});

	const json = await res.json();

	if (json.success) {
		createToast("toast", "success", "check_circle", "Success", json.message);
		showToast("toast");

		const a = document.querySelector("#securedElement");
		a.src = json.filePath;
		form.reset();
	} else {
		createToast("toast", "error", "error", "Error", json.message);
		showToast("toast");
	}
}
