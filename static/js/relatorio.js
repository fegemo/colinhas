import graficos from './graficos.js';



(async () => {

  try {
    // pega os dados do relatório
    const response = await fetch('/api/relatorios/avaliacoes-por-usuario').then(r => r.json());

    // mostra os dados
    const relatorioEl = document.querySelector('#relatorio');
    const template = document.querySelector('#' + relatorioEl.dataset.relatorio).innerHTML;
    response.users = response.users.map(u => {
      return {
        nome: u.name,
        fezTrabalho: u.didWork ? 'sim': 'não :(',
        avaliacoesFeitas: u.reviewsMade,
        avaliacoesRecebidas: {
          completude: u.reviewsReceived.map(r => r.completeness),
          beleza: u.reviewsReceived.map(r => r.beauty),
          favoritadas: u.reviewsReceived.filter(r => r.favorite).length
        },
        classeTemGraficos: u.didWork ? 'tem-graficos' : ''
      };
    });
    relatorioEl.innerHTML = mustache(template, response);

    // cria os gráficos de avaliações
    relatorioEl.querySelectorAll('tr.tem-graficos').forEach(el => {
      const completudeEl = el.querySelector('.grafico-completude');
      const belezaEl = el.querySelector('.grafico-beleza');
      graficos.create(
        completudeEl,
        belezaEl,
        JSON.parse(completudeEl.dataset.completude),
        JSON.parse(belezaEl.dataset.beleza),
        {
          title: {
            display: false
          }
        }
      );
    });
  } catch (err) {
    // TODO
    console.error(err)
  }
})();
