FROM node:12-slim

WORKDIR /usr/src/app

COPY .npmrc-docker .npmrc

# as all our services will be running under a non-root user, we need to
# instruct express to use a port above port 1024..
ENV PORT 42053

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 42053

# We install Chrome to get all the OS level dependencies, but Chrome itself
# is not actually used as it's packaged in the node puppeteer library.
RUN  apt-get update \
     && apt-get install -y wget gnupg ca-certificates \
     && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
     && apt-get update \
     && apt-get install -y libgbm-dev \
     && apt-get install -y libxss1 \
     && apt-get install -y google-chrome-stable \
     && rm -rf /var/lib/apt/lists/* \
     && wget --quiet https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/sbin/wait-for-it.sh \
     && chmod +x /usr/sbin/wait-for-it.sh

# We add a non-root user to avoid need to configure puppeteer in --non-sandbox mode.
# using that mode would have been a potential security risk. 
RUN  groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
     && mkdir -p /home/pptruser/Downloads \
     && chown -R pptruser:pptruser /home/pptruser \
     # we set our user as owner of our project repo. 
     && chown -R pptruser:pptruser /usr/src/app/

# Run everything after as non-privileged user.
USER pptruser

CMD [ "npm", "start"]\