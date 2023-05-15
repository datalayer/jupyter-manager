# Copyright (c) Datalayer, Inc. https://datalayer.io
# Distributed under the terms of the MIT License.

FROM python:3.11

COPY . .

RUN pip install -e .

EXPOSE 8888

CMD ["jupyter", "manager"]
