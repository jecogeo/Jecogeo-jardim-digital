---
title: Como Funciona o Método ELECTRE
draft: false
tags:
  - cienciadedados
  - estatistica/decisaomulticriterio
created: 2026-11-06 17:47
modified: 2026-11-06 17:47
---
O **ELECTRE (**_**Élimination et Choix Traduisant la Réalité**_**)** é uma família de [[O que é Análise de Decisão Multicritério|métodos de decisão multicritério]] baseada em relações de superação (_outranking_), desenvolvida a partir dos trabalhos de Bernard Roy e colaboradores na década de 1960 (Roy, 1968).

Diferentemente dos métodos SAW, WPM e TOPSIS, o ELECTRE não procura necessariamente atribuir uma pontuação global única a cada alternativa. Seu objetivo é estabelecer relações de preferência fundamentadas em comparações par a par, considerando evidências favoráveis e contrárias à superioridade de uma alternativa sobre outra.

A pergunta fundamental é: 
>Existem argumentos suficientemente fortes para considerar que a alternativa A é pelo menos tão boa quanto B, sem que exista uma objeção decisiva a essa afirmação?

Essa lógica utiliza dois conceitos fundamentais: **concordância**, que representa o apoio dos critérios à relação de superação, e **discordância**, que representa a existência de desempenhos contrários suficientemente importantes para enfraquecer ou impedir essa relação.

O ELECTRE é uma família de métodos com diferentes finalidades. O ELECTRE I, utilizado como referência nesta nota, foi desenvolvido principalmente para problemas de escolha, enquanto variantes como ELECTRE II e III são voltadas à ordenação e ELECTRE TRI à classificação de alternativas em categorias.

## Como funciona?

Considere um conjunto de $m$ alternativas avaliadas segundo $n$ critérios, cujos desempenhos são representados por $g_j(a)$. Para simplificar, suponha que todos os critérios estejam orientados para maximização e que seus pesos sejam positivos e normalizados. O procedimento básico do ELECTRE I pode ser apresentado em cinco etapas.

### 1. Comparação par a par

Para cada par de alternativas $a$ e $b$, verifica-se em quais critérios a alternativa $a$ apresenta desempenho pelo menos tão bom quanto $b$. O conjunto de concordância é definido por:

$$  
J^{+}(a,b)={j(a)\geq g_j(b)}  
$$

Esse conjunto reúne os critérios que sustentam a afirmação de que $a$ supera $b$.

### 2. Índice de concordância

O índice de concordância representa a proporção dos pesos associada aos critérios favoráveis à superação:

$$  
C(a,b)=\sum_{j\in J^{+}(a,b)}w_j  
$$

Considerando pesos normalizados, o índice varia entre 0 e 1. Quanto maior $C(a,b)$, maior o apoio dos critérios à afirmação de que $a$ é pelo menos tão boa quanto $b$. É importante observar que a concordância não mede a magnitude das vantagens, mas a importância acumulada dos critérios nos quais a alternativa não apresenta desempenho inferior.

### 3. Discordância e veto

A concordância, isoladamente, não é suficiente para estabelecer uma relação de superação. Uma alternativa pode apresentar desempenho superior na maioria dos critérios e, ainda assim, possuir uma deficiência inaceitável em um critério específico. Para representar essa situação, podem ser definidos limiares de veto $v_j$.

A superação de $a$ sobre $b$ é impedida quando existe pelo menos um critério no qual a desvantagem de $a$ atinge o limiar estabelecido:

$$  
g_j(b)-g_j(a)\geq v_j  
$$

Essa condição representa uma discordância suficientemente forte para bloquear a relação de superação. No ELECTRE I, a discordância pode ser representada por esses limiares de veto. Outras formulações e implementações utilizam índices de discordância normalizados e limiares globais, enquanto variantes posteriores incorporam mecanismos mais elaborados de concordância e discordância.

### 4. Estabelecimento da relação de superação

Uma alternativa $a$ supera uma alternativa $b$, representada por $aSb$, quando duas condições são satisfeitas simultaneamente:

1. A concordância alcança um limiar mínimo $\lambda$.
    
2. Nenhum critério apresenta uma discordância suficientemente grande para acionar o veto.
    

Formalmente:

$$  
aSb \iff  
\begin{cases}  
C(a,b)\geq\lambda\  
g_j(b)-g_j(a)<v_j,\quad\forall j  
\end{cases}  
$$

O limiar $\lambda$ representa o nível mínimo de concordância exigido para aceitar a relação de superação.

### 5. Identificação das alternativas selecionadas

Após comparar todos os pares, constrói-se uma relação de superação que pode ser representada por um grafo direcionado. Nesse grafo, cada alternativa corresponde a um vértice, e uma ligação de $a$ para $b$ indica que $a$ supera $b$. O ELECTRE I procura identificar um conjunto de alternativas denominado **núcleo (**_**kernel**_**)**, caracterizado por duas propriedades:

- As alternativas pertencentes ao núcleo não se superam entre si.
    
- Cada alternativa fora do núcleo é superada por pelo menos uma alternativa pertencente ao núcleo.
    

Quando existem ciclos de superação, seu tratamento exige procedimentos específicos. Diferentemente do SAW, WPM e TOPSIS, o resultado do ELECTRE I não precisa ser uma classificação completa das alternativas.

## Exemplo prático

Considere três áreas candidatas à restauração ecológica, avaliadas segundo biodiversidade e segurança hídrica. Os desempenhos foram transformados para uma escala entre 0 e 1, na qual valores maiores representam condições mais favoráveis.

| Área | Biodiversidade | Segurança hídrica |
| ---- | -------------- | ----------------- |
| A    | 0,90           | 0,20              |
| B    | 0,60           | 0,70              |
| C    | 0,40           | 0,90              |

Considere pesos iguais a 0,5 para os dois critérios, limiar de concordância $\lambda=0.5$ e limiar de veto $v_j=0.4$ para ambos.

### Comparação entre A e B

A área A apresenta maior desempenho em biodiversidade, mas desempenho inferior em segurança hídrica. O índice de concordância é:

$$  
C(A,B)=0.5  
$$

Portanto, a condição de concordância é satisfeita.

Entretanto, a desvantagem de A em segurança hídrica é:

$$  
0.70-0.20=0.50  
$$

Como essa diferença ultrapassa o limiar de veto de 0,4, a relação de superação é bloqueada. Assim, **A não supera B**, apesar de apresentar concordância suficiente. Na comparação inversa, B também apresenta concordância de 0,5. Sua desvantagem em biodiversidade é de 0,3, inferior ao limiar de veto. Portanto, **B supera A**.

### Comparação entre B e C

B apresenta maior desempenho em biodiversidade, enquanto C apresenta maior desempenho em segurança hídrica. O índice de concordância é 0,5 nas duas direções. As respectivas desvantagens são de 0,2 e 0,2, ambas inferiores ao limiar de veto. Consequentemente:

$$  
BSC \quad \text{e} \quad CSB  
$$

As duas alternativas superam uma à outra. Isso não significa que sejam idênticas, mas que ambas satisfazem as condições estabelecidas para a superação recíproca.

### Comparação entre A e C

A apresenta maior biodiversidade, mas uma desvantagem de 0,7 em segurança hídrica, acionando o veto. Na direção inversa, C apresenta maior segurança hídrica, mas uma desvantagem de 0,5 em biodiversidade, também acionando o veto. Portanto, nenhuma das duas alternativas supera a outra.

### Resultado

A matriz de superação obtida é:

|Supera|A|B|C|
|---|---|---|---|
|A|—|Não|Não|
|B|Sim|—|Sim|
|C|Não|Sim|—|

Nesse exemplo, as alternativas B e C apresentam superação recíproca, enquanto A não supera nenhuma das outras. O resultado evidencia que a relação de superação não corresponde necessariamente a uma ordenação linear. Considerando o tratamento da superação recíproca e a identificação do núcleo, B constitui a alternativa selecionada neste exemplo.

## Pressupostos e propriedades

### Compensação limitada

O ELECTRE permite que diferentes critérios contribuam conjuntamente para sustentar uma relação de superação. Entretanto, a presença de limiares de veto pode impedir que uma desvantagem muito elevada seja compensada por vantagens em outros critérios. Por essa razão, o método é frequentemente descrito como parcialmente compensatório ou não plenamente compensatório.

### Incomparabilidade

Uma característica fundamental dos métodos ELECTRE é a possibilidade de duas alternativas permanecerem incomparáveis. Isso ocorre quando não existem argumentos suficientes para estabelecer a superação em nenhuma das duas direções. A incomparabilidade não deve ser confundida com indiferença. Duas alternativas podem apresentar desempenhos muito diferentes e, ainda assim, não existir uma relação de superação entre elas.

### Interpretação dos pesos

No ELECTRE I, os pesos representam a importância relativa dos critérios na formação das coalizões de concordância. Diferentemente dos pesos de modelos aditivos de valor, eles não representam diretamente taxas de substituição entre desempenhos. Essa distinção é fundamental para compreender a filosofia do método.

### Limiares de preferência e veto

A definição dos limiares representa julgamentos sobre quais diferenças de desempenho são aceitáveis ou decisivas. No ELECTRE I, o veto pode impedir uma relação de superação mesmo quando existe concordância elevada. Variantes posteriores, como ELECTRE III, incorporam também limiares de indiferença e preferência, permitindo representar situações nas quais pequenas diferenças de desempenho não devem ser interpretadas como preferências estritas.

### Relações não transitivas

A relação de superação não é necessariamente transitiva. Isso significa que, mesmo quando A supera B e B supera C, não é garantido que A supere C. Essa propriedade distingue o ELECTRE de métodos que produzem diretamente uma pontuação global ordenável.

## Vantagens e limitações

Entre as principais vantagens do ELECTRE estão a possibilidade de representar preferências não plenamente compensatórias, incorporar vetos e reconhecer situações de incomparabilidade. O método pode ser especialmente interessante em problemas nos quais determinados critérios representam condições mínimas ou restrições consideradas essenciais.

Entretanto, apresenta limitações importantes:

- **Complexidade metodológica:** a definição e interpretação das relações de superação são menos intuitivas do que uma soma ponderada.
    
- **Definição dos limiares:** os resultados podem ser sensíveis aos valores de concordância e veto estabelecidos.
    
- **Ausência de classificação completa:** algumas variantes não produzem uma ordenação única de todas as alternativas.
    
- **Possibilidade de ciclos:** relações de superação podem apresentar estruturas não transitivas.
    
- **Custo computacional:** a comparação par a par cresce quadraticamente com o número de alternativas.
    

Em aplicações espaciais com milhões de células raster, a comparação exaustiva de todos os pares pode se tornar computacionalmente inviável. Por isso, sua aplicação pode exigir agregação espacial, seleção prévia de alternativas ou outras estratégias de redução do problema.

## Referências bibliográficas

**Roy, B. (1968).** Classement et choix en présence de points de vue multiples. _Revue française d'informatique et de recherche opérationnelle. Série verte, 2_(V1), 57–75. [https://www.numdam.org/item/RO_1968__2_1_57_0/](https://www.numdam.org/item/RO_1968__2_1_57_0/)

**Figueira, J., Mousseau, V., & Roy, B. (2005).** ELECTRE methods. In J. Figueira, S. Greco, & M. Ehrgott (Eds.), _Multiple Criteria Decision Analysis: State of the Art Surveys_ (pp. 133–162). Springer. [https://doi.org/10.1007/0-387-23081-5_4](https://doi.org/10.1007/0-387-23081-5_4)

**Figueira, J. R., Mousseau, V., & Roy, B. (2016).** ELECTRE methods. In S. Greco, M. Ehrgott, & J. R. Figueira (Eds.), _Multiple Criteria Decision Analysis: State of the Art Surveys_ (2nd ed., pp. 155–185). Springer. [https://doi.org/10.1007/978-1-4939-3094-4_5](https://doi.org/10.1007/978-1-4939-3094-4_5)