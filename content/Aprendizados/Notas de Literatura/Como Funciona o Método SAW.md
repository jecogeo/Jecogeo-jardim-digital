---
title: Como Funciona o Método SAW
draft: false
tags:
  - cienciadedados
  - estatistica/decisaomulticriterio
created: 2026-11-06 12:49
modified: 2026-11-06 12:49
---
**SAW** (_Simple Additive Weighting_), também conhecido como **WSM** (_Weighted Sum Model_), é um [[O que é Análise de Decisão Multicritério|método de decisão multicritério]] baseado na agregação aditiva dos desempenhos de diferentes alternativas. Seu princípio consiste em atribuir um peso a cada critério e calcular a soma dos desempenhos ponderados, produzindo uma pontuação global para cada alternativa (Triantaphyllou, 2000).

A pergunta fundamental do método é: 
>Qual alternativa apresenta o maior desempenho global, considerando a importância relativa de cada critério?

O SAW pertence à família dos métodos compensatórios. Isso significa que um desempenho desfavorável em determinado critério pode ser compensado por um desempenho favorável em outro, de acordo com os pesos atribuídos.

## Como funciona?

Considere um conjunto de $m$ alternativas avaliadas segundo $n$ critérios. O desempenho de cada alternativa é representado por uma matriz de decisão, na qual $x_{ij}$ corresponde ao desempenho da alternativa $i$ no critério $j$. Como os critérios podem apresentar unidades e escalas diferentes, frequentemente é necessário transformá-los em escalas comparáveis. Essa transformação pode envolver normalização e construção de funções de valor.

A pontuação global de cada alternativa é calculada por:

$$  
S_i = \sum_{j=1}^{n} w_j r_{ij}  
$$

Em que:

- $S_i$ é a pontuação global da alternativa $i$;
    
- $w_j$ é o peso atribuído ao critério $j$;
    
- $r_{ij}$ é o desempenho normalizado ou valor da alternativa $i$ no critério $j$;
    
- $n$ é o número de critérios.
    

Usualmente, os pesos são não negativos e normalizados de modo que:

$$  
\sum_{j=1}^{n} w_j = 1  
$$

Nessas condições, a pontuação global corresponde a uma média ponderada dos valores dos critérios. A alternativa preferida é aquela que apresenta a maior pontuação:

$$  
A^* = \arg\max_i S_i  
$$

## Exemplo prático

Considere três áreas candidatas à restauração ecológica, avaliadas segundo dois critérios: biodiversidade e segurança hídrica. Os desempenhos foram previamente transformados para uma escala entre 0 e 1, em que valores maiores representam condições mais favoráveis.

|Área|Biodiversidade|Segurança hídrica|
|---|---|---|
|A|0,90|0,20|
|B|0,60|0,70|
|C|0,40|0,90|

Suponha que ambos os critérios tenham a mesma importância, com pesos iguais a 0,5.

Para a área A:

$$  
S_A = (0.5 \times 0.90) + (0.5 \times 0.20) = 0.55  
$$

Para a área B:

$$  
S_B = (0.5 \times 0.60) + (0.5 \times 0.70) = 0.65  
$$

Para a área C:

$$  
S_C = (0.5 \times 0.40) + (0.5 \times 0.90) = 0.65  
$$

Portanto, as áreas B e C apresentam a maior pontuação global, ambas com 0,65.

O exemplo demonstra uma característica importante do SAW: **diferentes combinações de desempenho podem produzir a mesma pontuação global**.

## Pressupostos e propriedades

A principal propriedade do SAW é a compensação aditiva. Uma redução no desempenho de determinado critério pode ser compensada por um aumento suficientemente grande em outro. Essa propriedade decorre da estrutura matemática da agregação e pressupõe que as trocas entre critérios representadas pelos pesos sejam aceitáveis para o problema de decisão. Entretanto, a aplicação de um modelo aditivo de valor também exige atenção à independência preferencial entre critérios e à interpretação das escalas utilizadas (Keeney & Raiffa, 1976).

Outro aspecto importante é que os pesos não representam necessariamente apenas a importância abstrata dos critérios. Em modelos de valor aditivo, sua interpretação depende das escalas e das amplitudes de variação consideradas. Por isso, **a normalização não deve ser tratada como uma operação meramente técnica**. Diferentes transformações podem modificar as relações entre os desempenhos e, consequentemente, os resultados da agregação.

## Vantagens e limitações

Entre as principais vantagens do SAW estão sua simplicidade matemática, transparência, baixo custo computacional e facilidade de interpretação. O método também permite avaliar grandes conjuntos de alternativas, incluindo aplicações espaciais com milhões de células raster.

Entretanto, apresenta limitações importantes:

- **Compensação elevada:** desempenhos muito desfavoráveis podem ser compensados por resultados favoráveis em outros critérios.
    
- **Sensibilidade aos pesos:** mudanças na importância relativa dos critérios podem modificar a classificação das alternativas.
    
- **Dependência das escalas:** diferentes procedimentos de normalização ou transformação podem produzir resultados distintos.
    
- **Ausência de veto:** o método não impede automaticamente que uma alternativa com desempenho inaceitável em determinado critério obtenha uma pontuação global elevada.
    

A última limitação pode ser contornada parcialmente mediante a introdução de restrições, máscaras de exclusão ou critérios mínimos de elegibilidade antes da agregação.

## Referências bibliográficas

**Fishburn, P. C. (1967).** Additive utilities with finite sets: Applications in the management sciences. _Naval Research Logistics Quarterly, 14_(1), 1–13. [https://doi.org/10.1002/nav.3800140102](https://doi.org/10.1002/nav.3800140102)

**Keeney, R. L., & Raiffa, H. (1976).** _Decisions with Multiple Objectives: Preferences and Value Tradeoffs_. John Wiley & Sons. ([Internet Achive]([https://archive.org/details/decisionswithmul0000keen))

**Triantaphyllou, E. (2000).** _Multi-Criteria Decision Making Methods: A Comparative Study_. Kluwer Academic Publishers. [https://doi.org/10.1007/978-1-4757-3157-6](https://doi.org/10.1007/978-1-4757-3157-6)