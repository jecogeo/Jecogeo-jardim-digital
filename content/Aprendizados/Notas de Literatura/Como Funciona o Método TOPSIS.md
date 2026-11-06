---
title: Como Funciona o Método TOPSIS
draft: false
tags:
  - cienciadedados
  - estatistica/decisaomulticriterio
created: 2026-11-06 17:18
modified: 2026-11-06 17:18
---
O **TOPSIS (**_**Technique for Order Preference by Similarity to Ideal Solution**_**)** é um [[O que é Análise de Decisão Multicritério|método de decisão multicritério]] desenvolvido por Hwang e Yoon (1981), fundamentado na comparação das alternativas com duas soluções hipotéticas: uma solução ideal positiva, que reúne os melhores desempenhos em todos os critérios, e uma solução ideal negativa (anti-ideal), que reúne os piores desempenhos.

Diferentemente dos métodos [[Como Funciona o Método SAW|SAW]] e [[Como Funciona o Método WPM|WPM]], que agregam diretamente os desempenhos dos critérios, o TOPSIS utiliza uma abordagem geométrica, representando cada alternativa como um ponto em um espaço multidimensional. A preferência é determinada considerando simultaneamente a distância da alternativa em relação às duas soluções de referência (ideal e anti-ideal).

A pergunta fundamental do método é:
>Qual alternativa está relativamente mais próxima da solução ideal e mais distante da solução anti-ideal?

O método pressupõe que uma alternativa desejável deve apresentar proximidade com os melhores desempenhos e afastamento dos piores, considerando a importância relativa dos critérios.

## Como funciona?

Considere um conjunto de $m$ alternativas avaliadas segundo $n$ critérios. Os desempenhos são organizados em uma matriz de decisão $X$, na qual $x_{ij}$ representa o desempenho da alternativa $i$ no critério $j$.

O procedimento clássico do TOPSIS envolve seis etapas.

### 1. Normalização dos critérios

Como os critérios podem apresentar diferentes unidades e amplitudes, inicialmente os desempenhos são normalizados. Na formulação clássica, utiliza-se a normalização vetorial:

$$  
r_{ij}=\frac{x_{ij}}{\sqrt{\sum_{i=1}^{m}x_{ij}^{2}}}  
$$

Em que $r_{ij}$ representa o desempenho normalizado da alternativa $i$ no critério $j$. Essa transformação torna cada coluna da matriz de decisão um vetor de comprimento unitário, desde que seu denominador seja diferente de zero.

### 2. Aplicação dos pesos

Os desempenhos normalizados são multiplicados pelos pesos dos respectivos critérios:

$$  
v_{ij}=w_jr_{ij}  
$$

Em que:

- $v_{ij}$ é o desempenho normalizado e ponderado;
    
- $w_j$ é o peso atribuído ao critério $j$;
    
- $r_{ij}$ é o desempenho normalizado.
    

Usualmente, os pesos são não negativos e satisfazem:

$$  
\sum_{j=1}^{n}w_j=1  
$$

### 3. Definição das soluções ideal e anti-ideal

A solução ideal positiva ($A^+$) reúne os melhores desempenhos ponderados em cada critério, enquanto a solução ideal negativa ($A^-$) reúne os piores.

Considerando que todos os critérios foram orientados para maximização (ou seja, quanto maior o valor, melhor):

$$
A^{+} = \left\{ v_j^{+} \mid v_j^{+} = \max_{i} v_{ij}, \quad j = 1,\ldots,n \right\}
$$

$$
A^{-} = \left\{ v_j^{-} \mid v_j^{-} = \min_{i} v_{ij}, \quad j = 1,\ldots,n \right\}
$$

Quando existem critérios de custo, que devem ser minimizados, as operações de máximo e mínimo são invertidas para esses critérios.

É importante observar que as soluções ideal e anti-ideal são construídas a partir dos valores de referência de cada critério e não necessariamente correspondem a alternativas reais.

### 4. Cálculo das distâncias

Para cada alternativa, calcula-se a distância euclidiana até a solução ideal positiva:

$$  
D_i^+=\sqrt{\sum_{j=1}^{n}(v_{ij}-v_j^+)^2}  
$$

E até a solução ideal negativa:

$$  
D_i^-=\sqrt{\sum_{j=1}^{n}(v_{ij}-v_j^-)^2}  
$$

Em que:

- $D_i^+$ é a distância da alternativa $i$ à solução ideal positiva;
    
- $D_i^-$ é a distância à solução ideal negativa;
    
- $v_j^+$ e $v_j^-$ são os valores de referência do critério $j$.
    

### 5. Cálculo da proximidade relativa

As duas distâncias são combinadas no coeficiente de proximidade relativa:

$$  
C_i=\frac{D_i^-}{D_i^++D_i^-}  
$$

O coeficiente varia entre 0 e 1, desde que as soluções de referência sejam distintas.

Valores próximos de 1 indicam maior proximidade relativa com a solução ideal positiva, enquanto valores próximos de 0 indicam maior proximidade relativa com a solução anti-ideal.

### 6. Classificação das alternativas

As alternativas são ordenadas de acordo com seus coeficientes de proximidade relativa:

$$  
A^*=\arg\max_i C_i  
$$

A alternativa com maior coeficiente é considerada a mais preferível segundo os critérios, pesos, normalização e métrica de distância adotados.

## Exemplo prático

Considere três áreas candidatas à restauração ecológica, avaliadas segundo dois critérios: biodiversidade e segurança hídrica. Os desempenhos foram previamente transformados para uma escala entre 0 e 1, na qual valores maiores representam condições mais favoráveis.

|Área|Biodiversidade|Segurança hídrica|
|---|---|---|
|A|0,90|0,20|
|B|0,60|0,70|
|C|0,40|0,90|

Suponha que ambos os critérios tenham pesos iguais a 0,5.

Aplicando a normalização vetorial e os respectivos pesos, obtemos:

|Área|Biodiversidade ponderada|Segurança hídrica ponderada|
|---|---|---|
|A|0,390|0,086|
|B|0,260|0,302|
|C|0,173|0,389|

As soluções de referência são:

$$  
A^+=(0.390,\ 0.389)  
$$

$$  
A^-=(0.173,\ 0.086)  
$$

Calculando as distâncias euclidianas e os coeficientes de proximidade relativa, obtemos:

|Área|$D_i^+$|$D_i^-$|$C_i$|
|---|---|---|---|
|A|0,302|0,217|0,418|
|B|0,156|0,233|0,598|
|C|0,217|0,302|0,582|

Portanto, a classificação é:

$$  
B>C>A  
$$

A área B apresenta a maior proximidade relativa com a solução ideal positiva.

Embora a área A tenha o melhor desempenho em biodiversidade e a área C tenha o melhor desempenho em segurança hídrica, a área B apresenta uma combinação que a posiciona relativamente mais próxima do ideal, considerando simultaneamente os dois extremos.

### Comparação com SAW e WPM

Aplicando os três métodos aos mesmos desempenhos e pesos, com normalização vetorial adicional apenas no TOPSIS, obtemos:

|Área|SAW|WPM|TOPSIS|
|---|---|---|---|
|A|0,550|0,424|0,418|
|B|0,650|0,648|0,598|
|C|0,650|0,600|0,582|

Os três métodos desfavorecem a área A, mas diferem na maneira como representam os desempenhos conjuntos.

O SAW atribui a mesma pontuação às áreas B e C. O WPM favorece B por sua combinação multiplicativa de desempenhos, enquanto o TOPSIS favorece B por sua posição relativa em relação às soluções ideal e anti-ideal.

As pontuações não devem ser comparadas diretamente entre métodos, pois possuem definições matemáticas distintas.

## Pressupostos e propriedades

### Proximidade geométrica

O TOPSIS pressupõe que as diferenças entre desempenhos possam ser representadas por distâncias em um espaço multidimensional. Na formulação clássica, utiliza-se a distância euclidiana, que incorpora diferenças quadráticas entre os valores dos critérios. Consequentemente, a interpretação das distâncias depende das escalas utilizadas e da representação geométrica adotada.

### Compensação entre critérios

O TOPSIS permite compensações entre desempenhos. Uma alternativa com desempenho desfavorável em determinado critério pode alcançar boa proximidade relativa quando apresenta resultados favoráveis em outros critérios. Entretanto, diferentemente do SAW, essa compensação não ocorre por meio de uma soma linear dos desempenhos, mas da combinação de distâncias multidimensionais. Portanto, o TOPSIS não deve ser interpretado como um método não compensatório.

### Dependência da normalização

O procedimento de normalização influencia diretamente a geometria do espaço de decisão. Diferentes normalizações podem modificar as distâncias entre alternativas e, consequentemente, suas classificações. Na normalização vetorial clássica, os valores normalizados de determinado critério dependem dos desempenhos de todas as alternativas consideradas. Isso significa que a inclusão ou exclusão de alternativas pode alterar os valores normalizados das alternativas existentes.

### Dependência das soluções de referência

Na formulação clássica, as soluções ideal e anti-ideal são determinadas a partir dos melhores e piores desempenhos observados no conjunto de alternativas. Consequentemente, a classificação é relativa ao conjunto avaliado. A inclusão de uma nova alternativa pode modificar as soluções de referência e, portanto, as distâncias e os coeficientes de proximidade das alternativas anteriores.

### Reversão de classificação

O TOPSIS pode apresentar [_rank reversal_](https://en.wikipedia.org/wiki/Rank_reversals_in_decision-making), isto é, alterações na ordem de preferência entre alternativas após a inclusão ou exclusão de outras alternativas. Esse comportamento está associado à dependência da normalização e das soluções de referência em relação ao conjunto avaliado. Por essa razão, a estabilidade da classificação deve ser examinada quando o conjunto de alternativas não é fixo.

### Influência dos pesos nas distâncias

Como os pesos são aplicados antes do cálculo das distâncias euclidianas, sua influência ocorre dentro dos termos quadráticos:

$$  
(D_i^+)^2=\sum_{j=1}^{n}w_j^2(r_{ij}-r_j^+)^2  
$$

Assim, os pesos não atuam da mesma maneira que na soma ponderada do SAW. Essa característica é importante na interpretação da sensibilidade do TOPSIS às mudanças nos pesos.

## Vantagens e limitações

Entre as principais vantagens do TOPSIS estão sua interpretação geométrica, estrutura matemática relativamente simples e consideração simultânea de duas referências de desempenho. O método também permite avaliar grandes conjuntos de alternativas e pode ser aplicado a problemas espaciais de priorização multicritério.

Entretanto, apresenta limitações importantes:

- **Sensibilidade à normalização:** diferentes transformações dos critérios podem modificar as distâncias e as classificações.
    
- **Dependência das alternativas:** os pontos ideal e anti-ideal podem mudar quando alternativas são incluídas ou excluídas.
    
- **Possibilidade de reversão de classificação:** a ordenação pode não permanecer estável diante de alterações no conjunto avaliado.
    
- **Compensação entre critérios:** desempenhos desfavoráveis podem ser compensados por desempenhos favoráveis em outros critérios.
    
- **Dependência da métrica:** a distância euclidiana pressupõe uma determinada geometria do espaço de decisão.
    
- **Ausência de veto:** a formulação clássica não impede automaticamente que uma alternativa com desempenho inaceitável em determinado critério seja bem classificada.
    

Em aplicações espaciais, especialmente quando as alternativas correspondem a células raster, a definição das soluções de referência merece atenção particular. Quando os pontos ideal e anti-ideal são determinados a partir dos valores observados, a inclusão ou exclusão de células pode alterar as referências utilizadas. Uma alternativa metodológica consiste em estabelecer valores ideais e anti-ideais fixos, fundamentados em limites teóricos, ecológicos ou normativos. Entretanto, essa escolha modifica a formulação clássica e deve ser explicitamente justificada.

## Referências bibliográficas

**Hwang, C.-L., & Yoon, K. (1981).** _Multiple Attribute Decision Making: Methods and Applications: A State-of-the-Art Survey_. Springer-Verlag. [https://doi.org/10.1007/978-3-642-48318-9](https://doi.org/10.1007/978-3-642-48318-9)

**Behzadian, M., Otaghsara, S. K., Yazdani, M., & Ignatius, J. (2012).** A state-of-the-art survey of TOPSIS applications. _Expert Systems with Applications, 39_(17), 13051–13069. [https://doi.org/10.1016/j.eswa.2012.05.056](https://doi.org/10.1016/j.eswa.2012.05.056)

**Opricovic, S., & Tzeng, G.-H. (2004).** Compromise solution by MCDM methods: A comparative analysis of VIKOR and TOPSIS. _European Journal of Operational Research, 156_(2), 445–455. [https://doi.org/10.1016/S0377-2217(03)00020-1](https://doi.org/10.1016/S0377-2217\(03\)00020-1)