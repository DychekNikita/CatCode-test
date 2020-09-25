const address = document.querySelector('.address')
const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
const token = "adbbe124727597c5ef767121b785ef661faf41ad";
$('.hints').hide()
let createElem = (result) => {
    $('.hints').hide()
    if (result.length === 0){
        $('.hints').text('Указанного адреса не существует')
        $('.hints').show()
       return;
    }
    result.forEach(element => {
          $('.hints').append($('<li>',
          {
            'class': 'hint',
            text: element.value
          }
          ));
        $('.hints').show()
});
}

 $('.address').on('input', e => {
    $('.hints').text('')
    let query = $(e.target).val();
    const options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({query: query})
    }
    fetch(url, options)
        .then(response => response.json())
        .then(result => {
            createElem(result.suggestions);
        })
        .catch(error => console.log("error", error));
});
