async function fetchtasks()
{
    try {

        const response= await fetch('https://dummyjson.com/todos')
        const data= await response.json();
        console.log(data.todos);
        displayTasks(data.todos);

    } catch (error) {
        console.error("Erreur lors de la récupération des tâches:", error)
    }
}

function displayTasks(tasks) {
    const tasksSection= document.getElementById('tasks');
    tasksSection.innerHTML ='';

    tasks.forEach(task => {
        const taskItem= document.createElement('li');
        taskItem.classList.add('task-item');

        const taskText= document.createElement('span');
        taskText.textContent= task.todo

        if (task.completed) {
            taskText.style.textDecoration= "line-through"
            taskText.classList.add('completed');
        }
        
        const editButton = document.createElement('button');
        editButton.textContent = "Modifier";
        editButton.addEventListener('click', () => editTask(task.id));  // Ajoute un gestionnaire d'événement

        const completeButton = document.createElement('button');
        completeButton.textContent = "Compléter";
        completeButton.classList.add('complete-btn'); // Ajout d'une classe pour styliser le bouton
        completeButton.addEventListener('click', () => completeTask(task.id));  // Ajoute un gestionnaire d'événement

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Supprimer";
        deleteButton.classList.add('delete-btn'); // Ajout d'une classe pour styliser le bouton
          // Ajout du texte de la tâche et des boutons au conteneur de la tâche
          deleteButton.addEventListener('click', () => deleteTask(task.id, taskItem));  // Ajoute un gestionnaire d'événement

          taskItem.appendChild(taskText);
          taskItem.appendChild(editButton);
          taskItem.appendChild(completeButton);
          taskItem.appendChild(deleteButton);

        tasksSection.appendChild(taskItem);
    });
}
function deleteTask(taskId, taskElement) {
    // Supprime l'élément de la liste des tâches
    taskElement.remove();

    // Optionnel: Envoie une requête DELETE à l'API pour supprimer la tâche du serveur
    // fetch(`https://dummyjson.com/todos/${taskId}`, { method: 'DELETE' })
    //     .then(response => response.json())
    //     .then(data => console.log('Tâche supprimée:', data))
    //     .catch(error => console.error('Erreur lors de la suppression:', error));
}

function completeTask(taskId) {
    const taskElement = document.querySelector(`[data-id='${taskId}']`);
    const taskText = taskElement.querySelector('span');
    taskText.style.textDecoration = "line-through";
    taskText.classList.add('completed');
    
    // Optionnel: Envoie une requête PATCH à l'API pour marquer la tâche comme complétée
    // fetch(`https://dummyjson.com/todos/${taskId}`, {
    //     method: 'PATCH',
    //     body: JSON.stringify({ completed: true }),
    //     headers: { 'Content-Type': 'application/json' }
    // })
    // .then(response => response.json())
    // .then(data => console.log('Tâche complétée:', data))
    // .catch(error => console.error('Erreur lors de la mise à jour:', error));
}

function editTask(taskId) {
    const taskElement = document.querySelector(`[data-id='${taskId}']`);
    const taskText = taskElement.querySelector('span');
    const newText = prompt('Modifier la tâche:', taskText.textContent);
    
    if (newText !== null) {
        taskText.textContent = newText;

        // Optionnel: Envoie une requête PATCH à l'API pour mettre à jour le texte de la tâche
        // fetch(`https://dummyjson.com/todos/${taskId}`, {
        //     method: 'PATCH',
        //     body: JSON.stringify({ todo: newText }),
        //     headers: { 'Content-Type': 'application/json' }
        // })
        // .then(response => response.json())
        // .then(data => console.log('Tâche modifiée:', data))
        // .catch(error => console.error('Erreur lors de la mise à jour:', error));
    }
}


window.onload = fetchtasks;  // Appelle fetchtasks() après le chargement de la page
