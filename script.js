//select from query selector

const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');

//button access through form
form.addEventListener('submit', (e)=>{
    e.preventDefault();//it is stope from auto submit form page not reload
    //make one function for word info
    getWordInfo(form.elements[0].value);
});
//we can used api for fetching the woed
//declare the function
//await is used with async function
const getWordInfo = async (word) => {

//we can used try and catch for error handling
    try{

    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    let definitions = data[0].meanings[0].definitions[0];

    resultDiv.innerHTML = `
    <h2><strong>Word:</strong>${data[0].word}</h2>
    <p class="partOfSpeech"><strong>Type:</strong>${data[0].meanings[0].partOfSpeech}</p>
    <p><strong>Meaning:</strong>${definitions.definition === undefined ? "Not Found" :definitions.definition }</p>
    <p><strong>Example:</strong>${definitions.example === undefined ? "Not Found" :definitions.example}</p>
    <p><strong>Antonyms:</strong></p>
    `;

    //fatching Antonyms
    if(definitions.antonyms.length === 0){
        resultDiv.innerHTML += `<span>Not Found</span>`;
    }
    else{
    for(let i =0; i<definitions.antonyms.length; i++){
        resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`
    }
}

    //Adding Read more Button for read all the data
    resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls} target="_blanck">Read More</a></div>`

}
catch(error){
    resultDiv.innerHTML = `<p>Sorry, the word could not found.</p>`
}
    console.log(data);
    
}