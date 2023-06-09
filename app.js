document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const scoreDisplay = document.getElementById('score')
  const width = 8
  const squares = []
  let score = 0

  const candyColors = [
    'red',
    'yellow',
    'orange',
    'purple',
    'green',
    'blue'
  ]


  // Create a board using forloop
  function createBoard() {
    // width*width shows that you are leaving something 64 times and increasing/implementing by 1 per time. This is a syntax forLoop
    for (let i=0; i < width*width; i++) {
      // Note that const square, let randomClor, square.style, grid.appendChild, squares.push are the first code to get the random colors using for loop
      const square = document.createElement('div')

      // Each time i create a board, I also want to make it darggable
      square.setAttribute('draggable', true)

      // We will now give id to each square while looping over with our i. We will give our numbers from 0 - 63 because we have 64 
      square.setAttribute('id', i)

      // to get a candy color and a random number for our array we use 3 inbuilt method. We then have a random number from 0 - 5
      let randomColor = Math.floor(Math.random() * candyColors.length) 

      // For candy colors in the array. Now that we have color randomly let's move on.
      square.style.backgroundColor = candyColors[randomColor] 

      // putting our square in a class of grid
      grid.appendChild(square)

      // push your squares into your grid
      squares.push(square)
    }
  }
  createBoard()

  // Drag the candies
  // Now that we done with creating the board we will go into dragging. DRAG THE CANDIES. Each stage of dragging have 5 events

  let colorBeingDragged
  let colorBeingReplaced
  let squareIdBeingDragged
  let squareIdBeingReplaced

  squares.forEach(square => square.addEventListener('dragstart', dragStart))
  squares.forEach(square => square.addEventListener('dragend', dragEnd))
  squares.forEach(square => square.addEventListener('dragover', dragOver))
  squares.forEach(square => square.addEventListener('dragenter', dragEnter))
  squares.forEach(square => square.addEventListener('dragleave', dragLeave))
  squares.forEach(square => square.addEventListener('drop', dragDrop))

  function dragStart() {
    colorBeingDragged = this.style.backgroundColor
    squareIdBeingDragged = parseInt(this.id)
    console.log(colorBeingDragged)
    console.log(this.id, 'dragStart')
  }

  function dragOver(e) {
    e.preventDefault()
    console.lpg(this.id, 'dragOver')
  }

  function dragEnter(e) {
    e.preventDefault()
    console.log(this.id, 'dragEnter')
  }

  function dragLeave() {
    console.log(this.id, 'dragLeave')
  }

  function dragDrop() {
    console.log(this.id, 'dragDrop')
    colorBeingReplaced = this.style.backgroundColor
    squareIdBeingReplaced = parseInt(this.id)
    this.style.backgroundColor = colorBeingDragged
    squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced
  }

  function dragEnd() {
    console.log(this.id, 'dragEnd')
    // what is a valid move?
    let validMoves = [
      squareIdBeingDragged -1, 
      squareIdBeingDragged -width,
      squareIdBeingDragged +1,
      squareIdBeingDragged +width
    ]
    let validMove = validMoves.includes(squareIdBeingReplaced)

    if (squareIdBeingReplaced && validMove) {
      squareIdBeingReplaced = null
    } else if (squareIdBeingReplaced && !validMove) {
      squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced
      squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
    } else squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
  }

  // drop candies once some have been cleared
  function moveDown() {
    for (i = 0; i < 55; i++) {
      if (squares[i + width].style.backgroundColor === '') {
        squares[i + width].style.backgroundColor = squares[i].style.backgroundColor
        squares[i].style.backgroundColor = ''
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
        const isFirstRow = firstRow.includes(i)
        if (isFirstRow && squares[i].style.backgroundColor === '') {
          let randomColor = Math.floor(Math.random() * candyColors.length)
          squares[i].style.backgroundColor = candyColors[randomColor]
        }

      }
    }
  }

  // Checking for matches
  // Checking for row of Four
  function checkRowForFour() {
    for (i = 0; i < 60; i++) {
      let rowOfFour = [i, i+1, i+2, i+3]
      let decidedColor = squares[i].style.backgroundColor
      const isBlank = squares[i].style.backgroundColor === ''

      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
      if (notValid.includes(i)) continue

      if (rowOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
        score += 4
        scoreDisplay.innerHTML = score
        rowOfFour.forEach(index => {
          squares[index].style.backgroundColor = ''
        })
      }
    }
  }
  checkRowForFour()

  // Checking for column of Four
  function checkColumnForFour() {
    for (i = 0; i < 47; i++) {
      let columnOfFour = [i, i+width, i+width*2, i*width*3]
      let decidedColor = squares[i].style.backgroundColor
      const isBlank = squares[i].style.backgroundColor === ''

      if (columnOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
        score += 4
        scoreDisplay.innerHTML = score
        columnOfFour.forEach(index => {
          squares[index].style.backgroundColor = ''
        })
      }
    }
  }
  checkColumnForFour()

  // Checking for row of Three
  function checkRowForThree() {
    for (i = 0; i < 61; i++) {
      let rowOfThree = [i, i+1, i+2]
      let decidedColor = squares[i].style.backgroundColor
      const isBlank = squares[i].style.backgroundColor === ''

      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
      if (notValid.includes(i)) continue

      if (rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
        score += 3
        scoreDisplay.innerHTML = score
        rowOfThree.forEach(index => {
          squares[index].style.backgroundColor = ''
        })
      }
    }
  }
  checkRowForThree()

  // Checking for column of Three
  function checkColumnForThree() {
    for (i = 0; i < 47; i++) {
      let columnOfThree = [i, i+width, i+width*2]
      let decidedColor = squares[i].style.backgroundColor
      const isBlank = squares[i].style.backgroundColor === ''

      if (columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
        score += 3
        scoreDisplay.innerHTML = score
        columnOfThree.forEach(index => {
          squares[index].style.backgroundColor = ''
        })
      }
    }
  }
  checkColumnForThree()


  window.setInterval(function(){
    moveDown()
    checkRowForFour()
    checkColumnForFour()
    checkRowForThree()
    checkColumnForThree()
  }, 100)
})
