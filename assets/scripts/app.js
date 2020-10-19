let ATTACK_POWER = 10;

let chooseMaxLife = 100;

let monsterLife = chooseMaxLife;
let playerLife = chooseMaxLife;

adjustHealthBars(chooseMaxLife);

function attackFunction() {
    let damage = dealMonsterDamage(ATTACK_POWER);
    monsterLife -= damage;
    if (monsterLife <= 0) {
        alert('You win!');
    }
}

attackBtn.addEventListener('click', attackFunction);