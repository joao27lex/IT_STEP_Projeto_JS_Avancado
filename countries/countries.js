const getJSON = async (caminho) => {
    const resultado = await fetch(caminho);
    const dados = await resultado.json();
    return dados;
}

const init = () => {
    let vdados = getJSON("https://restcountries.com/v3.1/independent?status=true");
    console.log(vdados);

    vdados.then(arr => {
        //Para organizar os países em ordem alfabética
        arr.sort((a, b) => {
            if (a.name.common < b.name.common) return -1;
            if (a.name.common > b.name.common) return 1;
            return 0;
        });

        //Criando os elementos que irão constituir a página
        const bpagina = document.body;

        //Bootstrap para obter formato de 4 colunas responsivas
        const painel = document.createElement('div');
        painel.className = "row row-cols-md-4";

        arr.forEach(item => {
            //Definindo elementos que serão criados a cada iteração, ou seja, para cada país
            let coluna = document.createElement('div');
            coluna.className = "col";

            let card = document.createElement('div');
            card.className = "card";

            let img = document.createElement('img');
            img.className = "card-img-top";
            img.src = String(item.flags.svg);

            let cardbody = document.createElement('div');
            cardbody.className = "card-body";

            let cardtitle = document.createElement('h5');
            let textocardtitle = document.createTextNode(item.name.common);
            cardtitle.className = "card-title";
            cardtitle.appendChild(textocardtitle);

            let cardtext = document.createElement('p');
            cardtext.className = "card-text";

            let list = document.createElement('ul');

            let listitem1 = document.createElement('li');
            let textoitem1 = document.createTextNode(`Abreviação: ${item.cca3}`);
            listitem1.appendChild(textoitem1);

            //As capitais estão dentro de arrays, então é necessário passar um forEach para acessá-las
            let listitem2 = document.createElement('li');
            let textoitem2 = document.createTextNode('Capitais: ');
            listitem2.appendChild(textoitem2);
            item.capital.forEach(element => {
                if (item.capital.length != 1 && element != item.capital[item.capital.length - 1]) {
                    textoitem2conteudo = document.createTextNode(element + ", ");
                }
                else {
                    textoitem2conteudo = document.createTextNode(element);
                }
                listitem2.appendChild(textoitem2conteudo);
            })

            //Os continentes estão dentro de arrays, então é necessário passar um forEach para acessá-los
            let listitem3 = document.createElement('li');
            let textoitem3 = document.createTextNode('Continentes: ');
            listitem3.appendChild(textoitem3);
            item.continents.forEach(element => {

                //Lógica para adicionar vírgula aos itens que não se encontram na última posição da lista. Apenas por questões de organização.
                if (item.continents.length != 1 && element != item.continents[item.continents.length - 1]) {
                    textoitem3conteudo = document.createTextNode(element + ", ");
                }
                else {
                    textoitem3conteudo = document.createTextNode(element);
                }
                listitem3.appendChild(textoitem3conteudo);
            })

            let listitem4 = document.createElement('li');
            let textoitem4 = document.createTextNode(`Subregião: ${item.subregion}`);
            listitem4.appendChild(textoitem4);

            let listitem5 = document.createElement('li');
            //Altera a forma com que a população é mostrada, separando os milhares por pontos.
            let formattedPopulation = item.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            let textoitem5 = document.createTextNode(`População: ${formattedPopulation}`);
            listitem5.appendChild(textoitem5);


            //As línguas estão dentro de dicionários. Não consegui encontrar um padrão na nomenclatura das chaves desses dicionários, então utilizei o método "Object.entries" para iterar sobre o objeto principal e buscar apenas os valores, ignorando as chaves.
            let listitem6 = document.createElement('li');
            let textoitem6 = document.createTextNode('Línguas: ');
            listitem6.appendChild(textoitem6);
            const entries = Object.entries(item.languages);
            entries.forEach(([key, value], index) => {

                //Lógica para adicionar vírgula aos itens que não se encontram na última posição. Apenas por questões de organização.
                if (entries.length !== 1 && index !== entries.length - 1) {
                    textoitem6 = document.createTextNode(value + ", ");
                } else {
                    textoitem6 = document.createTextNode(value);
                }
                listitem6.appendChild(textoitem6);
            });

            //As moedas estão dentro de dicionários. Não consegui encontrar um padrão na nomenclatura das chaves desses dicionários, então utilizei o método "Object.entries" para iterar sobre o objeto principal e buscar apenas os valores, ignorando as chaves.
            let listitem7 = document.createElement('li');
            let textoitem7 = document.createTextNode('Moedas: ');
            listitem7.appendChild(textoitem7);
            Object.entries(item.currencies).forEach(([key, value]) => {
                let textoitem7 = document.createTextNode(`${value.name}, `);
                let textoitem7_1 = document.createTextNode(`${value.symbol}`)
                listitem7.appendChild(textoitem7);
                listitem7.appendChild(textoitem7_1);
            })

            //Append Child dos itens a lista
            list.appendChild(listitem1);
            list.appendChild(listitem2);
            list.appendChild(listitem3);
            list.appendChild(listitem4);
            list.appendChild(listitem5);
            list.appendChild(listitem6);
            list.appendChild(listitem7);

            cardtext.appendChild(list);

            cardbody.appendChild(cardtitle);
            cardbody.appendChild(cardtext);

            card.appendChild(img);
            card.appendChild(cardbody);

            coluna.appendChild(card);

            painel.appendChild(coluna);

        })

        bpagina.appendChild(painel);

    })
}

document.addEventListener('DOMContentLoaded', init);
