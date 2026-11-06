---
title: Como Funciona o Método WPM
draft: false
tags:
  - cienciadedados
  - estatistica/decisaomulticriterio
created: 2026-11-06 14:58
modified: 2026-11-06 14:58
---
O **WPM (**_**Weighted Product Model**_**)**, ou Modelo do Produto Ponderado, é um [[O que é Análise de Decisão Multicritério|método de decisão multicritério]] baseado na agregação multiplicativa dos desempenhos das alternativas. Semelhante ao [[Como Funciona o Método SAW|SAW]] (_Simple Additive Weighting_), o WPM utiliza pesos para representar a importância relativa dos critérios, mas substitui a soma ponderada por um produto de potências (Triantaphyllou, 2000).

A pergunta fundamental do método é: 
>Qual alternativa apresenta o melhor desempenho conjunto entre os critérios, considerando suas importâncias relativas?

Uma característica importante do WPM é sua sensibilidade aos desempenhos proporcionalmente baixos. Diferentemente da agregação aditiva, a multiplicação faz com que valores próximos de zero reduzam fortemente a pontuação global. Por isso, o WPM tende a desfavorecer alternativas com desempenhos muito desequilibrados, embora essa propriedade dependa das escalas e transformações adotadas.

## Como funciona?

Considere um conjunto de $m$ alternativas avaliadas segundo $n$ critérios. Cada alternativa apresenta um desempenho $r_{ij}$ no critério $j$, previamente orientado para que valores maiores representem condições mais favoráveis.

A pontuação global de cada alternativa é calculada por:

$$  
P_i = \prod_{j=1}^{n} r_{ij}^{w_j}  
$$

Em que:

- $P_i$ é a pontuação global da alternativa $i$;
    
- $r_{ij}$ é o desempenho positivo da alternativa $i$ no critério $j$;
    
- $w_j$ é o peso atribuído ao critério $j$;
    
- $n$ é o número de critérios.
    

Usualmente, os pesos são não-negativos e satisfazem:

$$  
\sum_{j=1}^{n}w_j=1  
$$

Nessas condições, o WPM corresponde a uma **média geométrica ponderada** dos desempenhos. A alternativa preferida é aquela com maior pontuação:

$$  
A^* = \arg\max_i P_i  
$$

Outra formulação clássica do WPM compara diretamente duas alternativas, $A_p$ e $A_q$, por meio da razão entre seus desempenhos:

$$  
R(A_p,A_q) =  
\prod_{j=1}^{n}  
\left(\frac{r_{pj}}{r_{qj}}\right)^{w_j}  
$$

Quando $R(A_p,A_q)>1$, a alternativa $A_p$ é preferível a $A_q$; quando a razão é igual a 1, ambas apresentam o mesmo desempenho agregado. Essa formulação evidencia uma propriedade do método: a comparação depende das razões entre desempenhos, e não de suas diferenças absolutas.

## Exemplo prático

Considere três áreas candidatas à restauração ecológica, avaliadas segundo dois critérios: biodiversidade e segurança hídrica. Os desempenhos foram transformados para uma escala entre 0 e 1, na qual valores maiores representam condições mais favoráveis.

|Área|Biodiversidade|Segurança hídrica|
|---|---|---|
|A|0,90|0,20|
|B|0,60|0,70|
|C|0,40|0,90|

Suponha que ambos os critérios tenham pesos iguais a 0,5.

Para a área A:

$$  
P_A = 0.90^{0.5}\times0.20^{0.5}  
\approx0.424  
$$

Para a área B:

$$  
P_B = 0.60^{0.5}\times0.70^{0.5}  
\approx0.648  
$$

Para a área C:

$$  
P_C = 0.40^{0.5}\times0.90^{0.5}  
=0.600  
$$

Portanto, a classificação das alternativas é:

$$  
B>C>A  
$$

A área B apresenta o melhor desempenho conjunto, pois mantém valores relativamente elevados em ambos os critérios.

### Comparação com o SAW

Aplicando o SAW aos mesmos dados e pesos, obtemos:

|Área|SAW|WPM|
|---|---|---|
|A|0,550|0,424|
|B|0,650|0,648|
|C|0,650|0,600|

No SAW, as áreas B e C apresentam pontuações idênticas. No WPM, a área B é favorecida por apresentar desempenhos mais equilibrados. Esse resultado ilustra como a agregação multiplicativa pode penalizar combinações com grandes diferenças entre critérios.

## Pressupostos e propriedades

### Compensação multiplicativa

O WPM permite compensação entre critérios, mas essa compensação ocorre em termos proporcionais, diferentemente das trocas aditivas do SAW. Um aumento proporcional no desempenho de determinado critério pode compensar uma redução proporcional em outro, dependendo dos respectivos pesos. Portanto, o WPM não é um método estritamente não compensatório. Sua principal diferença está na estrutura matemática das compensações.

### Interpretação dos pesos

No WPM, os pesos funcionam como expoentes, determinando a influência das variações proporcionais de cada critério sobre a pontuação global. Essa propriedade pode ser observada pela transformação logarítmica:

$$  
\ln(P_i)=\sum_{j=1}^{n}w_j\ln(r_{ij})  
$$

Assim, a agregação multiplicativa equivale a uma soma ponderada dos logaritmos dos desempenhos. Essa relação ajuda a compreender por que diferenças proporcionais, e não simplesmente absolutas, são fundamentais para o método.

### Sensibilidade a valores próximos de zero

Quando um critério apresenta valor zero e seu peso é positivo, a pontuação global também será zero:

$$  
r_{ij}=0,\quad w_j>0  
\Rightarrow P_i=0  
$$

Isso ocorre independentemente dos desempenhos nos demais critérios. Por essa razão, a utilização do WPM exige cuidado com valores nulos, especialmente quando resultam de procedimentos de normalização. É necessário distinguir um valor zero que representa efetivamente a ausência de desempenho de outro que apenas identifica o menor valor observado na amostra.

### Invariância à mudança de unidades

Na formulação por razões, o WPM é invariável à multiplicação de todos os desempenhos de determinado critério por uma constante positiva. Essa propriedade permite comparar critérios expressos em diferentes unidades, desde que suas escalas sejam adequadas à interpretação de razões. Entretanto, o método não é invariável a transformações aditivas ou a qualquer procedimento arbitrário de normalização.

## Vantagens e limitações

Entre as principais vantagens do WPM estão sua simplicidade matemática, baixo custo computacional e capacidade de representar relações proporcionais entre critérios. O método também pode ser útil quando se deseja evitar que desempenhos muito baixos sejam facilmente compensados por desempenhos elevados em outros critérios.

Entretanto, apresenta limitações importantes:

- **Sensibilidade a valores nulos:** um desempenho zero pode anular toda a pontuação agregada.
    
- **Dependência das escalas:** transformações inadequadas podem alterar as relações proporcionais entre alternativas.
    
- **Compensação ainda existente:** embora diferente da compensação aditiva, o método permite trocas entre critérios.
    
- **Sensibilidade aos pesos:** mudanças nos expoentes podem modificar significativamente a classificação.
    
- **Interpretação dos resultados:** a pontuação multiplicativa pode ser menos intuitiva do que uma soma ponderada.
    

Em aplicações espaciais, particularmente quando critérios são normalizados para o intervalo $[0,1]$, é importante avaliar o significado dos valores próximos de zero antes de aplicar a agregação.

## Referências bibliográficas

**Triantaphyllou, E. (2000).** _Multi-Criteria Decision Making Methods: A Comparative Study_. Kluwer Academic Publishers. [https://doi.org/10.1007/978-1-4757-3157-6](https://doi.org/10.1007/978-1-4757-3157-6)

**Triantaphyllou, E., & Sánchez, A. (1997).** A sensitivity analysis approach for some deterministic multi-criteria decision-making methods. _Decision Sciences, 28_(1), 151–194. [https://doi.org/10.1111/j.1540-5915.1997.tb01306.x](https://doi.org/10.1111/j.1540-5915.1997.tb01306.x)

**Triantaphyllou, E., & Mann, S. H. (1989).** An examination of the effectiveness of multi-dimensional decision-making methods: A decision-making paradox. _Decision Support Systems, 5_(3), 303–312. [https://doi.org/10.1016/0167-9236(89)90037-7](https://doi.org/10.1016/0167-9236(89)90037-7)