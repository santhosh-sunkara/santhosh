var allUser; //store all user data
var user_data; //store user data

/*
This function get data from user and populate the dropdown of user.
*/
function pageLoadEvent() {
	user_data = JSON.parse(localStorage.getItem("user_data"));
	if(user_data != null){
		allUser = getUserList(user_data);
		var x = document.getElementById("nameListSelect");
		for (var i = 0; i < allUser.length; i++) {
			var option = document.createElement("option");
			option.text = allUser[i].name;
			x.add(option);
		}
	}
}
/*
This function manipulate the localstorage data and create single user array.
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
This method call when user click on draw button.
It check all the game rule and draw a user name according to gift exchange game.
*/
function draw() {
	var selectedName = document.getElementById("nameListSelect").value;
	if(selectedName != ""){
		var filteredUser = user_data.filter(x => {
			if (x.name !== selectedName && x.spouse !== selectedName) {
				return x;
			}
		});
	
	
		var removed_users = JSON.parse(localStorage.getItem("removed_users"));
		if (!(removed_users && removed_users.length > 0)) {
			removed_users = [];
		}
	
	
		var remainingUsers = getUserList(filteredUser);
	
		for (var i = remainingUsers.length - 1; i >= 0; i--) {
			for (var j = 0; j < removed_users.length; j++) {
				if (remainingUsers[i] && (remainingUsers[i].name === removed_users[j].name)) {
					remainingUsers.splice(i, 1);
				}
			}
		}
	
		var drawnUser = remainingUsers[Math.floor(Math.random() * remainingUsers.length)];
	
		if (drawnUser) {
			document.getElementById('draw').style.visibility = 'visible';
			document.getElementById("drawnUsr").innerText = drawnUser.name;
			document.getElementById("drawnUsr1").innerText = drawnUser.name;
			document.getElementById("gift").innerText = drawnUser.gift;
		}
		else{
			alert("No User left for you to satisfy Game rules!!")
			return;
		}
	
		var participatedUsr = JSON.parse(localStorage.getItem("already_participated"));
		if (!participatedUsr) {
			participatedUsr = [];
		}
		participatedUsr.push(selectedName);
	
		localStorage.setItem("already_participated", JSON.stringify(participatedUsr));
	
		removed_users.push(drawnUser);
	
		localStorage.setItem("removed_users", JSON.stringify(removed_users));
		saveGridData(selectedName, drawnUser.name);
		hideDiv(selectedName);
	}
}
/*
This mehod is call when user change dropdown item,
in this we check that selected user is already pariticipated or not.
*/
function onUsrChange() {
	var selectedName = document.getElementById("nameListSelect").value;
	var participatedUsr = JSON.parse(localStorage.getItem("already_participated"));
	if (!participatedUsr) {
		participatedUsr = [];
	}
	if (participatedUsr.indexOf(selectedName) !== -1) {
		alert("This User already participated in the Game!!! Please select diffrent user.")
	}
}

/*
This method is use to store data in table format after drawn.
*/
function saveGridData(userName, drawnName) {

	var gridData = JSON.parse(localStorage.getItem("gift_exchange_table"));
	if (!gridData) {
		gridData = [];
	}
	gridData.push({
		name: userName,
		drawn: drawnName
	});
	localStorage.setItem("gift_exchange_table", JSON.stringify(gridData));
}
/*
This method is use to hide show elements of html based on functionality.
*/
function hideDiv(selectedName) {
	document.getElementById('drawDiv').style.visibility = 'hidden';
	document.getElementById('drawBtn').style.visibility = 'hidden';
	document.getElementById('drawDivSuccess').style.visibility = 'visible';
	document.getElementById('user_name').innerText = selectedName;
}

/*
This method is call when user click on show results button.
It get grid data and show those as a table on view.
*/
function showGrid() {
	document.getElementById('gridDiv').style.visibility = 'visible';
	var table = document.getElementById("gridDatatbl");
	var gridData = JSON.parse(localStorage.getItem("gift_exchange_table"));
	table.innerHTML = "";
	if (!gridData) {
		gridData = [];
	}
	for (var i = 0; i < gridData.length; i++) {
		var row = table.insertRow(0);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		cell1.innerHTML = gridData[i].name;
		cell2.innerHTML = gridData[i].drawn;
	}
}
/*
This method is clear all local storage data
*/
function cleardata(){
	localStorage.clear();
	document.getElementById('gridDiv').style.visibility = 'hidden';	
	document.getElementById('draw').style.visibility = 'hidden';	
	document.getElementById('drawDivSuccess').style.visibility = 'hidden';	
	document.getElementById('drawBtn').style.visibility = 'visible';	
	document.getElementById('drawDiv').style.visibility = 'visible';	
	var nameList = document.getElementById("nameListSelect");
    nameList.options.length = 0;
}