---
title: Instalando Readeck
draft: false
tags:
  - linux
  - auto-hospedagem
created: 2025-06-30 16:48
modified: 2025-06-30 16:48
---
Fonte: https://readeck.org/en/docs/deploy

# 1. Criando grupo e um usuário no servidor

sudo groupadd --system readeck
sudo useradd --system -d /var/lib/readeck -M -s /bin/false -g readeck readeck
sudo mkdir /var/lib/readeck
sudo chown readeck:readeck /var/lib/readeck

# 2. Baixando 

Verificar, antes, se essa é a última versão
```bash
sudo wget -O /usr/local/bin/readeck https://codeberg.org/readeck/readeck/releases/download/0.18.2/readeck-0.18.2-linux-amd64
```

# 3. mudando permissões e criando pastas
```bash
sudo chmod a+x /usr/local/bin/readeck
sudo mkdir /etc/readeck
sudo chown readeck:root /etc/readeck
sudo chmod 0750 /etc/readeck
```
# 4. Criando serviço no systemd

```bash
sudo vim /etc/systemd/system/readeck.service
```
Conteúdo do arquivo:

```ini
[Unit]
Description=Readeck - Open Source bookmark manager
After=network.target

[Service]
User=readeck
Group=readeck
WorkingDirectory=/var/lib/readeck
ExecStart=/usr/local/bin/readeck serve -config /etc/readeck/config.toml
Restart=on-failure
RestartSec=5

# Optional sandboxing options
ProtectSystem=full
ReadWritePaths=/etc/readeck /var/lib/readeck
NoNewPrivileges=true
PrivateTmp=true
PrivateDevices=yes
RestrictAddressFamilies=AF_UNIX AF_INET AF_INET6 AF_NETLINK
RestrictNamespaces=yes
RestrictRealtime=yes
DevicePolicy=closed
ProtectClock=yes
ProtectHostname=yes
ProtectProc=invisible
ProtectSystem=full
ProtectControlGroups=yes
ProtectKernelModules=yes
ProtectKernelTunables=yes
LockPersonality=yes
SystemCallArchitectures=native
SystemCallFilter=~@clock @debug @module @mount @obsolete @reboot @setuid @swap @cpu-emulation @privileged

CapabilityBoundingSet=~CAP_RAWIO CAP_MKNOD
CapabilityBoundingSet=~CAP_AUDIT_CONTROL CAP_AUDIT_READ CAP_AUDIT_WRITE
CapabilityBoundingSet=~CAP_SYS_BOOT CAP_SYS_TIME CAP_SYS_MODULE CAP_SYS_PACCT
CapabilityBoundingSet=~CAP_LEASE CAP_LINUX_IMMUTABLE CAP_IPC_LOCK
CapabilityBoundingSet=~CAP_BLOCK_SUSPEND CAP_WAKE_ALARM
CapabilityBoundingSet=~CAP_SYS_TTY_CONFIG
CapabilityBoundingSet=~CAP_MAC_ADMIN CAP_MAC_OVERRIDE
CapabilityBoundingSet=~CAP_NET_ADMIN CAP_NET_BROADCAST CAP_NET_RAW
CapabilityBoundingSet=~CAP_SYS_ADMIN CAP_SYS_PTRACE CAP_SYSLOG

[Install]
WantedBy=multi-user.target
```

## 4.1 Iniciando serviço
```bash
sudo systemctl daemon-reload
sudo systemctl start readeck
sudo systemctl enable readeck
```

# 5. criando arquivo de configuração do Readeck

```bash
sudo vim /etc/readeck/config.toml
```

e editar conforme a documentação do software:
```ini
[main]
log_level = "INFO"
secret_key = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
data_directory = "data"
 
[server]
host = "127.0.0.1"
port = 8000
allowed_hosts = ["exemplo.com"] # aqui vai teu domínio/subdomínio
trusted_proxies = ["127.0.0.1"]

[database]
source = "sqlite3:data/db.sqlite3"
```


# 6. Configurando proxy reverso

```bash
sudo vim /etc/apache2/sites-available/exemplo.com.conf
```

e copiar:

```ini
<VirtualHost *:80>
    ServerName exemplo.com
    Redirect permanent / https://exemplo.com
    RewriteEngine on
    RewriteCond %{SERVER_NAME} =exemplo.com
    RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
</VirtualHost>

<VirtualHost *:443>
    ServerName exemplo.com
    RewriteEngine on
    RewriteCond %{SERVER_NAME} !=exemplo.com
    RewriteRule ^ - [F]

    RequestHeader set X-Forwarded-Proto https

    ErrorLog ${APACHE_LOG_DIR}/readeck.error.log
    CustomLog ${APACHE_LOG_DIR}/readeck.access.log combined

    ProxyRequests off
    ProxyPass / http://127.0.0.1:8000/
    ProxyPassReverse / http://127.0.0.1:8000/
    ProxyPreserveHost On
SSLCertificateFile /etc/letsencrypt/live/exemplo.com/fullchain.pem
SSLCertificateKeyFile /etc/letsencrypt/live/exemplo.com/privkey.pem
Include /etc/letsencrypt/options-ssl-apache.conf
</VirtualHost>
```

Adicionando no Apache2 e reiniciando o serviço:
```bash
sudo a2ensite exemplo.com
sudo systemctl restart apache2
```

# 7. Criando registro DNS
Depois disso, fui no meu administrador onde comprei o domínio e criei um registro A no exemplo.com com o IP do servidor.

# 8. Gerando certificado SSL

```bash
sudo certbot --apache -d exemplo.com
```

 
**Feito!! Funcionando!!**
