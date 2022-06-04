const url = 'http://localhost:4000/';

const deleteButtons = document.querySelectorAll('.delete-note-button');
const formButton = document.getElementById('sendNoteButton');
const newNoteText = document.getElementById('newNoteText');

formButton.addEventListener('click',()=>{
    event.preventDefault(); //может помешать автообновлению!
    console.log(newNoteText.value);
})

document.addEventListener('click',()=>{
    console.log(event.target.id);
})

// formButton.onclick = async function(){
//     fetch(url, {method:'POST', body:""})
//         .then(response => {
//             if (response.ok){
//                 console.log('fetch from front is ok');
//             }
//         }).catch(err => console.log(err));
// }



