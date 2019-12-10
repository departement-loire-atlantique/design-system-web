FROM ruby:2.6.5
MAINTAINER Julien BAYLE <julien.bayle@loire-atlantique.fr>

# install nodejs
RUN \
  cd /tmp && \
  wget http://nodejs.org/dist/v11.15.0/node-v11.15.0.tar.gz && \
  tar xvzf node-v11.15.0.tar.gz && \
  rm -f node-v11.15.0.tar.gz && \
  cd node-v* && \
  ./configure && \
  CXX="g++ -Wno-unused-local-typedefs" make && \
  CXX="g++ -Wno-unused-local-typedefs" make install && \
  cd /tmp && \
  rm -rf /tmp/node-v* && \
  npm install -g npm && \
  npm install -g gulp && \
  echo '\n# Node.js\nexport PATH="node_modules/.bin:$PATH"' >> /root/.bashrc

# Set default locale for the environment
ENV LC_ALL C.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8

WORKDIR /app

CMD ["bash"]