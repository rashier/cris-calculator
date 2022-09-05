let currentInput = document.querySelector('.currentInput')
let answerScreen = document.querySelector('.answerScreen')
let buttons = document.querySelectorAll('button')
let erasebtn = document.querySelector('#erase')
let clearbtn = document.querySelector('#clear')
let evaluate = document.querySelector('#evaluate')
let realTimeScreenValue = []

clearbtn.addEventListener('click', () => {
  realTimeScreenValue = ['']
  answerScreen.innerHTML = 0
  currentInput.className = 'currentInput'
  answerScreen.className = 'answerScreen'
  answerScreen.style.color = 'rgba(150, 150, 150, 0.87)'
})

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const conditions = ['=', '%','/100']
    if (conditions.some(e => realTimeScreenValue.includes(e)) && btn.classList.contains('num_btn')) {
      realTimeScreenValue = []
    } else if (conditions.some(e => realTimeScreenValue.includes(e)) && btn.classList.contains('fun_btn')){
      realTimeScreenValue = new Object((answerScreen.innerHTML).split(''))
    }
    // When clicked button is not erased button
    if (!btn.id.match('erase')) {
      // To display value on btn press
      realTimeScreenValue.push(btn.value)
      currentInput.innerHTML = realTimeScreenValue.join('')

      if (btn.value === '%') {
        const index = realTimeScreenValue.indexOf('%');
        if (index > -1) {
          realTimeScreenValue.splice(index, 1);
        }
        realTimeScreenValue.push('/100')
      } 

      // To evaluate answer in real time
      if (btn.classList.contains('num_btn') || btn.id.match('percentage')) {
        answerScreen.innerHTML = eval(realTimeScreenValue.join(''))
      }
    }
    // When erase button is clicked
    if (btn.id.match('erase')) {
      realTimeScreenValue.pop()
      currentInput.innerHTML = realTimeScreenValue.join('')
      answerScreen.innerHTML = eval(realTimeScreenValue.join(''))
    }
    // When clicked button is evaluate button
    if (btn.id.match('evaluate') || btn.id.match('percentage')) {
      currentInput.className = 'answerScreen'
      answerScreen.className = 'currentInput'
      answerScreen.style.color = 'white'
      currentInput.innerHTML = answerScreen.innerHTML
      realTimeScreenValue.push((currentInput.innerHTML).split(''))
    }

    // To prevent undefined error in screen
    if (answerScreen.innerHTML == 'undefined') {
      answerScreen.innerHTML = 0
    }
  })
})