FROM python:3.8-slim-buster

WORKDIR /app

ENV FLASK_APP=wsgi.py
ENV FLASK_RUN_HOST=0.0.0.0

COPY requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000
CMD [ "flask", "run" ]