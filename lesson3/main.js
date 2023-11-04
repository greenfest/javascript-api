const photoEl = document.querySelector(".photo");
const authorEl = document.querySelector(".author");
const likesEl = document.querySelector(".like-count");
const likeBtn = document.querySelector(".like-btn");

if (!localStorage.getItem('likes')) {
    localStorage.setItem('likes', '0');
}
likesEl.innerHTML = localStorage.getItem('likes');
let likesValue = Number(localStorage.getItem('likes'));

likeBtn.addEventListener("click", () => {
    likesValue++;
    localStorage.setItem('likes', String(likesValue));
    likesEl.innerHTML = String(likesValue);
});

async function getImage() {
    await fetch("https://api.unsplash.com/photos/random/?client_id=4YeUIc2ivogbL8lNkj6bdBWSaV_r3zYdeuRY_ro8468")
        .then(response => response.json())
        .then(json => {
            photoEl.innerHTML = `<img src="${json.urls.small}" alt="photo">`;
            authorEl.innerHTML = `Автор: ${json.user.name}`;
        });
}

getImage().catch(error => console.error(error));