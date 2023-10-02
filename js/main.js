function getRandomImg(path) {
    fetch(`https://source.unsplash.com/1920x1080/?random`)
        .then(data => {
            // console.log(data);
            path.css('background-image', `url(${data.url})`)
        })
}
getRandomImg($('#wrapper'));
getRandomImg($('#captchaPic'));


$('#startCaptcha').click(() => {
    $('#startCaptcha').css('display', 'none');
    $('#popup').css('display', 'flex');

    startCaptcha()
});


function resetCaptcha() {
    posX = 2;
    $('.required-fragment').css('left', `${posX}`);
    $('#slider').val(2);
    getRandomImg($('#captchaPic'));
}

function startCaptcha() {
    let captchaImgWidth = $('.captcha-pic').width();

    window.onresize = () => {
        captchaImgWidth = $('.captcha-pic').width();
        // console.log(captchaImgWidth)
    }
    
    let fragmentWidth = $('.required-fragment').width();

    let maxPosX = captchaImgWidth - fragmentWidth;
    let minPosX = fragmentWidth;
    let randomPosX;


    function getRandomPos() {
        randomPosX = Math.floor(Math.random() * (maxPosX - minPosX + 1)) + minPosX;
    
        $('.empty-fragment').css('left', randomPosX);
        return randomPosX;
    };
    getRandomPos();

    // console.log($('.captcha-pic').width());

    $('#updateCaptcha').click(() => {
        updateCaptcha.style.transform += 'rotate(360deg)';
        resetCaptcha();
        getRandomPos();

    });

    $('#slider').attr('max', maxPosX);
    let posX = 2;
    $('#slider').on('input', () => {
        posX = $('#slider').val();
        $('.required-fragment').css('left', `${posX}`);

        // console.log(posX);
        // console.log(randomPosX);
    });

    $('#checkResult').click(() => {
        const accuracyPercentage = calculateAccuracy(posX, randomPosX, maxPosX);
        $('#popup').css('display', 'none');
        $('.result-popup').css('display', 'flex');
        $('#accuracy').text(`${accuracyPercentage.toFixed(2)}`);
        if(accuracyPercentage > 95) {
            $('#accuracy').removeClass('captcha-failure');

            $('#accuracy').addClass('captcha-success');
            $('#resultResponse').text('Success!');
        } else {
            $('#accuracy').removeClass('captcha-success');

            $('#accuracy').addClass('captcha-failure');
            $('#resultResponse').text('Oh, you can try again!');
        }
        resetCaptcha();
        getRandomPos();
    });

    function calculateAccuracy(actualPosition, randomPosition, maxPosition) {
        const distanceFromRandom = Math.abs(actualPosition - randomPosition);
        const accuracyPercentage = ((maxPosition - distanceFromRandom) / maxPosition) * 100;
        return accuracyPercentage;
    }
}

$('#goFirstPage').click(() => {
    $('.result-popup').css('display', 'none');
    $('#startCaptcha').css('display', 'flex');
});

$('#goCaptcha').click(() => {
    $('.result-popup').css('display', 'none');
    $('#popup').css('display', 'flex');
});
