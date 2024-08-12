const getJSON = async(caminho) => {
    const resultado = await fetch(caminho);
    const dados = await resultado.json();
    return dados;
}

const _$ = (vid) => document.querySelector(vid);

const init = () => {
    let vdados = getJSON("https://programming-quotesapi.vercel.app/api/random");
    const blockquote = _$('.blockquote');
    const btn = _$('.btn');

    btn.addEventListener('click', function(){
        location.reload();
    });

    vdados.then(arr => {

       let quote = document.createElement('p');
       quote.className = "blockquote_text";
       let quotetext = document.createTextNode(Object.entries(arr)[1][1]);
       quote.appendChild(quotetext);

       let author = document.createElement('p');
       author.className = "blockquote_text blockquote_author";
       let authortext = document.createTextNode(`- ${Object.entries(arr)[0][1]}`);
       author.appendChild(authortext);

       blockquote.appendChild(quote);
       blockquote.appendChild(author);

    })
}

document.addEventListener('DOMContentLoaded', init);