var screen1 = document.querySelector('#screen');
var status = {

};



screen1.addEventListener('click',function(){
    var startTime;

    if(screen1.classList.contains('waiting')){  //현재 준비상태인지 파악
        // console.log('클릭');
        screen1.classList.remove('waiting');
        screen1.classList.add('ready');
        screen1.textContent = '초록색이 되면 클릭하세요';
        setTimeout(function(){
            //시간 재기
            startTime = new Date(); 
            screen1.click();
        }, Math.floor(Math.random() * 1000) + 2000); //2000~ 3000사이의 수
    }else if(screen1.classList.contains('ready')){
        screen1.classList.remove('ready');
        screen1.classList.add('now');
        screen1.textContent = '클릭하세요!';
    }else if(screen1.classList.contains('now')){
        var endTime = new Date();
        console.log('반응속도',(endTime - startTime)/1000, 's');
        screen1.classList.remove('now');
        screen1.classList.add('waiting');
        screen1.textContent = '클릭해서 시작하세요';
    }
});





