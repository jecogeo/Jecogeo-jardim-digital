---
title: Erro Flameshot no Gnome 48
draft: false
tags:
  - linux
  - arch
created: 2025-06-30 16:09
modified: 2025-06-30 16:09
---
Ao tentar instalar o [Flameshot](https://flameshot.org/) no Arch (kernel 6.15.3-arch1-1; GNOME 48.3), surge um erro ao tentar utilizá-lo. Ao abrir o software o gnome notifications mostra:
>Unable to capture screen

e o journalctl:
>Jun 26 22:53:09 HAL9000-DESK xdg-desktop-por[1989]: Failed to associate portal window with parent window 
>Jun 26 22:53:09 HAL9000-DESK xdg-desktop-por[1877]: Failed to show access dialog: GDBus.Error:org.freedesktop.DBus.Error.AccessDenied: GDBus.Error:org.freedesktop.DBus.Error.AccessDenied: Only the focused app is allowed to show a system access dialog
>Jun 26 22:53:09 HAL9000-DESK org.flameshot.Flameshot.desktop[5732]: flameshot: error: Unable to capture screen
>Jun 26 22:53:09 HAL9000-DESK org.flameshot.Flameshot.desktop[5732]: flameshot: error: Unable to capture screen

Pelo que li, existe uma limitação do GNOME + Wayland: ferramentas que não são nativas (como o Flameshot) precisam passar por um portal (DBUS) e pedir permissão para capturar tela, mas o GNOME barra isso para proteger o usuário, dando esses erros.

---

## ✅ Solução recomendada

1. **Instalar os pacotes necessários**

   ```bash
   sudo pacman -S flameshot xdg-desktop-portal xdg-desktop-portal-gnome
   ```

O portal do GNOME (`xdg-desktop-portal-gnome`) é essencial para que o sistema gerencie corretamente as permissões ([flameshot.org][1]).

2. **Criar um script "wrapper" para iniciar o Flameshot**
   Criar o arquivo `/usr/local/bin/flameshot-wl.sh` (como root) com este conteúdo:

   ```bash
   #!/bin/bash
   env QT_QPA_PLATFORM=wayland flameshot gui
   ```

   E dar permissão de execução:

   ```bash
   sudo chmod +x /usr/local/bin/flameshot-wl.sh
   ```

   Isso força o Flameshot a iniciar corretamente no Wayland ([flameshot.org][2], [wiki.archlinux.org][3]).

3. **Configurar um atalho no GNOME para usar esse script**

   * Vá em **Configurações → Teclado → Atalhos personalizados**
   * Adicione um atalho (por exemplo, `Print`) com o comando:

     ```
     /usr/local/bin/flameshot-wl.sh
     ```

![[Pasted image 20250630162522.png]]

Isso evita os erros de “Only the focused app…” ao iniciar diretamente do menu ([ttys3.dev][4]).

---

## 🔄 Por que isso funciona?

* O GNOME no Wayland **só permite captura de tela se o app pedir permissão via portal** e estiver em foco.
* Usar `env QT_QPA_PLATFORM=wayland flameshot gui` com um script:
	* Garante que o portal reconheça a janela ativa e mostre a caixa de diálogo.
	* Evita iniciar de atalhos diretos ou menu, o que gera erro de acesso negado ([flameshot.org][1]).

---

### ✅ Resumo:

| Etapa | Ação                                                                   |
| ----- | ---------------------------------------------------------------------- |
| 1     | Instalar `flameshot`, `xdg-desktop-portal`, `xdg-desktop-portal-gnome` |
| 2     | Criar script wrapper com `QT_QPA_PLATFORM=wayland`                     |
| 3     | Criar atalho customizado para esse script                              |


Após isso, executar no terminal

```bash
flameshot-wl.sh
```

ou pressionar a tecla de atalho configurada (ex: Print) vai funcionar. 