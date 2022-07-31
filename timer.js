var bandClass, circleClass,circleBackClass, circleNumber;
var lastNumber;
function getBandNumber() {
    var now = new Date();
    var band1 = now.getHours().toString().padStart(2, "0")
    var band2 = now.getMinutes().toString().padStart(2, "0")
    var band3 = now.getSeconds().toString().padStart(2, "0")

    var result = [band1[0], band1[1], band2[0], band2[1], band3[0], band3[1]];
    return result;
}

function moveBand() {
    var bandNumber = getBandNumber();

    for (i in lastNumber) {
        if (bandNumber[i] != lastNumber[i]) {
            $(circleClass[i]).css({ transform: 'scale(0)' });
            $(circleBackClass[i]).css({ transform: 'scale(0)' });

            setTimeout(function(){
                circleClass.css({ transform: 'scale(1.3)' });
                circleBackClass.css({ transform: 'scale(1.3)' });
            }, 100);
            setMargin(i, bandNumber);
        }
    }

    lastNumber = bandNumber;
}

function setMargin(i, bandNumber) {
    var margin = 400 - bandNumber[i] * 43;
    $(bandClass[i]).animate({
        "marginTop": margin + "px"
    });
    $(circleNumber[i]).text(bandNumber[i]);
}




var timer;


$(window).on('load', function () {
    //bandのdomを配列に格納する
    bandClass = $('.watch_band_list li div.band');
    circleClass = $('.circle');
    circleBackClass = $('.circle_back');
    circleNumber = $('.circle p');
    lastNumber = getBandNumber();
    for (i in lastNumber) {
        setMargin(i, lastNumber);
    }
    timer = setInterval(moveBand, 1000);
});

$(window).bind("focus", function () {　//フォーカスが当たったらタイマーを設定

    timer = setInterval(moveBand, 1000);

}).bind("blur", function () {　//フォーカスが外れたらタイマーを解除
    clearInterval(timer);

});