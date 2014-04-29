var latlon = "1,1";

$(function () {
    $('#enterLocationButton').click(function () {
        getLocation();
    });

    $('#postButton').click(function () {
        $.post("http://ifdtc.azurewebsites.net/api/MobileData",
            {
                Age: $('#Age').val(),
                Human: $('#Human').is(':checked'),
                OpenEnd: $('#OpenEnd').val(),
                Location: latlon
            },
            function (data) {
                myAlert('Data Sent');
            })
            .error(function () { myAlert('Error sending data. Make sure you are connected to the Internet.'); });
    });


    $('#takePictureButton').click(function () {
        takePicture();
    });
});

function takePicture() {
    if (navigator.camera) {
        navigator.camera.getPicture(onPictureSuccess, onPictureError);
    } else {
        myAlert('no camera available');
    }
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
}

function onGeoSuccess(position) {
    latlon = position.coords.latitude + "," + position.coords.longitude;
    $('#location').html(latlon);
}

function onGeoError(error) {
    myAlert('Error getting Geolocation. Code: ' + error.code + ' ' + ' Message: ' + error.message);
}

function onPictureSuccess() {
    myAlert('Picture taken');
}
function onPictureError() {
    myAlert("uh oh camera not working");
}

function myAlert(message) {
    if (navigator.notification) {
        navigator.notification.alert(message);
        navigator.notification.vibrate(500);
    } else {
        alert(message);
    }
}