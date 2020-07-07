FROM node:14.5.0 AS compile-image

WORKDIR /opt/ng 
COPY package*.json ./

RUN npm install -g @angular/cli

RUN npm install

COPY . .

RUN npm run build --prod

### Had to use nginxinc/nginx-unprivileged due to problems on OpenShift with nginx permissions
FROM nginxinc/nginx-unprivileged
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=compile-image /opt/ng/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]