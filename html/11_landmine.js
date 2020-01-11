document.querySelector('#exc').addEventListener('click',function(){
    let hor = document.querySelector('#hor').value;
    let ver = document.querySelector('#ver').value;
    let mine = document.querySelector('#mine').value;
    console.log(hor,ver,mine);

    let dataset = [];
    let tbody = document.querySelector('table tbody');
    for(let i = 0; i < ver; i++){
        let arr = [];
        let tr = document.createElement('tr');
        for(let j = 0; j < hor; j++){
            let td = document.createElement('td');
            arr.push(1);
            tr.append(td);
            // td.textContent = 1;
        }
        tbody.append(tr);
    }
    console.log(dataset);
});