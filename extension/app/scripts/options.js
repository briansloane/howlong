'use strict';

// Saves options to localStorage.
function save_options() {
  var newOrigin = document.getElementById("inputOrigin").value;
  var status = document.getElementById("status"),
      alert = document.getElementById("alert");

  localStorage["origin"] = newOrigin;
  showAlert("Options Saved.");
  setTimeout(hideAlert, 2500);
}

function showAlert(message) {
    var alert = document.getElementById("alert"),
        status = document.getElementById("status");

    status.innerHTML = message;
    alert.className = alert.className.replace( /(?:^|\s)hidden(?!\S)/g , '' );
}

function hideAlert() {
    var alert = document.getElementById("alert"),
        status = document.getElementById("status");

    status.innerHTML = "";
    alert.className += " hidden";
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var savedOrigin = localStorage["origin"];
  if (!savedOrigin) {
    return;
  }
  var inputOrigin = document.getElementById("inputOrigin");
  inputOrigin.value = savedOrigin;
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);