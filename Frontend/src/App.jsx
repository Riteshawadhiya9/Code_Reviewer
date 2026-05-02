import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { FiCode, FiCopy, FiCheck, FiZap, FiAlertTriangle, FiCpu } from 'react-icons/fi';

function App() {
  const [code, setCode] = useState(`// Simulated User Management System with intentional bugs

const database = {
    users: [],
    logs: []
};

function generateId() {
    return Math.random().toString(36).substr(2, 9)
}

function createUser(name, age, email) {
    if (!name || !age || !email) {
        console.log("Missing fields")
    }

    let user = {
        id: generateId,
        name: name,
        age: age,
        email: email,
        createdAt: new Date
    }

    database.users.push(user)
    return user
}

function getUserById(id) {
    for (let i = 0; i < database.users.length; i++) {
        if (database.users[i].id === id) {
            return database.users[i]
        }
    }
    return null
}

function updateUser(id, data) {
    let user = getUserById(id)

    if (!user) {
        return "User not found"
    }

    for (let key in data) {
        user[key] = data.key
    }

    return user
}

function deleteUser(id) {
    let index = database.users.findIndex(u => u.id === id)

    if (index === -1) {
        return false
    }

    database.users.splice(index, 0)
    return true
}

function logAction(action) {
    database.logs.push({
        action,
        time: Date.now
    })
}

function sendEmail(user) {
    if (!user.email.includes("@")) {
        throw "Invalid email"
    }

    console.log("Sending email to " + user.email)
}

function asyncTask(callback) {
    setTimeout(() => {
        callback("Done")
    }, 1000)
}

function processUsers() {
    database.users.forEach(user => {
        if (user.age > 18) {
            sendEmail(user)
        }
    })
}

function calculateAverageAge() {
    let sum = 0

    for (let i = 0; i <= database.users.length; i++) {
        sum += database.users[i].age
    }

    return sum / database.users.length
}

function findUserByEmail(email) {
    return database.users.find(user => {
        user.email === email
    })
}

function simulate() {
    let u1 = createUser("Rohit", 25, "rohit@mail.com")
    let u2 = createUser("Amit", "30", "amitmail.com")
    let u3 = createUser("Sara", 22, "sara@mail.com")

    updateUser(u1.id, { age: 26 })

    deleteUser(u2.id)

    processUsers()

    console.log(calculateAverageAge())

    asyncTask((result) => {
        console.log("Async result:", result)
    })
}

simulate()

// Extra buggy logic

function sortUsers() {
    return database.users.sort((a, b) => {
        return a.age > b.age
    })
}

function cloneUsers() {
    let cloned = []
    for (let i = 0; i < database.users.length; i++) {
        cloned.push(database.users[i])
    }
    return cloned
}

function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj))
}

function addBulkUsers(list) {
    list.forEach(user => {
        createUser(user.name, user.age, user.email)
    })
}

function faultyPromise() {
    return new Promise((resolve, reject) => {
        if (true) {
            resolve("Success")
        }
        reject("Failure")
    })
}

function testPromise() {
    faultyPromise().then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
}

function mutateUser(user) {
    user = {
        name: "Changed"
    }
}

function accessUndefined() {
    let obj = {}
    return obj.value.name
}

function divide(a, b) {
    return a / b
}

function checkEquality(a, b) {
    if (a == b) {
        return true
    }
    return false
}

function infiniteLoop() {
    let i = 0
    while (i < 10) {
        console.log(i)
    }
}

function wrongThis() {
    return {
        value: 10,
        getValue: function () {
            return this.value
        },
        getValueArrow: () => {
            return this.value
        }
    }
}

function main() {
    testPromise()

    try {
        accessUndefined()
    } catch (e) {
        console.log("Error caught")
    }

    console.log(divide(10, 0))
    console.log(checkEquality(5, "5"))

    let obj = wrongThis()
    console.log(obj.getValue())
    console.log(obj.getValueArrow())
}

main()
`);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    const count = code.split('\n').length;
    setLineCount(count);
  }, [code]);

  async function reviewCode() {
    try {
      setLoading(true);
      setError(null);
      setReview('');
      const response = await axios.post('http://localhost:3000/ai/get-review', { code });
      setReview(response.data.review || response.data);
    } catch (err) {
      setError('Failed to get review: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard() {
    if (!review) return;
    navigator.clipboard.writeText(review).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }, (err) => {
      console.error('Failed to copy text: ', err);
    });
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <FiCpu />
          <h1>CodeGuard AI</h1>
        </div>
        <p>Advanced AI-powered code analysis and review</p>
      </header>

      <main className="main-content">
        <div className="panel editor-panel">
          <div className="panel-header">
            <FiCode />
            <h2>Code Editor</h2>
          </div>
          <div className="editor-wrapper">
            <div className="line-numbers">
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              className="code-input"
              spellCheck="false"
            />
          </div>
          <div className="panel-footer">
            <div className="char-count">{code.length} characters</div>
            <button
              onClick={reviewCode}
              className="review-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner-small"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <FiZap />
                  Analyze Code
                </>
              )}
            </button>
          </div>
        </div>

        <div className="panel analysis-panel">
          <div className="panel-header">
            <h2>AI Analysis</h2>
            {review && (
              <button onClick={copyToClipboard} className="copy-button">
                {copied ? <><FiCheck /> Copied</> : <><FiCopy /> Copy</>}
              </button>
            )}
          </div>
          <div className="analysis-content">
            {loading && (
              <div className="state-overlay">
                <div className="spinner-large"></div>
                <p>Analyzing your code, please wait...</p>
              </div>
            )}
            {error && (
              <div className="state-overlay error-state">
                <FiAlertTriangle size={40} />
                <h3>An Error Occurred</h3>
                <p>{error}</p>
              </div>
            )}
            {!loading && !error && !review && (
              <div className="state-overlay empty-state">
                <FiCpu size={40} />
                <h3>Awaiting Analysis</h3>
                <p>Your code analysis will appear here.</p>
              </div>
            )}
            {review && (
              <pre className="review-text">{review}</pre>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;