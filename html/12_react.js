var screen1 = document.querySelector('#screen');
var status = {

};
var startTime;
var endTime;
var record =[];
var timeout;

screen1.addEventListener('click',function(){

    if(screen1.classList.contains('waiting')){  //현재 대기상태인지 파악
        // console.log('클릭');
        screen1.classList.remove('waiting');
        screen1.classList.add('ready');
        screen1.textContent = '초록색이 되면 클릭하세요';
        timeout = setTimeout(function(){
            //시간 재기
            startTime = new Date(); 
            screen1.click();
        }, Math.floor(Math.random() * 1000) + 2000); //2000~ 3000사이의 수
    }else if(screen1.classList.contains('ready')){    //준비상태
        if(!startTime){   //부정클릭
            clearTimeout(timeout);
            screen1.classList.remove('ready');
            screen1.classList.add('waiting');
            screen1.textContent = '너무 성급하시군요!';
        }else{
            screen1.classList.remove('ready');
            screen1.classList.add('now');
            screen1.textContent = '클릭하세요!';    
        }
    }else if(screen1.classList.contains('now')){    //시작상태
        endTime = new Date()
        console.log('반응속도',(endTime - startTime)/1000, 's');
        record.push(endTime - startTime);
        startTime = null;
        endTime = null;
        screen1.classList.remove('now');
        screen1.classList.add('waiting');
        screen1.textContent = '클릭해서 시작하세요';
    }
});





