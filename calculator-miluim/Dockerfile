FROM amazon/aws-lambda-python:3.9

WORKDIR /data

COPY ./ "${LAMBDA_TASK_ROOT}"

RUN yum update -y

RUN pip install --upgrade pip
RUN pip install -r "${LAMBDA_TASK_ROOT}"/requirements.txt

# Set the handler for Lambda
CMD ["app.server.handler"]
