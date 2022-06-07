const delUrl = 'http://localhost:4000/delete';
const addUrl = 'http://localhost:4000/add';
const editUrl = 'http://localhost:4000/edit';

const mainDiv = document.getElementById('mainDiv');
mainDiv.addEventListener('click',()=>{
    const elemClasses = [...event.target.classList];
    // add
    if(elemClasses.indexOf('add-note-button') > -1){
        const newNoteText = document.getElementById('newNoteText').value;
        if(newNoteText){
            fetch(addUrl,{
                method:'POST',
                body: JSON.stringify({type:'noteText', data:newNoteText}),
                headers: {'Content-Type': 'application/json;charset=utf-8'}
            }).then(response => {
                if (response.ok){
                    window.location.reload();
                } else alert(`${response.status}:${response.message}`);
            }).catch(err => console.log(err))
        } else{
            event.preventDefault();
            alert('Заметка не должна быть пустой!')
        }

    }
    // delete
    else if(elemClasses.indexOf('delete-note-button') > -1){
        const id = event.target.id;

        fetch(delUrl,{
            method:'POST',
            body: JSON.stringify({type:'buttonId', data:id}),
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        }).then(response => {
            if (response.ok){
                window.location.reload();
            } else alert(`${response.status}:${response.message}`);
        }).catch(err => console.log(err))
    }
})




