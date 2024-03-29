// Récuperation de la liste des works dans le backend

export async function getWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works");

        if (!response.ok) {
            throw new Error(`Erreur HTTP! Statut : ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des travaux");
        alert(`Une erreur s'est produite lors de la récupération des travaux ${error}. Veuillez réessayer.`);
    }
}





//Récuperation de la liste des Category id dans le backend

export async function getCategory() {
    try {
        const response = await fetch("http://localhost:5678/api/categories");

        if (!response.ok) {
            throw new Error(`Erreur HTTP! Statut : ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des catégories");
        alert(`Une erreur s'est produite lors de la récupération des catégories ${error}. Veuillez réessayer.`);
    }
}


//Récuperation des infos pour ce log en Admin.

export async function getLogin(user) {
    const loginUrl = "http://localhost:5678/api/users/login";
    const loginOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: user,
    };
  
    const errorDial = document.getElementById("errorDial");
  
    const response = await fetch(loginUrl, loginOptions);
  
    if (!response.ok) {
      errorDial.style.display = "block"; // Affiche errorDial en cas d'erreur
      console.error(`Erreur HTTP! Statut : ${response.status}`);
      return null; 
    }
  
    const responseData = await response.json();
  
    // Vérifiez si la réponse indique une authentification réussie
    if (responseData && responseData.userId === 1) {
      return responseData;
    } else {
      errorDial.style.display = "block"; // Affiche errorDial en cas d'erreur
      console.error("Informations d'identification incorrectes");
      return null; 
    }
  }

// SUPPRIMER UN WORK
export async function deleteWork(id) {
  try {
    const token = sessionStorage.getItem("token");
    const options = {
      method: "DELETE",
      headers: {
        accept: "*application/json*",
        Authorization: `Bearer ${token}`,
      },
    };
    
    const response = await fetch(`http://localhost:5678/api/works/${id}`, options);

    if (!response.ok) {
      throw new Error(`Erreur HTTP! Statut : ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Une erreur s'est produite lors de la suppression du travail", error);
    throw error; 
  }
}
  
// ENVOYER UN NOUVEAU WORK
export async function postNewWork(data) {
  try {
    const token = sessionStorage.getItem("token");
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: data,
    };

    const response = await fetch("http://localhost:5678/api/works", options);

    if (!response.ok) {
      throw new Error(`Erreur HTTP! Statut : ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Une erreur s'est produite lors de l'envoi d'un nouveau travail", error);
    throw error; 
  }
}