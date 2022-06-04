const url = 'http://localhost:4000/';

document.addEventListener('click',()=>{
    const elemClasses = [...event.target.classList];

    if(elemClasses.indexOf('add-note-button') > -1){
        //event.preventDefault(); //может помешать автообновлению!
        const newNoteText = document.getElementById('newNoteText').value;

        fetch(url,{
            method:'POST',
            body: JSON.stringify({type:'noteText', data:newNoteText})
        }).then(response => {
            if (response.ok){
                console.log('fetch resp TEXT from front is ok');
             }
        }).catch(err => console.log(err))
    }
    if(elemClasses.indexOf('delete-note-button') > -1){
        const id = event.target.id;

        fetch(url,{
            method:'POST',
            body: JSON.stringify({type:'buttonId', data:id})
        }).then(response => {
            if (response.ok){
                console.log('fetch resp ID from front is ok');
            }
        }).catch(err => console.log(err))
    }
})




