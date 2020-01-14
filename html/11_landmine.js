document.querySelector('#exc').addEventListener('click',function(){
    let hor = document.querySelector('#hor').value;
    let ver = document.querySelector('#ver').value;
    let mine = document.querySelector('#mine').value;
    console.log(hor,ver,mine);

    //0부터 99까지 배열 만듬
    let list = Array(hor * ver).fill().map(function(el,index){
        return index;
    });

    //셔플에 값을 하나씩 뽑아서 넣음 (지뢰 위치 뽑기)
    let suffle = [];
    while(list.length > 80){
        let move = list.splice(Math.floor(Math.random() * list.length), 1)[0];
        suffle.push(move);
    }
    console.log(suffle);

    let dataset = [];
    let tbody = document.querySelector('table tbody');
    for(let i = 0; i < ver; i++){
        let arr = [];
        let tr = document.createElement('tr');
        dataset.push(arr);
        for(let j = 0; j < hor; j++){
            let td = document.createElement('td');
            arr.push(1);
            tr.appendChild(td);
            // td.textContent = 1;
        }
        tbody.appendChild(tr);
    }
    console.log(dataset);

    //지뢰 심기
    for (let k=0; k < suffle.length; k++){       // 예 60
        let ve = Math.floor(suffle[k] / 10 );   // 6줄 
        let ho = suffle[k] % 10;                // 0칸 
        console.log(ve,ho);
        tbody.children[ve].children[ho].textContent = 'x';
        dataset[ve][ho] = 'x';
    }
    console.log(dataset);
});