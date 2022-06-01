const loginform=document.querySelector('.login')
const signupForm=document.querySelector('.signupform')

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
			alert("success");
			window.setTimeout(()=>{
				location.assign('/');
			})
		}

	} catch (err) {
		alert("error");
	}
};

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
		  alert('success')
		  window.setTimeout(()=>{
			  location.assign('/')
		  })
		}
	} catch (err) {
		alert("error");
	}
};

if(loginform){
    
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
		console.log(name, email, password, phonenumber);
			signup(name, email, password, phonenumber);
	});
}



document.querySelector('.dropbtn').addEventListener('click',()=>{
	document.querySelector(".dropdown-content").style.display='block';
})
window.onclick=function(e){
	if(!e.target.matches('.dropbtn')){
		const dropdownbtn=document.querySelector('.dropdown-content')
		dropdownbtn.style.display='none'
	}
}

document.querySelector('.logout').addEventListener('click',async()=>{


	try {
		const res = await axios({
		  method: 'GET',
		  url: '/api/users/logout',
		});
	
		if (res.data.status === 'success') {
		  location.reload(true);
		}
	  } catch (err) {
		alert('error')
	  }
})