/**
 * @author : console.log
 * @date : 2018.04.08.
 */

var isLogin = false;
var isUpdate = false;
var contentsId = '';
var msg = document.getElementById('txtBox');

// Google Drive API
//Client ID and API key from the Developer Console (cafe24)
//var CLIENT_ID = '502427210968-0tc1csf4kf6pi7t6jbtp0o6fr10dh6sd.apps.googleusercontent.com';
//Client ID and API key from the Developer Console (GitHub)
var CLIENT_ID = '502427210968-tmafjll0229vrqhuvlr148f371jjs1tn.apps.googleusercontent.com';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/drive';

var authorizeButton = document.getElementById('google-authorize');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
	gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
	gapi.client.init({
		discoveryDocs: DISCOVERY_DOCS,
		clientId: CLIENT_ID,
		scope: SCOPES
	}).then(function () {
		// Listen for sign-in state changes.
		gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

		// Handle the initial sign-in state.
		updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
	});
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
	var authorizeButton = document.getElementById('google-authorize');
	if (isSignedIn) {
		authorizeButton.innerHTML = "<span class='ui-btn-inner'><span class='ui-btn-text'>LogOut</span><span class='ui-icon ui-icon-gear'></span></span>";
		authorizeButton.href = 'javascript:handleSignoutClick()';
		getFile();
	} else {
		authorizeButton.innerHTML = "<span class='ui-btn-inner'><span class='ui-btn-text'>LogIn</span><span class='ui-icon ui-icon-gear'></span></span>";
		authorizeButton.href = 'javascript:handleAuthClick()';
	}
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
	gapi.auth2.getAuthInstance().signIn();
	isLogin = true;
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
	gapi.auth2.getAuthInstance().signOut();
	isLogin = false;
}


/**
 * Get file.
 */
function getFile() {
	gapi.client.drive.files.list({
		'pageSize': 1000,
		'fields': 'nextPageToken, files(id, name, description)'
	}).then(function(response) {
		var files = response.result.files;

		if (files && files.length > 0) {
			for (var i = 0; i < files.length; i++) {
				var file = files[i];

				if (file.name == 'EasyNoteText') {
					isUpdate = true;
					contentsId = file.id;
					msg.value = file.description;
				}
			}
		}
	});
}

function createFile() {
	checkLogIn();

	if (isUpdate) {
		gapi.client.drive.files.update({
			'fileId': contentsId,
			'name' : 'EasyNoteText',
			'description' : msg.value
		}).then(function(response) {
			alert('업데이트 완료');
		});
	} else {
		gapi.client.drive.files.create({
			'name': 'EasyNoteText',
			'description' : msg.value
		}).then(function(response) {
			alert('저장 완료');
		});
	}
}

function deleteFile() {
	checkLogIn();

	isUpdate = true;
	msg.value = '';

	createFile();
}

function checkLogIn() {
	if (!isLogin) {
		alert('LogIn 이 필요합니다.');
		return;
	}
}