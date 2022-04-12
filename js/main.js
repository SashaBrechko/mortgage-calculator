let bank_id = localStorage.length

function addBank(){
    document.getElementById('add_bank').style.opacity = "50%"
    document.getElementById('my_banks').style.opacity = "100%"

    document.getElementById('sidebar').innerHTML = 
    '<hr><p>You can add a new bank here.</p>' +
    '<p>Help info:</p>' +
    '<p>- <i><u>Interest rate</u></i> - the annual percentage rate</p>' +
    '<p>- <i><u>Maximum loan</u></i> - the maximum amount of money a bank is able to borrow</p>' +
    '<p>- <i><u>Minimum down payment</u></i> - the amount of money a person needs to pay upfront</p>' +
    '<p>- <i><u>Loan term</u></i> - a period of time in which a person must pay off the loan</p><hr>'
    document.getElementById('content').innerHTML =
        '<div class="input_form">Bank name:  <br> <input type="text"   id="bank" onclick="returnBorder(\'bank\')" required>                    <br>' +
        'Interest rate (%):                  <br> <input type="number" id="interest_rate" onclick="returnBorder(\'interest_rate\')" required>           <br>' +
        'Maximum loan ($):                   <br> <input type="number" id="maximum_loan" onclick="returnBorder(\'maximum_loan\')" required>            <br>' +
        'Minimum down payment (%):           <br> <input type="number" id="minimum_down_payment" onclick="returnBorder(\'minimum_down_payment\')" required>    <br>' +
        'Loan term (months):                 <br> <input type="number" id="loan_term" onclick="returnBorder(\'loan_term\')" required>               <br>' +
        '                                    <button class="cont_btn" onclick="saveBank()">Save</button></div>'
}

function saveBank(){
    let i = bank_id
    let b_name = document.getElementById("bank").value
    let b_interest_rate = document.getElementById("interest_rate").value
    let b_maximum_loan = document.getElementById("maximum_loan").value
    let b_minimum_down_payment = document.getElementById("minimum_down_payment").value
    let b_loan_term = document.getElementById("loan_term").value
    let bank_info = {
        name: b_name, 
        interest_rate: b_interest_rate, 
        maximum_loan: b_maximum_loan, 
        minimum_down_payment: b_minimum_down_payment, 
        loan_term: b_loan_term}
    if (checkInput(b_name, [b_interest_rate, b_maximum_loan, b_minimum_down_payment, b_loan_term])){
        localStorage.setItem('bank' + i, JSON.stringify(bank_info))
        bank_id++
        myBanks()
    }else{
        alert('Invalid input: please enter text as a name and positive numbers in the other fields.')
    }
}

function myBanks(){
    document.getElementById('add_bank').style.opacity = "100%"
    document.getElementById('my_banks').style.opacity = "50%"
    document.getElementById('content').innerHTML = ''
    document.getElementById('sidebar').innerHTML = 
    '<hr><p>On this page you can add, edit and delete banks.</p>' +
    '<p>Click "✔️" to choose this bank and attach it to calculator.</p><hr>'
    for(let i = 0; i < bank_id; i++){
        let item = localStorage.getItem('bank' + i)
        if (item) {
            document.getElementById('content').innerHTML = '<br>' + displayBank(item) +
            '<br><button onclick="editBank(\'bank' + i + '\')" class="cont_btn">✏️</button>' +
            '<button onclick="removeBank(\'bank' + i + '\')" class="cont_btn">🗑️</button>' + 
            '<button onclick="Calculator(\'bank' + i + '\')" class="cont_btn">✔️</button><br><br>' +           
            document.getElementById('content').innerHTML
        }
    }
    if (localStorage.length === 0){
        document.getElementById('content').innerHTML = 
        '<p class="input_form"><i>First, add a bank</i></p>'
    } else {
        document.getElementById('content').innerHTML = 
        '<div class="input_form"><button onclick="removeAll()" class="cont_btn">Remove all banks!</button></div><br>' +
        document.getElementById('content').innerHTML
    }
}

function displayBank(item){
    let name = JSON.parse(item).name
    let interest_rate = JSON.parse(item).interest_rate
    let maximum_loan = JSON.parse(item).maximum_loan
    let minimum_down_payment = JSON.parse(item).minimum_down_payment
    let loan_term = JSON.parse(item).loan_term
    let display = 
        '<b id="bank_name">' + name + '</b>' + 
        '<br>• Interest rate = ' + interest_rate + '%' +
        '<br>• Maximum loan = $' + maximum_loan +
        '<br>• Minimum down payment = ' + minimum_down_payment + '%' +
        '<br>• Loan term = ' + loan_term + ' m.'
    return(display)
}

function removeBank(bank_key){
    localStorage.removeItem(bank_key)
    myBanks()
}

function editBank(bank_key){
    item = localStorage.getItem(bank_key)
    let name = JSON.parse(item).name
    let interest_rate = JSON.parse(item).interest_rate
    let maximum_loan = JSON.parse(item).maximum_loan
    let minimum_down_payment = JSON.parse(item).minimum_down_payment
    let loan_term = JSON.parse(item).loan_term
    document.getElementById('sidebar').innerHTML = 
    '<hr><p>You can edit a bank info here.</p>' +
    '<p>Help info:</p>' +
    '<p>- <i><u>Interest rate</u></i> - the annual percentage rate</p>' +
    '<p>- <i><u>Maximum loan</u></i> - the maximum amount of money a bank is able to borrow</p>' +
    '<p>- <i><u>Minimum down payment</u></i> - the amount of money a person needs to pay upfront</p>' +
    '<p>- <i><u>Loan term</u></i> - a period of time in which a person must pay off the loan</p><hr>'
    document.getElementById('content').innerHTML =
        '<div class="input_form">Bank name:  <br> <input type="text" id="bank" onclick="returnBorder(\'bank\')" value=\'' + name + '\' required><br>' +
        'Interest rate (%):                  <br> <input type="number" id="interest_rate" onclick="returnBorder(\'interest_rate\')" value=\'' + interest_rate + '\' required><br>' +
        'Maximum loan ($):                   <br> <input type="number" id="maximum_loan" onclick="returnBorder(\'maximum_loan\')" value=\'' + maximum_loan + '\' required><br>' +
        'Minimum down payment (%):           <br> <input type="number" id="minimum_down_payment" onclick="returnBorder(\'minimum_down_payment\')" value=\'' + minimum_down_payment + '\' required><br>' +
        'Loan term (months):                 <br> <input type="number" id="loan_term" onclick="returnBorder(\'loan_term\')" value=\'' + loan_term + '\' required><br>' +
        '                                    <button class="cont_btn" onclick="saveEditedBank(\'' + bank_key + '\')">Save</button></div>'
}

function saveEditedBank(bank_key){
    let b_name = document.getElementById("bank").value
    let b_interest_rate = document.getElementById("interest_rate").value
    let b_maximum_loan = document.getElementById("maximum_loan").value
    let b_minimum_down_payment = document.getElementById("minimum_down_payment").value
    let b_loan_term = document.getElementById("loan_term").value
    let bank_info = {
        name: b_name, 
        interest_rate: b_interest_rate, 
        maximum_loan: b_maximum_loan, 
        minimum_down_payment: b_minimum_down_payment, 
        loan_term: b_loan_term}
    if (checkInput(b_name, [b_interest_rate, b_maximum_loan, b_minimum_down_payment, b_loan_term])){
        localStorage.setItem(bank_key, JSON.stringify(bank_info))
        myBanks()
    }else{
        alert('Invalid input: please enter text as a name and positive numbers in the other fields.')
    }
}

function removeAll(){
    localStorage.clear()
    bank_id = 0
    myBanks()
}
 
function Calculator(bank_key){
    document.getElementById('add_bank').style.opacity = "100%"
    document.getElementById('my_banks').style.opacity = "100%"
    item = localStorage.getItem(bank_key)
    document.getElementById('sidebar').innerHTML = 
    '<hr><p>On this page you can calculate the monthly payment on your mortgage.</p><hr>'
    document.getElementById('content').innerHTML = 
    '<div class="input_form"> Initial loan ($): <br> <input type="number" id="initial_loan" onclick="returnBorder(\'initial_loan\')" required><br>' +
    'Down payment ($):                          <br> <input type="number" id="down_payment" onclick="returnBorder(\'down_payment\')" required><br>' +
    '                                           <button class="cont_btn" onclick="Result(\'' + bank_key + '\')">Calculate</button></div><br>' + displayBank(item)
}

function Result(bank_key){
    let item = localStorage.getItem(bank_key)
    let int_rate = JSON.parse(item).interest_rate/100
    let max_loan = JSON.parse(item).maximum_loan
    let min_down_pay = JSON.parse(item).minimum_down_payment
    let loan_term = JSON.parse(item).loan_term
    let init_loan = document.getElementById('initial_loan').value
    let down_pay = document.getElementById('down_payment').value
    if (checkCalcInput(max_loan, min_down_pay, init_loan, down_pay)){
        let mon_pay = ((init_loan-down_pay)*(int_rate/12)*(1+int_rate/12)**loan_term)/((1+int_rate/12)**loan_term-1)
        alert('Monthly payment => $' + Math.round(mon_pay))
    }else{
        alert('Invalid input: please make sure that your initial loan does not exceed the maximum loan of your chosen bank and that your down payment is sufficient.')
    }
}

function checkInput(name, dataList){
    let keys_list = ['interest_rate', 'maximum_loan', 'minimum_down_payment', 'loan_term']
    let check_cond = true
    if (!name){
        check_cond = false
        document.getElementById('bank').style.borderColor = 'tomato'
    }
    for (let item in dataList){
        if (!dataList[item] || dataList[item] == '<empty string>' || dataList[item] < 0){
            check_cond = false
            document.getElementById(keys_list[item]).style.borderColor = 'tomato'
        }
    }
    return check_cond
}

function checkCalcInput(max_loan, min_down_pay, init_loan, down_pay){
    let check_cond = false
    if (parseFloat(init_loan) <= parseFloat(max_loan)){
        if (parseFloat(down_pay) >= init_loan*(min_down_pay/100) && parseFloat(down_pay) <= parseFloat(init_loan)){
            check_cond = true
        }else{
            document.getElementById("down_payment").style.borderColor = 'tomato'
        }        
    }else{
        document.getElementById("initial_loan").style.borderColor = 'tomato'
    }
    return(check_cond)
}

function returnBorder(input_id){
    document.getElementById(input_id).style.borderColor = 'gainsboro'
}