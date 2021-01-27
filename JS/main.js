// 입력창의 입력값 받아오기

// 사용변수
const GAME_TIME = 9;
let score = 0; // 점수는 변경이 일어나는 변수 
let time = GAME_TIME; // 기본시간 : 9초
let isPlaying = false; 
let timeInterval; // interval을 변수에 담아 조정기하위해 선언
let checkInterval;
let words = []; // 배열 선언

// word-input을 불러오기위해 변수 wordInput를 선언
const wordInput = document.querySelector('.word-input');
// word-display를 불러오기위해 변수 wordInput를 선언
const wordDisplay = document.querySelector('.word-display');

const scoreDisplay = document.querySelector('.score');

const timeDisplay = document.querySelector('.time');

const button = document.querySelector('.button');

init(); //메소드 생성

function init(){
    buttonChange('게임로딩중');
    getWords() // 인풋에 입력되는 단어들을 불러온다
    wordInput.addEventListener('input',checkMatch) // input이 발생할 때마다 checkMatch 가 실행된다
}

function checkStatus(){
    if(!isPlaying && time === 0){ // 만약 isPlaying이 아니고 시간이 0초라고 하면
        buttonChange('게임시작')
        clearInterval(checkInterval)
    }

}


// 단어 불러오기
function getWords(){
    axios.get('https://random-word-api.herokuapp.com/word?number=100')
        .then(function (response) {
            // handle success

            response.data.forEach((word) => { // forEach의 반복문에 하나하나의 단어를 담는다
                if(word.length > 10) { // 단어의 길이가 10보다 작으면 
                    words.push(word); // word에 넣어준다
                }
            })
            buttonChange('게임시작');
                       
        })

        .catch(function (error) {
            // handle error
            console.log(error);
        })
 
}



// 단어 일치 체크
function checkMatch (){ // => 에로우 펑션
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){ // toLowerCase : 제시된 단어가 항상 소문자로 설정
      wordInput.value = ''; // input창 초기화 
      if(!isPlaying){ // 게임중이 아니면 (isPlaying이 아니면)
        return; // 리턴을 시켜 값을 초기화한다
      }
      score++; // wordInput 값과 wordDisplay의 텍스트가 같다면 점수를 1점 증가 시켜준다
      scoreDisplay.innerText = score;
      time = GAME_TIME;
      const randomIndex = Math.floor(Math.random() * words.length); //  배열의 길이만큼  랜덤 인덱스를 만들어 랜덤 숫자를 만들어준다 ,Math.floor => 소숫점을 잘라준다
      wordDisplay.innerText = words[randomIndex] // 랜덤한 숫자의 배열의 인덱스가 표시되게 한다
      
    } 
     
};


buttonChange('게임시작') // buttonChange 메소드에 '게임시작'이라는 text값을 넣어준다

//게임 실행
function run(){
    if(isPlaying){ // isPlaying이 true라고 하면 return해준다 => 게임이 실행이 안된다
        return;
    }
    isPlaying = true; // run실행시 isPlaying을 true로 바꿔준다
    time = GAME_TIME;
    wordInput.focus(); //마우스 포커스가 가게 만들어준다
    scoreDisplay.innerText = 0; // 점수 텍스트를 0으로 초기화시켜준다
    timeInterval = setInterval(countDown,1000); // countDown함수를 1초마다 실행한다
    checkInterval = setInterval(checkStatus, 50) // checkStatus 가 50micro second 만큼 반복하도록 하게해준다
    buttonChange('게임중')
}

function countDown(){
    time > 0 ? time--: isPlaying = false; //  time이 0보다 크게 될때 참일경우 시간을 1초 감소 시켜주고 거짓일 경우 게임이 종료된다 * 삼항연산자 => (조건) ? 참일경우 : 거짓일경우
    if(!isPlaying){ // isPlaying이 false이면
        clearInterval(timeInterval) // incerval 종료 
    }
    timeDisplay.innerText = time; // 시간이 줄어들때마다 innerText를 time으로 바꿔준다
}

function buttonChange(text){ // text를 인자로 받는다
    button.innerText = text;
    text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading');
// text가 '게임시작' 이라고 하면 loading클래스를 지워주고 그렇지 않으면 loading클래스를 더해준다

}