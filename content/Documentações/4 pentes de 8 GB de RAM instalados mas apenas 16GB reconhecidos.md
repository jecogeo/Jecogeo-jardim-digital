---
title: 4 pentes de 8 GB de RAM instalados mas apenas 16GB reconhecidos
draft: false
tags:
  - arch
  - ram
  - bios
  - hardware
created: 2026-04-02 11:05
modified: 2026-04-02 11:05
---
# Problema
Ferramentas do sistema mostravam apenas 16GB de RAM, apesar de ter 4 pentes de 8GB (32GB total) fisicamente instalados na placa-mãe. Eu não reparei quando isso começou. Sempre tive 32GB de RAM, mas suspeito que tenha sido a mesma queda de energia que queimou meu SSD mais de um mês atrás. 

Então é possível que eu esteja trabalhando com apenas 16GB há tempos mas só percebi agora quando tive problemas de memória ao fazer uns processamentos de dados. 

# Diagnóstico
Os resultados de diagnóstico foram:

```ini
$sudo dmidecode -t memory | grep -A 5 "Memory Device" 

Memory Device 
	Array Handle: 0x000A 
	Error Information Handle: 0x0011 
	Total Width: 64 bits 
	Data Width: 64 bits 
	Size: 8 GiB 
-- 
Memory Device 
	Array Handle: 0x000A 
	Error Information Handle: 0x0014 
	Total Width: 64 bits 
	Data Width: 64 bits 
	Size: 8 GiB 
-- 
Memory Device 
	Array Handle: 0x000A 
	Error Information Handle: 0x0017 
	Total Width: Unknown 
	Data Width: Unknown 
	Size: No Module Installed 
-- 
Memory Device 
	Array Handle: 0x000A 
	Error Information Handle: 0x0019 
	Total Width: Unknown 
	Data Width: Unknown 
	Size: No Module Installed 

$free -h 
	  total used free shared buff/cache available 
Mem:  15Gi 3.3Gi 8.5Gi 80Mi  4.1Gi       12Gi 
Swap: 15Gi 3.9Gi 12Gi

$sudo lshw -short -class memory
/0/a/0  memory  8GiB DIMM DDR4 Synchronous 2133 MHz (0.5 ns)
/0/a/1  memory  8GiB DIMM DDR4 Synchronous 2133 MHz (0.5 ns)
/0/a/2  memory  [empty]
/0/a/3  memory  [empty]
```

Isso mostrava que os slots B1 e B2 da minha placa-mãe estavam mortos ou os pentes tinham feito a passagem. E ainda que a velocidade reportada era 2133 MHz, não os 3200 MHz especificados do kit de memória Corsair Vengeance LPX 32GB (4x8GB).

Então abri a máquina e troquei os pentes de lugar. Os que funcionavam em A1 e A2 foram instalados em B1 e B2 e os outros 2 foram deixados de fora e funcionou com 16GB. Depois tirei os dois pentes desses slots e instalei os que estavam de fora e também funcionou. Sinal que os pentes estão todos OK. 

Em seguida fui testar os slots. Dois em A1 e A2 e funcionou... sinal que os slots funcionam. Então apenas mais um pente, 3 totalizando 24GB. Funciona!! Bora botar tudo de volta e.... Não... Apenas 16GB.

Parece que quando os 4 pentes estão instalados, um canal inteiro "morre". Ué?

# Aprendizado

1. A ordem dos pentes importa. Os números de série dos pentes são sequenciais, com finais 20, 21, 22 e 23. Mesmo com XMP ativado, a disposição física dos pentes nos slots pode afetar o funcionamento. O controlador de memória espera que os pentes do **mesmo canal** (A1/A2 ou B1/B2) sejam logicamente pareados. Em alguns sistemas, pentes muito diferentes entre slots do mesmo canal podem causar instabilidade. A placa-mãe Gigabyte B550 Aorus Elite V2 usa topologia **Daisy Chain**, que é otimizada para 2 pentes (geralmente nos slots A2 e B2). Com 4 pentes, a disposição correta ajuda a minimizar reflexões de sinal e a integridade do barramento de memória. Para kits certificados de 4 pentes, a ordem recomendada é instalar os pentes em **sequência numérica ou por pares de mesmo lote** nos canais correspondentes. Isso garante que cada canal receba pentes com características elétricas o mais próximas possível.
2.  O XMP (Extreme Memory Profile) estava desligado na BIOS. Com 4 pentes, a placa-mãe usava configurações conservadoras (2133MHz, 1.2V) que não estabilizavam o Channel B. O kit Corsair Vengeance LPX 32GB (4x8GB) é certificado para operar a 3200MHz com 1.35V. Sem XMP, a placa-mãe usa configurações conservadoras que podem não estabilizar 4 pentes simultaneamente.