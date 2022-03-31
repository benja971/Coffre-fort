// Toogle body classes with animation
function toggle(css_class, val) {
	const old_val = document.body.classList.contains(css_class);

	if (old_val !== val) {
		document.body.classList.toggle(css_class, val);
		document.body.classList.add("anim");

		clearTimeout(slide_timeout);
		setTimeout(() => document.body.classList.remove("anim"), 300);
	}
}

// Show or hide elements
function showPages(...ids) {
	const pages = document.querySelectorAll(".page");

	for (const page of pages) {
		console.log("id " + page.id);
		page.classList.toggle("visible", ids.includes(page.id));
	}
}

function displayPage() {
	const auth = ["/register", "/login", "/home"];
	const pathname = location.pathname;

	//if location is valid, show page
	if (auth.includes(pathname)) {
		showPages(pathname.slice(1));
	}

	// redirect to login
	else {
		openUrl("/login");
	}
}

function openUrl(id) {
	history.replaceState(undefined, undefined, id);
	displayPage(id);
}

function fromSession(key) {
	return sessionStorage.getItem(key);
}

function toSession(key, data) {
	data = JSON.stringify(data);
	sessionStorage.setItem(key, data);
}

function init() {
	document.querySelector("#go-login").addEventListener("click", () => {
		openUrl("/login");
	});

	document.querySelector("#go-register").addEventListener("click", () => {
		openUrl("/register");
	});

	// login
	document.querySelector("#submit-login").addEventListener("click", async e => {
		e.preventDefault();

		const login = document.querySelector("#login input[name='login']").value;
		const password = document.querySelector("#login input[name='password']").value;

		if (login && password) {
			const data = {
				login,
				password,
			};

			let res = await fetch("/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			res = await res.json();

			if (res.success) {
				createToast("toast", "success", "check_circle", "Success", res.message);
				showToast("toast");
				setTimeout(() => {
					toSession("user", res.user);
					openUrl("/home");
				}, 1000);
			} else {
				createToast("toast", "error", "error", "Error", res.message);
				showToast("toast");
			}
		} else {
			createToast("toast", "error", "error", "Error", "Login and password are required");
			showToast("toast");
		}
	});

	// register
	document.querySelector("#submit-register").addEventListener("click", async e => {
		e.preventDefault();

		const login = document.querySelector("#login input[name='login']").value;
		const password = document.querySelector("#login input[name='password']").value;

		if (login && password) {
			console.log("login: " + login + " password: " + password);

			const data = {
				login,
				password,
			};

			let res = await fetch("/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			res = await res.json();

			console.log(res);

			if (res.success) {
				toSession("user", res.user);
				createToast("toast", "success", "check_circle", "Success", res.message);
				showToast("toast");
				setTimeout(() => {
					openUrl("/home");
				}, 1000);
			} else {
				createToast("toast", "error", "error", "Error", res.message);
				showToast("toast");
			}
		} else {
			createToast("toast", "error", "error", "Error", "Login and password are required");
			showToast("toast");
		}
	});

	// submit document
	document.querySelector("#submit-doc").addEventListener("click", e => {
		e.preventDefault();
		submitDocument();
	});

	// Display page
	displayPage();
}

function showToast(id) {
	const toast = document.getElementById(id);
	toast.classList.add("active");

	setTimeout(() => {
		toast.classList.remove("active");
	}, 2000);
}

function createToast(id, type, icon, title, text) {
	const toast = document.getElementById(id);
	toast.classList.remove("success", "error", "warning");

	const i = document.querySelector(`#${id} .left i`);
	const p = document.querySelector(`#${id} .right p`);
	const h = document.querySelector(`#${id} .right h3`);

	i.innerHTML = icon;
	p.innerHTML = text;
	h.innerHTML = title;

	toast.classList.toggle(type);
}
