import React, { useState } from 'react';

// Function that simulates a coin flip
function flipCoin() {
    return Math.random() > 0.5 ? 'heads' : 'tails';
}

// Function that simulates getting five "heads" in a row using Promises
function fiveHeads(updateHistory) {
    return new Promise((resolve, reject) => {
        let headsCount = 0;
        let attempts = 0;
        while (headsCount < 5 && attempts < 100) {
            attempts++;
            let result = flipCoin();
            updateHistory(`${result} was flipped`);
            if (result === 'heads') {
                headsCount++;
            } else {
                headsCount = 0;
            }
        }
        if (headsCount === 5) {
            resolve(`It took ${attempts} tries to get five "heads"`);
        } else {
            reject('More than 100 attempts were made');
        }
    });
}

const CoinFlip = () => {
    const [result, setResult] = useState('');
    const [history, setHistory] = useState([]);

    const handleFlip = () => {
        setHistory([]); // Reset history
        fiveHeads((message) => {
            setHistory(prevHistory => [...prevHistory, message]);
        })
            .then(res => setResult(res))
            .catch(err => setResult(err));
    };

    return (
        <div className="container">
            <h1>Coin Flip</h1>
            <button className="button" onClick={handleFlip}>Flip Coin</button>
            <p>{result}</p>
            <h2>Flip History:</h2>
            <ul>
                {history.map((entry, index) => (
                    <li key={index}>{entry}</li>
                ))}
            </ul>
        </div>
    );
};

export default CoinFlip;
