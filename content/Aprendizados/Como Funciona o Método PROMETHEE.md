---
title: Como Funciona o Método PROMETHEE
draft: false
tags:
  - cienciadedados
  - semente
created: 2024-11-22 11:25
modified: 2024-11-22 11:25
---
A abordagem PROMETHEE (*Preference Ranking Organization Method for Enrichment Evaluation*) é um método de [[O que é Análise de Decisão Multicritério|Decisão Multicritério]] baseado em um relacionamento de superação (ou sobreclassificação; *outranking*) entre pares alternados ([Brans 1982]([J.P. Brans. L’ingénièrie de la décision; Elaboration... - Google Acadêmico](https://scholar.google.com/scholar?&q=J.P.%20Brans.%20L%E2%80%99ing%C3%A9ni%C3%A8rie%20de%20la%20d%C3%A9cision%3B%20Elaboration%20d%E2%80%99instruments%20d%E2%80%99aide%20%C3%A0%20la%20d%C3%A9cision.%20La%20m%C3%A9thode%20PROMETHEE.%20In%20R.%20Nadeau%20and%20M.%20Landry%2C%20editors%2C%20L%E2%80%99aide%20%C3%A0%20la%20d%C3%A9cision%3A%20Nature%2C%20Instruments%20et%20Perspectives%20d%E2%80%99Avenir%2C%20pages%20183%E2%80%93213%2C%20Qu%C3%A9bec%2C%20Canada%2C%201982.%20Presses%20de%20l%E2%80%99Universit%C3%A9%20Laval.))). Em vez de apontar para uma decisão correta, a abordagem PROMETHEE permite que os tomadores de decisão encontrem a melhor resposta para sua intenção e compreensão do problema ([Brans & De Smet 2016]([PROMETHEE Methods | SpringerLink](https://link.springer.com/chapter/10.1007/978-1-4939-3094-4_6))). Ela oferece um contexto integrado e lógico no qual o problema de decisão pode ser organizado, suas contradições e sinergias definidas e quantificadas, clusters de ação e as principais alternativas e pensamento sistemático subjacentes a eles. 

O PROMETHEE se refere a decisões nas seguintes situações como:
- **Opção** ou **Alternativa**: ou seja, selecionar uma alternativa de uma coleção específica de alternativas, normalmente quando vários critérios de decisão foram incluídos; 
- **Priorização**: Avaliar o valor relativo dos membros de um conjunto de alternativas em comparação com a preferência de uma alternativa específica. Ou simplesmente identificar a alternativa;
- **Alocação**: alocação de recursos ou custos para uma variedade de escolhas;
- **Classificação**: Adicionar uma variedade de alternativas para explicitar o conflito entre elas; e 
- **Resolução**: Desentendimentos entre partes aparentemente conflitantes são resolvidos.

O teste de superação compara pares de alternativas para qualquer parâmetro. A abordagem PROMETHEE produz a função preferencial para definir a disparidade na escolha em cada critério entre pares de alternativas. Assim, funções de preferência são construídas sobre a diferença numérica entre pares de alternativas para descrever a diferença preferencial do ponto de vista do tomador de decisão. O valor de tais funções varia de 0 a 1. Quanto maior o valor da função, maior será a diferença de preferência. Não há diferencial preferencial entre pares de alternativas quando o valor é zero.

Para cada par de alternativas $(a_t,a_{t^´} ϵ \space A)$, são definidos índices de referências para todos os parâmetros.


$$
\pi \left( {a_{t} ,a_{{t^{\prime}}} } \right) = \mathop \sum \limits_{k = 1}^{K} w_{k} .\left[ {p_{k} \left( {f_{k} \left( {a_{t} } \right) - f_{k} \left( {a_{{t^{\prime}}} } \right)} \right)} \right], AXA \to \left[ {0,1} \right] { }
$$
 

 $\pi \left( {a_{t} ,a_{{t^{\prime}}} } \right)$ indica a medida de preferência de $a_t$ sobre  $a_{t´}$, enquanto $w_{k}$ indica os pesos de importância do critério $k$: Quanto mais perto $\pi \left( {a_{t} ,a_{{t^{\prime}}} } \right)$ está de 1, maior a preferência.

Fonte: Uzun, B., Almasri, A., Uzun Ozsahin, D. (2021). **Preference Ranking Organization Method for Enrichment Evaluation (Promethee)**. In: Uzun Ozsahin, D., Gökçekuş, H., Uzun, B., LaMoreaux, J. (eds) Application of Multi-Criteria Decision Analysis in Environmental and Civil Engineering. Professional Practice in Earth Sciences. Springer, Cham. https://doi.org/10.1007/978-3-030-64765-0_6