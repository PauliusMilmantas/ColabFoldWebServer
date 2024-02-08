FROM --platform=linux/x86_64 gcc:13.2

RUN apt-get update && apt-get install -y git

WORKDIR /app

RUN git clone https://github.com/PauliusMilmantas/swipe.git

WORKDIR /app/swipe

RUN make