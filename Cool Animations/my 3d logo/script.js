const root = document.documentElement;
document.body.addEventListener('mousemove', (e) => {
  // console.log((e.clientY - window.innerHeight / 2) * 25 / (window.innerHeight / 2) * -1);
  // max - 25 degrees (you can set more if you'd like to). this formula calculates the number of degrees the pyramid would inclinate based on vertical mouse movement. also, it is taking in count that the pyramid would be the center (0 degrees), it being able to rotate in both ways. in the end I multiply by -1 to make it more intuitive (like it's following the cursor)
  root.style.setProperty('--pyr-inclination', (e.clientY - window.innerHeight / 2) * 25 / (window.innerHeight / 2) * -1 + 'deg');
}); 