const ATTACK_POWER = 10;
const STRONG_ATTACK_POWER = 15;
const MONSTER_POWER = 13;
const HEAL_POWER = 20;

const PLAYER_ATTACK = 'ATTACK';
const PLAYER_STRONG_ATTACK = 'STRONG_ATTACK';

const LOG_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_GAME_OVER = 'GAME_OVER';

const userInput = prompt('Enter health value for player & monster', '100');

let chooseMaxLife = parseInt(userInput);
let showLogArray = [];

if (isNaN(chooseMaxLife) || chooseMaxLife <= 0) {
    chooseMaxLife = 100;
}

let monsterLife = chooseMaxLife;
let playerLife = chooseMaxLife;
let bonusLife = true;

adjustHealthBars(chooseMaxLife);

function reset() {
    monsterLife = chooseMaxLife;
    playerLife = chooseMaxLife;
    resetGame(chooseMaxLife);
}

function writeToLog(event, value, playerHealth, monsterHealth) {
    let showLogObj = {
        event: event,
        value: value,
        playerHealth: playerHealth,
        monsterHealth: monsterHealth,
    };
    if (event === LOG_PLAYER_ATTACK) {
        showLogObj.target = 'MONSTER';
    } else if (event === LOG_PLAYER_STRONG_ATTACK) {
        showLogObj = {
            event: event,
            value: value,
            target: 'MONSTER',
            playerHealth: playerHealth,
            monsterHealth: monsterHealth,
        };
    } else if (event === LOG_MONSTER_ATTACK) {
        showLogObj = {
            event: event,
            value: value,
            target: 'PLAYER',
            playerHealth: playerHealth,
            monsterHealth: monsterHealth,
        };
    } else if (event === LOG_PLAYER_HEAL) {
        showLogObj = {
            event: event,
            value: value,
            target: 'PLAYER',
            playerHealth: playerHealth,
            monsterHealth: monsterHealth,
        };
    } else if (event === LOG_GAME_OVER) {
        showLogObj = {
            event: event,
            value: value,
            playerHealth: playerHealth,
            monsterHealth: monsterHealth,
        };
    }
    showLogArray.push(showLogObj);
}

function endResult() {
    initialPlayerHealth = playerLife;
    let playerDamage = dealPlayerDamage(MONSTER_POWER);
    playerLife -= playerDamage;

    writeToLog(LOG_MONSTER_ATTACK, playerDamage, playerLife, monsterLife);

    if (playerLife <= 0 && bonusLife) {
        bonusLife = false;
        removeBonusLife();
        playerLife = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('Bonus life saved your butt');
    }

    if (monsterLife <= 0 && playerLife > 0) {
        alert('You win!');
        writeToLog(LOG_GAME_OVER, 'PLAYER WON', playerLife, monsterLife);
        reset();
    } else if (playerLife <= 0 && monsterLife > 0) {
        alert('You lose!');
        writeToLog(LOG_GAME_OVER, 'MONSTER_WON', playerLife, monsterLife);
        reset();
    } else if (playerLife <= 0 && monsterLife <= 0) {
        alert('Draw');
        writeToLog(LOG_GAME_OVER, 'DRAW', playerLife, monsterLife);
        reset();
    }
}

function attackMonster(mode) {
    let eventAttack;
    if (mode === 'ATTACK') {
        mode = ATTACK_POWER;
        eventAttack = LOG_PLAYER_ATTACK;
    } else if (mode === 'STRONG_ATTACK') {
        mode = STRONG_ATTACK_POWER;
        eventAttack = LOG_PLAYER_STRONG_ATTACK;
    }

    let damage = dealMonsterDamage(mode);
    monsterLife -= damage;
    writeToLog(eventAttack, damage, playerLife, monsterLife);
    endResult();
}

function attackHandler() {
    attackMonster(PLAYER_ATTACK);
}

function strongAttackHandler() {
    attackMonster(PLAYER_STRONG_ATTACK);
}

function healPlayerHandler() {
    let healValue;
    if (playerLife >= chooseMaxLife - HEAL_POWER) {
        alert("Player life can't be more than max life");
        healValue = chooseMaxLife - playerLife;
    } else {
        healValue = HEAL_POWER;
    }
    increasePlayerHealth(healValue);
    playerLife += healValue;
    writeToLog(LOG_PLAYER_HEAL, healValue, playerLife, monsterLife);
    endResult();
}

function logEventHandler() {
    console.log(showLogArray);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', logEventHandler);