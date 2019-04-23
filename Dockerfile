FROM nginx:1.14-alpine
ENV NIGHTFURY_HOST api
ENV NIGHTFURY_PORT 3100

WORKDIR /opt/gids
ADD build .
COPY default.template /etc/nginx/conf.d/default.template
COPY scripts/serve /bin/serve
CMD serve
EXPOSE 8080
