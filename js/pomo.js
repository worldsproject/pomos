String.prototype.toMMSS = function () {
    sec_numb    = parseInt(this, 10); // don't forget the second parm
    var minutes = Math.floor(sec_numb / 60);
    var seconds = sec_numb - (minutes * 60);

    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = minutes+':'+seconds;
    return time;
}
var time = 25*60;
var counter;

$('document').ready(function() {
    $('#start-button').click(function() {
        document.getElementById('ticking').play();
        time = $('#pomo-length').val() * 60;
        counter = setInterval(pomoDown, 1000);
        $('#start-button').toggle();
        $('#quit-button').toggle();
    });
  
    $('#rest-button').click(function() {
        counter = setInterval(pomoRest, 1000);
        time = $('#rest-length').val() * 60;
        localStorage.setItem('numberOfPomos', Number(localStorage.getItem('numberOfPomos')) + 1);
        updateStats();
        $('#pause-buttons').toggle();
    });
    
    updateStats();
});

function pomoDown() {
    time = time - 1;

    if(time <= 0) {
        //Now we switch to rest time, or skip the rest.
        document.getElementById('ringing').play();
        $('#quit-button').toggle();
        $('#pause-buttons').toggle();
        clearInterval(counter);
        return;
    }

    $('#timer-text').text(time.toString().toMMSS());
}

function pomoRest() {
    time = time - 1;

    if(time <= 0) {
        clearInterval(counter)
        newPomo();
        return;
    }
   
    $('#timer-text').text(time.toString().toMMSS());
}

function newPomo() {
    $('#start-button').toggle();
}

function updateStats() {
    if(localStorage.getItem('numberOfPomos') == 1) {
        $('#num-pomos').text('1 Pomo completed.');
    } else if(localStorage.getItem('numberOfPomos') > 1) {
        $('#num-pomos').text(localStorage.getItem('numberOfPomos') + ' Pomos completed.');
    } else {
        localStorage.setItem('numberOfPomos', 0);
    }
}
