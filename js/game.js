'use strict';

let wowosaName = 0;
let userage = 0;
let strenght = 4;
let perception = 4;
let endurance = 4;
let charisma = 4;
let intelligence = 4;
let agility = 4;
let luck = 4;
let special = strenght + perception + endurance + charisma + intelligence + agility + luck;//Сумма всех навыков
let specialPoints = 40;//Максимум очков распределения
let hitPoints = Math.round(((endurance * 2) + (strenght / 2)) * 100); //Базовое число хитпоинтов, основанное на навыках игрока
let expirience = 0;//Начальный опыт
let lvl = 1;//Начальный уровень
let expMax = 1000;//Начальный пороговый уровень опыта.
let ostatokPoints = specialPoints - special;
let SPECIAL = [special, specialPoints, strenght, perception, endurance, charisma, intelligence, agility, luck, hitPoints, expirience, lvl, expMax, ostatokPoints];

const dialogueText = document.querySelector('#dialogue__text');
const submitName = document.querySelector('#submit__button');
const gamePage = document.querySelector('#page__1');
const gameImage = document.querySelector('#game__image');
const gameClickSound = document.querySelector('#gameClickSound');
const deathVideo = document.querySelector('#death__video');
const gameContainer = document.querySelector('.game__container');
let dialogueContainerPage1 = document.getElementById("dialogue__container__page__1");
let actionContainerPage1 = document.getElementById("game__action__container__page__1");
let dialogueContainerPage2 = document.getElementById("dialogue__container__page__2");
let actionContainerPage2 = document.getElementById("game__action__container__page__2");
let dialogueTextPage2 = document.getElementById("dialogue__text__2");
let hiddenActionContainerPage2 = document.getElementById("hidden__game__action__container__page__2");
let dialogueContainerPage3 = document.getElementById("dialogue__container__page__3");
let actionContainerPage3 = document.getElementById("game__action__container__page__3");
let dialogueTextPage3 = document.getElementById("dialogue__text__3");
let dialogueContainerPage4 = document.getElementById("dialogue__container__page__4");
let actionContainerPage4 = document.getElementById("game__action__container__page__4");
let dialogueTextPage4 = document.getElementById("dialogue__text__4");


let click = 1;
submitName.addEventListener('click', () => ++click );

function nextPage(pageid, imgsrc, container1, container2, container3, container4) {
  gamePage.setAttribute("id", pageid);
  gameImage.setAttribute("src", imgsrc);
  container1.style.display = "none";
  container2.style.display = "none";
  container3.style.display = "flex";
  container4.style.display = "flex";
  updateVariablesValues();
}

function death() {
  pauseSong();
  gameContainer.style.display = "none";
  deathVideo.style.display = "flex";
  deathVideo.play();
}
function turnOffGame() {
  pauseSong();
  gameWindow.style.display = "none";
}

deathVideo.addEventListener("ended", turnOffGame)

//Обновление данных игрока
function updateVariablesValues(){
  document.getElementById('wowosaName__info').innerHTML = `${wowosaName}`;
  document.getElementById('wowosaName__page__2').innerHTML = `${wowosaName}`;
  document.getElementById('wowosaName__page__3').innerHTML = `${wowosaName}`;
  document.getElementById('wowosaName__page__4').innerHTML = `${wowosaName}`;
  document.getElementById('lvl__info').innerHTML = `${lvl}`;
  document.getElementById('expirience__info').innerHTML = `${expirience}`;
  document.getElementById('hitPoints__info').innerHTML = `${hitPoints}`;
  document.getElementById('strenght__info').innerHTML = `${strenght}`;
  document.getElementById('perception__info').innerHTML = `${perception}`;
  document.getElementById('endurance__info').innerHTML = `${endurance}`;
  document.getElementById('charisma__info').innerHTML = `${charisma}`;
  document.getElementById('intelligence__info').innerHTML = `${intelligence}`;
  document.getElementById('agility__info').innerHTML = `${agility}`;
  document.getElementById('luck__info').innerHTML = `${luck}`;

  document.getElementById('strenght__page__4').innerHTML = `${strenght}`;
  document.getElementById('perception__page__4').innerHTML = `${perception}`;
  document.getElementById('endurance__page__4').innerHTML = `${endurance}`;
  document.getElementById('charisma__page__4').innerHTML = `${charisma}`;
  document.getElementById('intelligence__page__4').innerHTML = `${intelligence}`;
  document.getElementById('agility__page__4').innerHTML = `${agility}`;
  document.getElementById('luck__page__4').innerHTML = `${luck}`;
}

//Получение имени игрока
function changeGameText(x, text){
  x.innerHTML = text;
}

function getUserName(){
  gameClickSound.play();
  wowosaName = document.getElementById('character__name').value;

  updateVariablesValues();
  checkUserName();
}

function checkUserName(){
  if ((wowosaName === null || wowosaName === '') && (click === 1)) {
    changeGameText(dialogueText, 'ИДИОТ! ТЫ НЕ МОЖЕШЬ ВВЕСТИ СОБСТВЕННОЕ ИМЯ?!?! Давай представим, что ты ПОУМНЕЛ, введи свое имя, нажимая БУКОВКИ на клавиатуре:');
    wowosaName = document.getElementById('character__name').value;
  } else if ((wowosaName === null || wowosaName === '') && (click === 2)) {
    changeGameText(dialogueText, 'Рядовой, вы все еще без имени, я дал вам прямой приказ ввести имя, НЕ СМЕЙ ПОКАЗЫВАТЬСЯ МНЕ НА ГЛАЗА, ПОКА НЕ ВВЕДЕШЬ ИМЯ');
  } else if ((wowosaName === null || wowosaName === '') && (click === 3)) {   
    wowosaName = 'Идиот';
    if(wowosaName !== null && wowosaName !== '' && wowosaName !== undefined) {
      changeGameText(dialogueTextPage2, `ТЫ МНЕ НЕ НРАВИШЬСЯ, ПОНЯТНО?! ОТНЫНЕ ТВОЕ ИМЯ РЯДОВОЙ ИД-И-ОТ!!! <br> ${wowosaName}, напиши свой возраст цифрами и мы узнаем, готов ли ты к службе:`);
      nextPage('page__2', 
        "../images/wowosa_character_974x496.png",
        dialogueContainerPage1,
        actionContainerPage1,
        dialogueContainerPage2,
        actionContainerPage2);     
    }
  } else {
    if(wowosaName !== null && wowosaName !== '' && wowosaName !== undefined) {
      nextPage('page__2', 
        "../images/wowosa_character_974x496.png",
        dialogueContainerPage1,
        actionContainerPage1,
        dialogueContainerPage2,
        actionContainerPage2);
    }
  }
}

//Получение возраста игрока
function getUserAge() {
  gameClickSound.play();
  userage = Number( document.getElementById('character__age').value );

  updateVariablesValues();
  checkUserAge();
}

function checkUserAge(){
  if ( isNaN(userage) ) {
    changeGameText(dialogueTextPage2, 'ЦИ-ФРА-МИ, ЦИФРАМИ ИДИОТ!');
  } else if(userage < 1) {
    changeGameText(dialogueTextPage2, 'Хочешь сказать ты ещё не родился? И как же ты стоишь предо мной? Назови реальный возраст.');
  }else if (userage < 18) {
    changeGameText(dialogueTextPage2, 'Ты ещё совсем мал и умрешь в пустошах без помощи. Родители разрешили тебе играть?');
    actionContainerPage2.style.display = "none";
    hiddenActionContainerPage2.style.display = "flex";
  } else {
    nextPage('page__3',
      '../images/special_974x496.png',
      dialogueContainerPage2,
      actionContainerPage2,
      dialogueContainerPage3,
      actionContainerPage3);
  }
}

function notPassedAgeLimit() {
  gameClickSound.play();
  changeGameText(dialogueTextPage2, 'Ты ещё совсем мал и умрешь в пустошах без помощи. Игровые процессы выключаются.');
  setTimeout(turnOffGame, 3000);
}

function getSpecialParametrs() {
  gameClickSound.play();
  let inputStrenght = document.getElementById("input__strength").value;
  let inputPerception = document.getElementById("input__perception").value;
  let inputEndurance = document.getElementById("input__endurance").value;
  let inputCharisma = document.getElementById("input__charisma").value;
  let inputIntelligence = document.getElementById("input__intelligence").value;
  let inputAgility = document.getElementById("input__agility").value;
  let inputLuck = document.getElementById("input__luck").value;

  strenght =  Number(inputStrenght);
  perception = Number(inputPerception);
  endurance = Number(inputEndurance);
  charisma = Number(inputCharisma);
  intelligence = Number(inputIntelligence);
  agility = Number(inputAgility);
  luck = Number(inputLuck);
  special = strenght + perception + endurance + charisma + intelligence + agility + luck;

  updateVariablesValues();
  checkSpecialParametrs();
}

function checkSpecialParametrs(){
  if (special > specialPoints) {
    changeGameText(dialogueTextPage3, "Это ты не умеешь считать или я? Не больше 40 очков.");
  } else {
    special = strenght + perception + endurance + charisma + intelligence + agility + luck;//Вычисление всех потраченных очков
    hitPoints = Math.round(((endurance * 2) + (strenght / 2)) * 100);
    specialPoints = specialPoints - special;//Вычисление остатка очков спешл после цикла
    nextPage('page__4',
      '../images/wowosa_character_974x496.png',
      dialogueContainerPage3,
      actionContainerPage3,
      dialogueContainerPage4,
      actionContainerPage4);
  }
}

function roll(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}//Имитация броска кубика, честно скомунизжено из учебника JS
function critDamage(luck) { //Функция рассчета критического урона
  let brosokKubika = roll(1, 20); //Бросается кубик и значение вкладывается в переменную

  if (brosokKubika === 20) { //Если выпало 20 - происходит критический удар
    alert("Бог удачи Kittykittypspsps благоволит тебе");
    return (luck * 20);
  } else if (brosokKubika === 1) { //Если выпала 1 - происходит критическая неудача
    alert("Ты хоть занешь с какой стороны держать оружие, дубина? - Последние слова сержанта Ффирти");
    return (- (luck * 20));
  } else { //Иначе значение крит урона зависит от удачи
    if (luck <= 3) { //Если удача меньше 3    
      if (luck < brosokKubika) { //Если удача ниже полученного значения урон снижается
        alert("Слабый удар!")
        return (- (brosokKubika * luck));
      } else { //Если повезло и удача больше - урон увеличивается
        alert("Хороший удар!");
        return (brosokKubika * luck)
      }           
    } else if ((luck > 3) && (luck <= 7)) { //Если удача в диапазоне от 3 до 7
      if (luck < ( Math.floor(brosokKubika / 2) )) { //Если удача ниже округленния значения кубика поделить на 2
        alert("Замахнись посильнее!"); 
        return (- (brosokKubika * luck / 2)); //То урон снижается
      } else {
        alert("Отличный удар!");
        return (brosokKubika * luck); //Иначе урон увеличивается
      }
    } else { //Если удача больше 7
      if (luck < ( Math.floor(brosokKubika / 3) )) { //Если удача ниже округленния значения кубика поделить на 3
        alert("Удача подводит даже самых везучих.");
        return(- (brosokKubika * luck / 3));//То урон снижается           
      } else {
        alert("Сокрушительный удар!");
        return (brosokKubika * luck); //Иначе урон увеличивается
      }
    }
  } 
}
function hitPower(strenght, luck) {
  let critHit = critDamage(luck); //Внутренняя переменная создаётся для избежания двойных алёртов крит-урона во время битвы
  if (((strenght * roll(1, 20)) + critHit ) <= 0) { //Отрицательный урон преобразуется в промах
    alert('Вы промахнулись!');
    return 0
  } else {
    return (strenght * roll(1, 20) ) + critHit;
  }
}/*Функция которая считает силу атаки - сила персонажа умножить на значение кубика от 1 до 20 и добавить крит урон
и затем приплюсовать значение критического урона, неудачи*/
function battle(strenght, luck, hitPoints, enemy) {
  while ((hitPoints > 0) && (enemy[9] > 0)) {//Пока здоровье сражающихся больше 0
    let firstRoll = roll(1, 20);
    let secondRoll = roll(1, 20);//Первоочередность атаки

    if (firstRoll > secondRoll) {
      alert(`Храбрый ${wowosaName} наносит удар!`);
      let ourAttack = hitPower(strenght, luck);//Мы атакуем первые
      alert(`Противник получил ${(ourAttack > 0) ? ourAttack : 0} урона, у него осталось ${enemy[9] - ourAttack} очков здоровья`);

      if ((enemy[9] - ourAttack) <= 0) break;//Конец цикла, если враг уже поетрял хп

      alert('Враг контратакует!');
      let enemyAttack = hitPower(enemy[2], enemy[8]);//Если враг еще жив - он контратакует
      alert(`К несчастью ${wowosaName} получил ${(enemyAttack > 0) ? enemyAttack : 0} урона, у него осталось ${hitPoints - enemyAttack} очков здоровья`);
      hitPoints = hitPoints - enemyAttack;//Вычисление остатков здоровья
      enemy[9] = enemy[9] - ourAttack;
    } else {
      alert('Враг атакует первым!');
      let enemyAttack = hitPower(enemy[2], enemy[8]);//Враг атакует первым
      alert(`${wowosaName} получил ${(enemyAttack > 0) ? enemyAttack : 0} урона, у него осталось ${hitPoints - enemyAttack} очков здоровья`);

      if ((hitPoints - enemyAttack) <= 0) break;// Если мы потеряли все хп-конец цикла

      alert(` ${wowosaName} бьёт противника `);
      let ourAttack = hitPower(strenght, luck);
      alert(`Противник получил ${(ourAttack > 0) ? ourAttack : 0} урона, у него осталось ${enemy[9] - ourAttack} очков здоровья`);
      hitPoints = hitPoints - enemyAttack;//Вычисление остатков здоровья
      enemy[9] = enemy[9] - ourAttack;           
    }
  }
  return (hitPoints > enemy[9]) ? true : false; //Если у нас осталось хп после цикла позвращает true(победа), иначе false(поражение).
}
function skillCheck(skill, difficult) {//Функция скиллчека с кубиком. Параметры: Скилл и Сложность
  let kubikRoll = roll(1, 20);//Бросаем кубик

  if (((skill / 2) + kubikRoll) >= difficult) {//Если Скилл+бросок больше сложности
    return true;//то true
  } else {
    return false;//иначе false
  }
}
function expCheck() {
  //Функция создана для проверки полученного опыта в конце квеста, начисления очков спешл и лвлапа
  let oldLvl = lvl;
  while ((expirience / expMax) >= 1) {//Если опыт поделить на лимит опыта больше или равно 1
    expirience = expirience - expMax;//Опыт уменьшается на лимит
    expMax = expMax * 2;//Лимит увеличивается в два раза
    specialPoints = specialPoints + 1;//Добавляется очко спешл
    lvl = lvl + 1;//Уровень увеличивается на 1
    hitPoints = hitPoints + 100; //Хитпоинты увеличиваются на 100
  }
  ((lvl - oldLvl) > 0) ? alert(`Ваш уровень повысился до ${lvl}! Распределите полученные очки навыков:`) : alert(`До повышения уровня осталось ${expMax - expirience} опыта`);
  return SPECIAL = [special, specialPoints, strenght, perception, endurance, charisma, intelligence, agility, luck, hitPoints, expirience, lvl, expMax, ostatokPoints];
  //Обновление массива
}