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
updateStats();

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
        pauseButtons();
    });

    $('#skip-button').click(function() {
        localStorage.setItem('numberOfPomos', Number(localStorage.getItem('numberOfPomos')) + 1);
        updateStats();
        pauseButtons();
        newPomo();
    });

    $('#cancel-button').click(function() {
        pauseButtons();
        newPomo();
    });

    $('#quit-button').click(function() {
        clearInterval(counter);
        $('#quit-button').toggle();
        $('#start-button').toggle();
        $('#timer-text').text('Ready');
    });
});

function pauseButtons() {
    alert('Moo');
    $('#rest-button').toggle();
    $('#skip-button').toggle();
    $('#cancel-button').toggle();
}

function pomoDown() {
    time = time - 1;

    if(time <= 0) {
        //Now we switch to rest time, or skip the rest.
        document.getElementById('ringing').play();
        $('#quit-button').toggle();
        pauseButtons();
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

function levels(number, level, aOrAn) {
    var a = 'You need ';
    var b = ' more Pomos to reach the next level.';
    var num = localStorage.getItem('numberOfPomos');
    $('#next-level').text(a + (number - num) + b);
    $('#pomo-level').html('You are ' + aOrAn + ' <strong>' + level + '</strong> Pomoer.');
}

function updateStats() {
    var numPomos = localStorage.getItem('numberOfPomos');
    if(numPomos == 1) {
        $('#num-pomos').text('1 Pomo completed.');
        $('#next-level').text('You need 9 more Pomos to reach the next level.');        
    } else if(numPomos > 1) {
        $('#num-pomos').text(localStorage.getItem('numberOfPomos') + ' Pomos completed.');
        if(numPomos > 10) {
            levels(50, 'Novice', 'a');
        } else if (numPomos > 50) {
            levels(100, 'Adept', 'an');
        } else if (numPomos > 100) {
            levels(250, 'Scholar', 'a');
        } else if (numPomos > 250) {
            levels(500, 'Journeyman', 'a');
        } else if (numPomos > 500) {
            levels(1000, 'Guru', 'a');
        } else if (numPomos > 1000) {
            levels(2500, 'Expert', 'an');
        } else if (numPomos > 2500) {
            $('#next-level').text('There is nothing more for you to learn.');
            $('#pomo-level').html('You are a master Pomoer.');
        } else {
            levels(10, 'Initiate', 'an');
        }
    } else {
        localStorage.setItem('numberOfPomos', 0);
    }
}
