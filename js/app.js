const serachButton = () => {
    const input = document.getElementById('input-value')
    const errorMsg = document.getElementById('error')
    const inputValue = parseInt(input.value);
    if (isNaN(inputValue) || inputValue == '') {
        errorMsg.innerText = 'Please give a number'
        errorMsg.className = 'text-danger' + ' text-center'
    } else if (inputValue < 0) {
        errorMsg.innerText = 'plesae give a positive number';
    }
    console.log(inputValue);
    input.value = ''

}