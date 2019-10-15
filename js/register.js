var user_data; //store user data

/*
This method is called to get already registerd user data.
*/
function pageLoad() {
	user_data = JSON.parse(localStorage.getItem("user_data"));
	if (!user_data) {
		user_data = [];
	}
}

/*
This method is called when user switch between radio buttons.
So we can hide show fields basis on radio selected.
*/
function radioClicked() {
	if (document.getElementById('r2').checked) {
		document.getElementById("spouse_name").required = true;
		document.getElementById('spouse_details').style.visibility = 'visible';
	} else {
		document.getElementById('spouse_details').style.visibility = 'hidden';
		document.getElementById("spouse_name").required = false;
	}
}

/*
This method is called when user click on register button.
In this method user details stored in the data.
*/
function register() {
	var nameValue = document.getElementById("name").value;
	var nameGiftValue = document.getElementById("name_gift").value;

	var spouseNameValue = document.getElementById("spouse_name").value;
	var spouseGiftValue = document.getElementById("spouse_name_gift").value;

	user_data = JSON.parse(localStorage.getItem("user_data"));
	if (!user_data) {
		user_data = [];
	}
	
	user_data.push({
		name: nameValue,
		gift: nameGiftValue,
		spouse: spouseNameValue,
		spouse_gift: spouseGiftValue
	});

	localStorage.setItem("user_data", JSON.stringify(user_data));
	localStorage.setItem("all_users", JSON.stringify(getUserList(user_data)));
}

/*
This data manupulate the user details any give us to single user array.
*/
function getUserList(data) {
	var list = [];
	data.forEach(element => {
		if (element.name) {
			list.push({
				name: element.name,
				gift: element.gift
			});
		}
		if (element.spouse) {
			list.push({
				name: element.spouse,
				gift: element.spouse_gift
			});
		}
	});
	return list;
}

/*
This method is called when user click on draw.
This methon open draw page in new tab.
*/
function openWin() {
	window.open("./page/draw.html");
}