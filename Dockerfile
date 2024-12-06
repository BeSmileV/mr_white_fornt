FROM node:18-alpine
WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

#ENV NEXT_PUBLIC_API_URL=http://mediais.ru/api/core
#ENV NEXT_PUBLIC_API_URL_MEDIAPLANNER=http://mediais.ru/api/mediaplanner
#ENV NEXTAUTH_URL=http://mediais.ru

RUN npm run build

CMD ["npm", "start"]
