FROM python:3.11

COPY . .

RUN pip install -e .

EXPOSE 8888

CMD ["jupyter", "manager"]
