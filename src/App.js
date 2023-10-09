import {useEffect, useState} from 'react'

import './App.css'
import Thread from './Thread'


function isCorrectNumber(value) {
  return !isNaN(Number(value))
}

function isValidNumber(value) {
  if (!isCorrectNumber(value)) return false
  return value > 0
}

function isValidThreads(threads) {
  let valid = true
  threads.forEach(thread => {
    const isValidAmount = isValidNumber(thread.amount)
    const isValidThickness = isValidNumber(thread.thickness)
    if ((!isValidAmount) || (!isValidThickness)) {
      valid = false
    }
  })
  return valid
}

function App() {
  const [threads, setThreads] = useState([
    {"amount": 1, "thickness": 3000},
    {"amount": 1, "thickness": 2000},
  ])
  const [totalThickness, setTotalThickness] = useState("0")

  useEffect(() => {
    if (!isValidThreads(threads)) {
      setTotalThickness("0")
      return
    }

    let invertValue = 0
    threads.forEach(thread => {
      invertValue += thread.amount / thread.thickness
    })
    const value = 1 / invertValue
    setTotalThickness(value.toFixed(2))
  }, [threads])

  const setThread = (thread, index) => {
    setThreads(prevThreads => {
      return prevThreads.map((prevThread, threadIndex) => {
        return index === threadIndex ? thread : prevThread
      })
    })
  }

  const addThread = () => {
    setThreads(prevThreads => [...prevThreads, {"amount": 1, "thickness": 1500}])
  }

  const deleteThread = index => {
    setThreads(threads.filter((_, i) => i !== index))
  }


  return (
    <div className="App">
      <h2 className="title">Толщина ниток</h2>
      {
        totalThickness !== "0"
          ? <h1>Суммарная толщина: {totalThickness}</h1>
          : <h1 className="warning">Укажите данные ниток</h1>
      }
      {
        threads.map((thread, index) => {
          return <div className="thread" key={index}>
            <Thread
              amount={thread.amount}
              thickness={thread.thickness}
              setThread={newThread => setThread(newThread, index)}
            />
            {
              threads.length > 2
                ? <button
                  onClick={() => deleteThread(index)}
                  className="btn delete-thread"
                >-</button>
                : null
            }
          </div>
        })
      }
      <button
        onClick={() => addThread()}
        className="btn add-thread"
      >+</button>
    </div>
  )
}

export default App
