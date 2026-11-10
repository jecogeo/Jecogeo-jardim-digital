---
title: Como Funciona o Método PROMETHEE
draft: false
tags:
  - cienciadedados
  - estatistica/decisaomulticriterio
created: 2024-11-22 11:25
modified: 2024-11-22 11:25
---
O **PROMETHEE (**_**Preference Ranking Organization Method for Enrichment Evaluation**_**)** é uma família de [[O que é Análise de Decisão Multicritério|métodos de decisão multicritério]] baseada em relações de superação (_outranking_), desenvolvida por Jean-Pierre Brans a partir de 1982 e posteriormente aprofundada por Brans, Vincke e Mareschal (1986).

Diferentemente dos métodos SAW, WPM e TOPSIS, o PROMETHEE avalia as alternativas por meio de comparações par a par, considerando não apenas qual alternativa apresenta melhor desempenho em determinado critério, mas também a intensidade dessa preferência.

A pergunta fundamental do método é:
>Em que medida uma alternativa é preferível a outra, considerando as diferenças de desempenho e a importância relativa dos critérios?

Uma característica central do PROMETHEE é a utilização de funções de preferência, que permitem representar como diferenças de desempenho são interpretadas pelo tomador de decisão. Essas funções podem incorporar limiares de indiferença e preferência, distinguindo diferenças consideradas irrelevantes daquelas que representam vantagens significativas.

As duas formulações fundamentais são o **PROMETHEE I**, que produz uma ordenação parcial, e o **PROMETHEE II**, que produz uma ordenação completa das alternativas.

## Como funciona?

Considere um conjunto de $m$ alternativas avaliadas segundo $n$ critérios, representados por funções de desempenho $f_j(a)$. Para simplificar, suponha inicialmente que todos os critérios estejam orientados para maximização. O procedimento pode ser organizado em seis etapas.

### 1. Comparação par a par das alternativas

Para cada critério, calcula-se a diferença entre os desempenhos de duas alternativas:

$$  
d_j(a,b)=f_j(a)-f_j(b)  
$$

Em que:

- $d_j(a,b)$ é a diferença de desempenho entre as alternativas $a$ e $b$ no critério $j$;
    
- $f_j(a)$ é o desempenho da alternativa $a$;
    
- $f_j(b)$ é o desempenho da alternativa $b$.
    

Valores positivos indicam vantagem de $a$ sobre $b$ no critério considerado. Para critérios de custo, a diferença pode ser invertida, de modo que valores positivos continuem representando uma vantagem.

### 2. Definição das funções de preferência

As diferenças de desempenho são transformadas em graus de preferência por meio de uma função específica para cada critério:

$$  
P_j(a,b)=F_j(d_j(a,b))  
$$

Em que $F_j$ é uma função de preferência que assume valores entre 0 e 1.

A interpretação é:

- $P_j(a,b)=0$: não existe preferência estrita de $a$ sobre $b$ no critério.
    
- $0<P_j(a,b)<1$: existe preferência de intensidade intermediária.
    
- $P_j(a,b)=1$: existe preferência máxima segundo a função adotada.
    

A escolha da função determina como as diferenças de desempenho são convertidas em preferências.

#### As seis funções clássicas de preferência

Brans e colaboradores propuseram seis tipos de funções de preferência, frequentemente denominados critérios generalizados.

|Tipo|Função|Característica|
|---|---|---|
|I|Usual|Qualquer diferença positiva estabelece preferência máxima|
|II|Forma U|Diferenças até o limiar $q$ são consideradas indiferentes|
|III|Forma V|A preferência cresce linearmente até atingir o limiar $p$|
|IV|Em níveis|A preferência assume valores discretos, geralmente 0, 0,5 e 1|
|V|Linear com indiferença|Existe uma zona de indiferença até $q$, seguida de crescimento linear até $p$|
|VI|Gaussiana|A preferência cresce suavemente segundo uma função exponencial|

Os parâmetros mais comuns são:

- $q$: limiar de indiferença, abaixo do qual diferenças não justificam preferência estrita.
    
- $p$: limiar de preferência, a partir do qual a preferência é considerada máxima.
    
- $s$: parâmetro de escala da função gaussiana.
    

Esses parâmetros devem ser definidos de acordo com o significado dos critérios e com os julgamentos de preferência do problema. Por exemplo, uma diferença entre 0,60 e 0,61 em um indicador de segurança hídrica pode ser considerada irrelevante caso esteja abaixo do limiar de indiferença.

#### Exemplo: função linear com indiferença

Para a função de preferência do tipo V, podemos escrever:

$$
P_j(d) =
\begin{cases}
0, & \text{se } d \leq q_j \\
\dfrac{d-q_j}{p_j-q_j}, & \text{se } q_j < d < p_j \\
1, & \text{se } d \geq p_j
\end{cases}
$$

Em que $p_j>q_j\geq0$.

Essa função permite estabelecer uma zona na qual pequenas diferenças não são interpretadas como preferência, uma zona de crescimento gradual e uma zona de preferência máxima.

### 3. Cálculo do índice agregado de preferência

As preferências individuais são combinadas utilizando os pesos dos critérios:

$$  
\pi(a,b)=\sum_{j=1}^{n}w_jP_j(a,b)  
$$

Em que:

- $\pi(a,b)$ representa a intensidade agregada da preferência de $a$ sobre $b$;
    
- $w_j$ representa o peso do critério $j$;
    
- $P_j(a,b)$ representa a preferência de $a$ sobre $b$ no critério $j$.
    

Usualmente, os pesos são não negativos e normalizados:

$$  
\sum_{j=1}^{n}w_j=1  
$$

Nessas condições, o índice agregado varia entre 0 e 1. Quanto maior $\pi(a,b)$, maior a preferência agregada de $a$ sobre $b$. É importante observar que, em geral:

$$  
\pi(a,b)\neq\pi(b,a)  
$$

A preferência de $a$ sobre $b$ não precisa ter a mesma intensidade que a preferência de $b$ sobre $a$.

### 4. Cálculo dos fluxos de preferência

Após calcular os índices de preferência para todos os pares de alternativas, são definidos dois fluxos para cada alternativa.

**Fluxo positivo (ou de saída)**

$$  
\phi^{+}(a)=\frac{1}{m-1}\sum_{b\neq a}\pi(a,b)  
$$

Representa a intensidade média com que a alternativa $a$ supera as demais alternativas. Quanto maior o fluxo positivo, maior a capacidade da alternativa de superar outras.

**Fluxo negativo (ou de entrada)**

$$  
\phi^{-}(a)=\frac{1}{m-1}\sum_{b\neq a}\pi(b,a)  
$$

Representa a intensidade média com que a alternativa $a$ é superada pelas demais. Quanto menor o fluxo negativo, menor a intensidade das preferências contrárias à alternativa.

### 5. PROMETHEE I — Ordenação parcial

O PROMETHEE I utiliza simultaneamente os fluxos positivo e negativo para estabelecer relações de preferência. Uma alternativa $a$ é estritamente preferida a $b$ quando apresenta fluxo positivo pelo menos tão elevado e fluxo negativo não superior, com pelo menos uma desigualdade estrita:

$$  
\phi^{+}(a)\geq\phi^{+}(b)  
$$

$$  
\phi^{-}(a)\leq\phi^{-}(b)  
$$

Se uma alternativa apresenta maior fluxo positivo, mas também maior fluxo negativo, pode ocorrer incomparabilidade. Essa propriedade permite reconhecer situações nas quais não existe evidência suficiente para estabelecer uma preferência inequívoca.

### 6. PROMETHEE II — Ordenação completa

O PROMETHEE II combina os fluxos positivo e negativo em um único fluxo líquido:

$$  
\phi(a)=\phi^{+}(a)-\phi^{-}(a)  
$$

O fluxo líquido representa o balanço entre a intensidade com que uma alternativa supera as demais e a intensidade com que é superada. Seus valores variam entre -1 e 1, considerando índices de preferência normalizados. A alternativa preferida é aquela com maior fluxo líquido:

$$  
A^{*}=\arg\max_a\phi(a)  
$$

O PROMETHEE II permite estabelecer uma ordenação completa, embora possam ocorrer empates. Entretanto, a agregação em um único fluxo elimina a possibilidade de representar explicitamente algumas incomparabilidades identificadas pelo PROMETHEE I.

## Exemplo prático

Considere três áreas candidatas à restauração ecológica, avaliadas segundo biodiversidade e segurança hídrica. Os desempenhos foram previamente transformados para uma escala entre 0 e 1, na qual valores maiores representam condições mais favoráveis.

|Área|Biodiversidade|Segurança hídrica|
|---|---|---|
|A|0,90|0,20|
|B|0,60|0,70|
|C|0,40|0,90|

Considere pesos iguais a 0,5 para ambos os critérios. Para simplificar, será utilizada a função de preferência do tipo III (forma V), com limiar de preferência $p=0.5$ e sem zona de indiferença positiva.

A função é definida por:

$$  
P_j(d)=  
\begin{cases}  
0, & d\leq0\  
\frac{d}{0.5}, & 0<d<0.5\  
1, & d\geq0.5  
\end{cases}  
$$

### Comparação entre A e B

A área A apresenta vantagem de 0,30 em biodiversidade, mas desvantagem de 0,50 em segurança hídrica. As preferências individuais de A sobre B são:

$$  
P_1(A,B)=0.6  
$$

$$  
P_2(A,B)=0  
$$

Portanto:

$$  
\pi(A,B)=(0.5\times0.6)+(0.5\times0)=0.3  
$$

Na direção inversa, B apresenta preferência máxima em segurança hídrica e nenhuma preferência em biodiversidade:

$$  
\pi(B,A)=(0.5\times0)+(0.5\times1)=0.5  
$$

Assim, a preferência agregada de B sobre A é maior que a preferência de A sobre B.

### Comparação entre B e C

B apresenta vantagem de 0,20 em biodiversidade, enquanto C apresenta vantagem de 0,20 em segurança hídrica. Consequentemente:

$$  
\pi(B,C)=0.2  
$$

$$  
\pi(C,B)=0.2  
$$

As preferências agregadas são equivalentes nas duas direções.

### Comparação entre A e C

A apresenta vantagem de 0,50 em biodiversidade, enquanto C apresenta vantagem de 0,70 em segurança hídrica. Ambas as diferenças alcançam o limiar de preferência máxima nos respectivos critérios.

Portanto:

$$  
\pi(A,C)=0.5  
$$

$$  
\pi(C,A)=0.5  
$$

### Matriz de preferências agregadas

Reunindo todas as comparações, obtemos:

|Alternativa|A|B|C|
|---|---|---|---|
|A|—|0,30|0,50|
|B|0,50|—|0,20|
|C|0,50|0,20|—|

### Cálculo dos fluxos

Para a área A:

$$  
\phi^{+}(A)=\frac{0.30+0.50}{2}=0.40  
$$

$$  
\phi^{-}(A)=\frac{0.50+0.50}{2}=0.50  
$$

$$  
\phi(A)=0.40-0.50=-0.10  
$$

Aplicando o mesmo procedimento às demais áreas:

|Área|Fluxo positivo|Fluxo negativo|Fluxo líquido|
|---|---|---|---|
|A|0,40|0,50|-0,10|
|B|0,35|0,25|0,10|
|C|0,35|0,35|0,00|

### Resultado

No PROMETHEE II, a classificação é:

$$  
B>C>A  
$$

A área B apresenta o maior fluxo líquido, indicando que, no conjunto das comparações, sua capacidade de superar as demais alternativas é superior à intensidade com que é superada.

No PROMETHEE I, B também é preferida a C e A, enquanto C é preferida a A. Portanto, neste exemplo, a ordenação parcial coincide com a ordenação completa. É importante observar que essa coincidência não é garantida em outros conjuntos de alternativas.

## Pressupostos e propriedades

### Preferências baseadas em diferenças de desempenho

O PROMETHEE utiliza funções de preferência para transformar diferenças entre alternativas em intensidades de preferência. Isso permite representar julgamentos sobre a relevância das diferenças observadas. Entretanto, pressupõe que as diferenças de desempenho sejam interpretáveis nas escalas utilizadas.

### Limiares de indiferença e preferência

A definição dos limiares permite representar situações nas quais pequenas diferenças não são consideradas relevantes. Essa propriedade é especialmente interessante quando os critérios apresentam incertezas de medição, variações naturais ou limitações de precisão. Entretanto, os limiares não representam automaticamente a incerteza estatística dos dados. Sua definição exige justificativa metodológica.

### Compensação entre critérios

O PROMETHEE permite compensações entre preferências individuais por meio da soma ponderada. Uma preferência elevada em determinado critério pode compensar preferências desfavoráveis em outros critérios na agregação. Entretanto, a utilização de funções de preferência permite controlar como diferenças de desempenho contribuem para essa compensação.

Diferentemente de variantes do ELECTRE, o PROMETHEE I e II clássicos não incorporam um mecanismo de veto rígido.

### Incomparabilidade

O PROMETHEE I permite identificar alternativas incomparáveis quando seus fluxos positivo e negativo apresentam relações conflitantes. O PROMETHEE II elimina essa incomparabilidade explícita ao utilizar um único fluxo líquido. Essa distinção representa uma escolha entre preservar informações sobre conflitos de preferência e produzir uma classificação completa.

### Interpretação dos pesos

Os pesos representam a importância relativa dos critérios na agregação das intensidades de preferência. Sua interpretação depende das funções de preferência e dos limiares adotados. Consequentemente, pesos idênticos não garantem contribuições equivalentes dos critérios se suas funções de preferência produzirem distribuições muito diferentes de valores.

### Dependência do conjunto de alternativas

Os fluxos de preferência são calculados a partir das comparações com as demais alternativas disponíveis. Portanto, a inclusão ou exclusão de alternativas pode modificar os fluxos e as classificações. O método pode apresentar [_rank reversal_](https://en.wikipedia.org/wiki/Rank_reversals_in_decision-making), dependendo das condições e da variante utilizada.

### Sensibilidade às funções de preferência

A escolha das funções e dos respectivos limiares influencia diretamente os índices de preferência. Duas aplicações com os mesmos critérios, pesos e alternativas podem produzir classificações distintas caso utilizem funções de preferência diferentes. Por essa razão, a análise de sensibilidade deve considerar não apenas os pesos, mas também os parâmetros das funções.

## Vantagens e limitações

Entre as principais vantagens do PROMETHEE estão sua capacidade de representar intensidades de preferência, incorporar limiares de indiferença e preferência e permitir diferentes formas de ordenação. O método também oferece uma interpretação relativamente clara dos fluxos positivos, negativos e líquidos.

Entretanto, apresenta limitações importantes:

- **Definição das funções de preferência:** a escolha das funções e dos limiares pode influenciar significativamente os resultados.
    
- **Sensibilidade aos pesos:** mudanças na importância relativa dos critérios podem modificar a classificação.
    
- **Compensação entre critérios:** a formulação clássica não impede automaticamente que preferências desfavoráveis sejam compensadas.
    
- **Dependência das alternativas:** os fluxos são relativos ao conjunto de alternativas avaliadas.
    
- **Incomparabilidade no PROMETHEE I:** a ordenação parcial pode não produzir uma classificação única.
    
- **Perda de informação no PROMETHEE II:** o fluxo líquido pode ocultar diferenças entre os fluxos positivos e negativos.
    
- **Custo computacional:** a comparação exaustiva de todos os pares cresce quadraticamente com o número de alternativas.
    

Em aplicações espaciais, especialmente quando cada célula raster representa uma alternativa, a comparação completa entre milhões de células pode se tornar computacionalmente inviável. Nessas situações, podem ser consideradas estratégias como seleção de alternativas representativas, agregação espacial ou utilização de métodos derivados que reduzam o número de comparações.

## Comparação com ELECTRE

PROMETHEE e ELECTRE pertencem à família dos métodos de superação, mas apresentam diferenças importantes.

| Característica    | PROMETHEE I/II                               | ELECTRE I                            |
| ----------------- | -------------------------------------------- | ------------------------------------ |
| Princípio         | Intensidades de preferência                  | Concordância e discordância          |
| Comparação        | Par a par                                    | Par a par                            |
| Agregação         | Índices e fluxos de preferência              | Relações de superação                |
| Limiares          | Indiferença e preferência, conforme a função | Concordância e discordância/veto     |
| Veto rígido       | Não na formulação clássica                   | Sim, quando especificado             |
| Resultado         | Ordenação parcial ou completa                | Seleção de um núcleo de alternativas |
| Incomparabilidade | PROMETHEE I                                  | Sim                                  |

A principal diferença conceitual está na maneira como as evidências de preferência são tratadas. O ELECTRE I procura estabelecer se existe concordância suficiente e ausência de discordância decisiva para aceitar uma relação de superação. O PROMETHEE procura quantificar a intensidade das preferências entre alternativas e utilizar essas informações para construir fluxos de preferência.

## Referências bibliográficas

**Brans, J.-P., Vincke, P., & Mareschal, B. (1986).** How to select and how to rank projects: The PROMETHEE method. _European Journal of Operational Research, 24_(2), 228–238. [https://doi.org/10.1016/0377-2217(86)90044-5](https://doi.org/10.1016/0377-2217\(86\)90044-5)

**Brans, J.-P., & De Smet, Y. (2016).** PROMETHEE methods. In S. Greco, M. Ehrgott, & J. R. Figueira (Eds.), _Multiple Criteria Decision Analysis: State of the Art Surveys_ (2nd ed., pp. 187–219). Springer. [https://doi.org/10.1007/978-1-4939-3094-4_6](https://doi.org/10.1007/978-1-4939-3094-4_6)

**Uzun, B., Almasri, A., & Uzun Ozsahin, D. (2021).** Preference Ranking Organization Method for Enrichment Evaluation (PROMETHEE). In _Application of Multi-Criteria Decision Analysis in Environmental and Civil Engineering_. Springer. [https://doi.org/10.1007/978-3-030-64765-0_6](https://doi.org/10.1007/978-3-030-64765-0_6)