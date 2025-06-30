---
title: Configurando conexões remotas SSH
draft: false
tags:
  - linux
  - ssh
created: 2025-06-30 16:34
modified: 2025-06-30 16:34
---
# Configurando 
## Para acessar um dispositivo via ssh usando par de chaves

1. Criar um par de chaves
	
`ssh-keygen -t rsa -b 4096 -C "your_key_name"`

2. Copiar a chave pública para o dispositivo remoto

`ssh-copy-id -i identity_file user@machine`

3. editar o `~/.ssh/config` da máquina cliente para facilitar o acesso
	```
	Host [nome]
    HostName [IP]
    User [nome]
    IdentityFile [~/.ssh/chave]
	```
4. Conectar
	
`ssh nome`
	
### Melhorando e endurecendo as configurações
5. Abrir `/etc/ssh/sshd_config` na máquina remota

6. Não permitir chaves sem senha

`PermitEmptyPasswords no`

7. Desabilitar conexão apenas com senha 

`PasswordAuthentication no`

8. Desabilitar conexão de usuários root
	* `PermitRootLogin no` para não permitir
	* `PermitRootLogin prohibit-password` para permitir, mas apenas usando chaves criptográficas

9. Timeout automático da sessão

`ClientAliveInterval 1200`

`ClientAliveCountMax 3`

`ClientAliveInterval` é o número de segundos máximo de inatividade. `ClientAliveCountMax` é o numero de checagens de inatividade antes de desconectar a sessão. Na prática, aqui defini uma hora ($20minutos X 3$ checagens)

10. Permitir apenas um ou dois usuários a fazerem autenticação

`AllowUsers jeco [segundo user]`

11. Mudar a porta padrão. Os bots e scanners que fazem a varredura dos serviços SSH na porta 22 não encontrarão o servidor e não lançarão ataques automatizados contra o servidor.

`Port 2048` (2048,por exemplo)

12. Desconexão automática em caso de login incorreto

`MaxAuthTries 2`

13. Desativar funções não utilizadas

Para evitar que funções não utilizadas sejam exploradas, elas devem ser desligadas. Para aplicar a configuração, são necessárias as seguintes mudanças no arquivo de configuração SSH:

```
AllowTcpForwarding no                   # Disables port forwarding.
X11Forwarding no                        # Disables remote GUI view.
AllowAgentForwarding no                 # Disables the forwarding of the SSH login.
AuthorizedKeysFile .ssh/authorized_keys # The ".ssh/authorized_keys2" file should be removed.
```

14. `PubkeyAuthentication yes`

15. Checar se o arquivo de configuração não contém erros

`[sudo] ssh -t`

Caso nenhum erro apareça,

16. Aplicar as alterações reiniciando o serviço

`[sudo] systemctl restart sshd`


### Configurando Fail2Ban

Este software oferece proteção contra os chamados ataques de força bruta.

O endereço IP do usuário é bloqueado por um certo período de tempo após vários logins incorretos. Isto é para evitar que o atacante tente uma grande lista de senhas em um curto espaço de tempo.

1. Instalar (`pacman -Sy fail2ban` ou `apt install fail2ban`, por exemplo)
2. Criar uma configuração baseado em um modelo

`cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local`

3. Na seção `[ssh]` deste arquivo, habilitar e setar a porta conforme definida antes

```
enabled = true
port = 2048
```

4. Opcionalmente, os valores para:

    * `bantime` O tempo em que não são possíveis mais logins.
    * `findtime` O tempo em que as tentativas de login incorretas devem ser contadas. Começa a partir do primeiro log-in falho.
    * `maxretry` O número máximo possível de tentativas falhas antes que ocorra um bloqueio.