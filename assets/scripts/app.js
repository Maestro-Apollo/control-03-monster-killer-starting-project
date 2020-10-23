const ATTACK_POWER = 10;
const STRONG_ATTACK_POWER = 15;
const MONSTER_POWER = 13;
const HEAL_POWER = 20;

let chooseMaxLife = 100;

let monsterLife = chooseMaxLife;
let playerLife = chooseMaxLife;
let bonusLife = true;

adjustHealthBars(chooseMaxLife);

function endResult() {
    initialPlayerHealth = playerLife;
    let playerDamage = dealPlayerDamage(MONSTER_POWER);
    playerLife -= playerDamage;

    if (playerLife <= 0 && bonusLife) {
        bonusLife = false;
        removeBonusLife();
        playerLife = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('Bonus life save your butt');
    }

    if (monsterLife <= 0 && playerLife > 0) {
        alert('You win!');
    } else if (playerLife <= 0 && monsterLife > 0) {
        alert('You lose!');
    } else if (playerLife <= 0 && monsterLife <= 0) {
        alert('Draw');
    }
}

function attackMonster(mode) {
    if (mode === 'ATTACK') {
        mode = ATTACK_POWER;
    } else if (mode === 'STRONG_ATTACK') {
        mode = STRONG_ATTACK_POWER;
    }

    let damage = dealMonsterDamage(mode);
    monsterLife -= damage;
    endResult();
}

function attackHandler() {
    attackMonster('ATTACK');
}

function strongAttackHandler() {
    attackMonster('STRONG_ATTACK');
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
    endResult();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);