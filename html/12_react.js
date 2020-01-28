var screen1 = document.querySelector('#screen');
var status = {

};


screen1.addEventListener('click',function(){
    if(screen1.classList.contains('waiting')){  //현재 준비상태인지 파악
        // console.log('클릭');
        screen1.classList.remove('waiting');
        screen1.classList.add('ready');
        screen1.textContent = '초록색이 되면 클릭하세요';
    }else if(screen1.classList.contains('ready')){
        screen1.classList.remove('ready');
        screen1.classList.add('now');
        screen1.textContent = '클릭하세요!';
    }else if(screen1.classList.contains('now')){
        screen1.classList.remove('now');
        screen1.classList.add('waiting');
        screen1.textContent = '클릭해서 시작하세요';
    }
});





