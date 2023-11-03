import './style.css'

let classesList = [
    {
        id: 1,
        name: "ООП",
        time: new Date("2023-11-10"),
        maxParticipants: 20,
        currentParticipants: 5,
    },
    {
        id: 2,
        name: "JavaScript",
        time: new Date("2023-11-12"),
        maxParticipants: 40,
        currentParticipants: 24,
    },
    {
        id: 3,
        name: "Python",
        time: new Date("2023-11-14"),
        maxParticipants: 30,
        currentParticipants: 30,
    },
    {
        id: 4,
        name: "C++",
        time: new Date("2023-11-15"),
        maxParticipants: 20,
        currentParticipants: 10,
    },
    {
        id: 5,
        name: "C#",
        time: new Date("2023-11-19"),
        maxParticipants: 14,
        currentParticipants: 14,
    },
    {
        id: 6,
        name: "HTML + CSS",
        time: new Date("2023-11-20"),
        maxParticipants: 40,
        currentParticipants: 39,
    }
];

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Расписание занятий:</h1>
    <div class="list-wrapper pt-5">
    </div>
  </div>
`
const listWrapper = document.querySelector('.list-wrapper');

let activeRegistrations = JSON.parse(localStorage.getItem('activeRegistrations')) || {};

const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

function renderList() {
    listWrapper.innerHTML = "";
    classesList.forEach(el => {
        const lessonElement = document.createElement("div");
        const date = el.time.getDate();
        const month = months[el.time.getMonth()];
        const year = el.time.getFullYear();
        lessonElement.innerHTML = `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${el.name}</h5>
                    <p class="card-text">${date} ${month} ${year} г.</p>
                    <p class="card-text">Лимит участников: ${el.maxParticipants}</p>
                    <p class="card-text">Зарегистрировано: ${el.currentParticipants}</p>
                    <button type="button" id="btn-${el.id}" class="btn btn-primary toggleButton">${el.currentParticipants < el.maxParticipants ? 'Записаться' : 'Мест нет'}</button>
                    <button type="button" id="cancel-${el.id}" class="btn btn-danger cancelButton" style="display: none">Отменить запись</button>
                </div>
            </div>
        `;
        listWrapper.append(lessonElement);

        document.getElementById(`cancel-${el.id}`).addEventListener("click", () => {
            cancelRegistration(el.id);
        });
        document.querySelectorAll(".toggleButton").forEach(el => el.addEventListener("click", signUp));

        if (activeRegistrations[el.id]) {
            const signUpBtn = document.getElementById(`btn-${el.id}`);
            signUpBtn.style.display = "none";
            const cancelBtn = document.getElementById(`cancel-${el.id}`);
            cancelBtn.style.display = 'inline-block';
        }
    });
}

renderList();

function signUp(e) {
    const id = e.target.id.split("-")[1];
    const lesson = classesList.find(el => el.id === Number(id));
    if (lesson.currentParticipants < lesson.maxParticipants) {
        lesson.currentParticipants++;
        renderList();
        const signUpBtn = document.getElementById(`btn-${id}`);
        signUpBtn.style.display = "none";
        const cancelBtn = document.getElementById(`cancel-${id}`);
        cancelBtn.style.display = 'inline-block';
        activeRegistrations[Number(id)] = true;
        localStorage.setItem('activeRegistrations', JSON.stringify(activeRegistrations));
    } else {
        alert("Достигнуто максимальное количество участников");
    }
}

function cancelRegistration(id) {
    const lesson = classesList.find(el => el.id === id);
    lesson.currentParticipants--;
    renderList();

    const btn = document.getElementById(`btn-${id}`);
    btn.style.display = 'inline-block';

    const cancelBtn = document.getElementById(`cancel-${id}`);
    cancelBtn.style.display = 'none';

    delete activeRegistrations[id];
    localStorage.setItem('activeRegistrations', JSON.stringify(activeRegistrations));
}




