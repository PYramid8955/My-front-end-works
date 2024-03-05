const $videos = document.querySelector("#videos");
const r = document.querySelector(':root'); 
const $reviewsBtn = document.querySelector("#headText > p.reviewsBtn");
let nest = document.getElementById("reviewList");
const videos = ["research.mp4", "deal.mp4", "ship.mp4", "cargo.mp4", "delivery.mp4"];
const reviewsDATA = [
  {profile: 'Some Name', text: 'The best WebSite ever!', stars: '&#9733;&#9733;&#9733;&#9733;&#9733;', pfp: 'pfp.png'},
  {profile: 'Unknown', text: 'The best experience I ever had on a website.', stars: '&#9733;&#9733;&#9733;&#9733;&#9733;', pfp: 'pfp.png'},
  {profile: 'User9483', text: 'The staff is very kind!', stars: '&#9734;&#9733;&#9733;&#9733;&#9733;', pfp: 'pfp.png'},
  {profile: 'Bugs Bunny', text: 'The best experience ever', stars: '&#9733;&#9733;&#9733;&#9733;&#9733;', pfp: 'pfp.png'},
  {profile: 'Porky', text: 'Interesting...', stars: '&#9733;&#9733;&#9733;&#9733;&#9733;', pfp: 'pfp.png'},
  {profile: 'Joe Jr.', text: 'They\'re fast!', stars: '&#9733;&#9733;&#9733;&#9733;&#9733;', pfp: 'pfp.png'},
  {profile: 'Ashley', text: 'Good!', stars: '&#9733;&#9733;&#9733;&#9733;&#9733;', pfp: 'pfp.png'},
  {profile: 'Someone', text: 'Didn\'t think I\'d finish my work so fast! Thanks GMP!', stars: '&#9733;&#9733;&#9733;&#9733;&#9733;', pfp: 'pfp.png'},
]

let currentIndex = -1;
let visible = true;
let showReviews = false;
let videoInterval;

function initVideos() {
  videos.forEach((video, index) => {
    const $video = document.createElement("video");
    $video.src = `/assets/videos/${video}`;
    $video.preload = "auto";
    $video.muted = true;
    $video.style.width = "100%";
    $video.style.height = "100%";
    $video.style.objectFit = "cover";
    $video.style.display = "none";

    $video.pause();

    if (index === currentIndex) {
      $video.style.display = "block";
    }

    $videos.appendChild($video);
  });
}

function changeVideo() {
  // Cycle through videos without having a small loading gap between them

  currentIndex = (currentIndex + 1) % videos.length;
  videos.forEach((video, index) => {
    if (index === currentIndex) {
      $videos.children[index].style.display = "block";
      $videos.children[index].play();
      // $videos.children[index].addEventListener('ended', changeVideo);
    } else {
      $videos.children[index].style.display = "none";
      $videos.children[index].pause();
      $videos.children[index].currentTime = 0;
    }
  });

}

window.onload = function () {
  initVideos();
  changeVideo();
  AddReviews()

  videoInterval = setInterval(() => {
    changeVideo();
  }, 5000);
};

let autoStopVideo = () => {
  visible ^= 1; // XOR with 1 to alternate between 0 and 1
  if (!visible) {
    clearInterval(videoInterval);
    $videos.children[currentIndex].pause();
  } else {
    videoInterval = setInterval(() => {
      changeVideo();
    }, 5000);
    $videos.children[currentIndex].play();
  }
}

document.addEventListener('visibilitychange', autoStopVideo);

function stopAnimation() {
  // for development purposes (I have only 4 GiB ram on my laptop)
  clearInterval(videoInterval);
  $videos.children[currentIndex].pause();
  document.removeEventListener('visibilitychange', autoStopVideo);
}

$reviewsBtn.onclick = reviews;
function reviews() {
  showReviews ^= 1; // either 0 or 1
  if (showReviews) {
    r.style.setProperty('--centerH', '150%')
    $reviewsBtn.innerHTML = 'Hide reviews &#10548;'
  } else {
    r.style.setProperty('--centerH', '100%');
    $reviewsBtn.innerHTML = 'Show reviews &#10549;'
  }
}

let aftermask = document.getElementById('afterMask')
let beforemask = document.getElementById('beforeMask')
let nestLeft = -15.219127278;
beforemask.addEventListener('click', () => moveReviews(0));
aftermask.addEventListener('click', () => moveReviews(1));

function moveReviews(direction) { // direction is 1 for next and 0 for previous - easier to operate
  let current = document.querySelector('.rcard[index="1"]');
  let nextnext = current.nextSibling ? current.nextSibling.nextSibling : null;
  let prevprev = current.previousSibling ? current.previousSibling.previousSibling : null;
  aftermask.style.display = 'none';
  beforemask.style.display = 'none';
  current.setAttribute('index', '-1');
  // if I get it dirrectly from the attribute it just doesn't return decimals, so I'm registering it inside the script:
  nestLeft += 25.5 * (direction ? -1 : 1);
  nest.style.left = (nestLeft).toString() + 'vw';
  if (direction) current.nextSibling.setAttribute('index', 1)
  else current.previousSibling.setAttribute('index', 1)
  setTimeout(() => {
    if ((nextnext && direction) || !direction) aftermask.style.display = 'block';
    if ((prevprev && !direction) || direction) beforemask.style.display = 'block';
  }, 1000);
}

function AddReviews() {
  let index = 0;
  reviewsDATA.forEach(review => {
    let newCard = document.createElement('div');
    newCard.className = 'rcard';
    newCard.setAttribute('index', index == 1 ? index : '-1')  // Only interested in the second one
    newCard.innerHTML = `
      <img src="/assets/images/${review.pfp}">
      <div>${review.stars}</div>
      <h4>${review.profile}</h4>
      <i>"${review.text}"</i>
    `; index++;
    nest.appendChild(newCard);
  });
}
