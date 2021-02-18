const input = document.querySelector('#searchBox');
const btn = document.querySelector('#btn-search');
const result = document.querySelector('.result');

btn.addEventListener('click',(e) => {
    e.preventDefault();

    result.innerHTML = 'Loading...'

    fetch('/weather?address=' + encodeURIComponent(input.value)).then((response) => {
        response.json().then((data) => {
            if(data.error){
                result.innerHTML = data.error;
            }else{
                result.innerHTML = data.forecast;
                result.innerHTML += data.location;
            }
    
        })
    })
})



