---
title: Configurando Protonmail-bridge com Nextcloud
draft: false
tags:
  - auto-hospedagem
  - nextcloud
created: 2025-07-23 15:36
modified: 2025-07-23 15:36
---
# Contexto

O [Nextcloud](https://nextcloud.com/) é capaz de usar um mail server existente para enviar mensagens de reset de senhas, avisos de compartilhamento de arquivos, avisos de agenda e outras coisas. É preciso configurar a conexão a um servidor SMTP nas "Configurações Básicas".

![[Pasted image 20250723154300.png]]

Ocorre que para poder usar o Protonmail como serviço de email é preciso ter o protonmail-bridge rodando por conta da criptografia padrão do Proton. Então os seguintes passos foram feitos para fazer isso funcionar.

# Antes de começar  
O Protonmail Bridge para Linux é distribuído publicamente em https://proton.me/mail/bridge. O cliente Linux do Bridge requer uma conta Protonmail paga para funcionar.  
# Instalar o protonmail-bridge

## Obter o instalador do Protonmail Bridge para Linux  

Fazer o download do pacote mais recente.  Na data em que documento estes procedimentos a versão mais recente é 3.21.2-1.

```bash
wget https://proton.me/download/bridge/protonmail-bridge_3.21.2-1_amd64.deb
```

## Instalar o Protonmail Bridge e ferramentas adicionais necessárias

```bash
sudo apt install protonmail-bridge_3.21.2-1_amd64.deb
```

Instalar o gerenciador de senhas `pass`, que o Protonmail Bridge usará para armazenar as senhas:

```bash
sudo apt install pass -y
```

Instalar o utilitário `screen` para daemonizar o cliente Protonmail Bridge. Isso é necessário porque estou usando um servidor *headless*, ou seja, sem ambiente gráfico e o protonmail bridge precisa de um software gráfico rodando.

```bash
sudo apt install screen -y
```

### Criar um novo usuário

Criei um novo usuário principalmente para isolar o acesso às senhas de outros usuários. 


```bash
sudo useradd protonmail
sudo passwd protonmail
sudo mkdir -p /home/protonmail
sudo chown -R protonmail:protonmail /home/protonmail
```

### Configurar o gerenciador de senhas "pass"

Fazer login como o novo usuário isolado:

```bash
su protonmail
cd ~/
```

Executar uma sessão de script para evitar que a solicitação da senha da chave PGP falhe ([https://bugzilla.redhat.com/show_bug.cgi?id=659512](https://bugzilla.redhat.com/show_bug.cgi?id=659512)). Isso é necessário se não estivermos usando uma interface gráfica, devido à forma como nosso usuário isolado executa os comandos do shell.


```bash
script /dev/null
```

Gerar um par de chaves PGP para o novo usuário com uma senha vazia. A senha vazia é necessária para executar o Protonmail Bridge em segundo plano durante a inicialização do sistema sem solicitar a senha e, assim, evitar que o processo falhe.

```bash
gpg --full-gen-key

>>>> Escolher 1               (1) RSA e RSA (padrão)
>>>> Escolher 4096            4096
>>>> Escolher 0               0 = a chave não expira
>>>> Digitar nome             ex.: Proton Silva
>>>> Digitar e-mail           ex.: a@a.com
>>>> Deixar sem comentário
>>>> Deixar a senha vazia
```

Verificar se as chaves foram criadas corretamente

```bash
gpg --list-keys
```

Inicializar o gerenciador de senhas para o endereço de e-mail escolhido na etapa das chaves PGP:

```bash
pass init a@a.com
```

### Configurar o cliente Protonmail Bridge

Neste ponto, já configurei o gerenciador de senhas que permitirá que o Protonmail Bridge armazene as senhas. Agora, é preciso configurar a conta Protonmail.


```bash
protonmail-bridge --cli
>>>> add    (adicionar a conta Protonmail ao Bridge)
>>>> (digitar o endereço de e-mail da conta Protonmail)
>>>> (digitar a senha da conta Protonmail)
>>>> list   (listar as contas configuradas)
>>>> info   (listar as credenciais SMTP para configurar qualquer serviço local compatível com SMTP. Guardar essas infos)
>>>> exit   (sair do console do Bridge, o que vai interromper o servidor SMTP local criado. Sem problema. Vamos Daemonizar 👹)
```

Dependendo do tamanho da caixa de email, pode levar um bom tempo para sincronizar. Depois disso, sair do modo de script do usuário isolado foi executado anteriormente `script /dev/null`:

```bash
exit
```

E sair de dentro do usuário `protonmail`:

```bash
exit
```

Depois, é uma boa ideia isolar o usuário `protonmail`. O novo usuário será bloqueado para desativar o acesso externo a ele.

```bash
sudo usermod -L protonmail
```

# 👹 Daemonizar o cliente Protonmail Bridge

Para iniciar automaticamente o cliente Bridge na inicialização do sistema, criei um script para executá-lo em segundo plano. É preciso utilizar programa "screen", pois atualmente não há como executar o cliente Linux do Protonmail em segundo plano sem uma interface gráfica. Isso vai *simular* uma interface.

Criar um script básico que possa iniciar o cliente Protonmail Bridge em segundo plano e encerrá-lo.

```bash
sudo mkdir /var/lib/protonmail
sudo vim /var/lib/protonmail/protonmail.sh
```

Dentro desse arquivo, colar este script:

```bash
#!/bin/bash

case "$1" in
  start)
    # cria uma tela (screen) no modo desanexado (detached), ou seja, em segundo plano, com o nome "protonmail"
    screen -S protonmail -dm protonmail-bridge --cli
    echo "Service started."
    ;;
  status)
    result=$(screen -list | grep protonmail)
    if [ $? == 0 ]; then
      echo "Protonmail bridge service is ON."
    else
      echo "Protonmail bridge service is OFF."
    fi
    ;;
  stop)
    # sai da tela chamada "protonmail" e encerra o processo protonmail-bridge
    screen -S protonmail -X quit
    echo "Service stopped."
    ;;
  *)
    echo "Unknown command: $1"
    exit 1
  ;;
esac
```

Dar permissões de execução do script:

```bash
sudo chmod +x /var/lib/protonmail/protonmail.sh
```

Criar um serviço systemd:

```bash
sudo vim /etc/systemd/system/protonmail.service
```

com o seguinte conteúdo:

```bash
[Unit]
Description=Service to run the Protonmail bridge client
After=network.target

[Service]
Type=oneshot
User=protonmail
ExecStart=/var/lib/protonmail/protonmail.sh start
ExecStop=/var/lib/protonmail/protonmail.sh stop
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
```

Habilitar o serviço para iniciar com o sistema e iniciar o serviço:

```bash
sudo systemctl enable protonmail
sudo systemctl start protonmail
```

Testar para ver se o servidor SMTP está ouvindo nas portas certas:

```bash
netstat -tulpn | grep 1025
```

Enviar um email de teste para ver se somos capazes de enviar emails a partir do bridge. Para isso, utilizei a ferramenta `swaks` (`sudo apt install swaks -y`):


```bash
swaks \
  --to meu_email_secundário@protonmail.com \ # é um alias da mesma conta 
  --from meu_email@protonmail.com \ 
  --server 127.0.0.1:1025 \
  --auth LOGIN \
  --auth-user meu_email@protonmail.com \
  --auth-password "senha" \ # e a senha fornecida no info do protonmail-bridge --cli
```

O email deve chegar sem problemas (woohoo 🎉). Sinal que está funcionando.

# Protonmail no Nextcloud

Com as informações de info do `protonmail-bridge --cli`, agora podemos configurar o nextcloud para usar qualquer endereço que seja parte da conta protonmail. A forma de configuração está na figura que inicia essa documentação.


## 🚨 Oops... email de verificação não funciona

Ao clicar no botão "send email" para enviar um email de verificação de que está tudo funcionando, temos um problema (que deve acontecer com qualquer um tentando a mesma coisa). A mensagem é:

> AxiosError: Request failed with status code 400

Isso está reportado em diversos lugares ([aqui](https://help.nextcloud.com/t/axioserror-request-failed-with-status-code-400/217651), [aqui](https://github.com/nextcloud/server/issues/50845), [aqui](https://help.nextcloud.com/t/unable-to-send-emails-from-nextcloud-axioserror-400/219392), ...). O problema é que o ProtonMail Bridge usa um certificado auto-assinado (no Common Name 127.0.0.1), e isso leva ao bloqueio da conexão no Nextcloud via PHP/OpenSSL devido à verificação do certificado TLS. Aparantemente o Nextcloud não consegue verificar a validade do certificado. 

O que é preciso fazer, é liberar essa verificação no Nextcloud, adicionando as seguintes linhas ao `config.php`:

```bash
'mail_smtpstreamoptions' => [
    'ssl' => [
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true,
    ],
],
```

Neste caso em que usamos o Protonmail Bridge na mesma máquina onde está instalado o Nextcloud isso é perfeitamente seguro. O servidor de e-mail (protonmail-bridge) está sendo executado localmente (no mesmo servidor da minha instância do NextCloud) e o tráfego não passa pela internet até ser criptografado pelo protonmail bridge.

Feito na maior parte com a ajuda deste Gist: https://gist.github.com/enoch85/a7d3d79fdf82bc35c72ec8723b36d7a5