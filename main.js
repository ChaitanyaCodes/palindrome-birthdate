function reverseStr(str){
    return str.split('').reverse().join('');
}

function isPalindrome(str){
    return str === reverseStr(str);
}

function convertDateToStr(date){
    let dateStr = { day: '', month: '', year: ''};

    date.day < 10 ? dateStr.day = '0' + date.day : dateStr.day = date.day.toString();
    date.month < 10 ? dateStr.month = '0' + date.month : dateStr.month = date.month.toString();
    dateStr.year = date.year.toString();

    return dateStr
}

function getAllFormatsOfDate(date){
    let dateStr = convertDateToStr(date);
    
    let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAll(date){
    let listOfDateFormats = getAllFormatsOfDate(date);

    for(let index = 0; index < listOfDateFormats.length; index++){
        if(isPalindrome(listOfDateFormats[index])){
            return true;
        }
    }
    return false;
}

function isLeapYear(year){
    if(year % 400 === 0){
        return true;
    }

    if(year % 100 === 0){
        return false;
    }

    if(year % 4 === 0){
        return true;
    }
}

function getNextDate(date){
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // check if its february
    if(month === 2 ){
        // check leap year
        if(isLeapYear(year)){ //leap year condition
            if(day > 29){
                day = 1;
                month++;
            }
        }else{ // not a leap year
            if(day > 28){
                day = 1;
                month++;
            }
        }
    } else {
        // check for other months
        if(day > daysInMonth[month - 1]){
            day = 1;
            month++;
        }
    }

    if(month > 12){
        month = 1;
        year++;
    }

    return { day: day, month: month, year: year};
}

function getNextPalindromeDate(date){
    let days = 0;
    let nextDate = getNextDate(date);

    while(true){
        days++;
        if(checkPalindromeForAll(nextDate)){
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [days, nextDate]
}



const birthdate = document.querySelector("#birthdate");
const messageArea = document.querySelector(".message-area");
const checkBtn = document.querySelector(".check-btn");


checkBtn.addEventListener("click", handleCheck);

function handleCheck(){
    let birthdateStr = birthdate.value;

    if(birthdateStr !== ''){
        let dateElements = birthdateStr.split('-');
        let date = {day: Number(dateElements[1]), month: Number(dateElements[2]), year: Number(dateElements[0])}
        if(checkPalindromeForAll(date)){
            messageArea.innerText = "Yay!!! your birthdate is an palindrome date.";
        }else{
            let nextPalindromeDate = getNextPalindromeDate(date);
            messageArea.innerText = "Nah!! your birthdate is not a palindrome date. You missed by " + nextPalindromeDate[0] + " days. The next palindrome date is " + nextPalindromeDate[1].day + "-" + nextPalindromeDate[1].month + "-" + nextPalindromeDate[1].year;
        }
    }else{
        messageArea.innerText = "Please! Enter the birthdate.";
    }
}