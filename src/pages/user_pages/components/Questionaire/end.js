import "./gameP1.css"
import "./gameP2.css"
function EndGame() {
    const username = document.getElementById('username');
    const saveScoreBtn = document.getElementById('saveUsername');
    // const finalScore = document.getElementById('finalScore');
    const mostRecentScore = localStorage.getItem('mostRecentScore');

    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    const MAX_HIGH_SCORES = 5;


    username.addEventListener('keyup', () => {
        saveScoreBtn.disabled = !username.value;
    });

    function saveHighScore(e){
        e.preventDefault();

        const score = {
            score: mostRecentScore,
            name: username.value,
        };
        highScores.push(score);
        highScores.sort((a, b) => b.score - a.score);
        highScores.splice(5);

        localStorage.setItem('highScores', JSON.stringify(highScores));
        window.location.assign('/');
    };
    return (
    <body>
        <div class="container">
        <div id="end" class="flex-center flex-column">
            <h3 id="finalScore">Set Username</h3>
            <form>
            <input
                type="text"
                name="username"
                id="username"
                placeholder="username"
            />
            <button
                type="submit"
                class="btn"
                id="saveUsername"
                onclick="saveHighScore(event)"
                disabled
            >
                Save
            </button>
            <h3 id="finalScore">What is your Height?</h3>
            <input
                type="text"
                name="username"
                id="feet"
                placeholder="feet"
            />
            <input
                type="text"
                name="username"
                id="inches"
                placeholder="inches"
            />
            </form>
        </div>
        <div id="Gend">
            <h3 id="Gend2">What is your Gender?</h3>
            <label class="form-control">
                <input type="radio" name="radio" />
                Male
            </label>
            <label class="form-control">
            <input type="radio" name="radio" />
                Female
            </label>
            <h3 id="finalScore">What is your current weight?</h3>
            <input
                type="text"
                name="username"
                id="feet"
                placeholder="lbs"
            />
            <h3 id="finalScore">What is your goal weight?</h3>
            <input
                type="text"
                name="username"
                id="feet"
                placeholder="lbs"
            />
        </div>
        </div>
        {/* <script src="part2Qs.js"></script> */}
    </body>
    )
};

export default EndGame;