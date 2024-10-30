FROM ubuntu

RUN apt-get update
RUN apt-get install python3 -y
RUN apt install python3.12-venv -y

COPY ./ ./api

WORKDIR ./api

RUN chmod +x setup.sh
CMD ./setup.sh
