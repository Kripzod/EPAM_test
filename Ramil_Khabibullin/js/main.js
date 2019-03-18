var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

var xhr = new XHR();

xhr.open('GET', 'https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture', true);
var users;
var usersBlock = [];
xhr.onload = function () {
    users = JSON.parse(xhr.responseText);
    loadUsers();
    return users;
};

function loadUsers() { // Load parsed JSON objects in short form(Medium picture/Title/First name/Last name)
    for (var i = 0; i < users["results"].length; i++) {


        var userWrapper = document.getElementById('userWrapper');
        usersBlock[i] = document.createElement('div');
        usersBlock[i].className = "users__block";
        userWrapper.appendChild(usersBlock[i]);
        var userPicture = document.createElement('div');
        userPicture.className = "users__photo";
        userPicture.id = i;
        userPicture.innerHTML = '<img src="' + users["results"][i].picture.medium + '"onclick="openWindow(id); activeWindow()" id="' + i + '">'
        usersBlock[i].appendChild(userPicture);

        var userName = document.getElementById('userName');
        var userNameTitle = document.createElement('span');
        userNameTitle.className = "users__name";
        userNameTitle.innerHTML = users["results"][i].name.title + ' ';
        usersBlock[i].appendChild(userNameTitle);

        var userNameFirst = document.createElement('span');
        userNameFirst.innerHTML = users["results"][i].name.first + ' ';
        userNameFirst.className = "users__name";
        usersBlock[i].appendChild(userNameFirst);

        var userNameLast = document.createElement('span');
        userNameLast.className = "users__name";
        userNameLast.innerHTML = users["results"][i].name.last;
        usersBlock[i].appendChild(userNameLast);

    }
}

function activeWindow(elem) { // Сhecks popup window for opening.Load parsed JSON objects in full form.
    var windowsWraper = document.getElementById('window__wrapper');
    if (windowsWraper.style.display === 'block') {
        windowsWraper.style.display = 'none';
        windowsWraper.innerHTML = "";
    } else {
        windowsWraper.style.display = 'block';
    }

}

function openWindow(elem) { // Opens a popup window
    var i = elem;
    var windowsWraper = document.getElementById('window__wrapper');
    var windowUsersPicture = document.createElement('a');
    windowUsersPicture.className = "window__img window__content";
    windowUsersPicture.innerHTML = '<img src="' + users["results"][i].picture.large + '"onclick="activeWindow()">';
    windowsWraper.appendChild(windowUsersPicture);

    var windowUsersNameTitle = document.createElement('span');
    windowUsersNameTitle.className = "users__name window__content";
    windowUsersNameTitle.innerHTML = users["results"][i].name.title;
    windowsWraper.appendChild(windowUsersNameTitle);

    var windowUsersNameFirst = document.createElement('span');
    windowUsersNameFirst.className = "users__name window__content";
    windowUsersNameFirst.innerHTML = users["results"][i].name.first;
    windowsWraper.appendChild(windowUsersNameFirst);

    var windowUsersNameLast = document.createElement('span');
    windowUsersNameLast.className = "users__name window__content";
    windowUsersNameLast.innerHTML = users["results"][i].name.last;
    windowsWraper.appendChild(windowUsersNameLast);

    var windowUsersLocationStreet = document.createElement('p');
    windowUsersLocationStreet.className = "window__content";
    windowUsersLocationStreet.innerHTML = 'Address: ' + users["results"][i].location.street
    windowsWraper.appendChild(windowUsersLocationStreet);

    var windowUsersLocationCity = document.createElement('p');
    windowUsersLocationCity.className = "window__content users__text";
    windowUsersLocationCity.innerHTML = 'City: ' + users["results"][i].location.city
    windowsWraper.appendChild(windowUsersLocationCity);

    var windowUsersLocationState = document.createElement('p');
    windowUsersLocationState.className = "window__content users__text";
    windowUsersLocationState.innerHTML = 'State: ' + users["results"][i].location.state;
    windowsWraper.appendChild(windowUsersLocationState);

    var windowUsersLocationPostcode = document.createElement('p');
    windowUsersLocationPostcode.className = "window__content";
    windowUsersLocationPostcode.innerHTML = 'Postcode: ' + users["results"][i].location.postcode
    windowsWraper.appendChild(windowUsersLocationPostcode);

    var windowUsersEmail = document.createElement('p');
    windowUsersEmail.className = "window__content";
    windowUsersEmail.innerHTML = 'Email: ' + users["results"][i].email
    windowsWraper.appendChild(windowUsersEmail);

    var windowUsersPhone = document.createElement('p');
    windowUsersPhone.className = "window__content";
    windowUsersPhone.innerHTML = 'Phone: ' + users["results"][i].phone
    windowsWraper.appendChild(windowUsersPhone);

    var btn = document.createElement('input');
    btn.type = 'button';
    btn.className = 'window__btn';
    btn.value = 'Закрыть';
    btn.setAttribute("onclick", "activeWindow()");
    windowsWraper.appendChild(btn);
}

function sortAlphabet() { // Sorts the users list in alphabetical order
    Array.prototype.sort.call(users.results, function (a, b) {
        return a.name.last > b.name.last ? 1 : a.name.last < b.name.last ? -1 : 0;
    });
    var userWraper = document.getElementById('userWrapper');
    userWraper.innerHTML = "";
    loadUsers();
}

function sortReverse() { //Sort thw users list into reverse alphabetical order
    Array.prototype.sort.call(users.results, function (a, b) {
        return a.name.last < b.name.last ? 1 : a.name.last > b.name.last ? -1 : 0;
    });
    var userWraper = document.getElementById('userWrapper');
    userWraper.innerHTML = "";
    loadUsers();
}

function sortOption() { // Selection of sorting methods

    var sortSelect = document.getElementById('sortSelect');
    sortValue = sortSelect.value;
    if (sortValue === 'Alphabet') {
        sortAlphabet()
    } else {
        sortReverse()
    }

}

xhr.onerror = function () {
    alert('Error ' + this.status);
}

xhr.send();