FROM nginx:latest

RUN apt-get update && \
    apt-get install -y php8.2-fpm nano curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/* 
    
RUN apt-get update && apt-get install -y libnss3 libdbus-1-3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libxkbcommon0 libasound2 libpango-1.0 libcairo2 supervisor

RUN useradd -m user


COPY /flag_randomname.txt /
COPY nginx.conf /etc/nginx/nginx.conf
COPY php.ini /etc/php/8.2/fpm/php.ini
COPY php-src /usr/share/nginx/html/challenge

COPY supervisord.conf /etc/supervisord.conf
RUN mkdir -p /var/log/supervisor && mkdir -p /var/run


# Not a part of the challenge just for webhook setup

WORKDIR /usr/webhook
COPY webhook /usr/webhook
RUN cd /usr/webhook && npm init -y && npm install express sqlite3 uuid --no-package-lock

RUN chown -R user:user /usr/webhook

# Not a part of the challenge just for bot setup

WORKDIR /usr/bot
COPY bot /usr/bot
RUN cd /usr/bot && npm init -y && npm install express puppeteer --no-package-lock
RUN mkdir -p /app/webhooks && chmod 777 -R /app/webhooks


WORKDIR /

EXPOSE 80

CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisord.conf"]


