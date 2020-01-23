let tbody = document.querySelector('table tbody');
let dataset = [];
let flag = false;
let open = 0;
let code = {
    연칸 : -1,
    물음표 : -2,
    깃발 : -3,
    깃발지뢰 : -4,
    물음표지뢰 : -5,
    지뢰 : 1,
    보통칸 : 0,
}

document.querySelector('#exc').addEventListener('click',function(){
    tbody.innerHTML = '';
    dataset = [];
    flag = false;
    open = 0;
    document.querySelector('#result').textContent = '';
    let hor = document.querySelector('#hor').value;
    let ver = document.querySelector('#ver').value;
    let mine = document.querySelector('#mine').value;
    // console.log(hor,ver,mine);

    //0부터 99까지 배열 만듬
    let list = Array(hor * ver).fill().map(function(el,index){
        return index;
    });

    //셔플에 값을 하나씩 뽑아서 넣음 (지뢰 위치 뽑기)
    let suffle = [];
    while(list.length > (hor * ver - mine)){
        let move = list.splice(Math.floor(Math.random() * list.length), 1)[0];
        suffle.push(move);
    }
    // console.log(suffle);


    for(let i = 0; i < ver; i++){
        let arr = [];
        let tr = document.createElement('tr');
        dataset.push(arr);
        for(let j = 0; j < hor; j++){
            arr.push(code.보통칸);
            let td = document.createElement('td');
            td.addEventListener('contextmenu', function(e){
                e.preventDefault();
                // console.log('우클릭');

                if(flag){
                    return;
                }
                
                let 부모tr = e.currentTarget.parentNode;
                let 부모tbody = e.currentTarget.parentNode.parentNode;
                let 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);  
                let 줄 = Array.prototype.indexOf.call(부모tbody.children, e.currentTarget.parentNode);  
                // console.log(줄, 칸);
                if(e.currentTarget.textContent === '' || e.currentTarget.textContent === 'x'){
                    e.currentTarget.textContent = '!';
                    e.currentTarget.classList.add('flag');
                    if(dataset[줄][칸] === code.지뢰 ){
                        dataset[줄][칸] = code.깃발지뢰;
                    }else{
                        dataset[줄][칸] = code.깃발;
                    }
                }else if(e.currentTarget.textContent === '!'){
                    e.currentTarget.textContent = '?';
                    e.currentTarget.classList.add('question');
                    e.currentTarget.classList.remove('flag');
                    if(dataset[줄][칸] === code.깃발지뢰 ){
                        dataset[줄][칸] = code.물음표지뢰;
                    }else{
                        dataset[줄][칸] = code.물음표;
                    }
                }else if(e.currentTarget.textContent === "?"){
                    e.currentTarget.classList.remove('question');
                    if(dataset[줄][칸] === code.물음표지뢰){
                        e.currentTarget.textContent = 'x';
                        dataset[줄][칸] = code.지뢰;
                    }else{
                        e.currentTarget.textContent = '';
                        dataset[줄][칸] = code.보통칸;
                    }
                }
                // console.log(dataset);
            });
            td.addEventListener('click', function(e){
                if(flag){
                    return;
                }
                let 부모tr = e.currentTarget.parentNode;
                let 부모tbody = e.currentTarget.parentNode.parentNode;
                let 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);  
                let 줄 = Array.prototype.indexOf.call(부모tbody.children, e.currentTarget.parentNode);  

                if([code.연칸, code.깃발, code.깃발지뢰, code.물음표지뢰,code.물음표].includes(dataset[줄][칸])){
                    return;
                }

                
                //클릭했을때 주변 지뢰 개수
                e.currentTarget.classList.add('opened');

                open += 1;
                
                if(dataset[줄][칸] === code.지뢰){
                    e.currentTarget.textContent = '펑!';
                    document.querySelector('#result').textContent= '실패!';
                    flag = true;
                }else{
                    dataset[줄][칸] = code.연칸;
                    let 주변 = [                       
                        dataset[줄][칸-1], dataset[줄][칸+1]
                    ];
                    if(dataset[줄-1]){
                        주변 = 주변.concat([dataset[줄-1][칸-1], dataset[줄-1][칸], dataset[줄-1][칸+1]]);
                    }
                    if(dataset[줄+1]){
                        주변 = 주변.concat([dataset[줄+1][칸-1], dataset[줄+1][칸], dataset[줄+1][칸+1]]);
                    }
                    // console.log(주변);
                    let 주변지뢰개수 = 주변.filter(function(v){
                        return [code.지뢰,code.깃발지뢰, code.물음표지뢰].includes(v);
                    }).length;
                    e.currentTarget.textContent = 주변지뢰개수 || '';

                    dataset[줄][칸] = code.연칸;

                    //주변칸 지뢰가 0개면
                    if(주변지뢰개수 === 0){
                        //주변 8칸 동시 오픈
                        let 주변칸 = [];
                        if (tbody.children[줄-1]) {
                            주변칸 = 주변칸.concat([
                                tbody.children[줄-1].children[칸-1],
                                tbody.children[줄-1].children[칸],
                                tbody.children[줄-1].children[칸+1],
                            ]);
                        }
                        주변칸 = 주변칸.concat([
                            tbody.children[줄].children[칸-1],
                            tbody.children[줄].children[칸+1],
                        ]);
                        
                        if (tbody.children[줄+1]){
                            주변칸 = 주변칸.concat([
                                tbody.children[줄+1].children[칸-1],
                                tbody.children[줄+1].children[칸],
                                tbody.children[줄+1].children[칸+1],
                            ]);
                        }
                        
                        주변칸.filter(function(v) {return !!v; }).forEach(function(옆칸){
                            let 부모tr = 옆칸.parentNode;
                            let 부모tbody = 옆칸.parentNode.parentNode;
                            let 옆칸칸 = Array.prototype.indexOf.call(부모tr.children, 옆칸);  
                            let 옆칸줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);  
                            if(dataset[옆칸줄][옆칸칸] !== code.연칸 ){
                                옆칸.click();
                            }
                        });
                    }
                }
                // console.log(open);
                if(open === hor * ver - mine){
                    flag = true;
                    document.getElementById('result').textContent = '성공';
                }


            });
            // arr.push(1);
            tr.appendChild(td);
            // td.textContent = 1;
        }
        tbody.appendChild(tr);
    }
    // console.log(dataset);

    //지뢰 심기
    for (let k=0; k < suffle.length; k++){       // 예 60
        let ve = Math.floor(suffle[k] / ver );   // 6줄 
        let ho = suffle[k] % ver;                // 0칸 
        // console.log(ve,ho);
        tbody.children[ve].children[ho].textContent = 'x';
        dataset[ve][ho] = code.지뢰;
    }
    // console.log(dataset);
});

//재귀함수
// function 재귀함수(숫자){
//     console.log(숫자);
//     if(숫자 < 5){
//         재귀함수(숫자 + 1);
//     }
// }

// 재귀함수(1);