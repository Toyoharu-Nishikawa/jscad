FROM nginx:alpine
RUN rm /etc/nginx/conf.d/*
COPY conf.d /etc/nginx/conf.d
COPY public /usr/share/nginx/html
