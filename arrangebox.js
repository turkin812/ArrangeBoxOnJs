"use strict";
(function(){
    let selected = []; // Пустой список

    const items = document.querySelectorAll('.js-item'); // Список всех элеметнов js-item
    const container1 = document.querySelector('.js-container1'); // Левый контейнер
    const container2 = document.querySelector('.js-container2'); // Правый контейнер

    // По умолчанию event - undefined
    function handleClick(event) {
        // event.target Содержит ссылку на конкретный эл-т внутри формы, на котором произошел клик
        if (event.target.classList.contains("js-item")) { // Есть ли класс в выбранном эл-те
            event.target.classList.toggle("active"); // Добавляем класс active, если его нет, иначе удаляем
            const found = selected.find((item) => Number(item.dataset.id) === Number(event.target.dataset.id)); // Сравнение равен ли переданный эл-т с индексом (item) эл-ту выбранному пользователем и возвращает первый эл-т из всего списка (их мб несколько)
            if (found) { // Если не 0
                selected = selected.filter((item) => Number(item.dataset.id) !== Number(event.target.dataset.id)); // Создает новый список, если не совпадают эл-ты
            } else { // Если 0
                selected.push(event.target); // добавляем эти эл-ты в список selected
            }            
        }
    }

    container1.addEventListener("click", handleClick); // По событию "click" ("click" - либо касание, либо ЛКМ) вызывается ф-я handleClick
    container2.addEventListener("click", handleClick);

    const left = document.querySelector('.js-left'); // Получаем эл-т страницы из селектора js-left
    const right = document.querySelector('.js-right'); 
    const leftAll = document.querySelector('.js-left-all');
    const rightAll = document.querySelector('.js-right-all');
    const addleft = document.querySelector('.js-add-left');
    const addright = document.querySelector('.js-add-right');
    const leftup = document.querySelector('.js-left-up');
    const leftdown = document.querySelector('.js-left-down');
    const rightup = document.querySelector('.js-right-up2');
    const rightdown = document.querySelector('.js-right-down2');

    function handleMove(event) {
        const target = event.target; // Выбранный эл-т
        if (target.classList.contains("js-right")) {
            selected.forEach((item) => { // Для каждого элемента будет выполнена след-я функция
                if (item.parentElement === container1) { // Сравнение, если есть родитель и он равен container1
                container2.appendChild(container1.removeChild(item)); // Добавление в конец container2 эл-та следующего: удалённый эл-т из container1
                item.classList.remove("active"); // Удаление класса active
                }
            });
            selected = [];
            
        } else if (target.classList.contains("js-left-all")) {
            Array.from(container2.querySelectorAll(".js-item")).forEach((item) => { // Array.from - создаёт новый массив из непрерывных эл-ов
                container1.appendChild(container2.removeChild(item));
                item.classList.remove("active");
            });
            selected = [];
        } else if (target.classList.contains("js-right-all")) { // Всё наоборот с js-left-all
            Array.from(container1.querySelectorAll(".js-item")).forEach((item) => {
                container2.appendChild(container1.removeChild(item));
                item.classList.remove("active");
            });
            selected = [];
        } else if (target.classList.contains("js-left")) { // Всё наоборот с js-right
            selected.forEach((item) => {
                if (item.parentElement === container2) {
                    container1.appendChild(container2.removeChild(item));
                    item.classList.remove("active");
                }                
            });
            selected = [];
        } 
    }
    
    // Функция для рандомного числа
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    
    // Добавление эл-та в левый контейнер
    function addElement_left() {

        let div = document.createElement('div'); // Создание тега div
        let selected = Array.from(container1.querySelectorAll(".js-item")); //Список эл-ов
        let now_id = selected.length; // Индекс последнего эл-та
        
        // Классы
        div.className = "container__item js-item";
        div.setAttribute('data-id', now_id);
        div.setAttribute('draggable', 'true');
        
        div.innerHTML = getRandomInt(10); // Рандомное значение
        container1.appendChild(div); // Добавление в конец нового эл-та
    }

    // Добавление эл-та в правый контейнер
    function addElement_right() {

        let div = document.createElement('div');
        let selected = Array.from(container2.querySelectorAll(".js-item"));
        let now_id = selected.length;

        div.className = "container__item js-item";
        div.setAttribute('data-id', now_id);
        div.setAttribute('draggable', 'true');

        div.innerHTML = getRandomInt(10);
        container2.appendChild(div);
    }

    
    // Перемещение эл-та вверх на 1 (левый контейнер)
    function upp(event) {

        const target = event.target; // Выбранный эл-т

        if (target.classList.contains("js-left-up")) {
            selected.forEach((item) => { // Для каждого элемента будет выполнена след-я функция

                if (item.parentElement === container1) { // Сравнение, если есть родитель и он равен container1
                    let old_id = item.dataset.id; // Айди выбранного эл-та
                    let selected = Array.from(container1.querySelectorAll(".js-item")); // Список объектов левого контейнера

                    if (Number(old_id) !== 0){ // Если выбранный эл-т не первый
                    
                        let new_id = Number(old_id)-1; // Новый айди выбранного эл-та (НАВЕРХ НА 1)

                        selected[old_id].setAttribute('data-id', new_id); // Установка нового значения атрибута data-id
                        selected[new_id].setAttribute('data-id', old_id); // Для верхнего эл-та новое значение атрибута data-id

                        container1.insertBefore(selected[old_id], selected[new_id]); // Перемещение эл-ов
                    }
                    
                item.classList.remove("active"); // Сброс активного эл-та
                }
            });
            selected = [];
        }
    }

    // Перемещение эл-та вниз на 1 (левый контейнер)
    function downn(event) {

        const target = event.target;

        if (target.classList.contains("js-left-down")) {
            selected.forEach((item) => {

                if (item.parentElement === container1) {
                    let old_id = item.dataset.id;
                    let selected = Array.from(container1.querySelectorAll(".js-item"));
                    
                    if ((Number(old_id) !== Number(selected.length)-1) || Number(old_id) === 0){

                        let new_id = Number(old_id)+1; // Новый айди выбранного эл-та (НАВЕРХ НА 1)
                        let selected = Array.from(container1.querySelectorAll(".js-item"));
                        

                        selected[old_id].setAttribute('data-id', new_id);
                        selected[new_id].setAttribute('data-id', old_id);

                        let x = selected[old_id];
                        let y = selected[new_id];
                        
                        container1.replaceChild(x, selected[new_id]); // Вместо старого подставляем новый
                        container1.insertBefore(y, selected[old_id]); // Новый и старый меняем местами
                    }
                item.classList.remove("active");
                }
            });
            selected = [];
        }
    }


    // Перемещение эл-та вверх на 1 (правый контейнер)
    function upp2(event) {
        const target = event.target; 
        if (target.classList.contains("js-right-up2")) {
            selected.forEach((item) => { 
                if (item.parentElement === container2) {
                
                    let old_id = item.dataset.id;
                    let selected = Array.from(container2.querySelectorAll(".js-item"));

                    if (Number(old_id) !== 0){
                    
                        let new_id = Number(old_id)-1; // Новый айди выбранного эл-та (НАВЕРХ НА 1)
                        let selected = Array.from(container2.querySelectorAll(".js-item"));
                
                        selected[old_id].setAttribute('data-id', new_id);
                        selected[new_id].setAttribute('data-id', old_id);
                        container2.insertBefore(selected[old_id], selected[new_id]);
                        
                    }
                item.classList.remove("active");
                }
            });
            selected = [];
        }
    }

    // Перемещение эл-та вниз на 1 (правый контейнер)
    function downn2(event) {

        const target = event.target;

        if (target.classList.contains("js-right-down2")) {

            selected.forEach((item) => { 
                if (item.parentElement === container2) {

                    let old_id = item.dataset.id;
                    let selected = Array.from(container2.querySelectorAll(".js-item"));

                        if ((Number(old_id) !== Number(selected.length)-1) || Number(old_id) === 0){

                            let new_id = Number(old_id)+1; // Новый айди выбранного эл-та (НАВЕРХ НА 1)
                            let selected = Array.from(container2.querySelectorAll(".js-item"));

                            selected[old_id].setAttribute('data-id', new_id);
                            selected[new_id].setAttribute('data-id', old_id);
                            let x = selected[old_id];
                            let y = selected[new_id];
                            
                            container2.replaceChild(x, selected[new_id]);
                            container2.insertBefore(y, selected[old_id]);
                        }
                item.classList.remove("active");
                }

            });
            selected = [];
        }
    }



    left.addEventListener("click", handleMove); // Перемещение одного эл-та в правый контейнер
    right.addEventListener("click", handleMove); // Перемещение одного эл-та в левый контейнер
    leftAll.addEventListener("click", handleMove); // Перемещение всех эл-ов в правый контейнер
    rightAll.addEventListener("click", handleMove); // Перемещение всех эл-ов в левый контейнер

    addleft.addEventListener("click", addElement_left); // Добавление эл-та в левый контейнер
    addright.addEventListener("click", addElement_right); // Добавление эл-та в правый контейнер

    leftup.addEventListener("click", upp); // Перемещение эл-та вверх на 1 (левый контейнер)
    leftdown.addEventListener("click", downn); // Перемещение эл-та вниз на 1 (левый контейнер)

    rightup.addEventListener("click", upp2); // Перемещение эл-та вверх на 1 (правый контейнер)
    rightdown.addEventListener("click", downn2); // Перемещение эл-та вниз на 1 (правый контейнер)

})()