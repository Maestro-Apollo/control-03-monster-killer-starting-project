const ATTACK_POWER = 10;
const STRONG_ATTACK_POWER = 15;
const MONSTER_POWER = 13;

let chooseMaxLife = 100;

let monsterLife = chooseMaxLife;
let playerLife = chooseMaxLife;

adjustHealthBars(chooseMaxLife);

function attackMonster(mode) {
    if (mode === 'ATTACK') {
        mode = ATTACK_POWER;
    } else if (mode === 'STRONG_ATTACK') {
        mode = STRONG_ATTACK_POWER;
    }

    let damage = dealMonsterDamage(mode);
    monsterLife -= damage;
    let playerDamage = dealPlayerDamage(MONSTER_POWER);
    playerLife -= playerDamage;
    if (monsterLife <= 0 && playerLife > 0) {
        alert('You win!');
    } else if (playerLife <= 0 && monsterLife > 0) {
        alert('You lose!');
    } else if (playerLife <= 0 && monsterLife <= 0) {
        alert('Draw');
    }
}

function attackHandler() {
    attackMonster('ATTACK');
}

function strongAttackHandler() {
    attackMonster('STRONG_ATTACK');
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);