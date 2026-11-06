---
title: Como Funciona o Método VIKOR
draft: false
tags:
  - cienciadedados
  - estatistica/decisaomulticriterio
created: 2026-11-06 17:57
modified: 2026-11-06 17:57
---
O **VIKOR (**_**VIšekriterijumska Optimizacija I Kompromisno Rešenje**_**)**, ou Otimização Multicritério e Solução de Compromisso, é um [[O que é Análise de Decisão Multicritério|método de decisão multicritério]]desenvolvido por Serafim Opricovic, fundamentado na identificação de soluções de compromisso em problemas que envolvem critérios conflitantes (Opricovic & Tzeng, 2004).

Diferentemente do [[Como Funciona o Método SAW|SAW]] e [[Como Funciona o Método WPM|WPM]], que agregam diretamente os desempenhos, e do [[Como Funciona o Método TOPSIS|TOPSIS]], que avalia distâncias às soluções ideal e anti-ideal, o VIKOR procura equilibrar duas perspectivas: a **utilidade coletiva**, representada pelo desempenho agregado nos critérios, e o **arrependimento individual máximo**, representado pela maior deficiência ponderada em um único critério.

A pergunta fundamental do método é: 
>Qual alternativa oferece o melhor compromisso entre minimizar as deficiências globais e evitar uma deficiência individual excessivamente elevada?

O método parte da ideia de que uma alternativa pode apresentar um bom desempenho global e, simultaneamente, uma deficiência importante em determinado critério. A solução de compromisso procura conciliar essas duas dimensões, considerando a importância relativa atribuída a cada uma.

## Como funciona?

Considere um conjunto de $m$ alternativas avaliadas segundo $n$ critérios. O desempenho da alternativa $i$ no critério $j$ é representado por $f_{ij}$. O procedimento clássico do VIKOR pode ser organizado em cinco etapas.

### 1. Definição dos melhores e piores desempenhos

Para cada critério, são identificados os melhores e piores valores observados. Considerando critérios orientados para maximização:

$$  
f_j^* = \max_i f_{ij}  
$$

$$  
f_j^- = \min_i f_{ij}  
$$

Em que:

- $f_j^*$ é o melhor desempenho observado no critério $j$;
    
- $f_j^-$ é o pior desempenho observado no critério $j$.
    

Para critérios de custo, que devem ser minimizados, as operações são invertidas.

### 2. Cálculo das deficiências normalizadas

O VIKOR avalia quanto cada alternativa se afasta do melhor desempenho de cada critério. Para critérios de benefício, essa deficiência é calculada por:

$$
d_{ij} = \frac{f_{j}^{*} - f_{ij}}{f_{j}^{*} - f_{j}^{-}}
$$

Em que $d_{ij}$ representa a deficiência normalizada da alternativa $i$ no critério $j$. Valores próximos de zero indicam desempenhos próximos do ideal, enquanto valores próximos de 1 indicam desempenhos próximos do pior valor observado. A expressão exige que $f_j^*\neq f_j^-$. Critérios sem variação precisam de tratamento específico, pois não discriminam as alternativas.

### 3. Cálculo da utilidade coletiva e do arrependimento máximo

A primeira medida, denominada $S_i$, representa a soma ponderada das deficiências:

$$  
S_i=\sum_{j=1}^{n}w_jd_{ij}  
$$

Em que $w_j$ corresponde ao peso do critério $j$. Quanto menor $S_i$, menor a deficiência global da alternativa. A segunda medida, denominada $R_i$, representa a maior deficiência ponderada entre todos os critérios:

$$  
R_i=\max_j(w_jd_{ij})  
$$

Quanto menor $R_i$, menor a pior deficiência individual ponderada. Essas duas medidas representam perspectivas distintas:

- **$S_i$:** procura minimizar a soma das deficiências, favorecendo a utilidade coletiva.
    
- **$R_i$:** procura minimizar a maior deficiência, evitando desempenhos individualmente muito desfavoráveis.
    

### 4. Cálculo do índice de compromisso

As duas medidas são combinadas no índice $Q_i$:

$$
Q_i = v \cdot \frac{S_i - S^{*}}{S^{-} - S^{*}} + (1-v) \cdot \frac{R_i - R^{*}}{R^{-} - R^{*}}
$$

Em que:

- $S^*=\min_i S_i$;
    
- $S^-=\max_i S_i$;
    
- $R^*=\min_i R_i$;
    
- $R^-=\max_i R_i$;
    
- $v$ é o parâmetro de compromisso, variando entre 0 e 1.
    

O parâmetro $v$ determina a importância relativa atribuída às duas estratégias.

Quando $v=1$, o índice considera exclusivamente a minimização da deficiência global ($S_i$). 

Quando $v=0$, considera exclusivamente a minimização da pior deficiência individual ($R_i$).

Quando $v=0.5$, atribui a mesma importância às duas perspectivas, após sua normalização.

A formulação pressupõe que os denominadores sejam diferentes de zero. Quando todos os valores de $S_i$ ou $R_i$ são iguais, é necessário tratar separadamente o componente correspondente. **Diferentemente do SAW, WPM e TOPSIS, no VIKOR valores menores de $Q_i$ representam alternativas preferíveis.**

### 5. Classificação e identificação da solução de compromisso

As alternativas são ordenadas separadamente segundo os valores crescentes de $S_i$, $R_i$ e $Q_i$. A alternativa com menor $Q_i$ é a primeira candidata à solução de compromisso. Entretanto, o VIKOR estabelece duas condições adicionais antes de recomendar uma única alternativa.

**Condição 1 — Vantagem aceitável**

A diferença entre a primeira e a segunda alternativa na classificação por $Q$ deve satisfazer:

$$  
Q(a^{(2)})-Q(a^{(1)})\geq DQ  
$$

Em que:

$$  
DQ=\frac{1}{m-1}  
$$

**Condição 2 — Estabilidade aceitável**

A alternativa mais bem classificada segundo $Q$ também deve ocupar a primeira posição segundo $S$ ou $R$. Quando ambas as condições são satisfeitas, a primeira alternativa pode ser proposta como solução de compromisso única. Caso contrário, o método recomenda um conjunto de soluções de compromisso, conforme as condições não atendidas.

## Exemplo prático

Considere três áreas candidatas à restauração ecológica, avaliadas segundo biodiversidade e segurança hídrica. Os desempenhos foram previamente transformados para uma escala entre 0 e 1, na qual valores maiores representam condições mais favoráveis.

|Área|Biodiversidade|Segurança hídrica|
|---|---|---|
|A|0,90|0,20|
|B|0,60|0,70|
|C|0,40|0,90|

Considere pesos iguais a 0,5 para os dois critérios e parâmetro de compromisso $v=0.5$.

### Cálculo das deficiências

Os melhores desempenhos são 0,90 para biodiversidade e 0,90 para segurança hídrica. Os piores desempenhos são 0,40 e 0,20, respectivamente. Aplicando a normalização das deficiências:

|Área|Deficiência em biodiversidade|Deficiência em segurança hídrica|
|---|---|---|
|A|0,000|1,000|
|B|0,600|0,286|
|C|1,000|0,000|

A área A não apresenta deficiência em biodiversidade, mas possui a maior deficiência em segurança hídrica. A área C apresenta o comportamento oposto. A área B apresenta deficiências intermediárias nos dois critérios.

### Cálculo de S e R

Para a área A:

$$  
S_A=(0.5\times0)+(0.5\times1)=0.5  
$$

$$  
R_A=\max(0,\ 0.5)=0.5  
$$

Para a área B:

$$  
S_B=(0.5\times0.6)+(0.5\times0.286)\approx0.443  
$$

$$  
R_B=\max(0.3,\ 0.143)=0.3  
$$

Para a área C:

$$  
S_C=(0.5\times1)+(0.5\times0)=0.5  
$$

$$  
R_C=\max(0.5,\ 0)=0.5  
$$

### Cálculo do índice Q

Os valores de referência são:

$$  
S^*=0.443,\qquad S^-=0.500  
$$

$$  
R^*=0.300,\qquad R^-=0.500  
$$

Aplicando o parâmetro $v=0.5$, obtemos:

|Área|$S_i$|$R_i$|$Q_i$|
|---|---|---|---|
|A|0,500|0,500|1,000|
|B|0,443|0,300|0,000|
|C|0,500|0,500|1,000|

A classificação é:

$$  
B>A=C  
$$

A área B apresenta simultaneamente a menor deficiência global e a menor deficiência individual máxima.

### Verificação das condições de compromisso

Como existem três alternativas:

$$  
DQ=\frac{1}{3-1}=0.5  
$$

A diferença entre a primeira e a segunda posição na classificação por $Q$ é:

$$  
1-0=1  
$$

Portanto, a condição de vantagem aceitável é satisfeita. A área B também ocupa a primeira posição nas classificações por $S$ e $R$, satisfazendo a condição de estabilidade aceitável. Assim, **a área B é identificada como solução de compromisso única**.

É importante observar que esse exemplo não representa um conflito efetivo entre as estratégias de utilidade coletiva e arrependimento máximo, pois ambas favorecem B. Em problemas mais complexos, a alternativa que minimiza $S$ pode ser diferente daquela que minimiza $R$, tornando a escolha do parâmetro $v$ especialmente relevante.

## Pressupostos e propriedades

### Solução de compromisso

O VIKOR pressupõe que a decisão possa ser representada como um compromisso entre objetivos conflitantes. Uma solução de compromisso não precisa apresentar o melhor desempenho em todos os critérios. Ela procura conciliar resultados globais favoráveis com a redução das deficiências individuais mais importantes.

### Utilidade coletiva e arrependimento individual

A distinção entre $S$ e $R$ é a principal característica do método. A medida $S$ utiliza uma agregação aditiva das deficiências ponderadas. A medida $R$ utiliza um operador de máximo, identificando a maior deficiência ponderada. Consequentemente, o VIKOR combina uma perspectiva agregativa com uma perspectiva orientada à pior deficiência individual.

### Influência do parâmetro v

O parâmetro $v$ representa uma decisão metodológica importante. Valores elevados favorecem a estratégia de utilidade coletiva, enquanto valores reduzidos enfatizam a minimização do arrependimento máximo. Na interpretação apresentada por Opricovic e Tzeng (2004), valores superiores a 0,5 representam maior ênfase na utilidade da maioria, valores próximos de 0,5 representam uma estratégia de consenso e valores inferiores a 0,5 enfatizam a estratégia associada ao arrependimento individual. Entretanto, essa interpretação não deve ser confundida com a existência de uma votação literal entre critérios ou de um veto rígido, como nos métodos ELECTRE.

### Compensação entre critérios

O VIKOR permite compensações entre critérios, especialmente por meio da medida $S$. Entretanto, a presença da medida $R$ permite penalizar alternativas com uma deficiência individual ponderada elevada. Assim, o método combina mecanismos compensatórios com uma preocupação explícita em limitar o pior desempenho relativo.

Isso não significa que exista um veto absoluto: uma alternativa com deficiência elevada em determinado critério ainda pode ser selecionada, dependendo dos pesos, do parâmetro $v$ e do conjunto de alternativas.

### Dependência das alternativas

Na formulação clássica, os melhores e piores desempenhos são determinados a partir do conjunto de alternativas avaliadas. Consequentemente, a inclusão ou exclusão de alternativas pode modificar as referências de normalização e os valores de $S$, $R$ e $Q$. O VIKOR também pode apresentar alterações de classificação decorrentes de mudanças no conjunto de alternativas, fenômeno relacionado ao [_rank reversal_](https://en.wikipedia.org/wiki/Rank_reversals_in_decision-making).

### Sensibilidade aos pesos

Os pesos influenciam tanto a soma das deficiências quanto a identificação da maior deficiência ponderada. Por essa razão, mudanças nos pesos podem modificar não apenas as pontuações, mas também qual critério determina o valor de $R$ para cada alternativa.

### Dependência da normalização

A formulação clássica utiliza a distância relativa entre os melhores e piores desempenhos observados. Essa normalização é sensível à definição dos extremos de cada critério. Em aplicações nas quais valores extremos são pouco representativos ou sujeitos a incertezas, sua influência sobre os resultados deve ser examinada.

## Vantagens e limitações

Entre as principais vantagens do VIKOR estão sua capacidade de representar soluções de compromisso, considerar simultaneamente deficiências globais e individuais e incorporar explicitamente diferentes estratégias de decisão por meio do parâmetro $v$. O método também apresenta uma estrutura matemática relativamente simples e permite identificar situações nas quais não existe vantagem suficiente para recomendar uma única alternativa.

Entretanto, apresenta limitações importantes:

- **Sensibilidade ao parâmetro v:** diferentes valores podem produzir classificações distintas quando existe conflito entre $S$ e $R$.
    
- **Dependência das referências:** os melhores e piores desempenhos observados influenciam a normalização.
    
- **Sensibilidade aos pesos:** mudanças nos pesos afetam tanto a deficiência global quanto a maior deficiência individual.
    
- **Compensação ainda existente:** o método não estabelece vetos absolutos para desempenhos inaceitáveis.
    
- **Dependência do conjunto de alternativas:** a inclusão ou exclusão de alternativas pode modificar os resultados.
    
- **Condições de compromisso:** a recomendação de uma única alternativa depende da satisfação das condições de vantagem e estabilidade aceitáveis.
    

Em aplicações espaciais, o cálculo das medidas $S$, $R$ e $Q$ pode ser realizado de forma vetorizada, permitindo avaliar grandes conjuntos de células raster. Entretanto, a aplicação das condições de compromisso e a interpretação de conjuntos de soluções devem considerar que a finalidade original do método é apoiar a escolha entre alternativas discretas.

## Comparação com TOPSIS

Embora TOPSIS e VIKOR utilizem referências ideais, suas filosofias de decisão são diferentes. O [[Como Funciona o Método TOPSIS|TOPSIS]] procura identificar alternativas relativamente próximas da solução ideal positiva e distantes da solução anti-ideal, utilizando medidas de distância geométrica. O VIKOR procura identificar soluções de compromisso, combinando a minimização das deficiências globais e da maior deficiência individual.

|Característica|TOPSIS|VIKOR|
|---|---|---|
|Princípio|Proximidade relativa|Solução de compromisso|
|Medidas principais|Distâncias ao ideal e anti-ideal|Deficiência global e máxima|
|Agregação|Distância euclidiana|Soma e máximo|
|Melhor resultado|Maior $C$|Menor $Q$|
|Parâmetro de compromisso|Não possui equivalente direto|$v$|
|Condições adicionais de escolha|Não|Vantagem e estabilidade aceitáveis|

Opricovic e Tzeng (2004) destacam que os dois métodos possuem fundamentos relacionados à programação por compromisso, mas podem produzir classificações diferentes devido às suas distintas formas de agregação e interpretação da proximidade ao ideal.

## Referências bibliográficas

**Opricovic, S., & Tzeng, G.-H. (2004).** Compromise solution by MCDM methods: A comparative analysis of VIKOR and TOPSIS. _European Journal of Operational Research, 156_(2), 445–455. [https://doi.org/10.1016/S0377-2217(03)00020-1](https://doi.org/10.1016/S0377-2217\(03\)00020-1)

**Opricovic, S., & Tzeng, G.-H. (2007).** Extended VIKOR method in comparison with outranking methods. _European Journal of Operational Research, 178_(2), 514–529. [https://doi.org/10.1016/j.ejor.2006.01.020](https://doi.org/10.1016/j.ejor.2006.01.020)

**Opricović, S. (2009).** Compromise in cooperative game and the VIKOR method. _Yugoslav Journal of Operations Research, 19_(2), 225–238. [https://doi.org/10.2298/YJOR0902225O](https://doi.org/10.2298/YJOR0902225O)