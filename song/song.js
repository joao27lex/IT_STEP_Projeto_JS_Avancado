const getJSON = async(caminho) => {
    const resultado = await fetch(caminho);
    const dados = await resultado.json();
    return dados;
}

const _$ = (vid) => document.getElementById(vid) || document.querySelector(vid);

const init = () => {
    const btnBuscar = _$('btnBuscar');
    let painel = _$('painel');

    btnBuscar.addEventListener('click', function() {
        const artista = _$('inputArtista').value;
        const musica = _$('inputMusica').value;
        painel.innerHTML = "";

        let vdados = getJSON(`https://api.lyrics.ovh/v1/${artista}/${musica}`);

        vdados.then(arr => {
            if (arr.lyrics) {
                painel.innerHTML = arr.lyrics.replace(/\n/g, "<br>");
                painel.style = "display: block";
            } else {
                painel.innerHTML = "Não foi possível encontrar sua música.";
                painel.style = "display: block";
            }
        })
    });
}

document.addEventListener('DOMContentLoaded', init);
