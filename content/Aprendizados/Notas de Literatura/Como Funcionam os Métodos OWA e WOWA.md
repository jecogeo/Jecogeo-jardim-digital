---
title: Como Funcionam os Métodos OWA e WOWA
draft: false
tags:
  - cienciadedados
created: 2026-11-27 14:22
modified: 2026-11-27 14:22
---
O **OWA (**_**Ordered Weighted Averaging**_**)**, ou Média Ponderada Ordenada, é um operador de agregação [[O que é Análise de Decisão Multicritério|multicritério]] desenvolvido por Ronald R. Yager (1988), fundamentado na ponderação dos desempenhos de uma alternativa após sua ordenação.

Diferentemente do SAW (_Simple Additive Weighting_), no qual os pesos estão associados diretamente aos critérios, no OWA os pesos estão associados às posições ocupadas pelos desempenhos ordenados, independentemente dos critérios aos quais pertencem.

Essa característica permite representar diferentes estratégias de decisão, desde aquelas que privilegiam o melhor desempenho individual até aquelas que enfatizam o pior desempenho.

A pergunta fundamental do OWA é: 
>Qual alternativa apresenta a melhor combinação de desempenhos, considerando a atitude desejada em relação à compensação e à satisfação conjunta dos critérios?

O **WOWA (**_**Weighted Ordered Weighted Averaging**_**)**, desenvolvido por Torra (1997), estende o OWA ao incorporar simultaneamente pesos associados à importância dos critérios e pesos associados à posição dos desempenhos ordenados.

A pergunta fundamental do WOWA é: 
>Qual alternativa apresenta a melhor combinação de desempenhos, considerando simultaneamente a importância relativa dos critérios e a estratégia de agregação desejada?

## Como funciona o OWA?

Considere um conjunto de $m$ alternativas avaliadas segundo $n$ critérios. O desempenho normalizado da alternativa $i$ no critério $j$ é representado por $r_{ij}$.

O procedimento do OWA clássico pode ser organizado em três etapas.

### 1. Normalização dos critérios

Inicialmente, os desempenhos devem ser representados em escalas comparáveis e orientados na mesma direção de preferência. Uma possibilidade é utilizar funções de normalização que transformem os desempenhos para o intervalo $[0,1]$, em que valores maiores representam condições mais favoráveis.

A comparabilidade entre critérios é particularmente importante no OWA, pois seus desempenhos serão ordenados independentemente da identidade dos critérios.

### 2. Ordenação dos desempenhos

Para cada alternativa, os desempenhos são ordenados de forma decrescente:

$$  
b_{i1} \geq b_{i2} \geq \ldots \geq b_{in}  
$$

Em que $b_{ik}$ representa o desempenho que ocupa a posição $k$ após a ordenação dos critérios da alternativa $i$.

Assim:

- $b_{i1}$ representa o maior desempenho;
    
- $b_{in}$ representa o menor desempenho;
    
- as posições intermediárias representam os demais desempenhos, ordenados por magnitude.
    

É importante observar que a ordenação é realizada separadamente para cada alternativa. Consequentemente, um mesmo critério pode ocupar posições diferentes dependendo da alternativa avaliada.

### 3. Aplicação dos pesos de ordem

Define-se um vetor de pesos de ordem (_order weights_):

$$  
\boldsymbol{w}=(w_1,w_2,\ldots,w_n)  
$$

Os pesos são não negativos e satisfazem:

$$  
\sum_{k=1}^{n}w_k=1  
$$

A pontuação global é calculada por:

$$  
OWA_i=\sum_{k=1}^{n}w_k b_{ik}  
$$

Em que:

- $OWA_i$ é a pontuação agregada da alternativa $i$;
    
- $w_k$ é o peso associado à posição $k$;
    
- $b_{ik}$ é o desempenho que ocupa a posição $k$ após a ordenação.
    

A alternativa preferida é aquela que apresenta a maior pontuação. Diferentemente do SAW, os pesos não estão associados permanentemente à identidade dos critérios. Um peso elevado na primeira posição privilegia o maior desempenho da alternativa, independentemente de qual critério apresenta esse desempenho.

## Estratégias de agregação

Uma das principais características do OWA é a possibilidade de representar diferentes estratégias de decisão mediante a alteração dos pesos de ordem.

### Estratégia otimista — Operador máximo

Quando todo o peso é atribuído à primeira posição:

$$  
\boldsymbol{w}=(1,0,\ldots,0)  
$$

A agregação corresponde ao maior desempenho:

$$  
OWA_i=\max_j r_{ij}  
$$

Nesse caso, basta que a alternativa apresente um desempenho elevado em pelo menos um critério para obter uma pontuação elevada. Essa estratégia aproxima-se do operador lógico OR.

### Estratégia intermediária — Média aritmética

Quando todas as posições recebem pesos iguais:

$$  
w_k=\frac{1}{n}  
$$

O resultado corresponde à média aritmética:

$$  
OWA_i=\frac{1}{n}\sum_{j=1}^{n}r_{ij}  
$$

Nesse caso, a ordenação não altera o resultado da agregação. O OWA torna-se equivalente ao SAW quando todos os critérios possuem a mesma importância.

### Estratégia conservadora — Operador mínimo

Quando todo o peso é atribuído à última posição:

$$  
\boldsymbol{w}=(0,\ldots,0,1)  
$$

A agregação corresponde ao menor desempenho:

$$  
OWA_i=\min_j r_{ij}  
$$

Nesse caso, a pontuação global é determinada exclusivamente pelo pior desempenho. Essa estratégia aproxima-se do operador lógico AND e não permite que desempenhos elevados compensem o menor desempenho. Entre esses extremos, diferentes vetores de pesos permitem representar estratégias intermediárias.

## Medidas de atitude e compensação

Yager (1988) propôs medidas para caracterizar o comportamento dos operadores OWA. Duas propriedades particularmente relevantes são o grau de _orness_ e a dispersão dos pesos.

### Grau de orness

O grau de _orness_ representa a proximidade do operador OWA em relação ao comportamento do operador OR, isto é, do máximo.

Para desempenhos ordenados de forma decrescente:

$$  
orness(\boldsymbol{w})=\frac{1}{n-1}\sum_{k=1}^{n}(n-k)w_k  
$$

O índice varia entre 0 e 1.

- $orness=0$: comportamento equivalente ao mínimo (AND).
    
- $orness=0.5$: posição intermediária entre os extremos.
    
- $orness=1$: comportamento equivalente ao máximo (OR).
    

Valores elevados indicam estratégias que, de maneira geral, enfatizam os melhores desempenhos. Valores reduzidos indicam estratégias que enfatizam os desempenhos inferiores. A medida complementar, denominada _andness_, pode ser definida por:

$$  
andness(\boldsymbol{w})=1-orness(\boldsymbol{w})  
$$

Entretanto, o grau de _orness_ não determina completamente o comportamento do operador. Diferentes vetores de pesos podem apresentar o mesmo grau de _orness_ e produzir resultados distintos.

### Dispersão dos pesos

A dispersão pode ser representada pela entropia do vetor de pesos:

$$  
H(\boldsymbol{w})=-\sum_{k=1}^{n}w_k\ln(w_k)  
$$

Por convenção, considera-se $0\ln(0)=0$.

Uma forma normalizada dessa medida é:

$$  
H_N(\boldsymbol{w})=\frac{H(\boldsymbol{w})}{\ln(n)}  
$$

Valores próximos de zero indicam concentração dos pesos em poucas posições, enquanto valores próximos de 1 indicam uma distribuição mais uniforme. A dispersão caracteriza a extensão em que diferentes posições participam da agregação, sendo utilizada como uma aproximação do grau de compensação.

Entretanto, não deve ser interpretada como uma medida completa das possibilidades de substituição entre critérios. Por exemplo, um operador que considera exclusivamente o desempenho mediano pode apresentar $orness=0.5$ e dispersão nula. Isso demonstra que uma atitude intermediária não implica necessariamente elevada compensação.

## Exemplo prático — OWA

Considere três áreas candidatas à restauração ecológica, avaliadas segundo biodiversidade e segurança hídrica. Os desempenhos foram previamente transformados para uma escala entre 0 e 1, na qual valores maiores representam condições mais favoráveis.

|Área|Biodiversidade|Segurança hídrica|
|---|---|---|
|A|0,90|0,20|
|B|0,60|0,70|
|C|0,40|0,90|

Após a ordenação decrescente dos desempenhos:

|Área|Primeira posição|Segunda posição|
|---|---|---|
|A|0,90|0,20|
|B|0,70|0,60|
|C|0,90|0,40|

Observe que, na área A, a primeira posição corresponde à biodiversidade. Nas áreas B e C, corresponde à segurança hídrica.

### Cenário otimista

Considere pesos de ordem iguais a 0,8 para o melhor desempenho e 0,2 para o pior.

Para a área A:

$$  
OWA_A=0.8\times0.90+0.2\times0.20=0.76  
$$

Para a área B:

$$  
OWA_B=0.8\times0.70+0.2\times0.60=0.68  
$$

Para a área C:

$$  
OWA_C=0.8\times0.90+0.2\times0.40=0.80  
$$

A classificação é:

$$  
C>A>B  
$$

A estratégia favorece alternativas que apresentam desempenhos elevados em pelo menos um critério.

### Cenário conservador

Agora considere pesos de ordem iguais a 0,2 para o melhor desempenho e 0,8 para o pior.

Para a área A:

$$  
OWA_A=0.2\times0.90+0.8\times0.20=0.34  
$$

Para a área B:

$$  
OWA_B=0.2\times0.70+0.8\times0.60=0.62  
$$

Para a área C:

$$  
OWA_C=0.2\times0.90+0.8\times0.40=0.50  
$$

A classificação torna-se:

$$  
B>C>A  
$$

A área B é favorecida porque apresenta o maior desempenho mínimo entre as três alternativas.

### Comparação entre estratégias

|Área|Máximo|OWA otimista|Média|OWA conservador|Mínimo|
|---|---|---|---|---|---|
|A|0,90|0,76|0,55|0,34|0,20|
|B|0,70|0,68|0,65|0,62|0,60|
|C|0,90|0,80|0,65|0,50|0,40|

O exemplo demonstra que diferentes estratégias de agregação podem produzir diferentes classificações, mesmo quando os desempenhos das alternativas permanecem inalterados. O OWA permite, portanto, explorar diferentes concepções sobre o que constitui uma alternativa desejável.

## Quantificadores linguísticos

Uma maneira de definir os pesos de ordem consiste em utilizar quantificadores linguísticos fuzzy (_fuzzy linguistic quantifiers_).

Esses quantificadores permitem representar expressões como:

- Pelo menos um critério;
    
- Alguns critérios;
    
- A maioria dos critérios;
    
- Quase todos os critérios;
    
- Todos os critérios.
    

Uma função frequentemente utilizada é:

$$  
G(t)=t^{\alpha}  
$$

Em que $t$ varia entre 0 e 1 e $\alpha$ é um parâmetro positivo que controla o comportamento da função. Os pesos de ordem são obtidos por:

$$  
w_k=G\left(\frac{k}{n}\right)-G\left(\frac{k-1}{n}\right)  
$$

Substituindo a função de potência:

$$  
w_k=\left(\frac{k}{n}\right)^{\alpha}-\left(\frac{k-1}{n}\right)^{\alpha}  
$$

Para desempenhos ordenados de forma decrescente:

- Quando $0<\alpha<1$, os pesos enfatizam as primeiras posições, favorecendo uma estratégia otimista.
    
- Quando $\alpha=1$, todas as posições recebem pesos iguais.
    
- Quando $\alpha>1$, os pesos enfatizam as últimas posições, favorecendo uma estratégia conservadora.
    

Essa abordagem permite explorar diferentes estratégias de decisão de maneira contínua, sem precisar definir manualmente cada peso de ordem. Malczewski (2006) apresenta uma aplicação dessa abordagem em análises de adequação do uso da terra baseadas em sistemas de informações geográficas.

## Como funciona o WOWA?

Uma limitação do OWA clássico é que ele não distingue a importância intrínseca dos critérios. Por exemplo, uma alternativa com desempenho 0,90 em biodiversidade e 0,20 em segurança hídrica recebe a mesma pontuação que outra alternativa com os desempenhos invertidos. Isso ocorre porque ambas apresentam a mesma sequência de valores após a ordenação.

O WOWA (_Weighted Ordered Weighted Averaging_), desenvolvido por Torra (1997), foi proposto para incorporar simultaneamente dois tipos de ponderação:

- **Pesos de importância:** associados à identidade dos critérios.
    
- **Pesos de ordem:** associados à estratégia de agregação dos desempenhos.
    

### 1. Definição dos vetores de pesos

Considere um vetor de pesos de importância:

$$  
\boldsymbol{p}=(p_1,p_2,\ldots,p_n)  
$$

E um vetor de pesos de ordem:

$$  
\boldsymbol{w}=(w_1,w_2,\ldots,w_n)  
$$

Ambos possuem elementos não negativos e somam 1.

Os pesos de importância representam a relevância atribuída aos critérios, enquanto os pesos de ordem representam a estratégia desejada de agregação.

### 2. Ordenação dos desempenhos e dos pesos de importância

Para cada alternativa, os desempenhos são ordenados de forma decrescente. Os pesos de importância são reorganizados seguindo a mesma permutação dos desempenhos:

$$  
b_{i1}\geq b_{i2}\geq\ldots\geq b_{in}  
$$

$$  
\boldsymbol{p}_i^{ord}=(p_{i(1)},p_{i(2)},\ldots,p_{i(n)})  
$$

Em que $p_{i(k)}$ é o peso original do critério que ocupa a posição $k$ na alternativa $i$. Portanto, a importância original de cada critério é preservada durante a ordenação.

### 3. Construção da função acumulada dos pesos de ordem

Define-se uma função não decrescente $G$, que interpola os seguintes pontos:

$$  
G(0)=0  
$$

$$  
G\left(\frac{k}{n}\right)=\sum_{l=1}^{k}w_l  
$$

$$  
G(1)=1  
$$

Uma possibilidade é utilizar interpolação linear entre os pontos definidos pelos pesos de ordem. A função representa a distribuição acumulada da importância atribuída às posições ordenadas.

### 4. Cálculo dos pesos efetivos

São calculadas as somas acumuladas dos pesos de importância reorganizados:

$$  
T_{ik}=\sum_{l=1}^{k}p_{i(l)}  
$$

Considerando:

$$  
T_{i0}=0  
$$

Os pesos efetivos são calculados por:

$$  
\omega_{ik}=G(T_{ik})-G(T_{i(k-1)})  
$$

Esses pesos incorporam simultaneamente a importância original dos critérios e a estratégia de agregação. Como a função $G$ é não decrescente, os pesos efetivos são não negativos e somam 1.

### 5. Agregação dos desempenhos

A pontuação final é calculada por:

$$  
WOWA_i=\sum_{k=1}^{n}\omega_{ik}b_{ik}  
$$

A alternativa preferida é aquela com maior pontuação. Diferentemente do OWA clássico, o WOWA considera a identidade dos critérios mesmo após a ordenação dos desempenhos.

## Exemplo prático — WOWA

Considere novamente as três áreas candidatas à restauração ecológica.

|Área|Biodiversidade|Segurança hídrica|
|---|---|---|
|A|0,90|0,20|
|B|0,60|0,70|
|C|0,40|0,90|

Suponha que a biodiversidade tenha maior importância relativa que a segurança hídrica. Os pesos de importância são:

$$  
\boldsymbol{p}=(0.7,\ 0.3)  
$$

Adota-se uma estratégia conservadora, que enfatiza os menores desempenhos:

$$  
\boldsymbol{w}=(0.2,\ 0.8)  
$$

A função acumulada $G$ é construída mediante interpolação linear entre os pontos:

|t|G(t)|
|---|---|
|0,0|0,0|
|0,5|0,2|
|1,0|1,0|

### Área A

A biodiversidade ocupa a primeira posição e a segurança hídrica ocupa a segunda. Os desempenhos ordenados são:

$$  
\boldsymbol{b}_A=(0.90,\ 0.20)  
$$

Os pesos de importância reorganizados são:

$$  
\boldsymbol{p}_A^{ord}=(0.7,\ 0.3)  
$$

Aplicando a função acumulada:

$$  
G(0.7)=0.52  
$$

Os pesos efetivos são:

$$  
\omega_{A1}=0.52-0=0.52  
$$

$$  
\omega_{A2}=1-0.52=0.48  
$$

A pontuação final é:

$$  
WOWA_A=0.52\times0.90+0.48\times0.20=0.564  
$$

### Área B

A segurança hídrica ocupa a primeira posição e a biodiversidade ocupa a segunda. Os desempenhos ordenados são:

$$  
\boldsymbol{b}_B=(0.70,\ 0.60)  
$$

Os pesos de importância reorganizados são:

$$  
\boldsymbol{p}_B^{ord}=(0.3,\ 0.7)  
$$

Aplicando a função acumulada:

$$  
G(0.3)=0.12  
$$

Os pesos efetivos são 0,12 e 0,88. A pontuação final é:

$$  
WOWA_B=0.12\times0.70+0.88\times0.60=0.612  
$$

### Área C

A segurança hídrica também ocupa a primeira posição e a biodiversidade ocupa a segunda. Os pesos efetivos são novamente 0,12 e 0,88. A pontuação final é:

$$  
WOWA_C=0.12\times0.90+0.88\times0.40=0.460  
$$

### Comparação dos resultados

|Área|SAW|OWA conservador|WOWA conservador|
|---|---|---|---|
|A|0,690|0,340|0,564|
|B|0,630|0,620|0,612|
|C|0,550|0,500|0,460|

O SAW e o WOWA utilizam pesos de importância de 0,7 para biodiversidade e 0,3 para segurança hídrica. O OWA clássico utiliza exclusivamente os pesos de ordem.

As classificações obtidas são:

- SAW: A > B > C;
    
- OWA: B > C > A;
    
- WOWA: B > A > C.
    

O exemplo demonstra como o WOWA permite conciliar duas formas distintas de preferência. Embora a biodiversidade seja considerada mais importante, a estratégia conservadora penaliza a elevada deficiência da área A em segurança hídrica, fazendo com que a área B apresente a maior pontuação global.

Simultaneamente, a área A supera C porque seu melhor desempenho corresponde ao critério de maior importância.

## Pressupostos e propriedades

### Importância dos critérios versus estratégia de decisão

A principal contribuição conceitual do WOWA consiste em distinguir a importância relativa dos critérios da atitude adotada diante da combinação de desempenhos. Essas duas dimensões não são necessariamente equivalentes.

Um tomador de decisão pode considerar a biodiversidade mais importante que a segurança hídrica e, simultaneamente, desejar que desempenhos muito baixos em qualquer um dos critérios sejam penalizados.

### Compensação variável

O comportamento compensatório do OWA depende da distribuição dos pesos de ordem. O operador mínimo não permite compensação do pior desempenho, enquanto a média aritmética permite compensação aditiva.

Estratégias intermediárias podem privilegiar os melhores desempenhos, os piores ou determinadas posições da distribuição. O WOWA amplia essa flexibilidade ao incorporar pesos de importância dos critérios. Entretanto, nenhum dos dois operadores estabelece automaticamente um mecanismo de veto equivalente ao utilizado em determinadas variantes do [[Como Funciona o Método ELECTRE|ELECTRE]]

### Comutatividade

O OWA clássico é comutativo, isto é, a permutação dos valores de entrada não modifica o resultado. Essa propriedade decorre da ordenação dos desempenhos antes da agregação.

O WOWA, quando os pesos de importância são diferentes, não apresenta essa propriedade em relação à permutação isolada dos desempenhos, pois a identidade dos critérios influencia o resultado.

### Monotonicidade

Considerando pesos e parâmetros fixos, um aumento no desempenho de determinado critério não reduz a pontuação agregada da alternativa. Essa propriedade é denominada monotonicidade.

### Idempotência

Quando todos os critérios apresentam o mesmo desempenho, a pontuação agregada corresponde a esse valor.

$$  
OWA(c,c,\ldots,c)=c  
$$

$$  
WOWA(c,c,\ldots,c)=c  
$$

### Limites da agregação

As pontuações obtidas permanecem entre o menor e o maior desempenho da alternativa.

$$  
\min_j r_{ij}\leq OWA_i\leq\max_j r_{ij}  
$$

$$  
\min_j r_{ij}\leq WOWA_i\leq\max_j r_{ij}  
$$

### Relação com outros operadores

O WOWA recupera dois operadores conhecidos mediante escolhas específicas de seus pesos:

- Quando os pesos de importância são iguais, o WOWA torna-se equivalente ao OWA.
    
- Quando os pesos de ordem são iguais e a função acumulada é linear, o WOWA torna-se equivalente à média ponderada dos critérios, isto é, ao [[Como Funciona o Método SAW|SAW]].
    

Assim, o WOWA pode ser compreendido como uma generalização dessas duas formas de agregação.

### Dependência da normalização

Como a ordenação dos desempenhos depende de seus valores normalizados, a escolha das funções de normalização possui influência direta sobre os resultados. Uma alteração na normalização pode modificar não apenas os valores dos desempenhos, mas também as posições que os critérios ocupam. Consequentemente, pode alterar os pesos de ordem e, no WOWA, os pesos efetivos associados aos critérios.

### Dependência das alternativas

Diferentemente do [[Como Funciona o Método PROMETHEE|PROMETHEE]] e do [[Como Funciona o Método ELECTRE|ELECTRE]], o OWA e o WOWA não precisam realizar comparações par a par entre alternativas. A agregação é realizada individualmente para cada alternativa. Quando as escalas, os pesos, os critérios e os parâmetros são fixos, a inclusão ou exclusão de outras alternativas não modifica diretamente a pontuação das alternativas existentes.

Entretanto, caso a normalização ou a definição dos parâmetros dependa do conjunto de alternativas, essa independência pode deixar de existir.

## Vantagens e limitações

Entre as principais vantagens do OWA e do WOWA estão a flexibilidade das estratégias de agregação, a possibilidade de controlar a ênfase atribuída aos melhores e piores desempenhos e a capacidade de representar diferentes atitudes diante da compensação entre critérios. O WOWA apresenta ainda a vantagem de incorporar explicitamente a importância relativa dos critérios.

Entretanto, existem limitações importantes:

- **Definição dos pesos de ordem:** diferentes vetores representam diferentes estratégias de decisão e precisam de fundamentação.
    
- **Dependência da normalização:** a comparabilidade dos critérios é fundamental para a ordenação dos desempenhos.
    
- **Interpretação dos resultados:** os pesos efetivos do WOWA podem variar entre alternativas.
    
- **Ausência de veto absoluto:** estratégias conservadoras não equivalem necessariamente a restrições de elegibilidade.
    
- **Sensibilidade aos parâmetros:** diferentes pesos, quantificadores e funções de interpolação podem modificar a classificação.
    
- **Interações entre critérios:** o OWA e o WOWA não representam explicitamente sinergias ou redundâncias específicas entre pares de critérios.
    

## Aplicações espaciais

O OWA apresenta uma tradição consolidada em análises multicritério baseadas em [sistemas de informações geográficas (SIG)](https://pt.wikipedia.org/wiki/Sistema_de_informa%C3%A7%C3%A3o_geogr%C3%A1fica), particularmente em estudos de adequação do uso da terra, planejamento territorial e gestão ambiental. Sua estrutura permite produzir diferentes superfícies espaciais de adequação ou prioridade a partir dos mesmos critérios, alterando a estratégia de agregação.

Por exemplo, em uma análise de priorização espacial da restauração ecológica, podem ser produzidos cenários que:

- Privilegiam áreas com desempenhos excepcionalmente elevados em determinados critérios;
    
- Favorecem áreas com desempenhos equilibrados;
    
- Penalizam áreas com deficiências importantes;
    
- Consideram simultaneamente a importância relativa dos critérios e a estratégia de agregação.
    

Outra vantagem é a escalabilidade computacional. A ordenação é realizada entre os critérios de cada célula (pixel), e não entre todas as células da área de estudo. Considerando $m$ células e $n$ critérios, o custo computacional associado à ordenação é da ordem de:

$$  
O(mn\log n)  
$$

Como o número de critérios geralmente é muito menor que o número de células, essa estrutura é adequada para aplicações raster de grande extensão.

### OWA na literatura de SIG e diferença em relação ao WOWA

É importante observar que a literatura de análise multicritério espacial frequentemente utiliza o termo OWA para formulações que incorporam simultaneamente pesos de importância e pesos de ordem. Uma dessas formulações utiliza o produto normalizado dos dois tipos de peso:

$$  
\omega_{ik}=\frac{p_{i(k)}w_k}{\sum_{l=1}^{n}p_{i(l)}w_l}  
$$

A agregação é então calculada por:

$$  
S_i=\sum_{k=1}^{n}\omega_{ik}b_{ik}  
$$

Essa abordagem aparece em trabalhos sobre OWA aplicado a SIG, como Malczewski e Liu (2014). Embora essa formulação também combine os dois tipos de pesos, ela não é matematicamente equivalente ao WOWA original de Torra (1997), que utiliza uma função acumulada de ponderação. Portanto, a terminologia empregada em uma aplicação deve identificar claramente qual operador foi implementado.

## Comparação com outros métodos

|Método|Princípio de agregação|Principal característica|
|---|---|---|
|SAW|Soma ponderada|Compensação aditiva|
|WPM|Produto ponderado|Compensação proporcional|
|TOPSIS|Distâncias ao ideal e anti-ideal|Proximidade relativa|
|VIKOR|Deficiência global e máxima|Solução de compromisso|
|PROMETHEE|Fluxos de preferência|Comparações par a par|
|ELECTRE|Concordância e discordância|Superação e veto|
|OWA|Soma ponderada de desempenhos ordenados|Estratégia de agregação variável|
|WOWA|Agregação ordenada com pesos de importância|Combinação de importância e estratégia|

A principal contribuição do OWA e do WOWA consiste em tornar a estratégia de agregação uma dimensão explicitamente parametrizável do problema de decisão multicritério. Em vez de assumir previamente uma única regra de compensação, esses operadores permitem explorar diferentes formas de combinar os desempenhos.

## Referências bibliográficas

**Yager, R. R. (1988).** On ordered weighted averaging aggregation operators in multicriteria decisionmaking. _IEEE Transactions on Systems, Man, and Cybernetics, 18_(1), 183–190. [https://doi.org/10.1109/21.87068](https://doi.org/10.1109/21.87068)

**Torra, V. (1997).** The weighted OWA operator. _International Journal of Intelligent Systems, 12_(2), 153–166. [https://doi.org/10.1002/%28SICI%291098-111X%28199702%2912%3A2%3C153%3A%3AAID-INT3%3E3.0.CO%3B2-P](https://doi.org/10.1002/%28SICI%291098-111X%28199702%2912%3A2%3C153%3A%3AAID-INT3%3E3.0.CO%3B2-P)

**Yager, R. R., & Kacprzyk, J. (Eds.). (1997).** _The Ordered Weighted Averaging Operators: Theory and Applications_. Springer. [https://doi.org/10.1007/978-1-4615-6123-1](https://doi.org/10.1007/978-1-4615-6123-1)

**Malczewski, J. (2006).** Ordered weighted averaging with fuzzy quantifiers: GIS-based multicriteria evaluation for land-use suitability analysis. _International Journal of Applied Earth Observation and Geoinformation, 8_(4), 270–277. [https://doi.org/10.1016/j.jag.2006.01.003](https://doi.org/10.1016/j.jag.2006.01.003)

**Malczewski, J., & Liu, X. (2014).** Local ordered weighted averaging in GIS-based multicriteria analysis. _Annals of GIS, 20_(2), 117–129. [https://doi.org/10.1080/19475683.2014.904439](https://doi.org/10.1080/19475683.2014.904439)

**Emrouznejad, A., & Marra, M. (2014).** Ordered weighted averaging operators 1988–2014: A citation-based literature survey. _International Journal of Intelligent Systems, 29_(11), 994–1014. [https://doi.org/10.1002/int.21673](https://doi.org/10.1002/int.21673)