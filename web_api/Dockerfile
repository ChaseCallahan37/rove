FROM elixir:latest

# Install debian packages
RUN apt-get update && \
    apt-get install --yes build-essential inotify-tools postgresql-client git && \
    apt-get clean

ADD . /app

# Install Phoenix packages
RUN mix local.hex --force && \
    mix local.rebar --force && \
    mix archive.install --force hex phx_new 1.5.1

# Install node
RUN curl -fsSL https://deb.nodesource.com/setup_21.x | bash - &&\
    apt-get install -y nodejs

WORKDIR /app

RUN mix deps.get
RUN npm --prefix assets install
RUN npm --prefix assets run build

EXPOSE 4000

COPY ./bash/entrypoint.sh /app/bash/entrypoint.sh
RUN chmod +x /app/bash/entrypoint.sh

CMD ["/app/bash/entrypoint.sh"]