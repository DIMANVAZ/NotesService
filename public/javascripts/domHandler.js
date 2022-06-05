const delUrl = 'http://localhost:4000/delete';
const addUrl = 'http://localhost:4000/add';

// ОТРЕФАКТОРИТЬ НА ЧЕЛОВЕЧЕСКИЙ МАНЕР - чтобы не слушать весь документ
document.addEventListener('click',()=>{
    const elemClasses = [...event.target.classList];

    // add
    if(elemClasses.indexOf('add-note-button') > -1){
        const newNoteText = document.getElementById('newNoteText').value;
        //event.preventDefault()
        fetch(addUrl,{
            method:'POST',
            body: JSON.stringify({type:'noteText', data:newNoteText}),
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        }).then(response => {
            if (response.ok){
                window.location.reload();
                console.log('fetch resp ADD from front is ok');
             }
        }).catch(err => console.log(err))
    }
    // delete
    else if(elemClasses.indexOf('delete-note-button') > -1){
        const id = event.target.id;
        //event.preventDefault()
        fetch(delUrl,{
            method:'POST',
            body: JSON.stringify({type:'buttonId', data:id}),
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        }).then(response => {
            if (response.ok){
                window.location.reload();
                console.log('fetch resp DEL from front is ok');
            }
        }).catch(err => console.log(err))
    }
    else console.log('neither add button nor remove button');
})




