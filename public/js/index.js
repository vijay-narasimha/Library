const loginform = document.querySelector(".login");
const signupForm = document.querySelector(".signupform");

const hideAlert = () => {
	const el = document.querySelector('.alert');
	if (el) el.parentElement.removeChild(el);
  };
  
 const showAlert = (type, msg) => {
	hideAlert();
	const markup = `<div class='alert alert--${type}'>${msg}</div>`;
	document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
	window.setTimeout(hideAlert, 3000);
  };
  

const login = async (email, password) => {
	try {
		const res = await axios({
			method: "POST",
			url: "/api/users/login",
			data: {
				email,
				password,
			},
		});
		if (res.data.status === "success") {
			showAlert('success',"Login Successful ")
			window.setTimeout(() => {
				location.assign("/");
			});
		}
	} catch (err) {
		showAlert('error','Login Failed')
	}
}
const signup = async (name, email, password, phonenumber) => {
	try {
		const res = await axios({
			method: "POST",
			url: "/api/users/register",
			data: {
				name,
				email,
				password,
				phonenumber,
			},
		});
		if (res.data.status === "success") {
		showAlert('success','SignUp Successful')
			window.setTimeout(() => {
				location.assign("/");
			});
		}
	} catch (err) {
		showAlert('error','SignUp failed')
	}
};
const addBook = async (book) => {
	try {
		console.log("checking");
		const res = await axios({
			method: "GET",
			url: `/api/users/savebook/${book}`,
		});
		if (res.data.status === "success") {
			// showAlert('success','Book Added ')
			location.reload(true);
		}
	} catch (err) {
		showAlert('failed',"Failed To add Book ")
	}
};

if (loginform) {
	document.querySelector(".login").addEventListener("submit", (e) => {
		e.preventDefault();
		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;
		login(email, password);
	});
}
if (signupForm) {
	document.querySelector(".signupform").addEventListener("submit", (e) => {
		e.preventDefault();
		const name = document.getElementById("name").value;
		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;
		const phonenumber = document.getElementById("phonenumber").value;
		const passwordconfirm=document.getElementById('passwordconfirm').value;
		if(password===passwordconfirm){
		signup(name, email, password, phonenumber);
		}else{
			showAlert('error','Password Doesnt match ')
		}
	});
}
const dropbtn = document.querySelector(".dropbtn");
if (dropbtn) {
	dropbtn.addEventListener("click", () => {
		document.querySelector(".dropdown-content").style.display = "block";
	});
}
window.onclick = function (e) {
	if (!e.target.matches(".dropbtn")) {
		const dropdownbtn = document.querySelector(".dropdown-content");
		if(dropdownbtn)
		dropdownbtn.style.display = "none";
	}
};
const logout = document.querySelector(".logout");
if (logout) {
	logout.addEventListener("click", async () => {
		try {
			const res = await axios({
				method: "GET",
				url: "/api/users/logout",
			});

			if (res.data.status === "success") {
				showAlert('success','logout successful')
				location.assign("/");
			}
		} catch (err) {
			showAlert('error','logout failed')
		}
	});
}
const ele = document.querySelector(".book-rent");
if (ele) {
	document.querySelector(".book-rent").addEventListener("click", () => {
		const book = ele.getAttribute("data-book");
		addBook(book);
	});
}

const cart = async (book) => {
	try {
		const res = await axios({
			method: "GET",
			url: `/api/users/addcart/${book}`,
		});
		if (res.data.status === "success") {
			showAlert('success','book added to cart');
			location.reload(true);
		}
	} catch (err) {
		showAlert('error','Failed')
	}
};

const removecart = async (book) => {
	try {
		const res = await axios({
			method: "GET",
			url: `/api/users/removecart/${book}`,
		});
		if (res.data.status === "success") {
			
			location.reload(true);
		}
	} catch (err) {
		showAlert('error','Failed')
	}
};

const cartbtns = document.querySelectorAll(".cartbtn");
if (cartbtns) {
	[...cartbtns].forEach((item) => {
		item.addEventListener("click", () => {
			cart(item.getAttribute("data-bookId"));
		});
	});
}

const removecartbtns = document.querySelectorAll(".removecartbtn");
if (removecartbtns) {
	[...removecartbtns].forEach((item) => {
		item.addEventListener("click", () => {
			removecart(item.getAttribute("data-bookId"));
		});
	});
}

const donepayment = async (mode) => {
	try {
		const res = await axios({
			method: "GET",
			url: `/api/books/payment/${mode}`,
		});

		showAlert('success','Book taken Successfully')
		location.assign("/issuedbooks");
	} catch (err) {
		showAlert('error','Failed')
	}
};

const librarypass = document.querySelector(".librarypass");
if (librarypass) {
	librarypass.addEventListener("click", () => {
		const available = document
			.querySelector(".librarypass")
			.getAttribute("data-available");
			console.log(available)
		if (available=='yes') {
		
			donepayment("card");
		} else {
			showAlert('error','you dont have an pass')
		}
	});
}

const bookpayment = document.querySelector(".bookpayment");
if (bookpayment) {
	bookpayment.addEventListener("click", () => {
		donepayment("cash");
	});
}

const addinterest = async (book) => {
	try {
		const res = await axios({
			method: "GET",
			url: `/api/users/addinterest/${book}`,
		});
		if (res.data.status === "success") {
			showAlert('success','book added')
			location.reload(true);
		}
	} catch (err) {
	showAlert('fail','Task Failed')
	}
};

const interest = document.querySelectorAll(".interestbtn");
if (interest) {
	[...interest].forEach((item) => {
		item.addEventListener("click", () => {
			const interestbook = item.getAttribute("data-bookId");
			addinterest(interestbook);
		});
	});
}

const removeinterestbook = async (book) => {
	try {
		const res = await axios({
			method: "GET",
			url: `/api/users/removeinterest/${book}`,
		});
		const response=await axios({
			method: "GET",
			url: `/api/users/addcart/${book}`,
		})
		if (res.data.status === "success") {
			showAlert("success",'Book added to cart')
			location.reload('/cart');
		}
	} catch (err) {
	showAlert('error','Task Failed')
	}
};

const removeinterest = document.querySelectorAll(".removeinterestbtn");
if (removeinterest) {
	[...removeinterest].forEach((item) => {
		item.addEventListener("click", () => {
			const interestbook = item.getAttribute("data-bookId");
			removeinterestbook(interestbook);
		});
	});
}

const passcancel = async (userid) => {
	try {
		const res = await axios({
			method: "GET",
			url: `/api/users/cancelpass/${userid}`,
		});
		if (res.data.status === "success") {
			showAlert('success','Pass have been cancelled')
			location.reload(true);
		}
	} catch (err) {
		showAlert('error','task failed')
	}
};

const passaccept = async (userid) => {
	try {
		const res = await axios({
			method: "GET",
			url: `/api/users/acceptpass/${userid}`,
		});
		if (res.data.status === "success") {
			showAlert('success','Pass have been accepted')
			location.reload(true);
		}
	} catch (err) {
		showAlert('error','task failed')
	}
};

const cancelpass = document.querySelectorAll(".cancelpass");
if (cancelpass) {
	[...cancelpass].forEach((item) => {
		item.addEventListener("click", () => {
			const passid = item.getAttribute("data-userId");
			passcancel(passid);
		});
	});
}

const acceptpass = document.querySelectorAll(".acceptpass");
if (acceptpass) {
	[...acceptpass].forEach((item) => {
		item.addEventListener("click", () => {
			const passid = item.getAttribute("data-userId");
			passaccept(passid);
		});
	});
}

const Deletebook = async (bookid) => {
	try {
		const res = await axios({
			method: "DELETE",
			url: `/api/books/${bookid}`,
		})

		showAlert('success','Book Deleted')
		location.reload(true);
	} catch (err) {
		showAlert('error','Task failed')
	}
};
const deletebook = document.querySelectorAll(".deletebook");
if (deletebook) {
	[...deletebook].forEach((item) => {
		item.addEventListener("click", () => {
			const passid = item.getAttribute("data-bookId");
			Deletebook(passid);
		});
	});
}


const deleteinterest = async (book) => {
	try {
		const res = await axios({
			method: "GET",
			url: `/api/users/removeinterest/${book}`,
		});
		
		if (res.data.status === "success") {
			showAlert("success",'removed')
		location.reload(true)
		}
	} catch (err) {
	showAlert('error','Task Failed')
	}
};

const deletebookinterest = document.querySelectorAll(".removeinterest");
if (deletebookinterest) {
	[...deletebookinterest].forEach((item) => {
		item.addEventListener("click", () => {
			const interestbook = item.getAttribute("data-bookId");
			console.log(interestbook)
			deleteinterest(interestbook);
		});
	});
}
