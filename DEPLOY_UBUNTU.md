
# Guia de Deploy - Ubuntu Server 24.04

Este guia descreve como fazer o deploy do sistema de gestão educacional em um servidor Ubuntu 24.04.

## Pré-requisitos

### 1. Preparação do Servidor
```bash
# Atualizar o sistema
sudo apt update && sudo apt upgrade -y

# Instalar dependências básicas
sudo apt install -y curl wget git build-essential

# Instalar Node.js 18+ (via NodeSource)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verificar instalação
node --version
npm --version
```

### 2. Instalar PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

### 3. Configurar Nginx (opcional, para proxy reverso)
```bash
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

## Deploy da Aplicação

### 1. Clonar o Repositório
```bash
# Navegar para o diretório desejado
cd /var/www

# Clonar o repositório
sudo git clone https://github.com/seu-usuario/educacao-araraquara.git
sudo chown -R $USER:$USER educacao-araraquara
cd educacao-araraquara
```

### 2. Instalar Dependências
```bash
# Instalar dependências do projeto
npm install

# Build da aplicação para produção
npm run build
```

### 3. Configurar PM2
```bash
# O arquivo ecosystem.config.js já está configurado no projeto
# Iniciar a aplicação com PM2
pm2 start ecosystem.config.js

# Configurar PM2 para iniciar no boot
pm2 startup
pm2 save
```

### 4. Configurar Nginx (Proxy Reverso)
```bash
# Criar configuração do Nginx
sudo nano /etc/nginx/sites-available/educacao-araraquara
```

Adicione o conteúdo:
```nginx
server {
    listen 80;
    server_name seu-dominio.com.br;

    location / {
        proxy_pass http://localhost:4173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Ativar o site
sudo ln -s /etc/nginx/sites-available/educacao-araraquara /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Testar configuração
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

### 5. Configurar SSL com Certbot (Recomendado)
```bash
# Instalar Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obter certificado SSL
sudo certbot --nginx -d seu-dominio.com.br

# Configurar renovação automática
sudo systemctl enable certbot.timer
```

## Configurações de Segurança

### 1. Firewall (UFW)
```bash
# Configurar firewall
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw status
```

### 2. Variáveis de Ambiente
```bash
# Criar arquivo de ambiente (se necessário)
nano .env.production

# Exemplo de conteúdo:
# NODE_ENV=production
# PORT=4173
# DATABASE_URL=sua-url-do-banco
```

### 3. Backup Automatizado
```bash
# Criar script de backup
sudo nano /usr/local/bin/backup-educacao.sh
```

Conteúdo do script:
```bash
#!/bin/bash
BACKUP_DIR="/backup/educacao-araraquara"
PROJECT_DIR="/var/www/educacao-araraquara"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup do código
tar -czf $BACKUP_DIR/code_$DATE.tar.gz -C $PROJECT_DIR .

# Manter apenas os últimos 7 backups
find $BACKUP_DIR -name "code_*.tar.gz" -mtime +7 -delete

echo "Backup concluído: $DATE"
```

```bash
# Tornar executável
sudo chmod +x /usr/local/bin/backup-educacao.sh

# Adicionar ao crontab (backup diário às 2h)
echo "0 2 * * * /usr/local/bin/backup-educacao.sh" | sudo crontab -
```

## Monitoramento

### 1. PM2 Monitoring
```bash
# Ver status das aplicações
pm2 status

# Ver logs em tempo real
pm2 logs

# Monitorar recursos
pm2 monit
```

### 2. Logs do Sistema
```bash
# Logs do Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Logs do sistema
sudo journalctl -f
```

## Comandos de Manutenção

### Atualizar a Aplicação
```bash
cd /var/www/educacao-araraquara

# Fazer backup antes da atualização
/usr/local/bin/backup-educacao.sh

# Parar a aplicação
pm2 stop educ-portal

# Atualizar código
git pull origin main

# Instalar novas dependências
npm install

# Rebuild
npm run build

# Reiniciar aplicação
pm2 restart educ-portal
```

### Reiniciar Serviços
```bash
# Reiniciar PM2
pm2 restart all

# Reiniciar Nginx
sudo systemctl restart nginx

# Reiniciar servidor (se necessário)
sudo reboot
```

## Resolução de Problemas

### 1. Aplicação não inicia
```bash
# Verificar logs do PM2
pm2 logs educ-portal

# Verificar se a porta está em uso
sudo netstat -tulpn | grep :4173

# Reiniciar PM2
pm2 restart educ-portal
```

### 2. Erro 502 Bad Gateway
```bash
# Verificar se a aplicação está rodando
pm2 status

# Verificar configuração do Nginx
sudo nginx -t

# Verificar logs do Nginx
sudo tail -f /var/log/nginx/error.log
```

### 3. Problemas de Permissão
```bash
# Corrigir permissões dos arquivos
sudo chown -R $USER:$USER /var/www/educacao-araraquara
sudo chmod -R 755 /var/www/educacao-araraquara
```

## URLs de Acesso

Após o deploy, o sistema estará disponível em:

- **Site Principal**: http://seu-dominio.com.br
- **Área Administrativa**: http://seu-dominio.com.br/admin
- **Login das Escolas**: http://seu-dominio.com.br/school-admin

## Suporte

Para suporte adicional:
1. Verifique os logs do sistema
2. Consulte a documentação do PM2: https://pm2.keymetrics.io/
3. Documentação do Nginx: https://nginx.org/en/docs/

---

**Nota**: Este sistema foi desenvolvido com Vite + React e está otimizado para produção. Certifique-se de que todas as dependências estão atualizadas e o servidor possui recursos adequados (mínimo 2GB RAM recomendado).
